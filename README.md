# OpenTrivia Quiz App

This is an Angular quiz application using the Open Trivia Database API.

## Table of Contents

- [OpenTrivia Quiz App](#opentrivia-quiz-app)
  - [Introduction](#introduction)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development Server](#development-server)

## Introduction

OpenTrivia is a fun and engaging quiz application designed to test your knowledge on various topics. Leveraging the extensive database of the [Open Trivia Database API](https://opentdb.com/), this app provides a wide range of questions across different categories and difficulty levels.

### Game Features
- **Question Variety**: Choose from multiple categories including General Knowledge, Science, Sports, and more.
- **Difficulty Levels**: Select the difficulty of the quiz – Mixed, Easy, Medium, or Hard.
- **Quiz Modes**: Play short (10 questions), medium (25 questions), or long (50 questions) quizzes.
- **Unique Questions**: Ensures no repeated questions within a session using session tokens.

### How to Play
1. **Start a New Game**:
   - Choose the number of questions.
   - Select the difficulty level.
   - Pick a category or opt for a mixed quiz.
   
2. **Answer Questions**:
   - Each question is multiple-choice with four possible answers.
   - You have 15 seconds to answer each question.
   - If you select an answer, it will be highlighted. The correct answer will be shown in green, and if you chose incorrectly, your selection will be highlighted in red.
   
3. **Scoring**:
   - Your score is displayed as you progress through the quiz.
   - At the end of the quiz, your final score and percentage of correct answers will be shown.
   - Based on your performance, you will be awarded a title:
     - **0-25%**: AFK
     - **26-50%**: Rookie
     - **51-75%**: A for Effort
     - **76-90%**: Scholar
     - **91-99%**: Touch Grass
     - **100%**: Possible Cheater
    
### Demo

![opentriviademo-gif](https://github.com/user-attachments/assets/a7066802-a9f3-416d-ab38-86c93f9a2b25)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- [Latest version of Node.js](https://nodejs.org/en/download/package-manager)
- [Latest version of Angular CLI](https://www.npmjs.com/package/@angular/cli)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Louis122333/OpenTrivia.git
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```
## Development Server
   Run ng serve for a development server. Navigate to http://localhost:4200/. 
   The application will automatically reload if you change any of the source files.
   ```bash
   ng serve
   ```
   
   


   
