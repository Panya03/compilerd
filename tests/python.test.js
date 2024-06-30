const testCase = {
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
};

module.exports = testCase;
