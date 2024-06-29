
const { exec } = require('child_process');
const fs = require('fs');

describe('Java Compiler Tests', () => {
    test('Java Compilation and Execution', (done) => {
        const code = `
            public class Solution {
                public static void main(String[] args) {
                    System.out.println("Hello, World!");
                }
            }
        `;
        fs.writeFileSync('Solution.java', code);
        exec('javac Solution.java && java Solution', (error, stdout, stderr) => {
            if (error) {
                done(error);
                return;
            }
            expect(stdout.trim()).toBe('Hello, World!');
            done();
        });
    });
});
