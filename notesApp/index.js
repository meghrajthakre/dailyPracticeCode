let addBtn = document.querySelector('#addNoteBtn');
let inputWrapper = document.querySelector('.input-wrapper');
let inputWriter = document.querySelector('#noteTitleInput');
let slideNotes = document.querySelector('.sidebar')
let descriptions = document.querySelector('.editor')
let saveBtn = document.querySelector('#saveNoteBtn')
function showBtn() {
    addBtn.addEventListener('click', () => {
        inputWrapper.style.display = 'flex';
        inputWriter.focus();
    })

}

const formData = []

function createNotes(title, description) {


    let noteDiv = document.createElement('div');
    noteDiv.classList.add('note-item');
    noteDiv.innerHTML = `
          <h2>${noteIndex}. ${title}</h2>
        <h4>${description}</h4>
    `
    noteDiv.addEventListener('click', () => {
        inputWriter.value = title;
        descriptions.value = description;
        inputWrapper.style.display = 'flex';
        inputWriter.focus();
    })


    slideNotes.appendChild(noteDiv)
    inputWriter.value = " "
}
function addNotesItems() {


    saveBtn.addEventListener('click', () => {
        let enterValue = inputWriter.value.trim();
        let enterDesc = descriptions.value.trim();

        if (enterValue == '') {
            alert('please Add Title First');
            return
        }
        if (enterDesc == '') {
            alert('please Add Title First');
            return
        }

        createNotes(enterValue, enterDesc)

        formData.push({
            title: enterValue,
            description: enterDesc
        })

        enterValue.value = "";
        descriptions.value = "";
        inputWrapper.style.display = 'none';


    }

    )
}

function renderData() {

    itemsData.forEach(item => {
        createNotes(item.title, item.description);
    });

}
renderData()

addNotesItems()
showBtn()
