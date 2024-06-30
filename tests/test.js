const axios = require('axios');
const { describe, expect, it } = require('@jest/globals');

const ENDPOINT = process.env.ENDPOINT || 'http://localhost:3000/api/execute/';

const testCases = [
    // Ruby Tests
    {
        name: "ruby : hello world",
        reqObject: {
            language: "ruby",
            code: "puts 'Hello, World!'",
            input: ""
        },
        expectedResponse: {
            val: "Hello, World!\n",
            status: 200,
            error: null
        }
    },
    {
        name: "ruby : print stdin",
        reqObject: {
            language: "ruby",
            code: "input = gets\nputs input",
            input: "Hello, Ruby!"
        },
        expectedResponse: {
            val: "Hello, Ruby!\n",
            status: 200,
            error: null
        }
    },

    // PHP Tests
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
        name: "php : print stdin",
        reqObject: {
            language: "php",
            code: "<?php echo fgets(STDIN); ?>",
            input: "Hello, PHP!"
        },
        expectedResponse: {
            val: "Hello, PHP!",
            status: 200,
            error: null
        }
    },

    // Go Tests
    {
        name: "go : hello world",
        reqObject: {
            language: "go",
            code: `package main
import "fmt"
func main() {
    fmt.Println("Hello, World!")
}`,
            input: ""
        },
        expectedResponse: {
            val: "Hello, World!\n",
            status: 200,
            error: null
        }
    },
    {
        name: "go : print stdin",
        reqObject: {
            language: "go",
            code: `package main
import (
    "bufio"
    "fmt"
    "os"
)
func main() {
    reader := bufio.NewReader(os.Stdin)
    input, _ := reader.ReadString('\n')
    fmt.Print(input)
}`,
            input: "Hello, Go!"
        },
        expectedResponse: {
            val: "Hello, Go!\n",
            status: 200,
            error: null
        }
    }
];

describe('Tests', () => {
    for (const testCase of testCases) {
        it(testCase.name, async () => {
            try {
                const response = await axios.post(ENDPOINT, testCase.reqObject);
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
