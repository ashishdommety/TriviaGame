$(document).ready(function() {

  //object of arrays with the questions and options
  var questions = [{
      q1: 'What does HTML stand for?',
      o1: 'Hypertext Markup Language',
      o2: 'Hypertext Margin Language',
      o3: 'Historic Markup Literacy',
      o4: 'Historic Makeup Language',
      a1:'HTML stands for Hypertext Markup Language',
      link:'https://media.giphy.com/media/sWrDT2OqxJ3Fu/giphy.gif'
    },
    {
      q2: 'Who created Javascript?',
      o1: 'Brendan Eich',
      o2: 'John Resig',
      o3: 'James Gosling',
      o4: 'Bjarne Stroustrup',
      a2:'Brendan Eich created Javascript in a span of 10 days in May 1995',
      link:'http://i.perezhilton.com/wp-content/uploads/2014/04/brendan-eich-edit.gif'
    },
    {
      q3: 'Which of these is not a CSS framework?',
      o1: 'Angular',
      o2: 'LESS',
      o3: 'Bulma',
      o4: 'SASS',
      a3:'Angular JS is not a CSS framework, but it is a Javascript framework used to create single page applications',
      link:'https://media.giphy.com/media/FyDAf2bjf04zC/giphy.gif'
    },
    {
      q4: 'Which company created bootstrap?',
      o1: 'Twitter',
      o2: 'Facebook',
      o3: 'Google',
      o4: 'Whatsapp',
      a4:'Mark Otto and Jacob Thorton created bootstrap at Twitter, and originally called it "Twitter Blueprint" ',
      link:'https://media.giphy.com/media/jut7ta6lQwRkQ/giphy.gif'
    },
    {
      q5: 'Which is these is wrong syntax?',
      o1: 'click.element = function(){code goes here}',
      o2: "$(element).on('click', function(){code goes here})",
      o3: 'variable.onclick = function(){code goes here}',
      o4: '$(element).click(function(){code goes here})',
      a5:'"click.element = function(){code goes here}" is the wrong syntax to write a click-function',
      link:'http://33.media.tumblr.com/5d9d9bdc0b79f41afcc97ebd1c91a8e5/tumblr_n5bsovtIt01spa2yxo1_500.gif'
    },
    {
      q6: 'What is the first step to take before writing a program?',
      o1: 'Psuedocode',
      o2: 'Declare all the varaibles you might need',
      o3: 'Google other peoples solutions',
      o4: 'Open your text editor',
      a6:'The first step to take before writing a program, is to Psuedocode. It is an informal language that helps programmers develop algorithms',
      link:'https://media.giphy.com/media/6fL4ZqndWKpOM/giphy.gif'
    },
    {
      q7: 'What is the purpose of SSL?',
      o1: 'Security',
      o2: 'Performance',
      o3: 'Security and Performance',
      o4: 'For responsiveness',
      a7:'SSL (Secure Sockets Layer) is the standard security technology for establishing an encrypted link between a web server and a browser.',
      link:'https://media.giphy.com/media/URshp9qjwBTfa/giphy.gif'
    },
    {
      q8: 'Which of these is not a Javascript Framework?',
      o1: 'Haml',
      o2: 'Angular',
      o3: 'React',
      o4: 'Vue',
      a8:'Haml is a markup language that’s used to cleanly and simply describe the HTML of any web document without the use of inline code.',
      link:'https://forum.sublimetext.com/uploads/default/optimized/3X/0/3/03ed695cf7cb78f2e3b019750f069db1693e38d3_1_690x300.gif'
    },
    {
      q9: 'Which engine does Google Chrome run on?',
      o1: 'V8',
      o2: 'V6',
      o3: 'V4',
      o4: 'V9',
      a9:"V8 is Google's open source high-performance JavaScript engine and it is written in C++ ",
      link:'https://media.giphy.com/media/ymKIz3zBieFNK/giphy.gif'
    },
    {
      q10: 'Who was the first programmer?',
      o1: 'Ada Lovelace',
      o2: 'Herman Hollerith',
      o3: 'Alan Turing',
      o4: ' Konrad Zuse',
      a10:"Ada Lovelace was the first to recognise that the machine had applications beyond pure calculation, and created the first algorithm intended to be carried out by such a machine. ",
      link:'http://sydneypadua.com/2dgoggles/wp-content/uploads/2015/10/ada200thiconbig1.gif'
    }
  ]

  //variables
  var counter;
  var rightGuesses;
  var wrongGuesses;
  var unAnswered;
  var secondsLeft = parseInt($('#time').text());
  var timer;
  //sound variables
  var correct;
  var wrong;
  var bgm;
  var begin;
  var beep;
  var timesUp;
  var droplet;

  //initialize function
  function init() {
    resetVars();
    sounds();
    events();
    //function for start screen
    $('#begin').on('click', function() {
      begin.play();
      $('#play').show();
      $('#clock').show();
      $('.start').hide();
      counter++;
      console.log(counter);
      gamePlay();
    });
  }
  init();

  //function to reset variables and hide/show
  function resetVars(){
    clearInterval(timer);
    counter = 0;
    rightGuesses = 0;
    wrongGuesses = 0;
    noAnswer = 0;
    $('#play').hide();
    $('#clock').hide();
    $('#check').hide();
    $('#result').hide();
    $('.start').show();
  }

//the click events
  function events() {
    $('#opt1, #opt2, #opt3, #opt4').on('click',function() {
      var check = $(this).data('ref');
      $('#play').hide();
      $('#check').show();
      if (check === 'correct') {
        rightAnswer();
      } else if (check === 'wrong') {
        wrongAnswer();
      }
    });
    $('#next').on('click',function(){
      droplet.play();
      $('#play').show();
      counter++;
      console.log(counter);
      checkEnd();
      clearInterval(timer);
      secondsLeft = 30;
      timerStart();
      $('#check').hide();
    });
    $('#restart').on('click',function(){
      droplet.play();
      console.log('restart clicked');
      resetVars();
    });
  }
//function for game play
  function gamePlay() {
    questionSelection();
  }

  //function to create each set of question and answers
  function questionSelection() {
    clearInterval(timer);
    timerStart();
    $('#question').text(counter + '. ' + questions[counter - 1]['q' + counter]);
    for (var i = 1; i < 5; i++) {
      $('#opt' + i).text(questions[counter - 1]['o' + i]);
    }
    shuffleAnswers();
  }
  function shuffleAnswers(){
      var parent = $('#options');
      var answers = parent.children();
      while(answers.length){
        var change = answers.splice(Math.floor(Math.random() * answers.length),1);
        parent.append(change[0]);
      }
  }
  //function to display the picture a write up about the correct answer
  function writeUp(){
    $('#description').text( questions[counter-1]['a' + counter]);
    $('#pic').attr('src',questions[counter-1]['link']);
  }

  //function for end screen
  function checkEnd() {
    if (counter === questions.length + 1) {
      $('#result').show();
      clearInterval(timer);
      $('#play').hide();
      $('#clock').hide();
      $('#check').hide();
      $('#correct').text(rightGuesses);
      $('#wrong').text(wrongGuesses);
      $('#noTime').text(noAnswer);
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
        timesUp.play();
        $('#play').hide();
        $('#check').show();
        unAnswered();
        console.log(counter);
        clearInterval(timer);
        secondsLeft = 30;
        checkEnd();
      }
      if(secondsLeft <= 5){
        beep.play();
      }
      $('#time').text(secondsLeft);
      secondsLeft--;
    }, 1000);
  }
