/**  
Orientation - JS assignment 2
Solution by: Son Dang - TXL20S1-A
*/

const game = () => {
    let pScore = 0;
    let cScore = 0;
    let ArrayOfPlayer = [];
    let ArrayofComputer = [];
    const result = document.querySelector('.result');
    const match = document.querySelector('.match');
    
    //start the Game
    const startGame = () => {
        const playBtn = document.querySelector('.intro button');
        const introScreen = document.querySelector('.intro');

        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut');
            match.classList.remove('fadeOut');
            match.classList.add('fadeIn');
        });
    };

    //play match
    const playMatch = () => {
        const options = document.querySelectorAll('.options button');
        const playerHand = document.querySelector('.playerhand');
        const computerHand = document.querySelector('.computerhand');
        const hands = document.querySelectorAll('.hand img');

        hands.forEach(hand => {
            hand.addEventListener('animationend', function(){
                this.style.animation ='';
            });
        });
        
        //computer option
        const computerOptions = ['rock', 'paper', 'scissors'];

        options.forEach(option => {
            option.addEventListener('click', function() {
                //after click disable button
                document.querySelector('.rock').disabled = true;
                document.querySelector('.paper').disabled = true;
                document.querySelector('.scissors').disabled = true;
                document.querySelector('.rock').style.opacity = '0.5';
                document.querySelector('.paper').style.opacity = '0.5';
                document.querySelector('.scissors').style.opacity = '0.5';
            
                //change image to rock
                playerHand.src = 'rock.png';
                computerHand.src = 'rock.png';
            
                //computer choice
                const computerNumber = Math.floor(Math.random() * 3);
                const computerChoice = computerOptions[computerNumber];
                const resultOfWinner = document.querySelector('.result p');
                const comeback = document.querySelector('.result button');
                const stop = document.querySelector('.stop button');

                //stop game by player when click button stop
                stop.addEventListener('click', () => {
                    //enable button if player quit when buttons are disable
                    document.querySelector('.rock').disabled = false;
                    document.querySelector('.paper').disabled = false;
                    document.querySelector('.scissors').disabled = false;
                    document.querySelector('.rock').style.opacity = '1';
                    document.querySelector('.paper').style.opacity = '1';
                    document.querySelector('.scissors').style.opacity = '1';

                    // go to final screen and display reason 
                    match.classList.remove('fadeIn');
                    match.classList.add('fadeOut');
                    result.classList.add('fadeIn');
                    resultOfWinner.innerHTML = '<b>Player stops game</b>';
                    resultOfWinner.innerHTML += '<br/>';
                    resultOfWinner.innerHTML += 'Total match: '+ ArrayOfPlayer.length;
                    resultOfWinner.innerHTML += '<br/>';
                    resultOfWinner.innerHTML += 'Result of game:';
                    resultOfWinner.innerHTML += '<br/>';
                    resultOfWinner.innerHTML += 'Player: ' + ArrayOfPlayer;
                    resultOfWinner.innerHTML += '<br/>';
                    resultOfWinner.innerHTML += 'Computer: ' + ArrayofComputer;

                    // play again if player want
                    comeback.addEventListener('click', () => {
                        playagain()
                    });
                });

                //compare hand and enable button after shaking
                setTimeout(() => {
                    // here is where we call compare hands
                    compareHands(this.textContent, computerChoice);
                    //update images
                    playerHand.src = `${this.textContent}.png`;
                    computerHand.src = `${computerChoice}.png`;

                },1000);

                //Game over if 10 wins and come back to play again if you want, and reset every thing
                setTimeout (() => {
                    //when everything is done, enable button
                    document.querySelector('.rock').disabled = false;
                    document.querySelector('.paper').disabled = false;
                    document.querySelector('.scissors').disabled = false;
                    document.querySelector('.rock').style.opacity = '1';
                    document.querySelector('.paper').style.opacity = '1';
                    document.querySelector('.scissors').style.opacity = '1';
                    
                    // end game if player or computer has 10 wins
                    if ((pScore == 10) || (cScore == 10)) {
                        match.classList.remove('fadeIn');
                        match.classList.add('fadeOut');
                        result.classList.add('fadeIn');
                        if (pScore == 10) {
                            resultOfWinner.innerHTML = '<b>Player Wins with 10 times</b>';
                            resultOfWinner.innerHTML += '<br/>';
                            resultOfWinner.innerHTML += 'Total match: ' + ArrayOfPlayer.length;
                            resultOfWinner.innerHTML += '<br/>';
                            resultOfWinner.innerHTML += 'Result of game: ' + ArrayOfPlayer;
                        } else {
                            resultOfWinner.innerHTML = '<b>Computer Wins with 10 times</b>';
                            resultOfWinner.innerHTML += '<br/>';
                            resultOfWinner.innerHTML += 'Total match: '+ ArrayOfPlayer.length;
                            resultOfWinner.innerHTML += '<br/>';
                            resultOfWinner.innerHTML += 'Result of game: ' + ArrayofComputer;
                        };
                        //play again if player want
                        comeback.addEventListener('click', () => {
                            playagain()
                        });
                        return;
                    };

                    //end game if player of computer wins 3 times in a row
                    if (ArrayOfPlayer.length > 2) {
                        if ((ArrayOfPlayer[ArrayOfPlayer.length - 1] == 'win') && (ArrayOfPlayer[ArrayOfPlayer.length - 2] == 'win') && (ArrayOfPlayer[ArrayOfPlayer.length - 3] == 'win')) {
                            match.classList.remove('fadeIn');
                            match.classList.add('fadeOut');
                            result.classList.add('fadeIn');
                            resultOfWinner.innerHTML = '<b>Player Wins with 3 times in a row</b>';
                            resultOfWinner.innerHTML += '<br/>';
                            resultOfWinner.innerHTML += 'Total match: '+ ArrayOfPlayer.length;
                            resultOfWinner.innerHTML += '<br/>';
                            resultOfWinner.innerHTML += 'Result of game: ' + ArrayOfPlayer;
                            //play again if player want
                            comeback.addEventListener('click', () => {
                                playagain()
                            });
                            return;
                        };
                    };
                    if (ArrayofComputer.length > 2) {
                        if ((ArrayofComputer[ArrayofComputer.length - 1] == 'win') && (ArrayofComputer[ArrayofComputer.length - 2] == 'win') && (ArrayofComputer[ArrayofComputer.length- 3] == 'win')) {
                            match.classList.remove('fadeIn');
                            match.classList.add('fadeOut');
                            result.classList.add('fadeIn');
                            resultOfWinner.innerHTML = '<b>Computer Wins with 3 times in a row</b>';
                            resultOfWinner.innerHTML += '<br/>';
                            resultOfWinner.innerHTML += 'Total match: '+ ArrayOfPlayer.length;
                            resultOfWinner.innerHTML += '<br/>';
                            resultOfWinner.innerHTML += 'Result of game: ' + ArrayofComputer;
                            //play again if player want
                            comeback.addEventListener('click', () => {
                                playagain()
                            });
                            return;
                        }; 
                    };
                    
                },1200);
                //animation
                playerHand.style.animation = 'shakePlayer 1s ease';
                computerHand.style.animation = 'shakeComputer 1s ease';
            });
        });
    };
    
    //reset all when play again
    const playagain = () => {
        result.classList.remove('fadeIn');
        result.classList.add('fadeOut');
        match.classList.remove('fadeOut');
        match.classList.add('fadeIn');
        pScore = 0;
        cScore = 0;
        NumberofPlay = 0;
        ArrayOfPlayer = [];
        ArrayofComputer = [];
        updateScore();
    };

    //update score
    const updateScore = () => {
        const playerScore = document.querySelector('.playerscore p');
        const computerScore = document.querySelector('.computerscore p');
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };

    const compareHands = (playerChoice, computerChoice) => {
        // update text
        const winner = document.querySelector('.winner');
        //checking for a tie
        if (playerChoice === computerChoice) {
            winner.textContent = 'It is a tie';
            ArrayOfPlayer.push('tie');
            ArrayofComputer.push('tie');
            return;
        };
        //check for rock
        if (playerChoice === 'rock'){
            if (computerChoice === 'scissors'){
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                ArrayOfPlayer.push('win');
                ArrayofComputer.push('lose');
                return;
            } else {
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                ArrayOfPlayer.push('lose');
                ArrayofComputer.push('win');
                return;
            };
        };
        //check for paper
        if (playerChoice === 'paper'){
            if (computerChoice === 'scissors'){
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                ArrayOfPlayer.push('lose');
                ArrayofComputer.push('win');
                return;
            } else {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                ArrayOfPlayer.push('win');
                ArrayofComputer.push('lose');
                return;
            };
        };
        //check for scissors
        if (playerChoice === 'scissors'){
            if (computerChoice === 'rock'){
                winner.textContent = 'Computer Wins';
                cScore++;
                updateScore();
                ArrayOfPlayer.push('lose');
                ArrayofComputer.push('win');
                return;
            } else {
                winner.textContent = 'Player Wins';
                pScore++;
                updateScore();
                ArrayOfPlayer.push('win');
                ArrayofComputer.push('lose');
                return;
            };
        };
    };
    //is call all the inner function
    startGame();
    playMatch();
};

//start the game function
game();

