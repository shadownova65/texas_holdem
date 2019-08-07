# Texas Holdem - GA Project 1

## Table of Content
* [Introduction](#Introduction)
* [Development](#Development)
* [Conclusion](#Conclusion)
* [Under Developing](#Under-Developing)
## Introduction
This is a desktop web based card game with one player and 4 computer. Currently, game info will refresh everytime when page load.

### About Texas Holdem
Texax Holdem is a popular card game with calculation and strategies. Each round a player will get 2 cards in hands, and 5 shared card showing on table with displaying 3 cards, 1 card and 1 card order. There are several stages in a round. At each stage, players can choos check, raise and fold their bet in this around. In the end, depending on the cards combination of each player, the player has the highest ranking combination wins the game and takes all the bets. For more information, please check [wiki](https://en.wikipedia.org/wiki/Texas_hold_%27em) and [WSOP](http://www.wsop.com/poker-games/texas-holdem/).

### Project Background
This is the open project 1 in my General Assembley Software Immersive Bootcamp. The goal is to fully apply HTML, CSS and Javascript skills to develop a web application. After the self developing experience in hangman(link) and group developing experience in tic tac toe (link), I would like to further challenge and develop my skill with Texas Holdem.

### Preview of Final App
| Start of game | End of game |
|:-------------:|:-----------:|
| ![start game][start] | ![end game][end]

[start]: ./readme_files/startgame15fps.gif
[end]: ./readme_files/endgame15fps.gif

## Development
Below are explanations for name used:
* game: start from player with inital funds until he/she runs out fund after rounds.
* turn: (bad name initially), it means round. Start with intial bet before get hand and end with show all shared cards on table or only one active player (not fold, showhand or out of funds) in this round.
* stage: different phases in a round. often includes: blind, get hand, show flop, show turn, show river and check result. 
* gamer: refers to real person player in game.
* player: refers to either computer and gamer.

| Interface | Game Logic |
| ----------------------- | ------------------------- |
| ![interface][interface] | ![game logic][game_logic] |

[interface]: ./readme_files/handdraft-UI.png
[game_logic]: ./readme_files/handdraft-codeflow.png

### Initial Plan
The time span for the project is 4 days after experiencing Texas Holdem to get a better understanding on rules and game operation. Based on the hand draft on the interface, game flow control and winning mechanism. My initial schedule is:
* Day 1: pokerAPI, HTML framework, game flow control
* Day 2: game flow control
* Day 3: Winning mechanism
* Day 4: flexible (user experience, AI optional)

### Construct the Game Flow
The actions in game are similar in each round (turn). To complete the game flow, construct a full flow for a round then repeat it each time is adequate. Within a round, there are two main functions need to complete - generating computer player activity and stage controller.

#### computer player character and activity

#### stage control



### Consider Gamer Experience

### The Winning Algorithm

<br>


## Conclusion


<br>
