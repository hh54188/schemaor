export const Schema = definition => {
  const fieldValidator = {};
  const fieldDefaults = {};
  const fieldPossibleValues = {};

  const fields = Object.keys(definition);
  const requiredFields = fields.filter(field => {
    return definition[field].isRequired;
  });
  fields.forEach(field => {
    const fieldValue = definition[field];
    if (fieldValue.validators.length) {
      fieldValidator[field] = fieldValue.validators;
    }
    if (typeof fieldValue.defaultValue !== "undefined") {
      fieldDefaults[field] = fieldValue.defaultValue;
    }
    if (fieldValue.possibleValues && fieldValue.possibleValues.length) {
      fieldPossibleValues[field] = fieldValue.possibleValues;
    }
  });

  return function(inputObj = {}) {
    const inputFields = Object.keys(inputObj);
    // 首先应该检测 inputObj 是否包含 required 的属性
    const includeRequiredFields = requiredFields.every(requiredField => {
      const result = inputFields.includes(requiredField);
      // 如果缺少某个必填字段，报错
      if (!result) {
        throw new Error();
      }
      return result;
    });
    // 是否传递了没有事先定义的属性
    const includeNoDefinitionFields = inputFields.some(inputField => {
      const result = !fields.includes(inputField);
      // 如果传入了 schema 没有定义的 field，报错
      if (result) {
        throw new Error();
      }
      return result;
    });
    // 检测传入的对象是否符合类型检测
    const everyFieldPassValidator = inputFields.every(inputField => {
      const validators = fieldValidator[inputField];
      const fieldValue = inputObj[inputField];
      if (!validators || !validators.length) {
        return true;
      }
      return validators.every(validator => {
        const result = validator(fieldValue);
        // 如果验证失败，报错
        if (!result) {
          throw new Error();
        }
        return result;
      });
    });

    if (
      includeNoDefinitionFields ||
      !everyFieldPassValidator ||
      (requiredFields && requiredFields.length && !includeRequiredFields)
    ) {
      return null;
    }
    // 如果用户少传递了某些字段
    // 那么从预定义中补充这些缺少的字段
    const lackedFields = fields.filter(field => {
      return !inputFields.includes(field);
    });

    const remainObj = {};
    if (lackedFields && lackedFields.length) {
      lackedFields.forEach(lackedField => {
        remainObj[lackedField] = fieldDefaults[lackedField];
      });
    }

    const proxyHandler = {
      get: (target, prop) => {
        return target[prop];
      },
      set: (target, prop, value) => {
        // 阻止没有预先定义的字段进行赋值
        if (!fields.includes(prop)) {
          throw new Error();
          return;
        }
        // 如果用户定义了可选值，则检查赋值是否在可选值之内
        const possibleValues = fieldPossibleValues[prop];
        if (
          possibleValues &&
          possibleValues.length &&
          !possibleValues.includes(value)
        ) {
          throw new Error();
          return;
        }

        const validators = fieldValidator[prop];
        if (!validators) {
          target[prop] = value;
          return;
        }
        const validateSuccess = validators.every(validator => {
          const result = validator(value);
          if (!result) {
            throw new Error();
          }
          return result;
        });
        if (!validateSuccess) {
          return;
        }
        target[prop] = value;
      }
    };

    return new Proxy(Object.assign({}, inputObj, remainObj), proxyHandler);
  };
};
