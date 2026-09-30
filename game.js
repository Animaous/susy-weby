const gameArea = document.getElementById("gameArea");

const player = document.getElementById("player");

const scoreDisplay = document.getElementById("score");

const remainingDisplay =
    document.getElementById("remaining");

const startButton =
    document.getElementById("startButton");

const messageTitle =
    document.getElementById("messageTitle");

const messageText =
    document.getElementById("messageText");
const winPopup = document.getElementById("winPopup");
const closePopup = document.getElementById("closePopup");


let playerPosition = 375;

let score = 0;

let shipsRemaining = 10;

let gameRunning = false;

let enemies = [];

let bullets = [];


document.addEventListener("keydown", function(event) {

    if (!gameRunning) {
        return;
    }


    if (event.key === "ArrowLeft") {

        playerPosition -= 20;

    }



    if (event.key === "ArrowRight") {

        playerPosition += 20;

    }

    if (playerPosition < 0) {

        playerPosition = 0;

    }


    if (playerPosition > 750) {

        playerPosition = 750;

    }


    player.style.left = playerPosition + "px";


    if (event.code === "Space") {

        shoot();

    }

});


function shoot() {

    const bullet = document.createElement("div");

    bullet.classList.add("bullet");

    bullet.style.left =
        (playerPosition + 23) + "px";

    bullet.style.bottom = "60px";

    gameArea.appendChild(bullet);

    bullets.push(bullet);

}


function createEnemies() {

    for (let i = 0; i < 10; i++) {

        const enemy = document.createElement("div");

        enemy.classList.add("enemy");

        enemy.innerHTML = "▼";

        enemy.style.left =
            Math.random() * 750 + "px";

        enemy.style.top =
            Math.random() * 200 + "px";

        gameArea.appendChild(enemy);

        enemies.push(enemy);

    }

}


function moveBullets() {

    bullets.forEach(function(bullet, index) {

        let bottom =
            parseInt(bullet.style.bottom);

        bottom += 10;

        bullet.style.bottom =
            bottom + "px";


        // Remove bullet when it leaves screen

        if (bottom > 500) {

            bullet.remove();

            bullets.splice(index, 1);

        }

    });

}



function checkCollisions() {

    bullets.forEach(function(bullet, bulletIndex) {

        const bulletRect =
            bullet.getBoundingClientRect();


        enemies.forEach(function(enemy, enemyIndex) {

            const enemyRect =
                enemy.getBoundingClientRect();


            if (

                bulletRect.left <
                enemyRect.right &&

                bulletRect.right >
                enemyRect.left &&

                bulletRect.top <
                enemyRect.bottom &&

                bulletRect.bottom >
                enemyRect.top

            ) {


                enemy.remove();

                bullet.remove();


                enemies.splice(enemyIndex, 1);

                bullets.splice(bulletIndex, 1);

                score += 10;

                shipsRemaining--;


                scoreDisplay.textContent =
                    score;

                remainingDisplay.textContent =
                    shipsRemaining;


                // Check victory

                if (shipsRemaining === 0) {

                    winGame();

                }

            }

        });

    });

}


function gameLoop() {

    if (!gameRunning) {
        return;
    }

    moveBullets();

    checkCollisions();

    requestAnimationFrame(gameLoop);

}


startButton.addEventListener("click", function() {

    startGame();

});


function startGame() {

    score = 0;

    shipsRemaining = 10;

    playerPosition = 375;

    enemies = [];

    bullets = [];

    gameRunning = true;


    scoreDisplay.textContent = "0";

    remainingDisplay.textContent = "10";


    messageTitle.textContent =
        "DESTROY THE SHIPS!";

    messageText.textContent =
        "Use ← → to move and SPACE to shoot.";


    startButton.style.display =
        "none";


    createEnemies();

    gameLoop();

}


function winGame() {

    gameRunning = false;

    winPopup.style.display = "flex";

}



messageText.textContent =
    "Click START TEST when you are ready.";
