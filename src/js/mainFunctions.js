/* O loop abaixo é responsável por fixar a largura dos botões da nav bar para que quando o texto fique em negrito o tamanho não aumente e empurre os outros elementos */
function updateMenuButtonsWidth() {
    const liList = document.querySelectorAll('.menu .list li')
    liList.forEach(list => {
        list.style.width = `${list.offsetWidth + 15}px`;
    })
}
updateMenuButtonsWidth()

window.addEventListener('scroll', onScroll)

onScroll() // Precisamos atualizar pelo menos uma vez
function onScroll() {
    showNavOnScroll()
    showBackToTopButtonOnScroll()
}

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

function openMenu() {
    document.body.classList.add('menu-expanded')
}

function closeMenu(section) {
    document.body.classList.remove('menu-expanded')
}