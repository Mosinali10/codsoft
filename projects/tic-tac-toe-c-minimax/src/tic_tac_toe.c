#include <stdio.h>
#include <stdlib.h>

static char board[9] = {' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '};

static void print_board(void) {
    printf("\n");
    printf("| %c | %c | %c |\n", board[0], board[1], board[2]);
    printf("|---|---|---|\n");
    printf("| %c | %c | %c |\n", board[3], board[4], board[5]);
    printf("|---|---|---|\n");
    printf("| %c | %c | %c |\n", board[6], board[7], board[8]);
    printf("\n");
}

static int check_win(void) {
    int win_conditions[8][3] = {
        {0, 1, 2},
        {3, 4, 5},
        {6, 7, 8},
        {0, 3, 6},
        {1, 4, 7},
        {2, 5, 8},
        {0, 4, 8},
        {2, 4, 6},
    };

    for (int i = 0; i < 8; i++) {
        if (board[win_conditions[i][0]] == board[win_conditions[i][1]] &&
            board[win_conditions[i][1]] == board[win_conditions[i][2]] &&
            board[win_conditions[i][0]] != ' ') {
            return 1;
        }
    }
    return 0;
}

static int check_draw(void) {
    for (int i = 0; i < 9; i++) {
        if (board[i] == ' ') {
            return 0;
        }
    }
    return 1;
}

static int minimax(char current_board[9], int depth, int is_maximizing) {
    (void)depth;

    if (check_win()) {
        return is_maximizing ? -1 : 1;
    }
    if (check_draw()) {
        return 0;
    }

    if (is_maximizing) {
        int best_score = -1000;
        for (int i = 0; i < 9; i++) {
            if (current_board[i] == ' ') {
                current_board[i] = 'O';
                int score = minimax(current_board, depth + 1, 0);
                current_board[i] = ' ';
                if (score > best_score) {
                    best_score = score;
                }
            }
        }
        return best_score;
    }

    int best_score = 1000;
    for (int i = 0; i < 9; i++) {
        if (current_board[i] == ' ') {
            current_board[i] = 'X';
            int score = minimax(current_board, depth + 1, 1);
            current_board[i] = ' ';
            if (score < best_score) {
                best_score = score;
            }
        }
    }
    return best_score;
}

static int find_best_move(void) {
    int best_move = -1;
    int best_score = -1000;

    for (int i = 0; i < 9; i++) {
        if (board[i] == ' ') {
            board[i] = 'O';
            int score = minimax(board, 0, 0);
            board[i] = ' ';
            if (score > best_score) {
                best_score = score;
                best_move = i;
            }
        }
    }
    return best_move;
}

static void clear_stdin(void) {
    int c;
    while ((c = getchar()) != '\n' && c != EOF) {
    }
}

static void play_game(void) {
    char current_player = 'X';

    while (1) {
        print_board();
        int move = -1;

        if (current_player == 'X') {
            printf("Player %c, enter your move (1-9): ", current_player);
            if (scanf("%d", &move) != 1) {
                printf("Invalid input. Please enter a number from 1 to 9.\n");
                clear_stdin();
                continue;
            }
            clear_stdin();
            move--;
        } else {
            move = find_best_move();
        }

        if (move < 0 || move >= 9) {
            printf("Invalid move. Please choose a number from 1 to 9.\n");
            continue;
        }

        if (board[move] != ' ') {
            printf("That cell is already taken. Try again.\n");
            continue;
        }

        board[move] = current_player;

        if (check_win()) {
            print_board();
            printf("Player %c wins!\n", current_player);
            break;
        }
        if (check_draw()) {
            print_board();
            printf("It's a draw!\n");
            break;
        }

        current_player = (current_player == 'X') ? 'O' : 'X';
    }
}

int main(void) {
    play_game();
    return 0;
}
