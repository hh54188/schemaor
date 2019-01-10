export * from "./schema";
export * from "./types";

import { Schema } from "./schema";
import { Types } from "./types";

const Person = Schema({
  name: "",
  age: ""
});

const person = Person({
  name: "liguangyi"
});

console.log(person);
