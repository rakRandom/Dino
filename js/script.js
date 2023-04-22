const dino = document.querySelector(".dino");
const obstacle = document.querySelector(".obstacle");
const scoreBoard = document.querySelector(".score");
const startLabel = document.querySelector(".label");


const section = document.querySelector(".content").children[1];
const receita = document.querySelector(".receita");
const historia = document.querySelector(".historia");
const curiosidades = document.querySelector(".curiosidades");
const exit = document.querySelector(".exit");

let isJumping = false;
let isGameOver = false;
let Start = false;
let obstaclePosition = 500;

let endTime = 1;
let JumpForce = 10;
let FallForce = 10;
let score = 0;

document.addEventListener("keydown", function(event) {
        if ((event.code === "Space" || event.code === "ArrowUp") && !isJumping) {
            if(!Start && event.code === "Space"){
                Start = true;
                isGameOver = false;
                startLabel.style.display = "none";
                obstaclePosition = 500;
            }
            else if (Start){
                isJumping = true;
            
                let jumpInterval = setInterval(function() {
                let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
            
                if (dinoBottom < 100) {
                    JumpForce = 11 - dinoBottom/10;
                    dino.style.bottom = (dinoBottom + JumpForce) + "px";
                    endTime = Date.now() + 250;
                }
                else {
                    clearInterval(jumpInterval);
                    
                    let fallInterval = setInterval(function() {
                        let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
            
                        let currentTime = Date.now();

                        if (currentTime > endTime){
                            if (dinoBottom > 0) {
                                if (dinoBottom <= 10){
                                    FallForce = dinoBottom;
                                } else{
                                    FallForce = 11 - dinoBottom/10
                                }
                                
                                dino.style.bottom = (dinoBottom - FallForce) + "px";
                            } else {
                                clearInterval(fallInterval);
                                isJumping = false;
                            }
                        }
                    }, 20);
                }
                }, 20);
          }
    }
});

document.getElementById("headerh1").innerHTML = "Eu adorei esse background com blur então não me julgue por usar duas vezes";
document.getElementById("headerh1").addEventListener("click", function() {
    let title = document.getElementById("headerh1");
    
    if (title.innerHTML == "Eu adorei esse background com blur então não me julgue por usar duas vezes")
        {title.innerHTML = "Essa é a versão com jogo do que devia ser a outra página btw";}

    else if (title.innerHTML == "Essa é a versão com jogo do que devia ser a outra página btw")
        {title.innerHTML = "Eu me esforcei bastante pra fazer isso, gostou? não? vai se lascar";}

    else if (title.innerHTML == "Eu me esforcei bastante pra fazer isso, gostou? não? vai se lascar")
        {title.innerHTML = "Clica em mim de novo que eu vou dizer uma coisa bem interessante";}

    else if (title.innerHTML == "Clica em mim de novo que eu vou dizer uma coisa bem interessante")
        {title.innerHTML = "Eu adorei esse background com blur então não me julgue por usar duas vezes";}
});

let gameInterval = setInterval(function() {
    if (Start){
        let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));

        if (obstaclePosition < -30) {
            obstaclePosition = 500;
            score += 1;
            scoreBoard.innerHTML = "Pontuação: " + score;
        }
    
        obstaclePosition -= 5 + score/10;
        obstacle.style.left = obstaclePosition + "px";
    
        if (obstaclePosition < 105 && obstaclePosition > 0 && !isGameOver) {
            if (dinoBottom < 60) {
            isGameOver = true;
            Start = false;
            startLabel.style.display = "block";
            startLabel.innerHTML = "Aperte SPACE para recomeçar"
            score = 0;
            scoreBoard.innerHTML = "Pontuação: " + score;
            }
        }
    }
}, 25);

function funcReceita(){
    receita.style.display = "none";
    historia.style.display = "none";
    curiosidades.style.display = "none";
    exit.style.display = "block";
    
    section.style.transition = "0ms";
    section.style.top = "calc(10% - 25px)";
};