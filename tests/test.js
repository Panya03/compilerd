const axios = require('axios');
const { describe, expect, it } = require('@jest/globals');

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/';

const testCases = [
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
        name: "nodejs : hello world",
        reqObject: {
            language: "nodejs",
            code: "console.log('Hello, World!');",
            input: ""
        },
        expectedResponse: {
            val: "Hello, World!",
            status: 200,
            error: null
        }
    },
    {
        name: "python : hello world",
        reqObject: {
            language: "python",
            code: "print('Hello, World!')",
            input: ""
        },
        expectedResponse: {
            val: "Hello, World!",
            status: 200,
            error: null
        }
    },
    {
        name: "ruby : hello world",
        reqObject: {
            language: "ruby",
            code: "puts 'Hello, World!'",
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
    {
        name: "go : hello world",
        reqObject: {
            language: "go",
            code: "package main\nimport \"fmt\"\nfunc main() { fmt.Println(\"Hello, World!\") }",
            input: ""
        },
        expectedResponse: {
            val: "Hello, World!",
            status: 200,
            error: null
        }
    }
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
                    expect(response).toHaveProperty('data.output', testCase.expectedResponse.val);
                }
                expect(response).toHaveProperty('status', testCase.expectedResponse.status);
                expect(response).toHaveProperty('data.error', testCase.expectedResponse.error);
            } catch (error) {
                console.error(`Error for test case: ${testCase.name}`, error.message);
                throw error;
            }
        }, 15000);
    }
});
