#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include <ctype.h>

// Function Declarations
void wIntroQuestions();
void wAfterQuiz();
void tellJoke(char* );
void clean_input(char*);
int compare_keywords(const char*, const char*);
void welcomeScreen();
void introduceYourself();
void get_response(char *input, char *response);
//body of  the function
void clean_input(char *input)
{
    for(int i = 0; input[i]; i++)
    {
input[i] = to
input[strcspn(input, "")] = 0;  // Removing the newline character
}

// Compare the keywords given in input
int compare_keywords(const char *input, const char *keyword) {
    return strstr(input, keyword) != NULL;
}

void get_response(char *input, char *response) {
    clean_input(input);

    if (compare_keywords(input, "hi") || compare_keywords(input, "hello") || compare_keywords(input, "hey") ) {
strcpy(response, "Hello! How can I help you today?");
    } else if (compare_keywords(input, "how are you")) {
        strcpy(response, "I am doing very well, thank you! How can I assist you today?");
    } else if (compare_keywords(input, "what's your name" ) || compare_keywords(input, "what is your name" )) {
strcpy(response, "I'm chatbot.");
    } else if (compare_keywords(input, "how old are you")) {
        strcpy(response, "I was never born, I'm created.");
    } else if (compare_keywords(input, "suggest something") || compare_keywords(input, "im getting bored") || compare_keywords(input, " play")) {
strcpy(response, "How about a quiz? Type 'quiz' to start.");
    } else if (compare_keywords(input, "quiz") || compare_keywords(input, "ok") || compare_keywords(input, "let's play quiz")) {
        start_quiz();
        strcpy(response, ""); // Clear response after quiz
else if compare_keywords(input, "what's the weather like") || compare_keywords(input, "what is the weather like") {
        strcpy(response, "I am not connected to the internet, but you can see a weather app to keep yourself updated with weather");
    } else if compare_keywords(input, "what's the time") || compare_keywords(input, "what is the time") {
time_t t;
        time(&t);
        snprintf(response, 500, "The current time is: %s", ctime(&t));
    } else if (compare_keywords(input, "tell me a joke")) {
        tell_joke(response);
    } else {
strcat(response, "Sorry, I don't understand that. Can you please try something different?");
    }
}

// Function to tell a random joke
void tell_joke(char *response) {
    const char *jokes[] = {
        "Why don't scientists trust atoms? Because they make up everything!",
"Why did the scarecrow win an award? Because he was outstanding in his field!"
"Why don't skeletons fight each other? They don't have the guts."
"What do you call fake spaghetti? An impasta!
"Why did the bicycle fall over? Because it was two-tired.",
        "Why don't programmers like nature? It has too many bugs.",
        "What do you get if you cross a snowman and a vampire? Frostbite.",
"Why did the math book look sad? Because it had too many problems.",
        "Why was the computer cold? It left its Windows open.",
        "What did one ocean say to the other ocean? Nothing, they just waved."
    };

// Returns the size of the array
    int number_of_jokes = sizeof(jokes) / sizeof(jokes[0]);

    // Takes the current time as seed and generates a random index
    srand(time(0));
    int random_index = rand() % number_of_jokes;
    strcpy(buffer, jokes[random_index]);
}

// Function to initialize the quiz
void init_quiz() {
    printf("
Time to start the quiz!
");
    printf("Enter the number that corresponds to your answer.

");

// Set a quiz question array
    char *questions[] = {
        "What is 2 + 2?
1) 3   2) 4   3) 5   4) 6
",
        "How many sides does a triangle have?
1) 2   2) 3   3) 4   4) 5
",
"Which planet is nearest to the Sun?
1) Earth   2) Mercury   3) Mars   4) Venus
",
        "What is the capital of France?
1) Paris   2) London   3) Berlin   4) Rome
",
"What is the square root of 16?
1) 2   2) 4   3) 8   4) 16
",
        "Which is the only mammal capable of true flight?
