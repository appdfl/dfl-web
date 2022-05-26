const animation_time = 250 // 0.25 segundos

const column1 = document.querySelector("#about .column-1");
const column1_child = column1.childNodes;
// As colunas são sempre os items [1, 3 e 5] (por algum motivo os outros são textos "\n")

const column1_1 = column1_child[1]
const column1_2 = column1_child[3]
const column1_3 = column1_child[5]

// Para obtermos o elemento [i] de ícone, precisamos entrar primeiro na info-shape, para daí entrar no [i]
const icon1_1 = column1_1.childNodes[1].childNodes[1]
const text1_1 = column1_1.childNodes[3]

const icon1_2 = column1_2.childNodes[1].childNodes[1]
const text1_2 = column1_2.childNodes[3]

const icon1_3 = column1_3.childNodes[1].childNodes[1]
const text1_3 = column1_3.childNodes[3]

const column2 = document.querySelector("#about .column-2")
const column2_child = column2.childNodes;

const column2_1 = column2_child[1]
const column2_2 = column2_child[3]
const column2_3 = column2_child[5]

const icon2_1 = column2_1.childNodes[1].childNodes[1]
const text2_1 = column2_1.childNodes[3]

const icon2_2 = column2_2.childNodes[1].childNodes[1]
const text2_2 = column2_2.childNodes[3]

const icon2_3 = column2_3.childNodes[1].childNodes[1]
const text2_3 = column2_3.childNodes[3]

const icons = [icon1_1, icon1_2, icon1_3, icon2_1, icon2_2, icon2_3]
const texts = [text1_1, text1_2, text1_3, text2_1, text2_2, text2_3]

let lastButtonPressed;
async function changeAboutInstance(element, instance) {

    const response = await fetch("/src/utils/data/aboutInfo.json");
    const aboutInfo = await response.json();
    console.log(aboutInfo)

    const imageElement = document.getElementById("app-overlay")
    imageElement.classList.remove('fade-in')
    imageElement.classList.add('fade-out');
    //console.log("Ocultamos a imagem")

    column1.classList.remove("fade-in")
    column1.classList.add("fade-out")
    column2.classList.remove("fade-in")
    column2.classList.add("fade-out")
    setTimeout(function () {
        column1.classList.remove("fade-out")
        column1.classList.add("fade-in")

        imageElement.classList.remove('fade-out')
        imageElement.classList.add('fade-in');
        switch (instance) {
            case "community":
                column2.classList.remove("fade-out")
                column2.classList.add("fade-in")

                imageElement.src = "/src/assets/screens/CommunityScreen.png"
                for (let index = 0; index < aboutInfo.community.length; index++) {
                    const icon = icons[index];
                    const text = texts[index];
                    const info = aboutInfo.community[index]
                    icon.textContent = info.icon
                    text.innerHTML = `<span class="bolder">${info.title}</span><br />${info.description}`
                }
                break;
            case "reports":
                column2.classList.remove("fade-out")
                column2.classList.add("fade-in")

                imageElement.src = "/src/assets/screens/ReportsScreen.png"
                for (let index = 0; index < aboutInfo.reports.length; index++) {
                    const icon = icons[index];
                    const text = texts[index];
                    const info = aboutInfo.reports[index]
                    icon.textContent = info.icon
                    text.innerHTML = `<span class="bolder">${info.title}</span><br />${info.description}`
                    console.log(icon.textContent, info.icon)
                }
                break;
            case "notify":
                imageElement.src = "/src/assets/screens/ReportScreen_1.png"
                for (let index = 0; index < aboutInfo.notify.length; index++) {
                    const icon = icons[index];
                    const text = texts[index];
                    const info = aboutInfo.notify[index]
                    icon.textContent = info.icon
                    text.innerHTML = `<span class="bolder">${info.title}</span><br />${info.description}`
                }
                column2.classList.remove("fade-in")
                column2.classList.add("fade-out")
                break;
            default:
                break;
        }

        console.log("Exibimos a imagem.")
    }, animation_time);

    if (!lastButtonPressed) {
        lastButtonPressed = document.querySelector(`#about button.selected`)
    }

    lastButtonPressed.classList.remove('selected')
    element.classList.add('selected')

    lastButtonPressed = element
}

