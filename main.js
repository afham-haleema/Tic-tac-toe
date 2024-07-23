
let boxes = document.querySelectorAll(".box");
let playerScore = document.querySelector(".player-score");
let compScore = document.querySelector(".comp-score");
let comp = document.querySelector(".comp-label");

let player_score = 0;
let comp_score = 0;
let currentPlayer = "X";


function checkWin(player) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winConditions.some(condition => {
        if (condition.every(index => boxes[index].innerText === player)) {
            condition.forEach(index => {
                boxes[index].classList.add("zoom");
            });
            setTimeout(() => {
                condition.forEach(index => {
                    boxes[index].classList.remove("zoom");
                    boxes[index].innerText = "";
                });
                reset();
            }, 500);
            return true;
        }
        return false;
    });
}

function findBestMove(player) {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check if the computer can win
    for (let condition of winConditions) {
        let count = 0;
        let emptyIndex = -1;
        condition.forEach(index => {
            if (boxes[index].innerText === player) {
                count++;
            } else if (boxes[index].innerText === "") {
                emptyIndex = index;
            }
        });
        if (count === 2 && emptyIndex !== -1) {
            return emptyIndex;
        }
    }

    // Check if the computer can block the player
    let opponent = player === "X" ? "O" : "X";
    for (let condition of winConditions) {
        let count = 0;
        let emptyIndex = -1;
        condition.forEach(index => {
            if (boxes[index].innerText === opponent) {
                count++;
            } else if (boxes[index].innerText === "") {
                emptyIndex = index;
            }
        });
        if (count === 2 && emptyIndex !== -1) {
            return emptyIndex;
        }
    }

    // Pick a random empty spot
    let emptyBoxes = Array.from(boxes).filter(b => !b.innerText);
    if (emptyBoxes.length > 0) {
        let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
        return randomBox.getAttribute('data-index');
    }

    return null;
}

function reset() {
    player_score = 0;
    comp_score = 0;
    currentPlayer = "X";
    boxes.forEach(box => {
        box.innerText = "";
    });
}

function checkDraw(){
    return Array.from(boxes).every(b=>b.innerText);
}

boxes.forEach((box, index) => {
    box.setAttribute('data-index', index);
    box.addEventListener("click", () => {
        if (!box.innerText) {
            box.innerText = currentPlayer;

            if(checkDraw()){
                        setTimeout(()=>{
                                reset();},500)
                        return;}

            if (checkWin(currentPlayer)) {
                player_score++;
                playerScore.innerText = player_score;
                return;
            }
            currentPlayer = "O";
            setTimeout(() => {
                let bestindex = findBestMove(currentPlayer);
                if (bestindex !== null) {
                    boxes[bestindex].innerText = currentPlayer;

                    if(checkDraw()){
                        setTimeout(()=>{reset(); },500)
                        return;}

                    if (checkWin(currentPlayer)) {
                        comp_score++;
                        compScore.innerText = comp_score;
                        return;
                    }
                }
                currentPlayer = "X";
            }, 500);
        }
    });
});





