1) Bat   2) Bird   3) Butterfly   4) Bee
"What is the biggest planet in our solar system?
1) Earth   2) Saturn   3) Jupiter   4) Mars
",
"What is the capital of Japan?
1) Tokyo   2) Beijing   3) Seoul   4) Bangkok
"How many continents are there in the world?
1) 5   2) 6   3) 7   4) 8
",
         "Who painted the Mona Lisa?
1) Michelangelo   2) Da Vinci   3) Picasso   4) Van Gogh
`.ServiceModel
"What is the biggest ocean on Earth?
1) Atlantic   2) Indian   3) Pacific   4) Arctic
",
        "What year did the Titanic sink?
1) 1909   2) 1912   3) 1915   4) 1923
",
"How many legs does a spider have?
1) 6   2) 8   3) 10   4) 12
",
        "Who wrote 'Romeo and Juliet'?
1) Shakespeare   2) Dickens   3) Austen   4) Orwell
,
"Which is the highest mountain in the world?
1) Mount Everest   2) K2   3) Kangchenjunga   4) Lhotse
",
        "What is the chemical symbol for water?
1) H2O   2) CO2   3) O2   4) H2SO4
",
"Which country is famous for its tulips?
1) Netherlands   2) France   3) Italy   4) Germany?,
"How many wings does a butterfly have?
1) 2   2) 4   3) 6   4) 8?,
"Who discovered penicillin?
1) Fleming   2) Pasteur   3) Salk   4) Curie,
"What is the largest organ in the human body?
1) Liver   2) Brain   3) Skin   4) Heart "
    };

    int num_questions = sizeof(questions) / sizeof(questions[0]);

for (int i = 0; i < num_questions; i++) {
        printf("
%s
", questions[i]);
        printf("Your answer: ");

        // Deal with unexpected input or spaces
        while (scanf("%d", &answer) != 1) {
printf("Invalid input. Please enter a number.
");
            while (getchar() !='
'); // Clear input buffer
             printf("Your answer: ");
           }

// Check, whether the answer is in valid range
        if(answer < 1 || answer > 4)
            printf("Invalid choice. Please choose a number between 1 and 4.
");
i--; // decrement i to ask the same question again
            continue;
        }

        // Display correct or incorrect feedback
        switch(i) {
case 0: if (answer == 2) {
                        printf("Correct!
");
                        score++;
} else {
                 printf("Incorrect.
");
             }
break;
            case 1: if (answer == 2) {
                        printf("Correct!
");
score++;
                    }
                    else {
printf("Incorrect.
");
                    }
                    break;
case 2: if (answer == 2) {
                        printf("Correct!
");
                        score++;
} else {
                            printf("Incorrect.
");
                        }
break;
          // Add similar cases for other questions
          default:
            break;
}

// After every 5 questions, increase the tries allowed
      if ((i + 1) % 5 == 0 && i != num_questions - 1) {
        tries++;
printf("
Tries are increased to %d for the next round of questions

", tries);
        }

        // Clear input buffer
        while (getchar() != '
');

        // End of quiz if user fails
if(score < i + 1 - tries) // check  if user scored more than negative tries than max for each quiz
    {
        printf("You failed the quiz. Better luck next time!
");
        after_quiz();  // this function criats a blank line between quizes
        break;  // if fail comes out of if loop
    }
}
    }

    printf("
Your quiz is over! You scored %d out of %d.
", score, num_questions);
    after_quiz();
}

// Function to handle post-quiz interaction
void after_quiz() {
    char input[200];
    char response[500];

    printf("Would you like to do something else? (yes/no): ");
    fgets(input, sizeof(input), stdin);
input[strcspn(input, "
")] = 0;  // removing the new line characted
    if (strcmp(input, "yes") == 0){
        printf("Great! What would you like to do next?
");
    } else{
        printf("Okay! Have a great day!
");
    }
}

// main function
int main() {
    char input[200];
char response[500];

   printf("Chatbot: Hello! How may I help you today?
");

   while (1)
   {
     printf("You: ");
     fgets(input, sizeof(input), stdin);
     get_response(input, response);

     if (strlen(response))
     {
printf("Chatbot: %s
", response);
        }
    }

    return 0;
}

