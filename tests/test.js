const axios = require('axios');
const { describe, expect, it } = require('@jest/globals');

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/';

const javaTest = require('./java.test.js'); // Import Java test case
const rubyTest = require('./ruby.test.rb'); // Import Ruby test case (assuming you allow require for ruby files)
const goTestCode = require('./go_test.go'); // Import Go test code (requires additional setup)
const pythonTest = require('./python.test.js'); // Import Python test case

const testCases = [
  javaTest, // Include the imported Java test case
  rubyTest, // Include the imported Ruby test case
  {
    name: "go : hello world",
    reqObject: { // Alternatively, define Go test case directly
      language: "go",
      code: goTestCode.default, // Assuming default export in go_test.go
      input: ""
    },
    expectedResponse: {
      val: "Hello, World!",
      status: 200,
      error: null
    }
  },
  pythonTest,

  // Added test cases for C++, PHP

  {
    name: "cpp : hello world",
    reqObject: {
      language: "cpp",
      code: "#include <iostream>\nint main() { std::cout << \"Hello, World!\"; return 0; }",
      input: ""
    },
    expectedResponse: {
      val: "Hello, World!",
      status: 200,
      error: null
    }
  },
  {
    name: "php : hello world",
    reqObject: {
      language: "php",
      code: "<?php echo 'Hello, World!'; ?>",
      input: ""
    },
    expectedResponse: {
      val: "Hello, World!",
      status: 200,
      error: null
    }
  },

  // Add more test cases for other languages (follow the same pattern)
  // ...
];

describe('Tests', () => {
  for (const testCase of testCases) {
    it(testCase.name, async () => {
      try {
        console.log(`Sending request for: ${testCase.name}`);
        const response = await axios.post(ENDPOINT, testCase.reqObject);
        console.log(`Response received for: ${testCase.name}`, response.data);

        if (typeof response.data.output === 'object') {
          expect(response.data.output.score).toBeDefined();
          expect(response.data.output.rationale.positives).toBeDefined();
          expect(response.data.output.rationale.negatives).toBeDefined();
          expect(response.data.output.points).toBeDefined();
        } else {
          expect(response.data).toHaveProperty('output', testCase.expectedResponse.val);
        }
        expect(response).toHaveProperty('status', testCase.expectedResponse.status);
        expect(response).toHaveProperty('data.error', testCase.expectedResponse.error);
      } catch (error) {
        console.error(`Error for test case: ${testCase.name}`, error.message);
        throw error;
      }
    }, 15000); // Adjust timeout if needed for longer executions
  }
});
