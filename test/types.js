import { Types } from "../src";
const assert = require("assert");

const STRING_TARGET = "STRING_TAGET";
const NUMBER_TARGET = 0;
const BOOLEAN_TARGET = true;
const ARRAY_TARGET = [];
const OBJECT_TARGET = {};

describe("Types Class", function() {
  describe("#string()", function() {
    it("should only success when the value is string type", function() {
      const [validator] = Types().string().validators;
      assert.equal(validator(STRING_TARGET), true);
      assert.equal(validator(NUMBER_TARGET), false);
      assert.equal(validator(BOOLEAN_TARGET), false);
      assert.equal(validator(ARRAY_TARGET), false);
      assert.equal(validator(OBJECT_TARGET), false);
    });
  });
  describe("#number()", function() {
    it("should only success when the value is number type", function() {
      const [validator] = Types().number().validators;
      assert.equal(validator(STRING_TARGET), false);
      assert.equal(validator(NUMBER_TARGET), true);
      assert.equal(validator(BOOLEAN_TARGET), false);
      assert.equal(validator(ARRAY_TARGET), false);
      assert.equal(validator(OBJECT_TARGET), false);
    });
  });
  describe("#array()", function() {
    it("should only success when the value is array type", function() {
      const [validator] = Types().array().validators;
      assert.equal(validator(STRING_TARGET), false);
      assert.equal(validator(NUMBER_TARGET), false);
      assert.equal(validator(BOOLEAN_TARGET), false);
      assert.equal(validator(ARRAY_TARGET), true);
      assert.equal(validator(OBJECT_TARGET), false);
    });
  });
  describe("#boolean()", function() {
    it("should only success when the value is boolean type", function() {
      const [validator] = Types().boolean().validators;
      assert.equal(validator(STRING_TARGET), false);
      assert.equal(validator(NUMBER_TARGET), false);
      assert.equal(validator(BOOLEAN_TARGET), true);
      assert.equal(validator(ARRAY_TARGET), false);
      assert.equal(validator(OBJECT_TARGET), false);
    });
  });
  describe("#object()", function() {
    it("should only success when the value is object type", function() {
      const [validator] = Types().object().validators;
      assert.equal(validator(STRING_TARGET), false);
      assert.equal(validator(NUMBER_TARGET), false);
      assert.equal(validator(BOOLEAN_TARGET), false);
      assert.equal(validator(ARRAY_TARGET), false);
      assert.equal(validator(OBJECT_TARGET), true);
    });
  });
  describe("#required()", function() {
    it("'isRequired' property should equal true when 'required()' called", function() {
      assert.equal(Types().isRequired, false);
      assert.equal(Types().required().isRequired, true);
    });
  });
  describe("#default()", function() {
    it("'defaultValue' property should equal to what passed in when 'default()' called", function() {
      assert.equal(Types().default(STRING_TARGET).defaultValue, STRING_TARGET);
      assert.equal(Types().default(NUMBER_TARGET).defaultValue, NUMBER_TARGET);
      assert.equal(
        Types().default(BOOLEAN_TARGET).defaultValue,
        BOOLEAN_TARGET
      );
      assert.equal(Types().default(ARRAY_TARGET).defaultValue, ARRAY_TARGET);
      assert.equal(Types().default(OBJECT_TARGET).defaultValue, OBJECT_TARGET);
      assert.equal(Types().default(null).defaultValue, null);
      assert.equal(Types().default(void 0).defaultValue, void 0);
    });
  });
  describe("#valueOf()", function() {
    it("'possibleValues' property should equal to what passed in when 'valueOf()' called", function() {
      assert.equal(
        JSON.stringify(Types().valueOf(1, 2, 3, 4).possibleValues),
        "[1,2,3,4]"
      );
      assert.equal(
        JSON.stringify(Types().valueOf([1, 2, 3, 4]).possibleValues),
        "[1,2,3,4]"
      );
      assert.equal(
        JSON.stringify(Types().valueOf([1, [2, 3], 4]).possibleValues),
        "[1,2,3,4]"
      );
    });
  });
});
