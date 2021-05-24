const buttons = document.querySelectorAll(".controls button"),enterTime = document.querySelector("input"),
      clock = document.querySelector(".clock"),backAt = document.querySelector(".back-at");
let timer;

(function(){
    displayBackAt(Date.now());
    enterTime.value = "";
})();

function startTimer(seconds){
    clearInterval(timer);
    let now = Date.now(),
        then = now + (seconds * 1000);
    displayTimer(seconds);
    displayBackAt(then);

    timer = setInterval(() => {
        let sec = Math.round((then - Date.now())/1000);
        if (sec < 0){
            clearInterval(timer);
            alert("Time up !");
            return;
        }
        displayTimer(sec);
    }, 1000);
}

function displayTimer(secsLeft){
    let min = Math.floor(secsLeft/60), seconds = secsLeft%60;
    clock.textContent = `${formatTime(min)}:${formatTime(seconds)}`;
}

function displayBackAt(then){
    let backat = new Date(then), hours = backat.getHours(),minutes = backat.getMinutes();
    backAt.textContent = `Back at ${formatTime(hours)}:${formatTime(minutes)}`;
}

function formatTime(time){
    let s = `${ time < 10 ? '0' : ''}${time}`;
    return s;
}

function setSeconds(event){
    let value = parseInt(this.value),secs =  event.type == "click" ? value : value*60;
    startTimer(secs);    
} 

buttons.forEach((button) => {
    button.addEventListener("click",setSeconds);
})
enterTime.addEventListener("keyup",setSeconds);