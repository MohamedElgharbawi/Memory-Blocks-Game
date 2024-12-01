let button = document.querySelector(".bg button");
let blocks = document.querySelectorAll(".blocks .block");
let tries = document.querySelector(".tries");
let footer = document.querySelector(".footer");
let res = document.querySelector(".res");
let Name = document.querySelector(".name");
let minutes = document.querySelector(".minutes");
let seconds = document.querySelector(".seconds");
let audio1 = document.querySelector(".audio-1");
let audio2 = document.querySelector(".audio-2");
let audio3 = document.querySelector(".audio-3");

let i = 0;
let counter = 0;
let wrong = 0;
let right = 0;
let count;



function show() {
    setTimeout(() => {
        blocks[0].parentElement.style.pointerEvents = "none";
        blocks.forEach(block => block.classList.add("flipped"));
    })
}
function hidden() {
    setTimeout(() => {
        blocks[0].parentElement.style.pointerEvents = "auto";
        blocks.forEach(block => block.classList.remove("flipped"))
    }, 4000)
}

function playAudio(audio1, audio2 , Time) {
    audio1.pause();
    audio2.play();
    setTimeout(() => {
        audio2.pause();
        audio2.currentTime = 0;
    }, Time);
}

blocks.forEach((block , index) => {
    block.style.order = Math.floor(Math.random() * blocks.length);
    block.onclick = function () {
        block.classList.add("flipped");
        
        counter++;
        if (counter === 2) {
            blocks[0].parentElement.style.pointerEvents = "none";
            if (blocks[i].dataset.categ === block.dataset.categ) {
                blocks[i].classList.add("done");
                block.classList.add("done");
                blocks[i].classList.remove("flipped");
                block.classList.remove("flipped");
                block.style.pointerEvents = "none";
                blocks[i].style.pointerEvents = "none";
                blocks[0].parentElement.style.pointerEvents = "auto";
                right++;
                playAudio(audio1, audio2, 2000);
            }
            else {
                playAudio(audio2, audio1, 3050);
                setTimeout(() => {
                    blocks[i].classList.remove("flipped");
                    block.classList.remove("flipped");
                    blocks[0].parentElement.style.pointerEvents = "auto";
                    
                }, 1000);
                wrong++;
                tries.innerHTML = wrong;
            }
            counter = 0;
        }
        if(counter)
            i = index;
        if (right === blocks.length / 2) {
            blocks[0].parentElement.style.pointerEvents = "none";
            footer.style.display = "block";
            res.innerHTML = wrong;
            document.getElementById("name").innerHTML = Name.innerHTML;
            clearInterval(count);
        }
        
    }
})



button.onclick = function () {
        this.parentElement.remove();
        let userName = prompt("Enter You Name : ");
        Name.innerHTML = userName !== "" && userName !== null ? userName : "Guest";
        show();
        hidden();
        setTimeout(() => {
            count = setInterval(() => {
                seconds.innerHTML--;
                if (seconds.innerHTML < 10) {
                    if (seconds.innerHTML == 0) {
                        if (minutes.innerHTML == 0) {
                            seconds.innerHTML = "00";
                            blocks[0].parentElement.style.pointerEvents = "none";
                            footer.style.display = "block";
                            footer.innerHTML = `<h1>The Time Is Out, Game Over <span id="name">${Name.innerHTML}</span></h1>`;
                            let btn = document.createElement("button");
                            btn.innerHTML = "Play Again";
                            btn.style.margin = "20px auto 0";
                            btn.style.display = "block";
                            footer.after(btn);
                            clearInterval(count);
                            //////////////////
                            // audio1.pause();
                            // audio2.pause();
                            // audio3.play();
                            //////////////////
                            btn.onclick = () => location.reload();
                        } else {
                            minutes.innerHTML--;
                            if (minutes.innerHTML < 10) {
                                minutes.innerHTML = `0${minutes.innerHTML}`;
                            }
                            seconds.innerHTML = "59";
                        }
                    } else {
                        seconds.innerHTML = `0${seconds.innerHTML}`;
                    }
                }
            },1000);
        },4000)
    }