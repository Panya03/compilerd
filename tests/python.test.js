test('Python Hello World Test', async () => {
    const code = `
        print("Hello, World!")
    `;
    const expectedOutput = 'Hello, World!\n'; 
    const response = await axios.post(ENDPOINT, { code });

    expect(response.status).toBe(200);
    expect(response.data.output).toBe(expectedOutput);
});
