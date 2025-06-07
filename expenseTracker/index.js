const title1 = document.querySelector('#Title')
const amount1 = document.querySelector('#Amount');
const modalOptions = document.querySelector('#modal-options');
const submitBtn = document.querySelector('.submit-btn');
const updateBtn = document.querySelector('.update-btn');
let closeBtn = document.querySelector('.close-btn')
let addBtn = document.querySelector('.btn');
let modelOverLay = document.querySelector('.modal-overlay');
let tbody = document.querySelector('tbody');
let balanceTop = document.querySelector('.balance')
let income = document.querySelector('.income')
let expense = document.querySelector('.expense')

let myData = []
let pieChart; // Chart instance

if (localStorage.getItem('transaction') != null) {
    const data = JSON.parse(localStorage.getItem('transaction'));
    if (Array.isArray(data)) {
        myData = data;
    } else {
        myData = [];
    }
}

function showModel() {
    addBtn.addEventListener('click', () => {
        modelOverLay.style.display = 'flex';
    });
    closeBtn.addEventListener('click', () => {
        modelOverLay.style.display = 'none'
    });

}

function getData() {
    if (localStorage.getItem('transaction') != null) {
        myData = JSON.parse(localStorage.getItem('transaction'));
    }

    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const title = title1.value.trim();
        const amount = amount1.value.trim();
        const options = modalOptions.value;

        if (title && amount && options) {
            const obj = {
                title,
                amount,
                options,
                date: new Date().toLocaleString()
            };

            myData.push(obj);
            localStorage.setItem('transaction', JSON.stringify(myData));

            // Clear inputs
            title1.value = '';
            amount1.value = '';
            modalOptions.value = '';

            // Close modal
            modelOverLay.style.display = 'none';

            // Optional: Update table
            displayDataInTable();
            calculation()
        } else {
            alert("Please fill all fields");
        }
    });
}

function dateFunction(d) {
    let date = new Date(d);
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yy = date.getFullYear();
    let time = date.toLocaleTimeString();

    mm = mm < 10 ? "0" + mm : mm;
    dd = dd < 10 ? "0" + dd : dd;
    return `${dd}-${mm}-${yy}  ${time}`


}


function displayDataInTable() {
    tbody.innerHTML = ""
    myData.sort((a, b) => new Date(b.date) - new Date(a.date));

    myData.forEach((value, ixd) => {
        let rowClass = value.options === 'credit' ? 'credit-row' : 'debit-row';

        tbody.innerHTML += `
      <tr class="${rowClass}">
        <td data-label="Title">${value.title}</td>
        <td data-label="Amount">${value.amount}</td>
        <td data-label="Transaction">${value.options}</td>
        <td data-label="Date">${dateFunction(value.date)}</td>
        <td data-label="Action">
          <button class="edit" title="${value.title}" amount="${value.amount}" trans="${value.options}" id="${ixd}"><i class="ri-pencil-line"></i></button>
          <button class="delete" id="${ixd}"><i class="ri-delete-bin-fill"></i></button>
        </td>
      </tr>
    `;

    })

    // delete
    document.querySelectorAll('.delete').forEach((btn) => {
        btn.addEventListener('click', () => {

            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                if (result.isConfirmed) {
                    myData.splice(btn.id, 1);
                    displayDataInTable()
                    localStorage.setItem('transaction', JSON.stringify(myData));
                    calculation()
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                }
            });

        })
    })

    // edit
    document.querySelectorAll('.edit').forEach((btn, ind) => {
        btn.addEventListener('click', () => {
            modelOverLay.style.display = 'flex';
            title1.value = btn.getAttribute('title')
            amount1.value = btn.getAttribute('amount')
            modalOptions.value = btn.getAttribute('trans')
            submitBtn.style.display = "none"

            editIndex = btn.id
            updateBtn.onclick = () => {
                const title = title1.value.trim();
                const amount = amount1.value.trim();
                const options = modalOptions.value;

                if (title && amount && options) {
                    myData[editIndex] = {
                        title,
                        amount,
                        options,
                        date: new Date().toLocaleString()
                    };


                    localStorage.setItem('transaction', JSON.stringify(myData));

                    // Clear inputs
                    title1.value = '';
                    amount1.value = '';
                    modalOptions.value = '';

                    // Close modal
                    modelOverLay.style.display = 'none';

                    // Optional: Update table
                    displayDataInTable();
                    calculation()
                } else {
                    alert("Please fill all fields");
                }
            }

        })

    })
}


function calculation() {
    let totalCredit = 0;
    let totalDebit = 0;

    myData.forEach((item) => {
        const amount = parseFloat(item.amount);

        if (item.options == 'credit') {
            totalCredit += Number(amount)
        }
        else if (item.options == 'debit') {
            totalDebit += Number(amount)

        }

    })
    const balance = totalCredit - totalDebit;

    balanceTop.innerText = balance.toFixed(2);
    balance < 0
        ? (balanceTop.style.color = 'red')
        : (balanceTop.style.color = 'green');

    expense.innerText = Number(totalDebit.toFixed(2));
    income.innerText = Number(totalCredit.toFixed(2));
}

// function edit(){


// }
// edit()

calculation()
displayDataInTable();
getData()
showModel()



