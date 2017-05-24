$(document).ready(function() {

  //object of arrays with the questions and options
  var questions = [{
      q1: 'What does HTML stand for?',
      a1: 'Hypertext Markup Language',
      a2: 'Hypertext Margin Language',
      a3: 'Historic Markup Literacy',
      a4: 'Historic Makeup Language'
    },
    {
      q2: 'Who created Javascript?',
      a1: 'Brendan Eich',
      a2: 'John Resig',
      a3: 'James Gosling',
      a4: 'Bjarne Stroustrup'
    },
    {
      q3: 'Which of these is not a CSS framework?',
      a1: 'Angular',
      a2: 'LESS',
      a3: 'Bulma',
      a4: 'SASS'
    },
    {
      q4: 'Which company created bootstrap?',
      a1: 'Twitter',
      a2: 'Facebook',
      a3: 'Google',
      a4: 'Whatsapp'
    },
    {
      q5: 'Which is these is wrong syntax?',
      a1: 'click.element = function(){code goes here}',
      a2: "$(element).on('click', function(){code goes here})",
      a3: 'variable.onclick = function(){code goes here}',
      a4: '$(element).click(function(){code goes here})'
    },
    {
      q6: 'What is the first step to take before writing a program?',
      a1: 'Psuedocode',
      a2: 'Declare all the varaibles you might need',
      a3: 'Google other peoples solutions',
      a4: 'Open your text editor'
    },
    {
      q7: 'What is the purpose of SSL?',
      a1: 'Security',
      a2: 'Performance',
      a3: 'Security and Performance',
      a4: 'For responsiveness'
    },
    {
      q8: 'Which of these is not a Javascript Framework?',
      a1: 'Haml',
      a2: 'Angular',
      a3: 'React',
      a4: 'Vue'
    },
    {
      q9: 'Which engine does Google Chrome run on?',
      a1: 'V8',
      a2: 'V6',
      a3: 'V4',
      a4: 'V9'
    },
    {
      q10: 'Who was the first programmer?',
      a1: 'Ada Lovelace',
      a2: 'Herman Hollerith',
      a3: 'Alan Turing',
      a4: ' Konrad Zuse'
    }
  ]

  var answerDescip = [{
    ad1:'HTML stands for Hypertext Markup Language'
  },
  {
    ad2:'Brendan Eich created Javascript in a span of 10 days in May 1995'
  },
  {
    ad3:'Angular JS is not a CSS framework, but it is a Javascript framework used to create single page applications'
  },
  {
    ad4:'Mark Otto and Jacob Thorton created bootstrap at Twitter, and originally called it "Twitter Blueprint" '
  },
  {
    ad5:'"click.element = function(){code goes here}" is the wrong syntax to write a click-function'
  },
  {
    ad6:'The first step to take before writing a program, is to Psuedocode. It is an informal language that helps programmers develop algorithms'
  },
  {
    ad7:'SSL (Secure Sockets Layer) is the standard security technology for establishing an encrypted link between a web server and a browser.'
  },
  {
    ad8:'Haml is a markup language that’s used to cleanly and simply describe the HTML of any web document without the use of inline code.'
  },
  {
    ad9:"V8 is Google's open source high-performance JavaScript engine and it is written in C++ "
  },
  {
    ad10:"Ada Lovelace was the first to recognise that the machine had applications beyond pure calculation, and created the first algorithm intended to be carried out by such a machine. "
  }
]

  //variables
  var counter;
  var rightGuesses;
  var wrongGuesses;
  var unAnswered;
  var secondsLeft = parseInt($('#time').text());
  var timer;

  //init function (counter, right guesses, wrong guesses, hides and shows )
  function init() {
    counter = 0;
    rightGuesses = 0;
    wrongGuesses = 0;
    noAnswer = 0;
    $('#play').hide();
    $('#clock').hide();
    $('#check').hide();
  }
  init();

  //function for start screen
  $('#begin').on('click', function() {
    $('#play').show();
    $('#clock').show();
    $('.start').hide();
    counter++;
    console.log(counter);
    gamePlay();
  });




  function events() {
    $('#opt1, #opt2, #opt3, #opt4, #next').click(function() {
      var check = $(this).data('ref');
      $('#play').hide();
      $('#check').show();
      if (check === 'correct') {
        rightAnswer();
        // console.log('you guessed the right answer!');
        // rightGuesses++;
        //function if correct guess
      } else if (check === 'wrong') {
        wrongAnswer();
        //function if wrong guess
      }
      else if(check === 'next'){
        $('#play').show();
        counter++;
        console.log(counter);
        checkEnd();
        clearInterval(timer);
        secondsLeft = 30;
        timerStart();
        $('#check').hide();
      }
      //function if time runs out
    });
  }

  function gamePlay() {
    questionSelection();
    events();
  }

  //function to create each set of question and answers
  function questionSelection() {
    clearInterval(timer);
    timerStart();
    $('#question').text(counter + '. ' + questions[counter - 1]['q' + counter]);
    for (var i = 1; i < 5; i++) {
      $('#opt' + i).text(questions[counter - 1]['a' + i]);
    }
  }
  function writeUp(){
    $('#description').text( answerDescip[counter-1]['ad' + counter]);
  }

  //function for end screen
  function checkEnd() {
    if (counter === questions.length + 1) {
      clearInterval(timer);
      $('#play').hide();
      $('#clock').hide();
      $('#check').hide();
      $('#result').append('<h2>Correct Guesses: ' + rightGuesses + '</h2>');
      $('#result').append('<h2>Wrong Guesses: ' + wrongGuesses + '</h2>');
      $('#result').append('<h2>Unanswered: ' + noAnswer + '</h2>');
      $('#result').addClass('white');
      console.log('game ended');
    } else {
      questionSelection();
    }
  }

  //timer
  function timerStart() {
    timer = setInterval(function() {
      if (secondsLeft === 0) {
        $('#play').hide();
        $('#check').show();
        unAnswered();
        counter++;
        console.log(counter);
        clearInterval(timer);
        secondsLeft = 30;
        checkEnd();
      }
      $('#time').text(secondsLeft);
      secondsLeft--;
    }, 1000);
  }

  function rightAnswer(){
    clearInterval(timer);
    secondsLeft = 30;
    $('#answer').text('Correct!');
    writeUp();
    console.log('you guessed the right answer!');
    rightGuesses++;
  }

  function wrongAnswer(){
    clearInterval(timer);
    secondsLeft = 30;
    $('#answer').text('Wrong..');
    writeUp();
    console.log('you guessed the wrong answer!');
    wrongGuesses++;
  }

  function unAnswered(){
    $('#answer').text('You ran out of time!');
    writeUp();
    console.log('you ran out of time!');
    noAnswer++;
  }

  //end
});

// TODO: Need to shuffle options so that the first one isn't always correct
// TODO: Need to make sure timer doesn't keep running after you make a wrong guess
