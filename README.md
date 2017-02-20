# Flashcard-Generator
NodeJS -OOP based backend for a basic flashcard application.

The backend will essentially constitute an API that allows users to create two types of flashcards.

Basic flashcards, which have a front ("Who was the first president of the United States?"), and a back ("George Washington").

Cloze-Deleted flashcards, which present partial text ("... was the first president of the United States."), and the full text when the user requests it ("George Washington was the first president of the United States.")

Technologies used: NodeJS, NPM - inquirer, request, fs

To run the app:
On the Command prompt
Download or clone the repo https://github.com/Dpiks/Flashcard-Generator.git to your local directory
NPM init -y
NPM install inquirer --S
NPM install request --S

from the directory where the repo was cloned run the app with the command 
node flashCardAdmin.js

Follow the prompts thereafter. 

