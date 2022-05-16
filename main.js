window.addEventListener('scroll', onScroll)

onScroll() // Precisamos atualizar pelo menos uma vez
function onScroll() {
    showNavOnScroll()
    //showBackToTopButtonOnScroll()

    /* activateMenuAtCurrentSection(home)
    activateMenuAtCurrentSection(services)
    activateMenuAtCurrentSection(about)
    activateMenuAtCurrentSection(contact) */
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

function closeMenu() {
    document.body.classList.remove('menu-expanded')
}