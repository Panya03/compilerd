const testCase = {
  name: "java : hello world",
  reqObject: {
    language: "java",
    code: `public class Main {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }`,
    input: ""
  },
  expectedResponse: {
    val: "Hello, World!",
    status: 200,
    error: null
  }
};

module.exports = testCase;
