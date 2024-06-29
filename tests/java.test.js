
{
    name: 'java : hello world',
    reqObject: {
        code: `
            public class HelloWorld {
                public static void main(String[] args) {
                    System.out.println("Hello, World!");
                }
            }
        `,
        language: 'java',
        input: ''
    },
    expectedResponse: {
        status: 200,
        error: null,
        val: 'Hello, World!\n' 
    }
}
