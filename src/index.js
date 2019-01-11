export * from "./schema";
export * from "./types";

import { Schema } from "./schema";
import { Types } from "./types";

const Person = Schema({
  name: "",
  age: "",
  job: Schema({
    company: "",
    title: "default title",
    salary: Schema({
      month: 100,
      year: 1000
    })
  })
});

const person = Person({
  name: "liguangyi",
  job: {
    company: "baidu",
    salary: {
      month: 1
    }
  }
});

console.log(person);

console.log(JSON.stringify(person, null, 2));
