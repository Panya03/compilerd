const express = require('express');
const bodyParser = require('body-parser');
const { exec } = require('child_process');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/run', async (req, res) => {
    const { code, language } = req.body;
    const fileName = `temp.${getFileExtension(language)}`;

    try {
        await fs.writeFile(fileName, code);

        const compileCommand = getCompileCommand(language, fileName);
        const runCommand = getRunCommand(language, fileName);

        if (compileCommand) {
            exec(compileCommand, (compileError, stdout, stderr) => {
                if (compileError) {
                    cleanUp(fileName, language);
                    return res.status(400).json({ output: stderr });
                }
                exec(runCommand, (runError, stdout, stderr) => {
                    cleanUp(fileName, language);
                    if (runError) {
                        return res.status(400).json({ output: stderr });
                    }
                    res.json({ output: stdout });
                });
            });
        } else {
            exec(runCommand, (runError, stdout, stderr) => {
                cleanUp(fileName, language);
                if (runError) {
                    return res.status(400).json({ output: stderr });
                }
                res.json({ output: stdout });
            });
        }
    } catch (error) {
        res.status(500).json({ output: 'Server Error: Unable to write code to file' });
    }
});

function getFileExtension(language) {
    switch (language) {
        case 'python':
            return 'py';
        case 'javascript':
            return 'js';
        case 'ruby':
            return 'rb';
        case 'php':
            return 'php';
        case 'go':
            return 'go';
        default:
            return 'txt';
    }
}

function getCompileCommand(language, fileName) {
    switch (language) {
        case 'go':
            return `go build -o temp ${fileName}`;
        default:
            return '';
    }
}

function getRunCommand(language, fileName) {
    switch (language) {
        case 'python':
            return `python3 ${fileName}`;
        case 'javascript':
            return `node ${fileName}`;
        case 'ruby':
            return `ruby ${fileName}`;
        case 'php':
            return `php ${fileName}`;
        case 'go':
            return `./temp`;
        default:
            return `cat ${fileName}`;
    }
}

async function cleanUp(fileName, language) {
    try {
        await fs.unlink(fileName);
        if (language === 'go') {
            await fs.unlink('temp');
        }
    } catch (error) {
        console.error('Error cleaning up files:', error);
    }
}

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
