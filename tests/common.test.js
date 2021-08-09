import { expect, it } from '@jest/globals';
import parser from '../src/index';

describe('Single quote String literal', () => {
  it('per se', () => {
        expect(parser("'Hello \"World\"!'")(null)).toEqual('Hello "World"!');
  })

  it('as key', () => {
      expect(parser("{'a': false}")(null)).toEqual({'a': false});
  })
})

describe('Other tests', () => {
  it('handle example code correctly', () => {
    const query = '{"names": .[] | .name}'
    const input = [
      {"name": "Mary", "age": 22},
      {"name": "Rupert", "age": 29},
      {"name": "Jane", "age": 11},
      {"name": "John", "age": 42}
    ]
    const output = [
      {
        "names": "Mary"
      },
      {
        "names": "Rupert"
      },
      {
        "names": "Jane"
      },
      {
        "names": "John"
      },
    ]
    expect(parser(query)(input)).toEqual(output);
  })

  it('handle example code correctly 2', () => {
    const query = '{"names": [.[] | .name]}'
    const input = [
      {"name": "Mary", "age": 22},
      {"name": "Rupert", "age": 29},
      {"name": "Jane", "age": 11},
      {"name": "John", "age": 42}
    ]
    const output = {
      "names": [
        "Mary",
        "Rupert",
        "Jane",
        "John"
      ]
    }

    expect(parser(query)(input)).toEqual(output);
  })
})


describe('Error messages', () => {
  const tests = [
    ['. | foo', 'function foo/0 is not defined'],
    ['. | bar', 'function bar/0 is not defined'],
    ['. | bar(4)', 'function bar/1 is not defined'],
    ['. | baz(4)', 'function baz/1 is not defined']
  ]

  tests.forEach(([query, error]) =>
    it(`Error '${error}' for '${query}'`, () => {
      expect(() => parser(query)(input)).toThrow(error);
    })
  )

  const q = ".data | select(.type == \"expresss\")";
  const e = 'Cannot index array with';
  const p = {
    "data": [
      {"type":"express","b":"b"}, {"a":"a","b":"b"}
    ]
  };
  it(`Error '${e}' for '${q}'`, () => {
    expect(() => parser(q)(p)).toThrow(e);
  })
})