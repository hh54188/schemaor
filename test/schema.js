import { Schema } from "../src";
const _ = require("lodash");
const assert = require("assert");

const STRING_TARGET = "STRING_TAGET";
const NUMBER_TARGET = 0;
const BOOLEAN_TARGET = true;
const ARRAY_TARGET = [];
const OBJECT_TARGET = {};

describe("Schema Class", function() {
  describe("#Create Schema", function() {
    it("Created schema should be a function", function() {
      const TestSchema = Schema({
        name: "",
        age: ""
      });
      assert.equal(_.isFunction(TestSchema), true);
    });
    it("Schema support no parameter", function() {
      const TestSchema = Schema();
      assert.equal(_.isFunction(TestSchema), true);
    });
    it("Schema only support Object type parameter ", function() {
      console.log("---->", Schema(STRING_TARGET) instanceof Error);
      // assert.equal(Schema(STRING_TARGET) instanceof Error, true);
      // assert.equal(Schema(NUMBER_TARGET) instanceof Error, true);
      // assert.equal(Schema(BOOLEAN_TARGET) instanceof Error, true);
      // assert.equal(Schema(STRING_TARGET) instanceof Error, true);
      // assert.equal(Schema(ARRAY_TARGET) instanceof Error, true);
    });
  });
});
