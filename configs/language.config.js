const LANGUAGES_CONFIG = {
    python: {
        filename: 'script.py',
        compile: '', // Add compile command if needed
        run: 'python script.py', // Adjust as per your environment
        memory: 512, // Memory limit in MB
        timeout: 10, // Execution timeout in seconds
        // model: 'your-openai-model-id', // Placeholder for OpenAI model ID for Python
    },
    ruby: {
        filename: 'script.rb',
        compile: '', // Add compile command if needed
        run: 'ruby script.rb', // Adjust as per your environment
        memory: 512, // Memory limit in MB
        timeout: 10, // Execution timeout in seconds
        // model: 'your-openai-model-id', // Placeholder for OpenAI model ID for Ruby
    },
    go: {
        filename: 'main.go',
        compile: 'go build main.go', // Example compile command for Go
        run: './main', // Adjust as per your environment
        memory: 512, // Memory limit in MB
        timeout: 10, // Execution timeout in seconds
        // model: 'your-openai-model-id', // Placeholder for OpenAI model ID for Go
    },
};

module.exports = { LANGUAGES_CONFIG };
