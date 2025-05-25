function popup() {
    let btnOpen = document.querySelector('.open-btn');
    let btnClose = document.querySelector('.close-btn');
    let popupOverlay = document.querySelector('.popup-overlay ')
    btnOpen.addEventListener('click', () => {

        popupOverlay.style.display = 'flex'
        btnOpen.style.display = 'none'

    })
    setTimeout(() => {

        popupOverlay.style.display = 'flex'
        btnOpen.style.display = 'none'

    }, 1000);
    btnClose.addEventListener('click', () => {

        popupOverlay.style.display = 'none'
        btnOpen.style.display = 'block'


    })

    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.style.display = 'none';
            btnOpen.style.display = 'block'

        }
    })


}
popup()