//function for right answer
  function rightAnswer(){
    correct.currentTime = 0;
    correct.play();
    clearInterval(timer);
    secondsLeft = 30;
    $('#answer').text('Correct!');
    writeUp();
    console.log('you guessed the right answer!');
    rightGuesses++;
  }
// function for wrong answer
  function wrongAnswer(){
    wrong.currentTime = 0;
    wrong.play();
    clearInterval(timer);
    secondsLeft = 30;
    $('#answer').text('Wrong..');
    writeUp();
    console.log('you guessed the wrong answer!');
    wrongGuesses++;
  }
//function for Unanswered
  function unAnswered(){
    $('#answer').text('You ran out of time!');
    writeUp();
    console.log('you ran out of time!');
    noAnswer++;
  }
  //function with all the sound sources
 function sounds(){
   //Sound on correct
   correct = new Audio();
   correct.src = 'assets/sounds/correct.mp3';
   //sound on wrong
   wrong = new Audio();
   wrong.src = 'assets/sounds/wrong.wav';
   //sound on game start
   begin = new Audio();
   begin.src = 'assets/sounds/begin.wav';

   beep = new Audio();
   beep.src = 'assets/sounds/beep.wav';

   timesUp = new Audio();
   timesUp.src = 'assets/sounds/timeup.mp3';

   droplet = new Audio();
   droplet.src = 'assets/sounds/droplet.wav';
 }
  //end
});
