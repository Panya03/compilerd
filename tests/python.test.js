

const { exec } = require('child_process');
const fs = require('fs');

describe('Python Compiler Tests', () => {
    test('Python Compilation and Execution', (done) => {
        const code = `
            print("Hello, World!")
        `;
        fs.writeFileSync('solution.py', code);
        exec('python solution.py', (error, stdout, stderr) => {
            if (error) {
                done(error);
                return;
            }
            expect(stdout.trim()).toBe('Hello, World!');
            done();
        });
    });
});
