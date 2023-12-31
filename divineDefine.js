const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const sound = document.getElementById("sound");
const searchBtn = document.getElementById("searchBtn");
const result = document.getElementById("result");
const wordInput = document.getElementById("wordInput");

// Press Enter to Search
wordInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchBtn.click();
  }
});

searchBtn.addEventListener("click", () => {
  const wordInput = document.getElementById("wordInput").value;
  console.log(wordInput);
  if (!wordInput == "") {
    fetch(`${url}${wordInput}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        result.innerHTML = `  <div id="word">
                <h3>${wordInput}</h3><button onclick="pronounce()"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <div id="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>/${data[0].phonetic}/</p>
            </div>
            <div id="wordMeaning-copyBtn">
                <p id="wordMeaning">${
                  data[0].meanings[0].definitions[0].definition
                }</p>
                <button id="copyBtn"><i class="fa-solid fa-copy"></i></button>
            </div>
            <p id="wordExample">${
              data[0].meanings[0].definitions[0].example ||
              data[0].meanings[1]?.definitions[0]?.example ||
              "null"
            }</p>`;
        sound.setAttribute(
          "src",
          `${
            data[0].phonetics[0]?.audio || //Optional Chaining (?.) Operator chatGPT's suggestion
            data[0].phonetics[1]?.audio ||
            data[0].phonetics[2]?.audio
          }`
        );
        const copyBtn = document.getElementById("copyBtn");
        copyBtn.addEventListener("click", () => {
          copyToClipboard(data[0].meanings[0].definitions[0].definition);
        });
      })
      .catch((error) => {
        result.innerHTML = `<h3 id="errorMessage">Sorry pal, we couldn't find definitions for the word you were looking for.</h3>`;
        console.log(error);
        console.log(error.message);
      });
  } else {
    result.innerHTML = `<h3 id="errorMessage">Atleast provide me a word man!</h3>`;
  }
});
const pronounce = () => {
  sound.play();
};
const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log(`${text} is copied to clipboard!`);
    })
    .catch((error) => {
      console.error("Copy failed:", error);
    });
};
