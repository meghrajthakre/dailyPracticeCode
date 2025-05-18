function todo() {
  let btn = document.querySelector(".btn");
  let inp = document.querySelector(".inp");
  let data = [];

  function add() {
    btn.addEventListener("click", () => {
      if (inp.value === "") {
        alert("please add the task");
      } else {
        data.push({
          todo: inp.value,
        });
      }

      renderData();
      inp.value = "";
    });
  }

  add();
  function renderData() {
    let todosLists = document.querySelector(".todos-lists ");
    let sum = "";

    data.forEach((data, i) => {
      sum =
        sum +
        `
      <ol>
        <li >${i + 1} ${
          data.todo
        } <i id=${i} class="delete1 ri-delete-bin-5-line"></i> 
                   <i id=${i}     class="checked ri-check-double-line"></i>
         </li>
     </ol>
    `;
    });
    todosLists.innerHTML = sum;

    document.querySelectorAll(".delete1").forEach((btn) => {
      btn.addEventListener("click", () => {
        data.splice(btn.id, 1);
        renderData();
      });
    });
    let check = document.querySelectorAll(".checked");

    check.forEach((btn) => {
      btn.addEventListener("click", function () {
        btn.classList.toggle("checked");
      });
    });
  }
}

todo();
