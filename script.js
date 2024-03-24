const fruitsoorten = [
    { naam: "appel", hint: "dit wordt gebruikt in taarten" },
    { naam: "banaan", hint: "dit eten apen graag" },
    { naam: "sinaasappel", hint: "hier wordt een ontbijt drankje van gemaakt" },
    { naam: "peer", hint: "de smaak van een bekend waterijsje" },
    { naam: "druif", hint: "hier wordt wijn van gemaakt" },
    { naam: "kiwi", hint: "dit is harig aan de buitenkant" },
    { naam: "mango", hint: "dit wordt vaak in smoothies gebruikt" },
    { naam: "ananas", hint: "sommige mensen eten dit op pizza" }
];

let chosenWord

function randomWord() {
    let randomIndex = Math.floor(Math.random() * fruitsoorten.length);
    chosenWord = fruitsoorten[randomIndex].naam;
    let chosenHint = fruitsoorten[randomIndex].hint;
    console.log("Woord:", chosenWord);
    console.log("Hint:", chosenHint);
    fruitsoorten.splice(randomIndex, 1); // dit zorgt ervoor dat elk fruitsoorten maar 1 keer voorkomt
    let hint = document.querySelector(".hint")
    hint.textContent = ("Hint: ") + chosenHint
}

randomWord();



let invoer = document.querySelector("input")
const button = document.querySelector("button");
let checken = document.querySelector("h1")
let ishetwoordcorrect = false // hiermee kun je bijhouden of het woord goed is geraden of niet


function raadWoord() {
    if (chosenWord == invoer.value && ishetwoordcorrect == false) {   // wanneer het woord correct is geraden veranderd de h1 naar correct en kun je naar het volgende woord
        checken.textContent = "Correct"
        ishetwoordcorrect = true
        increaseScore()
        button.textContent = "Volgende"

    } else if (ishetwoordcorrect == true) { // als het word goed is geraden word de input clear en veranderd de button naar volgende
        randomWord()
        ishetwoordcorrect = false
        checken.textContent = "Raad het fruit"
        invoer.value = ""
        button.textContent = "Volgende"
    } else { // wanneer het woord fout is geraden of de gebruiker op volgende klikt zonder iets in te voeren veranderd de h1 naar fout! en kun je niet door met het spel totdat je een correct antwoord hebt ingevoerd
        checken.textContent = "Fout!"
        invoer.value = ""
        resetScore()
        button.textContent = "Controleer"
    }
}

button.addEventListener("click", raadWoord);

const scoreTeller = document.querySelector("h2")
let score = 0
const overlay = document.querySelector(".overlay")

function updateScore() {
    document.querySelector("h2").textContent = `${score}/5`;

    if (score === 5) {
        gefeliciteerd()
    }
}

function increaseScore() {
    if (score < 5) {
        score++
        updateScore()

    }
}

function resetScore() {
    score = 0
    updateScore()
}

updateScore()

function gefeliciteerd() { // wanneer de gebruiker alle 5 de woorden heeft geraden krijg je een pop up met gefeliciteerd en de optie om opnieuw te spelen of om het spel te verlaten. Ook heeft Chatgpt mij met deze functie geholpen.
    overlay.classList.remove("hidden");
    document.body.classList.add("blur");
}

document.getElementById("opnieuw").addEventListener("click", () => {
    overlay.classList.add("hidden");
    document.body.classList.remove("blur");
    resetGame();
});

document.getElementById("verlaat").addEventListener("click", () => {
});

function resetGame() {
    randomWord();
    resetScore();
}