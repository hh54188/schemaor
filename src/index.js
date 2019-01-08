import _ from "lodash";

const lodashWrap = fn => {
  return value => {
    return fn.call(this, value);
  };
};

function Types() {
  if (!(this instanceof Types)) {
    return new Types();
  }
  this.validators = [];
  this.isRequired = false;
  this.defaultValue = "";
  this.possibleValues = [];
}

Types.prototype = {
  string: function() {
    this.validators.push(lodashWrap(_.isString));
    return this;
  },
  number: function() {
    this.validators.push(lodashWrap(_.isNumber));
    return this;
  },
  array: function() {
    this.validators.push(lodashWrap(_.isArray));
    return this;
  },
  boolean: function() {
    this.validators.push(lodashWrap(_.isBoolean));
    return this;
  },
  object: function() {
    this.validators.push(lodashWrap(_.isObject));
    return this;
  },
  default: function(defaultValue) {
    this.defaultValue = defaultValue;
    return this;
  },
  required: function() {
    this.isRequired = true;
    return this;
  },
  valueOf: function() {
    this.possibleValues = _.flattenDeep(Array.from(arguments));
    return this;
  }
};

const Schema = definition => {
  const fieldValidator = {};
  const fields = Object.keys(definition);
  const requiredFields = fields.filter(field => {
    return definition[field].isRequired;
  });
  fields.forEach(field => {
    if (definition[field].validators.length) {
      fieldValidator[field] = definition[field].validators;
    }
  });

  return function(inputObj) {
    // TODO: 首先应该检测 inputObj 是否包含 required 的属性
    // TODO: 是否传递了没有事先定义的属性
    const originObj = {};
    const value = {};
    Object.keys(inputObj).forEach(inputKey => {
      Object.defineProperty(originObj, inputKey, {
        get() {
          return value[inputKey];
        },
        set(newValue) {
          const validators = propertyValidator[inputKey];
          if (!validators) {
            value[inputKey] = newValue;
          }

          const validateSuccess = validators.every(validator => {
            return validator(newValue);
          });

          if (!validateSuccess) {
            return new Error();
          }

          value[inputKey] = newValue;
        }
      });
    });
  };
};

Schema({
  name: Types()
    .string()
    .required()
    .default("Lee"),
  age: Types().number()
});

/**

  const Person = Schema({
    name: Types.default('').string().isRequired(),
    age: Types.number()
  })

  const person = Person({
    name: 'Tom',
    age: 12
  })
 */

// class Schema {
//   constructor(definition) {
//     const keys = Object.keys(definition);
//     keys.forEach(key => {
//       Object.defineProperty(this, key, {
//         get() {
//           return this[key];
//         },
//         set(newValue) {
//           this[key] = newValue;
//         }
//       });
//     });
//   }
// }

// const Person = new Schema({
//   name: "",
//   age: ""
// });

// console.log(Person);