// Get the modal
const downloadModal = document.getElementById("download-modal");
// Get the <span> element that closes the modal
const closeSpan = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
function openDownloadModal() {
    downloadModal.style.display = "block";
}

function closeDownloadModal() {
    downloadModal.classList.add("fade-out")
    setTimeout(() => {
        downloadModal.classList.remove("fade-out")
        downloadModal.style.display = "none";
    }, 400);
}

window.addEventListener('click', onScreenClick)

function onScreenClick(event) {
    if (event.target == downloadModal) {
        console.log("fecha")
        closeDownloadModal()
    }
}

/* Header Functions */
// Configuramos a possibilidade de clique nos botões de seção da navBar
const navLine = document.querySelector("#nav-line")
const items = document.querySelectorAll('.menu .list a')

function indicator(element) {
    /* navLine.style.left = `${element.offsetLeft}px`; */
    /* navLine.style.width = `${element.offsetWidth}px`; */
    navLine.style.left = `${element.offsetLeft + (element.offsetWidth / 2) - (navLine.offsetWidth / 2)}px`;
}

/* Seções da Navigation Bar */
const sections = [home, about, reports, community]
let lastSection = sections[0]

window.addEventListener('scroll', onScroll)

onScroll() // Precisamos atualizar pelo menos uma vez
function onScroll() {
    changeMenuSection()
}

// Precisamos atualizar pelo menos uma vez
const menuElement = document.querySelector(`.menu a[href*=home]`)
menuElement.classList.add('active')

function changeMenuSection() {
    const middleLine = scrollY + (innerHeight / 2)

    function getCurrentSection(section) {
        // Verificando em qual seção o usuário está
        // Utilizaremos o "id" da seção e obteremos o "offsetTop"
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight

        const sectionIsAboveOrInsideMiddleLine = middleLine >= sectionTop

        const nextSectionBegin = sectionHeight + sectionTop // Somamos o tamanho fixo da seção com o valor da altura da seção para sabermos a localização de início da seção seguinte
        const nextSectionIsUnderMiddleLine = middleLine < nextSectionBegin

        const isInBoundaries = sectionIsAboveOrInsideMiddleLine && nextSectionIsUnderMiddleLine

        if (isInBoundaries) {
            return true
        }
    }

    sections.forEach(section => {
        if (section !== lastSection) {
            const sectionIsInBoundaries = getCurrentSection(section)
            if (sectionIsInBoundaries) {
                const sectionId = section.getAttribute("id")
                //console.log(`Atual: ${sectionId}`)
                const menuElement = document.querySelector(`.menu a[href*=${sectionId}]`)
                menuElement.classList.add('active')
                //clicked = false;
                indicator(menuElement)

                const lastSectionId = lastSection.getAttribute("id")
                // console.log(`Anterior: ${lastSectionId}`)
                const lastMenuElement = document.querySelector(`.menu a[href*=${lastSectionId}]`)
                lastMenuElement.classList.remove('active')

                lastSection = section
            }
        }
    });
}

function openMenu() {
    document.body.classList.add('menu-expanded')
}

function closeAndUpdateMenu(section) {
    document.body.classList.remove('menu-expanded')

    // Essencial para que o botão clicado seja des-selecionado quando o usuário rolar a página
    if (section) {
        lastSection = section
    }
}

window.addEventListener('resize', onScreenResize)

const navBarButton = document.querySelector("#navigation .button");
function onScreenResize() {
    const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    //console.log(width)
    if (width >= 1024) {
        navBarButton.textContent = "Baixar o Aplicativo"

        // O atraso é necessário para que a barra de navegação termine a animação e o botão fique no local correto
        setTimeout(() => {
            const lastSectionId = lastSection.getAttribute("id")
            const menuElement = document.querySelector(`.menu a[href*=${lastSectionId}]`)
            indicator(menuElement)
        }, 250);
    } else {
        navBarButton.textContent = "Baixar o App"
    }
}

/* Para já atualizar o texto do botão independente de ter alterado o tamanho da tela */
onScreenResize()