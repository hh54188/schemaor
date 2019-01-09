import Schema from "./schema";
import Types from "./types";

const STRING_TARGET = "STRING_TARGET";
const NUMBER_TARGET = 3;
const BOOLEAN_TARGET = false;
const OBJECT_TARGET = {};
const ARRAY_TARGET = [
  STRING_TARGET,
  NUMBER_TARGET,
  BOOLEAN_TARGET,
  OBJECT_TARGET
];

const TestSchema = Schema({
  test: Types().string()
});

const testObj = TestSchema({
  test: "test"
});

// console.log({
//   test: "test"
// });

console.log(testObj, JSON.stringify(testObj));

console.log(
  Types()
    .string()
    .validators[0](STRING_TARGET) === true
);
console.log(
  Types()
    .number()
    .validators[0](NUMBER_TARGET) === true
);
console.log(
  Types()
    .boolean()
    .validators[0](BOOLEAN_TARGET) === true
);
console.log(
  Types()
    .array()
    .validators[0](ARRAY_TARGET) === true
);
console.log(
  Types()
    .object()
    .validators[0](OBJECT_TARGET) === true
);
console.log(Types().default(STRING_TARGET).defaultValue === STRING_TARGET);
console.log(Types().required().isRequired === true);
console.log(
  ARRAY_TARGET.every(target =>
    Types()
      .valueOf(ARRAY_TARGET)
      .possibleValues.includes(target)
  )
);
