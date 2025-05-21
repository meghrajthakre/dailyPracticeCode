function generateQuote() {
  let show = document.querySelector(".qoutes h1");
  let btn = document.querySelector(".btn-genarate");
  let selectBtn = document.querySelector(".category");
  let writter = document.querySelector(".qoutes h3");
  let copyBtn = document.querySelector(".btn-copy");
  let showBtn = document.querySelector(".btn-show");
  let btnSave = document.querySelector(".btn-save");

  let content = "";
  let legend = "";
  async function fetchFunction(props) {
    try {
      let response = await fetch(
        `https://api.quotable.io/quotes/random?tags=${props}`
      );
      let data = await response.json();

      content = `" ${data[0].content}"`;
      legend = `" ${data[0].author} "`;
      writter.innerHTML = legend;
      show.textContent = content;
    } catch (error) {
      alert(error);
    }
  }
  btnSave.addEventListener("click", () => {
    // Get existing data
    let stored = JSON.parse(localStorage.getItem("quoteData")) || [];

    // Add new quote
    stored.push({
      quote: content,
      author: legend,
    });

    // Save back to storage
    localStorage.setItem("quoteData", JSON.stringify(stored));
  });

  btn.addEventListener("click", () => {
    fetchFunction(selectBtn.value);
  });

  copyBtn.addEventListener("click", () => {
    const textToCopy = show.textContent;

    const tempInput = document.createElement("textarea");
    tempInput.value = textToCopy;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    alert("Quote copied to clipboard!");
  });

  function savedButtons() {
    showBtn.addEventListener("click", () => {
      let saved = document.querySelector(".saved");

      let sum = "";
      saved.style.display = "block";

      let savedQuotes = JSON.parse(localStorage.getItem("quoteData")) || [];

      if (savedQuotes.length === 0) {
        saved.innerHTML = "<p>No saved quotes yet.</p>";

        return;
      }

      savedQuotes.forEach((item, i) => {
        sum += `
                <li >${item.quote}  <span>  Author Name-${item.author}</span>
                  <i id=${i} class="btn35 ri-delete-bin-6-line"></i>
                </li>
              `;
      });
      saved.innerHTML = sum;

      document.querySelectorAll(".btn35").forEach((btn) => {
        btn.addEventListener("click", (e) => {
          let id = e.target.getAttribute("data-id");

          savedQuotes.splice(btn.id, 1);
          localStorage.setItem("quoteData", JSON.stringify(savedQuotes)); // update storage
          showBtn.click(); // re-render
        });
      });
    });
  }
  savedButtons();
}

generateQuote();
