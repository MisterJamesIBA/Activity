const spin = new Audio('./sound/ding.mp3');
const ding = new Audio('./sound/spin.mp3');
const TEXT = document.querySelector("#textBox");

window.onload = function () {
    const level = document.querySelector("#level");
    const base = document.querySelector(".base");


    let select;
    let copy;
    let busy = false;

    const getQuests = () => {
        select = PICK[Number(level.value)];
        copy = JSON.parse(JSON.stringify(select)).sort(() => Math.random() - 0.5);
    }

    level.addEventListener("change", getQuests);

    base.addEventListener("click", () => {
        if (busy) {
            return;
        }

        busy = true;
        ding.play();
        let count = 0;
        let max = 34;

        let pick = copy.splice(0, 1);
        console.log(pick);

        if (copy.length <= 0) {
            copy = JSON.parse(JSON.stringify(select)).sort(() => Math.random() - 0.5);
        }

        let handle = setInterval(() => {
            TEXT.innerHTML = select[Math.floor(Math.random() * select.length)];
            count++;
            if (count > max) {
                clearInterval(handle);
                TEXT.innerHTML = pick;
                spin.play();
                busy = false;
            }
        }, 100)
    });

    getQuests();

}