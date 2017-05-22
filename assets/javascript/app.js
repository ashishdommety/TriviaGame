$(document).ready(function(){

//object of arrays with the questions and options
var questions = [
  {q1:'What does HTML stand for?',
    a1:'Hypertext Markup Language',
    a2:'Hypertext Margin Language',
    a3:'Historic Markup Literacy',
    a4:'Historic Makeup Language'
  },
  {q2:'Who invented Javascript?',
    a1:'Brendan Eich',
    a2:'John Resig',
    a3:'James Gosling',
    a4:'Bjarne Stroustrup'
  },
  {q3:'Which of these is not a CSS framework?',
      a1:'Angular',
      a2:'LESS',
      a3:'Bulma',
      a4:'SASS'
  },
  {q4:'Which company invented bootstrap?',
    a1:'Twitter',
    a2:'Facebook',
    a3:'Google',
    a4:'Whatsapp'
  },
  {q5:'Which is these is wrong syntax?',
    a1:'click.element = function(){code goes here}',
    a2:"$(element).on('click', function(){code goes here})",
    a3:'variable.onclick = function(){code goes here}',
    a4:'$(element).click(function(){code goes here})'
  },
  {q6:'What is the first step to take before writing a program?',
    a1:'Psuedocode',
    a2:'declare all the varaibles you might need',
    a3:'Google other peoples solutions',
    a4:'Open your text editor'
  },
  {q7:'What is the purpose of SSL?',
    a1:'Security',
    a2:'Performance',
    a3:'Security and Performance',
    a4:'For responsiveness'
  },
  {q8:'Which of these is not a Javascript Framework?',
    a1:'Haml',
    a2:'Angular',
    a3:'React',
    a4:'Vue'
  },
  {q9:'Which engine does Google Chrome run on?',
    a1:'V8',
    a2:'V6',
    a3:'V4',
    a4:'V9'
  },
  {q10:'Which company invented bootstrap?',
    a1:'Ada Lovelace',
    a2:'Herman Hollerith',
    a3:'Alan Turing',
    a4:' Konrad Zuse'
  }
]
//variables
var counter;
var rightGuesses;
var wrongGuesses;

//init function (counter, right guesses, wrong guesses, hides and shows )
function init(){
  counter = 0;
  rightGuesses = 0;
  wrongGuesses = 0;
  $('#play').hide();
  $('#clock').hide();
}
init();

    //function for start screen
$('#begin').on('click',function(){
    $('#play').show();
    $('#clock').show();
    $('.start').hide();
    counter++;
    console.log(counter);
    questionSelection();
});
//function to create each set of question and answers
function questionSelection(){
  end();
  $('#question').text(questions[counter-1]['q'+counter]);
  for(var i = 1; i < 5; i++){
    $('#opt'+i).text(questions[counter-1]['a'+i]);
  }
  guess();
}

//function for guesses
function guess(){
  $('#opt1, #opt2, #opt3, #opt4, #begin').click(function(){
    var check = $(this).data('ref');
    if(check === 'correct'){
      console.log('you guessed the right answer!');
      rightGuesses++;
      //function if correct guess
    }
    else if(check === 'wrong'){
      console.log('you clicked the wrong answer');
      wrongGuesses++;
      //function if wrong guess
    }
    counter++;
    console.log(counter);
    questionSelection();
  });
}
//function for end screen
function end(){
  if(counter === questions.length+1){
    $('#play').hide();
    $('#clock').hide();
    $('#result').append('<h2>Correct Guesses: '+ rightGuesses +'</h2>');
    $('#result').append('<h2>Wrong Guesses: '+ wrongGuesses +'</h2>');
    console.log('game ended');
  }
}
//timer


});
