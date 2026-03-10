document.addEventListener('DOMContentLoaded', () => {
    const chatWindow = document.getElementById('chatWindow');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const refreshBtn = document.getElementById('refreshBtn');

    let jokeStep = 0;
    let currentJoke = null;
    let quizActive = false;
    let quizStep = 0;
    let quizScore = 0;

    const jokes = [
        ["Why don't scientists trust atoms?", "Because they make up everything!"],
        ["Why did the scarecrow win an award?", "Because he was outstanding in his field!"],
        ["Why don't skeletons fight each other?", "They don't have the guts."],
        ["What do you call fake spaghetti?", "An impasta!"],
        ["Why did the bicycle fall over?", "Because it was two-tired."],
        ["Why don't programmers like nature?", "It has too many bugs."],
        ["What do you get if you cross a snowman and a vampire?", "Frostbite."],
        ["Why did the math book look sad?", "Because it had too many problems."],
        ["Why was the computer cold?", "It left its Windows open."],
        ["What did one ocean say to the other ocean?", "Nothing, they just waved."]
    ];

    const quizQuestions = [
        { q: "What is 2 + 2?\n1) 3 2) 4 3) 5 4) 6", a: 2 },
        { q: "How many sides does a triangle have?\n1) 2 2) 3 3) 4 4) 5", a: 2 }
    ];

    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', sender);
        
        const bubble = document.createElement('div');
        bubble.classList.add('message-bubble');
        bubble.innerText = content;
        
        messageDiv.appendChild(bubble);
        chatWindow.appendChild(messageDiv);
        
        chatWindow.scrollTop = chatWindow.scrollHeight;
    }

    function handleUserInput() {
        const input = userInput.value.trim();
        if (!input) return;

        addMessage(input, 'user');
        userInput.value = '';

        setTimeout(() => {
            getBotResponse(input.toLowerCase());
        }, 500);
    }

    function getBotResponse(input) {
        // Quiz logic
        if (quizActive) {
            handleQuiz(input);
            return;
        }

        // Joke follow-up logic
        if (jokeStep === 1 && (input.includes('why') || input.includes('what') || input.includes('how'))) {
            addMessage(currentJoke[1], 'bot');
            jokeStep = 0;
            return;
        }
        jokeStep = 0; // Reset if not a follow-up

        // Commands
        if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
            addMessage("Hello! How can I assist you today? (type 'exit' to end)", 'bot');
            return;
        }

        if (input.includes('how are you')) {
            addMessage("I'm doing great, thank you! How can I assist you today?", 'bot');
            return;
        }

        if (input.includes('name')) {
            addMessage("I'm a simple Web chatbot, inspired by a C version.", 'bot');
            return;
        }

        if (input.includes('age')) {
            addMessage("I'm software, so I don't have an age.", 'bot');
            return;
        }

        if (input.includes('suggest') || input.includes('bored') || input.includes('play')) {
            addMessage("Available commands:\n- quiz\n- jokes\n- calculate\n- what's the time\n- exit", 'bot');
            return;
        }

        if (input.includes('quiz')) {
            startQuiz();
            return;
        }

        if (input.includes('time')) {
            const now = new Date();
            addMessage(`The current time is: ${now.toLocaleTimeString()}`, 'bot');
            return;
        }

        if (input.includes('joke')) {
            const randomIndex = Math.floor(Math.random() * jokes.length);
            currentJoke = jokes[randomIndex];
            addMessage(currentJoke[0], 'bot');
            jokeStep = 1;
            return;
        }

        if (input.includes('calculate') || input.includes('calculator') || input.includes('math')) {
            addMessage("Enter an arithmetic expression (example: 15 + 25):", 'bot');
            return;
        }

        // Basic calculator matching
        const mathMatch = input.match(/(\d+(\.\d+)?)\s*([\+\-\*\/])\s*(\d+(\.\d+)?)/);
        if (mathMatch) {
            const n1 = parseFloat(mathMatch[1]);
            const op = mathMatch[3];
            const n2 = parseFloat(mathMatch[4]);
            let res;
            switch(op) {
                case '+': res = n1 + n2; break;
                case '-': res = n1 - n2; break;
                case '*': res = n1 * n2; break;
                case '/': res = n2 !== 0 ? n1 / n2 : 'Error (div by zero)'; break;
            }
            addMessage(`Result: ${res}`, 'bot');
            return;
        }

        if (input.includes('exit')) {
            addMessage("Goodbye! Have a great day!", 'bot');
            return;
        }

        addMessage("Sorry, I didn't understand. Try: quiz, jokes, calculate, what's the time, exit.", 'bot');
    }

    function startQuiz() {
        quizActive = true;
        quizStep = 0;
        quizScore = 0;
        addMessage("Let's start the quiz!\nAnswer with the corresponding number.", 'bot');
        setTimeout(() => {
            addMessage(quizQuestions[quizStep].q, 'bot');
        }, 500);
    }

    function handleQuiz(input) {
        const answer = parseInt(input);
        if (isNaN(answer) || answer < 1 || answer > 4) {
            addMessage("Invalid input. Please enter a number (1-4).", 'bot');
            return;
        }

        if (answer === quizQuestions[quizStep].a) {
            addMessage("Correct!", 'bot');
            quizScore++;
        } else {
            addMessage(`Incorrect. The correct answer was ${quizQuestions[quizStep].a}.`, 'bot');
        }

        quizStep++;

        if (quizStep < quizQuestions.length) {
            setTimeout(() => {
                addMessage(quizQuestions[quizStep].q, 'bot');
            }, 600);
        } else {
            quizActive = false;
            addMessage(`Your quiz is over! You scored ${quizScore} out of ${quizQuestions.length}.`, 'bot');
            addMessage("Would you like to do something else? (yes/no)", 'bot');
        }
    }

    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleUserInput();
    });

    sendBtn.addEventListener('click', handleUserInput);

    refreshBtn.addEventListener('click', () => {
        chatWindow.innerHTML = '';
        addMessage("Hello! How can I assist you today? (type 'exit' to end)", 'bot');
        jokeStep = 0;
        quizActive = false;
    });
});
