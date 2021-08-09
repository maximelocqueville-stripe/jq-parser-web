import tests from './data';
import jq from '../src/index';
const jq_web = require('jq-web');
const node_jq = require('node-jq');

const {tests_jq_web, tests_node_jq} = tests;

const test_with_node_jq = ([feature, queries, inputs]) => {
  describe(feature, () =>
    queries.forEach((query) =>
      describe(`Query: ${query}`, () => {
        inputs.forEach((input) => {
          it(`Input: ${JSON.stringify(input)}`, async () => {
            const parser_result = jq(query)(input)
            const jq_result = await node_jq.run(query, input, {input: 'json', output: 'json'})
           
            expect(parser_result).toEqual(jq_result);
          })
        })
      })
    )
  )
}

const test_with_jq_web = ([feature, queries, inputs]) => {
  describe(feature, () =>
    queries.forEach((query) =>
      describe(`Query: ${query}`, () => {
        inputs.forEach((input) => {
          it(`Input: ${JSON.stringify(input)}`, () => {
            const parser_result = jq(query)(input)
            const jq_result = jq_web.json(input, query)
            
            expect(parser_result).toEqual(jq_result);
          })
        })
      })
    )
  )
}

tests_jq_web.forEach(test_with_jq_web);
tests_node_jq.forEach(test_with_node_jq);