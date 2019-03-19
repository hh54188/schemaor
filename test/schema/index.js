import { Schema } from "../../src";
import { Types } from "../../src";
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
        name: ""
      });
      assert.equal(_.isFunction(TestSchema), true);
    });
    it("Schema support no parameter", function() {
      const TestSchema = Schema();
      assert.equal(_.isFunction(TestSchema), true);
    });
    it("Schema only support Object type parameter ", function() {
      assert.throws(() => Schema(STRING_TARGET), Error);
      assert.throws(() => Schema(NUMBER_TARGET), Error);
      assert.throws(() => Schema(BOOLEAN_TARGET), Error);
      assert.throws(() => Schema(ARRAY_TARGET), Error);
      assert.doesNotThrow(() => Schema(OBJECT_TARGET), Error);
    });
  });
  describe("#Type Restriction", function() {
    it("String Type Restriction", function() {
      const TestSchema = Schema({
        name: Types().string()
      });
      assert.throws(
        () =>
          TestSchema({
            name: NUMBER_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: BOOLEAN_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: OBJECT_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: ARRAY_TARGET
          }),
        Error
      );
      assert.doesNotThrow(
        () =>
          TestSchema({
            name: STRING_TARGET
          }),
        Error
      );
    });
    it("Number Type Restriction", function() {
      const TestSchema = Schema({
        name: Types().number()
      });
      assert.doesNotThrow(
        () =>
          TestSchema({
            name: NUMBER_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: BOOLEAN_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: OBJECT_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: ARRAY_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: STRING_TARGET
          }),
        Error
      );
    });
    it("Boolean Type Restriction", function() {
      const TestSchema = Schema({
        name: Types().boolean()
      });
      assert.throws(
        () =>
          TestSchema({
            name: NUMBER_TARGET
          }),
        Error
      );
      assert.doesNotThrow(
        () =>
          TestSchema({
            name: BOOLEAN_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: OBJECT_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: ARRAY_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: STRING_TARGET
          }),
        Error
      );
    });
    it("Array Type Restriction", function() {
      const TestSchema = Schema({
        name: Types().array()
      });
      assert.throws(
        () =>
          TestSchema({
            name: NUMBER_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: BOOLEAN_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: OBJECT_TARGET
          }),
        Error
      );
      assert.doesNotThrow(
        () =>
          TestSchema({
            name: ARRAY_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: STRING_TARGET
          }),
        Error
      );
    });
    it("Object Type Restriction", function() {
      const TestSchema = Schema({
        name: Types().object()
      });
      assert.throws(
        () =>
          TestSchema({
            name: NUMBER_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: BOOLEAN_TARGET
          }),
        Error
      );
      assert.doesNotThrow(
        () =>
          TestSchema({
            name: OBJECT_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: ARRAY_TARGET
          }),
        Error
      );
      assert.throws(
        () =>
          TestSchema({
            name: STRING_TARGET
          }),
        Error
      );
    });
  });
});
