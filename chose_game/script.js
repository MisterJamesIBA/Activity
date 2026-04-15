const STATE = {
    BUSY: 0,
    WAIT: 1
}

const showBox = (box) => {
    if (box.classList.contains("hide")) {
        box.classList.remove("hide");
    }
}

const hideBox = (box) => {
    if (!box.classList.contains("hide")) {
        box.classList.add("hide");
    }
}

const startGame = (story) => {
    // canvas handlers
    const canvas = document.querySelector(".background-layer");
    let ctx = canvas.getContext("2d");

    // effect canvas
    const effectCanvas = document.querySelector(".effect-layer");
    let ctx1 = effectCanvas.getContext("2d");

    const gameRoot = document.querySelector(".game-root");

    // buttons
    let btnA = this.document.querySelector("#btnA");
    let btnB = this.document.querySelector("#btnB");

    // story progress
    let proIndex = 0;
    let state = STATE.WAIT;
    let cs; // curent story

            // sound effects
        let ts = new Audio("./audio/tap.mp3");

    // layers
    const btnLayer = document.querySelector(".btn-layer");
    const textLayer = document.querySelector(".text-layer");

    // text box
    let textBox = this.document.querySelector("#textBox");

    canvas.width = gameRoot.offsetWidth;
    canvas.height = gameRoot.offsetHeight;

    effectCanvas.width = gameRoot.offsetWidth;
    effectCanvas.height = gameRoot.offsetHeight;

    // write text and change state when finished
    // add true : add to last line, flase : clear text then write
    const writeText = (textBox, text, add) => {
        let target;
        if (add) {
            target = textBox.innerHTML + text;
        }
        else {
            textBox.innerHTML = "";
            target = text;
        }

        

        state = STATE.BUSY;
        let handle = setInterval(() => {
            if (textBox.innerHTML.length >= target.length) {
                clearInterval(handle);
                state = STATE.WAIT;
                ts.pause();
                return;
            }
            ts.play();
            textBox.innerHTML += target[textBox.innerHTML.length];
        }, 100);
    }

    // change the background 
    const changeBack = (path) => {
        const loadImg = () => {
            let img = document.createElement("img");
            img.src = path;
            img.onload = () => {
                console.log(path);
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
            }
        }

        let loop = 0;
        let max = 180;
        let handle = setInterval(() => {
            let a = Math.sin(loop * Math.PI / 180);
            ctx1.clearRect(0, 0, this.innerWidth, this.innerHeight);
            ctx1.fillStyle = `rgba(0, 0, 0, ${a})`;
            ctx1.fillRect(0, 0, this.innerWidth, this.innerHeight);
            if (loop == 90) {
                loadImg();
            }
            if (loop >= max) {
                clearInterval(handle);
            }
            loop++;
        }, 10)
    }

    // get next line
    const nextLine = () => {

        if (proIndex >= story.length) {
            return alert("finish");
        }

        // get the currect story
        cs = story[proIndex];

        // audio handler
        let audio;

        // increment index
        proIndex++;

        if (state == STATE.BUSY) {
            return;
        }

        // action based on type
        switch (cs.type) {
            case "MUSIC":
                if(audio){
                    audio.pause();
                }
                audio = new Audio("./audio/happy.mp3");
                audio.play();
                audio.loop = true;
                break;
            case "TEXT":
                writeText(textBox, cs.text, cs.add);
                break;
            case "BACKGROUND":
                changeBack(cs.path);
                break;
            case "DECISION":
                showBox(btnLayer);
                btnA.innerHTML = cs.a;
                btnB.innerHTML = cs.b;
                break;
            case "MOVE":
                proIndex += cs.move;
            default:
                break;
        }
    }

    // decision button function
    // choise true : a or false : b
    const decBtn = (choice) => {
        if (choice) {
            console.log(cs.a);
            proIndex += cs.aStep;
        }
        else {
            console.log(cs.b);
            proIndex += cs.bStep;
        }

        hideBox(btnLayer);
        nextLine();
    }

    // add event listeners

    // click on text box
    textLayer.addEventListener("click", nextLine);

    btnA.addEventListener("click", () => {
        decBtn(true);
    });

    btnB.addEventListener("click", () => {
        decBtn(false);
    });
}


window.onload = function () {
    // load the story
    fetch("./json/grammor_test.json")
        .then((res) => res.text())
        .then((text) => {
            let json = JSON.parse(text);
            startGame(json.story);
        })
        .catch((e) => console.error(e));
}

