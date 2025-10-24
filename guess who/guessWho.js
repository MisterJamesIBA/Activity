const GIRLS = [
    "alex",
    "allison",
    "andrea",
    "anita",
    "ashley",
    "belle",
    "betty",
    "chelsie",
    "cheryl",
    "cleo",
    "ellie",
    "emaa",
    "holly",
    "karen",
    "kate",
    "kristy",
    "liz",
    "maria",
    "meredith",
    "nina",
    "olivia",
    "pam",
    "pat",
    "rachel",
    "ruth",
    "sabrina",
    "sadie",
    "sam",
    "sandy",
    "sarah",
    "sophie",
    "steph",
    "sue",
    "tammy",
    "yoko",
    "zoe"
]

const BOYS = [
    "adam",
    "adrian",
    "alfred",
    "ben",
    "bernard",
    "brandon",
    "charles",
    "cooper",
    "daniel",
    "david",
    "domenic",
    "dracula",
    "eric",
    "ethan",
    "frank",
    "fredrick",
    "gavin",
    "herman",
    "jack",
    "jacob",
    "james",
    "joe",
    "joshua",
    "kevin",
    "luke",
    "mario",
    "matthew",
    "max",
    "michael",
    "oliver",
    "paul",
    "richie",
    "robert",
    "roger",
    "simon",
    "victor"
]

const BETTER = [
    "al",
    "amy",
    "ben",
    "carmen",
    "daniel",
    "david",
    "emma",
    "eric",
    "joe",
    "jordan",
    "katie",
    "laura",
    "leo",
    "lily",
    "mia",
    "mike",
    "olivia",
    "rachel",
    "sam",
    "sofia",
]

function createCard(path) {

    let card = document.createElement("div");
    card.className = "flip-card";

    let cardInner = document.createElement("div");
    cardInner.className = "flip-card-inner";

    // front
    let cardFront = document.createElement("div");
    cardFront.className = "flip-card-front";

    let frontImg = document.createElement("img");
    frontImg.src = path;

    // back
    let cardBack = document.createElement("div");
    cardBack.className = "flip-card-back";

    let backImg = document.createElement("img");
    backImg.src = "./img/back.jpg";

    cardFront.appendChild(frontImg);
    cardBack.appendChild(backImg);

    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);

    card.appendChild(cardInner);

    card.addEventListener("click", () => {
        if (card.classList.contains("flip")) {
            card.classList.remove("flip");
        }
        else {
            card.classList.add("flip");
        }
    })

    return card;


}


const USE_BETTER = Math.random() > 0.5;

window.onload = function () {
    let boyPath = Array.from(BOYS, (name) => `./img/boys/${name}.jpg`).sort(() => Math.random() - 0.5).slice(0, 10);
    let girlPath = Array.from(GIRLS, (name) => `./img/girls/${name}.jpg`).sort(() => Math.random() - 0.5).slice(0, 10);

    let combined = boyPath.concat(girlPath).sort(()=>Math.random() - 0.5);


    console.log(combined.length);

    let cardBox = document.querySelector("#cardBoxOne");
    let cardBoxTwo = document.querySelector("#cardBoxTwo");

    let betterCards = Array.from(BETTER, (name)=>`./img/better/split/${name}.jpg`).sort(()=>Math.random() - 0.5);

    function getCard(index){
        if(USE_BETTER){
            return combined[index];
        }
        return betterCards[index];
    }
    for (let i = 0; i < combined.length; i++) {

        let cardPath = getCard(i);

        let card = createCard(cardPath);
        cardBox.appendChild(card);

        let cardTwo = createCard(cardPath);
        cardBoxTwo.appendChild(cardTwo);
    }


    let playerOneOpen = document.querySelector("#playerOneOpen");
    let playerOneInfo = document.querySelector("#playerOneInfo");


    let playerTwoOpen = document.querySelector("#playerTwoOpen");
    let playerTwoInfo = document.querySelector("#playerTwoInfo");

    let oneIndex = Math.floor(Math.random() * 20);
    let twoIndex = Math.floor(Math.random() * 20);

    let oneCard = createCard(getCard(oneIndex));
    let twoCard = createCard(getCard(twoIndex));

    playerOneInfo.appendChild(oneCard);
    playerTwoInfo.appendChild(twoCard);

    playerOneOpen.addEventListener("click", () => {

        if (playerOneInfo.classList.contains("hide")) {
            playerOneInfo.classList.remove("hide");
        }
        else {
            playerOneInfo.classList.add("hide");
        }

    });

    playerTwoOpen.addEventListener("click", () => {

        console.log("hi")

        if (playerTwoInfo.classList.contains("hide")) {
            playerTwoInfo.classList.remove("hide");
        }
        else {
            playerTwoInfo.classList.add("hide");
        }

    });
}