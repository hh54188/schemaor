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
    const inputFields = Object.keys(inputObj);
    // 首先应该检测 inputObj 是否包含 required 的属性
    const includeRequiredFields = requiredFields.every(requiredField => {
      return inputFields.includes(requiredField);
    });
    // 是否传递了没有事先定义的属性
    const includeNoDefinitionFields = inputFields.every(inputField => {
      return fields.includes(inputField);
    });

    if (includeRequiredFields && !includeNoDefinitionFields) {
      return null;
    }

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

export default Schema;
