#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include <ctype.h>
#include <math.h>

void get_response(char *input, char *response);
void start_quiz();
void after_quiz();
void tell_joke(char *response);
void clean_input(char *input);
int compare_keywords(const char *input, const char *keyword);
double calculate(char *input);
void continue_joke(char *response);

int joke_step = 0;
const char *current_joke_question = NULL;
const char *current_joke_answer = NULL;

void clean_input(char *input) {
    for (int i = 0; input[i]; i++) {
        input[i] = tolower(input[i]);
    }
    input[strcspn(input, "\n")] = 0;
}

int compare_keywords(const char *input, const char *keyword) {
    return strstr(input, keyword) != NULL;
}

void get_response(char *input, char *response) {
    clean_input(input);
    if (compare_keywords(input, "hi") || compare_keywords(input, "hello") || compare_keywords(input, "hey")) {
        strcpy(response, "Hello! How can I assist you today?,type exit to end conversation");
    } else if (compare_keywords(input, "how are you")) {
        strcpy(response, "I'm doing great, thank you! How can I assist you today?");
    } else if (compare_keywords(input, "what's your name") || compare_keywords(input, "what is your name")) {
        strcpy(response, "I'm bot, chatbot.");
    } else if (compare_keywords(input, "how old are you")) {
        strcpy(response, "I was never born, I'm created.");
    } else if (compare_keywords(input, "suggest something") || compare_keywords(input, "i'm getting bored") || compare_keywords(input, "let's play")) {
        strcpy(response, "I can help with the following:\n- Start a quiz (type 'quiz')\n- Tell a joke (type 'jokes')\n- Perform basic math calculations (type 'calculate' or 'math')\n- Answer general questions\nHow can I assist you today?");
    } else if (compare_keywords(input, "quiz") || compare_keywords(input, "ok") || compare_keywords(input, "let's play quiz")) {
        strcpy(response, "Starting the quiz...");
    } else if (compare_keywords(input, "what's the weather like") || compare_keywords(input, "what is the weather like")) {
        strcpy(response, "I'm not connected to the internet, but you can check a weather app for the latest updates.");
    } else if (compare_keywords(input, "what's the time") || compare_keywords(input, "what is the time")) {
        time_t t;
        time(&t);
        snprintf(response, 500, "The current time is: %s", ctime(&t));
    } else if (compare_keywords(input, "tell me a joke") || compare_keywords(input, "jokes")) {
        tell_joke(response);
    } else if ((compare_keywords(input, "why") || compare_keywords(input, "what")) && joke_step == 1) {
        continue_joke(response);
    } else if (compare_keywords(input, "calculate") || compare_keywords(input, "calculator") || compare_keywords(input, "math")) {
        strcpy(response, "Sure! Please enter an arithmetic expression to calculate.");
    } else if (compare_keywords(input, "exit")) {
        strcpy(response, "Goodbye! Have a great day!");
    } else {
        strcpy(response, "Sorry, I don't understand that. Here's what I can do:\n- Start a quiz (type 'quiz')\n- Tell a joke (type 'jokes')\n- Perform basic math calculations (type 'calculate' or 'math')\n- Answer general questions\nHow can I assist you today?");
    }
}

void tell_joke(char *response) {
    const char *jokes[][2] = {
        {"Why don't scientists trust atoms?", "Because they make up everything!"},
        {"Why did the scarecrow win an award?", "Because he was outstanding in his field!"},
        {"Why don't skeletons fight each other?", "They don't have the guts."},
        {"What do you call fake spaghetti?", "An impasta!"},
        {"Why did the bicycle fall over?", "Because it was two-tired."},
        {"Why don't programmers like nature?", "It has too many bugs."},
        {"What do you get if you cross a snowman and a vampire?", "Frostbite."},
        {"Why did the math book look sad?", "Because it had too many problems."},
        {"Why was the computer cold?", "It left its Windows open."},
        {"What did one ocean say to the other ocean?", "Nothing, they just waved."}
    };
    int num_jokes = sizeof(jokes) / sizeof(jokes[0]);
    srand(time(NULL));
    int random_index = rand() % num_jokes;
    current_joke_question = jokes[random_index][0];
    current_joke_answer = jokes[random_index][1];
    joke_step = 1;
    strcpy(response, current_joke_question);
}

