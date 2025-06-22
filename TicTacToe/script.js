console.log("Welcome to TicTacToe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let gameover = new Audio("gameover.mp3");

let turn = "X";
let isgameover = false;

const changeTurn = () => {
    return turn === "X" ? "0" : "X";
};

let boxes = document.getElementsByClassName("box");

const gameLogic = () => {
    Array.from(boxes).forEach(element => {
        let boxText = element.querySelector(".boxtext");
        element.addEventListener('click', () => {
            if (boxText.innerText === "" && !isgameover) {
                boxText.innerText = turn;
                audioTurn.play();
                checkWin();
                if (!isgameover) {
                    turn = changeTurn();
                    document.querySelector(".turn").innerText = "Turn for " + turn;
                }
            }
        });
    });
};

const checkWin = () => {
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135]
    ];

    wins.forEach(e => {
        if (
            boxtext[e[0]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[2]].innerText === boxtext[e[1]].innerText &&
            boxtext[e[0]].innerText !== ""
        ) {
            document.querySelector(".turn").innerText = boxtext[e[0]].innerText + " Won!";
            music.currentTime = 0;
            music.play();
            isgameover = true;

            document.querySelector('.imgbox img').style.width = "30vw";
            

            document.querySelector(".container").classList.add("disabled");

            
            document.querySelector(".reset").innerText = "Start Game";
        }
    });

    // Check for draw
    let allFilled = Array.from(boxtext).every(el => el.innerText !== "");
    if (!isgameover && allFilled) {
        document.querySelector('.turn').innerText = "It's a Draw!";
        gameover.play();
        isgameover = true;

        document.querySelector(".container").classList.add("disabled");

        
        document.querySelector(".reset").innerText = "Start Game";
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const reset = document.querySelector(".reset");

    reset.innerText = "Start Game";

    reset.addEventListener('click', () => {
        music.pause();
         music.currentTime = 0;

        
        document.querySelectorAll('.boxtext').forEach(element => {
            element.innerText = "";
        });

        
        turn = "X";
        isgameover = false;
        document.querySelector(".turn").innerText = "Turn for " + turn;
       

        const img = document.querySelector('.imgbox img');
        if (img) img.style.width = "0px";

        document.querySelector(".container").classList.remove("disabled");

        
        reset.innerText = "Reset Game";
    });

    gameLogic(); 
});
