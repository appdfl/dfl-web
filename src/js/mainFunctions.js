/* O loop abaixo é responsável por fixar a largura dos botões da nav bar para que quando o texto fique em negrito o tamanho não aumente e empurre os outros elementos */
function updateMenuButtonsWidth() {
    const liList = document.querySelectorAll('.menu .list li') //as NodeListOf<HTMLElement>;
    liList.forEach(list => {
        list.style.width = `${list.offsetWidth + 15}px`;
    })
}
updateMenuButtonsWidth()

function onScroll() {
    showNavOnScroll()
    showBackToTopButtonOnScroll()
}

window.addEventListener('scroll', onScroll)

function showNavOnScroll() {
    if (scrollY === 0) {
        navigation.classList.remove("scroll")
    } else {
        navigation.classList.add("scroll")
    }
}

function showBackToTopButtonOnScroll() {
    if (scrollY > 500) {
        backToTopButton.classList.add("show")
    } else {
        backToTopButton.classList.remove("show")
    }
}

function closeMenu() {
    document.body.classList.remove('menu-expanded')
}

ScrollReveal({
    delay: 125,
    origin: 'up',
    distance: '30px',
}).reveal(`
    #home, 
    #home img, 
    #about,
    #about header,
    #about .phone-container,
    #about .content,
    #reports,
    #reports .card-1,
    #reports .card-2,
    #reports .card-3,
    #community,
    #community img,
    #download,
    #download header,
    #download img,
    #download .wrapper.second
`);