void continue_joke(char *response) {
    strcpy(response, current_joke_answer);
    joke_step = 0;
}

double calculate(char *input) {
    char operator;
    double num1, num2;
    sscanf(input, "%lf %c %lf", &num1, &operator, &num2);
    if (num1 > 1e7 || num2 > 1e7) {
        return NAN;
    }
    switch (operator) {
        case '+':
            return num1 + num2;
        case '-':
            return num1 - num2;
        case '*':
            return num1 * num2;
        case '/':
            if (num2 != 0)
                return num1 / num2;
            else
                return NAN;
        default:
            return NAN;
    }
}

void start_quiz() {
    int score = 0;
    int answer, tries = 1;
    printf("\nLet's start the quiz!\n");
    printf("Answer each question with the corresponding number.\n\n");
    char *questions[] = {
        "What is 2 + 2?\n1) 3 2) 4 3) 5 4) 6\n",
        "How many sides does a triangle have?\n1) 2 2) 3 3) 4 4) 5\n"
    };
    int num_questions = sizeof(questions) / sizeof(questions[0]);
    for (int i = 0; i < num_questions; i++) {
        printf("\n%s\n", questions[i]);
        printf("Your answer: ");
        while (scanf("%d", &answer) != 1) {
            printf("Invalid input. Please enter a number.\n");
            while (getchar() != '\n');
            printf("Your answer: ");
        }
        if (answer < 1 || answer > 4) {
            printf("Invalid choice. Please choose a number between 1 and 4.\n");
            i--;
            continue;
        }
        switch (i) {
            case 0:
                if (answer == 2) {
                    printf("Correct!\n");
                    score++;
                } else {
                    printf("Incorrect.\n");
                }
                break;
            case 1:
                if (answer == 2) {
                    printf("Correct!\n");
                    score++;
                } else {
                    printf("Incorrect.\n");
                }
                break;
            default:
                break;
        }
        if ((i + 1) % 5 == 0 && i != num_questions - 1) {
            tries++;
            printf("\nIncreasing tries to %d for the next set of questions.\n\n", tries);
        }
        while (getchar() != '\n');
        if (score < i + 1 - tries) {
            printf("You failed the quiz. Better luck next time!\n");
            after_quiz();
            break;
        }
    }
    printf("\nYour quiz is over! You scored %d out of %d.\n", score, num_questions);
    after_quiz();
}

void after_quiz() {
    char input[200];
    printf("Would you like to do something else? (yes/no): ");
    fgets(input, sizeof(input), stdin);
    input[strcspn(input, "\n")] = 0;
    if (strcmp(input, "yes") == 0) {
        printf("Great! What would you like to do next?\n");
    } else {
        printf("Okay! Have a great day!\n");
        exit(0);
    }
}

int main() {
    char input[200];
    char response[500];
    printf("Hello! How can I assist you today?\n");
    while (1) {
        printf("You: ");
        fgets(input, sizeof(input), stdin);
        get_response(input, response);
        if (compare_keywords(input, "quiz")) {
            start_quiz();
            continue;
        } else if (compare_keywords(input, "jokes")) {
            tell_joke(response);
            printf("%s\n", response);
            continue;
        } else if ((compare_keywords(input, "why") || compare_keywords(input, "what")) && joke_step == 1) {
            continue_joke(response);
            printf("%s\n", response);
            continue;
        } else if (compare_keywords(input, "exit")) {
            printf("%s\n", response);
            break;
        }
        printf("%s\n", response);
    }
    return 0;
}
