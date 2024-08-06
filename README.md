# Hono Ollama Backend

### Project Description
- This project is a backend service built with Hono and Ollama. 
- It serves as a AI assistant that responds to user messages.
- It uses gemma2:27b model. You can browse models at: https://ollama.com/library

### Requirements
- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Ollama
- LLM (can be installed via Ollama)
- API tester like Postman

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/metalfury/hono-ollama-backend.git
    ```
2. Navigate to the project directory:
    ```bash
    cd hono-ollama-backend
    ```
3. Install the dependencies:
    ```bash
    npm install
	#or
	yarn install
    ```
4. Start the server:
    ```bash
    npm start
	#or
	yarn start
    ```

### Usage
- The server will be running at `http://localhost:3000`.
- You can send POST requests to interact with the assistant.

### Using with Frontend Project
This backend can be used with the [react-ollama-frontend](https://github.com/metalfury/react-ollama-frontend) project. Follow the instructions in the frontend repository to set up and run the frontend application.

### Contributing
1. Fork the repository.
2. Create a new branch:
    ```bash
    git checkout -b feature-branch
    ```
3. Make your changes and commit them:
    ```bash
    git commit -m "Description of changes"
    ```
4. Push to the branch:
    ```bash
    git push origin feature-branch
    ```
5. Create a pull request.

### License
This project is licensed under the MIT License.
