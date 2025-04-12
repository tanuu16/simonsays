let gameseq = [];
let userseq = [];
let btns = ["red", "pink", "green", "purple"];
let started = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
    if (!started) {
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("btnflash");
    setTimeout(function () {
        btn.classList.remove("btnflash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userseq = [];
    level++;
    h2.innerText = `Level ${level}`;
    let randin = Math.floor(Math.random() * 4); // should be *4 not *3 to include all 4 colors
    let randcolor = btns[randin];
    let randbtn = document.querySelector(`.${randcolor}`);
    gameseq.push(randcolor);
    console.log(gameseq);
    gameFlash(randbtn);
}

function checkAns(idx) {
    if (userseq[idx] === gameseq[idx]) {
        if (userseq.length === gameseq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        h2.innerText = `Game Over! Press any key to restart`;
        document.body.classList.add("game-over");
        setTimeout(() => {
            document.body.classList.remove("game-over");
        }, 200);

        reset(); // Reset the game state
    }
}

function btnpress() {
    let btn = this;
    userFlash(btn);
    let usercolor = btn.getAttribute("id");
    userseq.push(usercolor);
    checkAns(userseq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");
for (let btn of allbtns) {
    btn.addEventListener("click", btnpress);
}

function reset() {
    started = false;
    gameseq = [];
    userseq = [];
    level = 0;
}
