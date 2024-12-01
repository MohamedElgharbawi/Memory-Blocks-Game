let i = 0;
let counter = 0;
let wrong = 0;
let right = 0;
let count;
let Timer = 4000;
let flag = true;
let flag2 = true;
let audio = document.querySelector("audio");
if (sessionStorage.getItem("blocks")) {
    window.onload = function () {
        document.querySelector(".animation").style.cssText = `animation: change-opacity infinite 1s`;
    }
    Timer = 0;
    flag2 = false;
    document.querySelector(".bg").style.display = "none";
    document.querySelector(".blocks").innerHTML = sessionStorage.getItem("blocks");
    document.querySelector(".minutes").innerHTML = (sessionStorage.getItem("minutes"));
    document.querySelector(".seconds").innerHTML = (sessionStorage.getItem("seconds"));
    if (sessionStorage.getItem("wrong"))
        wrong = parseInt(sessionStorage.getItem("wrong"));
    if (sessionStorage.getItem("right"))
        right = Number(sessionStorage.getItem("right"));
    if (sessionStorage.getItem("name"))
        document.querySelector(".name").innerHTML = sessionStorage.getItem("name");
    document.querySelector(".tries").innerHTML = wrong;
    Time();
}
function show() {
    setTimeout(() => {
        document.querySelector(".blocks").style.pointerEvents = "none";
        document.querySelectorAll(".blocks .block").forEach(block => block.classList.add("flipped"));
    });
};
function hidden() {
    setTimeout(() => {
        document.querySelector(".blocks").style.pointerEvents = "auto";
        document.querySelectorAll(".blocks .block").forEach(block => block.classList.remove("flipped"))
    }, Timer);
};
function Time() {
    setTimeout(() => {
        count = setInterval(() => {
            document.querySelector(".seconds").innerHTML--;
            console.log(parseInt(document.querySelector(".seconds").innerHTML));
            console.log(document.querySelector(".minutes").innerHTML);
            if (parseInt(document.querySelector(".seconds").innerHTML) <= 59 && parseInt(document.querySelector(".minutes").innerHTML) === 0)
                document.querySelector(".time").style.color = "red";
            if (document.querySelector(".seconds").innerHTML < 10) {
                if (document.querySelector(".seconds").innerHTML == 0) {
                    if (document.querySelector(".minutes").innerHTML == 0) {
                        document.querySelector(".seconds").innerHTML = "00";
                        document.querySelectorAll(".blocks .block").forEach(ele => ele.style.pointerEvents = "none");
                        document.querySelector(".footer").style.display = "block";
                        document.querySelector(".footer").innerHTML = `<h1>The Time Is Out, Game Over <span id="name">${document.querySelector(".name").innerHTML}</span></h1>`;
                        let btn = document.createElement("button");
                        btn.innerHTML = "Play Again";
                        btn.style.margin = "20px auto 0";
                        btn.style.display = "block";
                        document.querySelector(".footer").after(btn);
                        document.querySelector(".animation").style.removeProperty("animation");
                        clearInterval(count);
                        audio.play();
                        window.addEventListener('unload', Update);
                        btn.onclick = Update;
                    } else {
                        document.querySelector(".minutes").innerHTML--;
                        if (document.querySelector(".minutes").innerHTML < 10) {
                            document.querySelector(".minutes").innerHTML = `0${document.querySelector(".minutes").innerHTML}`;
                        }
                        document.querySelector(".seconds").innerHTML = "59";
                    }
                } else {
                    document.querySelector(".seconds").innerHTML = `0${document.querySelector(".seconds").innerHTML}`;
                }
            }
            sessionStorage.setItem("seconds", document.querySelector(".seconds").innerHTML);
            sessionStorage.setItem("minutes", document.querySelector(".minutes").innerHTML);
        },1000);
    }, Timer);
};
function Update() {
    sessionStorage.clear();
    location.reload();
}
document.querySelectorAll(".blocks .block").forEach((block, index) => {
    if (flag2)
        block.style.order = Math.floor(Math.random() * document.querySelectorAll(".blocks .block").length);
    block.onclick = function (e) {
        if (!flag) {
            e.preventDefault();
        } else {
            block.classList.add("flipped");
            block.style.pointerEvents = "none";
            counter++;
            if (counter === 2) {
                if (document.querySelectorAll(".blocks .block")[i].dataset.categ === block.dataset.categ) {
                    document.querySelectorAll(".blocks .block")[i].classList.add("done");
                    block.classList.add("done");
                    document.querySelectorAll(".blocks .block")[i].classList.remove("flipped");
                    block.classList.remove("flipped");
                    right++;
                    sessionStorage.setItem("right", right);
                    sessionStorage.setItem("blocks", document.querySelector(".blocks").innerHTML);
                }
                else {
                    flag = false;
                    setTimeout(() => {
                        document.querySelectorAll(".blocks .block")[i].classList.remove("flipped");
                        block.classList.remove("flipped");
                        document.querySelectorAll(".blocks .block")[i].style.pointerEvents = "auto";
                        block.style.pointerEvents = "auto";
                        flag = true;
                        sessionStorage.setItem("blocks", document.querySelector(".blocks").innerHTML);
                    }, 1000);
                    wrong++;
                    sessionStorage.setItem("wrong", wrong);
                    document.querySelector(".tries").innerHTML = wrong;
                }
                counter = 0;
            }
            if (counter)
                i = index;
            if (right === document.querySelectorAll(".blocks .block").length / 2) {
                document.querySelector(".blocks").style.pointerEvents = "none";
                document.querySelector(".footer").style.display = "block";
                document.querySelector(".res").innerHTML = wrong;
                document.getElementById("name").innerHTML = document.querySelector(".name").innerHTML;
                clearInterval(count);
                window.addEventListener('unload', Update);
                document.querySelector(".animation").style.removeProperty("animation");
            };
        };
    };
});
document.querySelector(".bg button").onclick = function () {
    document.querySelector(".animation").style.cssText = `animation: change-opacity infinite 1s 4s`;
    this.parentElement.style.display = "none";
    let userName = prompt("Enter You Name : ");
    document.querySelector(".name").innerHTML = userName !== "" && userName !== null ? userName : "Guest";
    sessionStorage.setItem("name", document.querySelector(".name").innerHTML);
    show();
    hidden();
    Time();
}