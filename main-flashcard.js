var inquirer = require("inquirer");

var ClozeCard = require('./ClozeCard.js');
var BasicCard = require ('./BasicCard.js');

var strAnswerQuestions = 'Answer questions.';
var strCreateBasic = 'Create a basic flashcard.';
var strCreateCloze = 'Create a cloze flashcard.';

inquirer.prompt([
    // Here we create a basic text prompt.
    { 
		type: 'list',
		message: 'What would you like to do?',
		choices: [strAnswerQuestions, strCreateBasic, strCreateCloze],
		name: 'action'
    },
]).then(function(inquirerResponse) {
    if (inquirerResponse.action === strAnswerQuestions) {
		console.log('Let\'s answer some questions.')
    }
    else if (inquirerResponse.action === strCreateBasic) {
		console.log('Let\'s make a basic flashcard.')
    }

    else if (inquirerResponse.action === strCreateCloze) {
		console.log('Let\'s make a cloze flashcard.')
    }
});



// // TESTS
// var firstBasicCard = new BasicCard('Who was the first president?', 'George Washington'); 
// var firstClozeCard = new ClozeCard('George Washington was first president.', 'George Washington');

// console.log('first basic front', firstBasicCard.front);
// console.log('first basic back', firstBasicCard.back);

// console.log('first cloze full text', firstClozeCard.fullText);
// console.log('first cloze cloze', firstClozeCard.cloze);

// var secondBasicCard = BasicCard('What is up?', 'The sky.'); 
// var secondClozeCard = ClozeCard('The sky is up', 'sky');

// console.log('second basic front', secondBasicCard.front);
// console.log('second basic back', secondBasicCard.back);

// console.log('second cloze full text', secondClozeCard.fullText);
// console.log('second cloze cloze', secondClozeCard.cloze);
// //END TESTS