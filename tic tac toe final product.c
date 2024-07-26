#include <stdio.h>
#include <stdlib.h>
char board[9] = { ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ' };
void print_board() {
printf("\n");
printf("| %c | %c | %c |\n", board[0], board[1], board[2]);
printf("|---|---|---|\n");
printf("| %c | %c | %c |\n", board[3], board[4], board[5]);
printf("|---|---|---|\n");
printf("| %c | %c | %c |\n", board[6], board[7], board[8]);
printf("\n");
}
int check_win() {
int win_conditions[8][3] = {
{0, 1, 2}, {3, 4, 5}, {6, 7, 8},
{0, 3, 6}, {1, 4, 7}, {2, 5, 8},
{0, 4, 8}, {2, 4, 6}
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
int check_draw() {
for (int i = 0; i < 9; i++) {
if (board[i] == ' ') {
return 0;
}
}
return 1;
}
int minimax(char current_board[9], int depth, int is_maximizing) {
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
} else {
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
}
int find_best_move() {
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
void play_game() {
char current_player = 'X';
while (1) {
print_board();
int move;
if (current_player == 'X') {
printf("Player %c, enter your move (1-9): ", current_player);
scanf("%d", &move);
move--;
} else {
move = find_best_move();
}
if (board[move] == ' ') {
board[move] = current_player;
if (check_win()) {
print_board();
printf("Player %c wins! Congratulations!\n", current_player);
break;
} else if (check_draw()) {
print_board();
printf("It's a draw!\n");
break;
}
current_player = (current_player == 'X') ? 'O' : 'X';
} else {
printf("Invalid move, try again.\n");
}
}
}
int main() {
play_game();
return 0;
}
