
const { exec } = require('child_process');
const fs = require('fs');

describe('Ruby Compiler Tests', () => {
    test('Ruby Compilation and Execution', (done) => {
        const code = `
            puts "Hello, World!"
        `;
        fs.writeFileSync('solution.rb', code);
        exec('ruby solution.rb', (error, stdout, stderr) => {
            if (error) {
                done(error);
                return;
            }
            expect(stdout.trim()).toBe('Hello, World!');
            done();
        });
    });
});
