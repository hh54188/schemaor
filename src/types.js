import _ from "lodash";

const lodashWrap = fn => {
  return value => {
    return fn.call(this, value);
  };
};

export function Types() {
  if (!(this instanceof Types)) {
    return new Types();
  }
  this.validators = [];
  this.isRequired = false;
  this.defaultValue = void 0;
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
    // lodash 的 _.isObject 会将数组 [] 判断为 object
    const isObject = function(value) {
      return Object.prototype.toString.call(value) === "[object Object]";
    };
    this.validators.push(isObject);
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
