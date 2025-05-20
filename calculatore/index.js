let number = "";

let buttons = document.querySelectorAll(".button");

Array.from(buttons).forEach((button) => {
  button.addEventListener("click", (e) => {
    try {
      if (e.target.innerHTML == "=") {
        number = eval(number);
        document.querySelector(".input").value = number;
      } else if (e.target.innerHTML == "C") {
        number = "";
        document.querySelector(".input").value = number;
      } else {
        number = number + e.target.innerHTML;
        document.querySelector(".input").value = number;
      }
    } catch (error) {
      number = "";
      document.querySelector(".input").value = number;

      alert("Please add valid calculation");
    }
  });
});
