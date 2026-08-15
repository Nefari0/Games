# Checkers

Browser-based checkers game with a custom heuristic AI opponent.

This project started several years ago as an experiment to learn WebSockets and real-time multiplayer communication. The original version allowed anyone connected to the game to see and participate in the same game.

I've since revisited the project and added a single-player AI opponent, with the goal of making a simple checkers game that anyone can open in a browser and play without an account or installation.

Play

games.madmodels3d.com

The current version is primarily focused on single-player gameplay. Multiplayer functionality is being reworked around private games and invitations.

## Features
- Single-player checkers against a custom AI
- Standard 8×8 checkers board
- Regular pieces and kings
- Captures and chained captures
- Mandatory attack highlighting
- Automatic king promotion
- Browser-based gameplay
- No installation required
- Responsive interface

## The AI

The AI does not use machine learning. It uses a rule-based heuristic evaluation system to examine available moves and select what it considers the best option.

The basic process is:

- Generate possible moves for the AI's pieces.
- Examine the board surrounding each possible move.
- Identify captures, threats, open positions, and other useful characteristics.
- Assign scores to potential moves.
- Select the highest-scoring legal move.
- Execute the move using the same game mechanics used by the human player.

I'm currently experimenting with lookahead so the AI can consider the consequences of a move rather than simply choosing the most attractive immediate move.

And, honestly, after playing against it for a few days, I'm still trying to determine whether the AI is actually getting smarter or whether I'm just really bad at checkers.

## Technical Details

This project was originally built with:

- JavaScript
- React
- Redux
- CSS / styled-components
- WebSockets
- Create React App

The game represents the board using an 8×8 matrix, while pieces are maintained as an array of objects containing their position, player, king status, and unique ID.

One of the goals of the AI implementation is to reuse the existing game mechanics rather than create a second rules engine. The same logic that validates human moves is used when the AI executes its moves.

## Why I Built It

This project has gone through several stages.

Originally:
I wanted to learn how WebSockets worked by building something where two browsers could communicate in real time.

Later:
I used the project to experiment with React, Redux, game state management, and browser persistence.

Now:
I'm using it as an opportunity to experiment with game AI, heuristic scoring, and eventually move lookahead.

It's also just fun to build something I can actually play.

## Future Plans
- Improve the AI evaluation system
- Add deeper move lookahead
- Improve AI difficulty
- Add private multiplayer games
- Allow players to invite friends through game links
- Continue improving the UI and mobile experience
- Personalized styling

Copyright (c) 2026 Chris A. deMontigny
