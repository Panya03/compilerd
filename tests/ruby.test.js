{
    name: 'ruby : hello world',
    reqObject: {
        code: `
            puts 'Hello, World!'
        `,
        language: 'ruby',
        input: ''
    },
    expectedResponse: {
        status: 200,
        error: null,
        val: 'Hello, World!\n' 
    }
}
