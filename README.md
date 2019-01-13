## Warning:

**DO NOT USE THIS IN PRODUCTION, NOT FULLY TEST YET**

## Install 

```javascript
npm install schemaor
```
or
```javascript
yarn add schemaor
```

## Usage 

- Basic: Define schema without constraint:

```javascript
import {Schema} from 'schemaor'
const Person = Schema({
  name: '',
  age: ''
})

// Instantiate:
const person = Person({
  name: 'Lee',
  age: 22
})

```

- Field data type constraint:

```javascript
import {Schema, Types} from 'schemaor'
const Person = Schema({
  name: Types().string(),
  age: Types().number()
})
```

- Other kind of constraint: `default()`, `required()`, `valueof()`

```javascript
import {Schema, Types} from 'schemaor'
const Person = Schema({
  name: Types().string().default('').required(),
  age: Types().number().default(22).required(),
  title: Types().valueof('coder', 'programmer')
})
```

- Nested schema

```javascript
import {Schema, Types} from 'schemaor'
const Person = Schema({
  job: Schema({
    title: '',
    company: ''
  })
})
```

