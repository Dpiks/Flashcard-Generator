var flashCardAdmin = require('./flashCardAdmin');
var fs = require("fs");
var inquirer = require("inquirer");
var request = require("request");

//BasicCard constructor
function BasicCard(front, back) {
    if (!this instanceof BasicCard) {
        return new BasicCard(front, back);
    }
    this.front = front;
    this.back = back;
};

BasicCard.prototype.printBasicCard = function() {
    console.log("Question: " + this.front + "\nAnswer: " + this.back);
};

//ClozeCard Constructor
function ClozeCard(text, cloze) {
    if (!this instanceof ClozeCard) {
        return new ClozeCard(text, cloze);
    }
    this.fullText = text;
    this.cloze = cloze;
    this.partial = text.replace(cloze, ".......");

}


ClozeCard.prototype.printPartialText = function() {
    console.log("Partial sentence: " + this.partial);
    
}

ClozeCard.prototype.printClozeText = function() {
    console.log("Cloze: " + this.cloze);
    
}

ClozeCard.prototype.printFullText = function() {
    console.log("Full Sentence: " + this.fullText);
    
}

startApp();

function startApp() {
    inquirer.prompt([{
        name: "loginType",
        type: "rawlist",
        message: "Choose your role:",
        choices: ["Admin", "Player", "Exit"]
    }]).then(function(response) {
        var loginType = response.loginType;

        if (loginType === "Admin") {
            enterPassword();
        } else if(loginType==="Player"){
        	console.log("Development in progress!! Visit us in the future...")
        }

    });
}

function enterPassword() {
    inquirer.prompt([{
        name: "adminPassword",
        type: "input",
        message: "Enter your password: "
    }]).then(function(password) {
        var password = password.adminPassword;
        fs.readFile("password.txt", "utf8", function(err, data) {
            if (err) throw (err);
            if (data === password) {
                console.log("Login Successful!!");
                createFlashCards();
            } else {
                console.log("Your login credentials is incorrect!!");
            }
        })
    });
}

function createFlashCards() {
    inquirer.prompt([{
        name: "questionType",
        type: "rawlist",
        message: "What kind of flashcard would you like to generate?",
        choices: ["Basic", "Cloze", "Previous menu", "Exit"],
        default: ["Cloze"]
    }]).then(function(question) {
        var questionType = question.questionType;
        switch (questionType) {
            case "Basic":
                {
                    promptBasicDetails();
                    break;
                }
            case "Cloze":
                {
                    promptClozeDetails();
                    break;
                }
            case "Previous menu":
                {
                    startApp();
                    break;
                }
            case "Exit":
                {
                    break;
                }

        }


    })
}


function promptBasicDetails() {
    inquirer.prompt([{
        name: "front",
        type: "input",
        message: "Enter the question: "
    }, {
        name: "back",
        type: "input",
        message: "Enter the answer: "
    }]).then(function(basic) {
        var basicFlashCard = new BasicCard(basic.front, basic.back);
        console.log("------------------------------------------------------------");
        console.log("The following basic flash card is created!!");
        basicFlashCard.printBasicCard();
        fs.appendFile("basicCards.json", JSON.stringify(basicFlashCard) + '\n', function(err) {
            if (err) throw err;
            createFlashCards();
        });
    });

}


function promptClozeDetails() {
    inquirer.prompt([{
        name: "text",
        type: "input",
        message: "Enter the full sentence: "
    }, {
        name: "cloze",
        type: "input",
        message: "Enter the cloze: "
    }]).then(function(cloze) {
        var clozeFlashCard = new ClozeCard(cloze.text, cloze.cloze);
        console.log("------------------------------------------------------------");
        console.log("The following cloze flash card is created!!");
        clozeFlashCard.printPartialText();
        clozeFlashCard.printClozeText();
        clozeFlashCard.printFullText();
        fs.appendFile("clozeCards.json", JSON.stringify(clozeFlashCard) + '\n', function(err) {
            if (err) throw err;
        });
    });

}
