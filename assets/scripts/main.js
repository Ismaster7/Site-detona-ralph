 const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        score: document.querySelector("#score"),
        timeLeft: document.querySelector("#time-left")
    },
    value: {
        timerId: null,
        updateTimeFunc: null,
        gameSpeed: 1100,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        updateTime: 1000,


    }
 }
function playSound(audioName, volumeSound){
    let audio = new Audio(`./assets/audios/${audioName}`)
    audio.play()

    audio.volume = volumeSound;
}

 function countDown(){
    state.value.currentTime--;
    state.view.timeLeft.textContent = state.value.currentTime;
    if(state.value.currentTime <= 0){
        clearInterval(state.value.timerId);
        clearInterval(state.value.updateTimeFunc);
        playSound("game-over.ogg", 1)
        alert(`Game Over! Sua pontuação foi: ${state.value.result}` );
    }
 }

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");
        
    });

    let randomNumber = Math.floor(Math.random()*9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.value.hitPosition = randomSquare.id;
}

function moveGame(){
    state.value.timerId = setInterval(randomSquare, state.value.gameSpeed); // Move Enemy
    state.value.updateTimeFunc = setInterval(countDown, state.value.updateTime);  // update Time
}

 function addListenerHitBox(){
     state.view.squares.forEach((square)=>{
        square.addEventListener("mousedown", () => {

            if (square.classList.contains("enemy")){
                state.value.result++;
                playSound("hit.m4a", 0.15);
                state.view.score.textContent = state.value.result;
                square.classList.remove("enemy");
                // 
            } 
            // if(square.id === state.value.hitPosition){
            //     state.value.result++;
            //     state.view.score.textContent = state.value.result;
            //     state.value.hitPosition = null;
            // } 
        }) 
     })
}


 function main(){
    moveGame();
    addListenerHitBox();    
 }

 main();

