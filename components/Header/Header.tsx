import Link from 'next/link';
import { useEffect, useState } from 'react';

import styles from './header.module.css';
import Logo from '/public/logo.svg'

// Configuramos a possibilidade de clique nos botões de seção da navBar
const navLine = document.querySelector("#nav-line") as HTMLElement;
function updateNavLine(element) {
    /* navLine.style.left = `${element.offsetLeft}px`; */
    /* navLine.style.width = `${element.offsetWidth}px`; */
    navLine.style.left = `${element.offsetLeft + (element.offsetWidth / 2) - (navLine.offsetWidth / 2)}px`;
}

/* Seções da Navigation Bar */
const sections = [document.querySelector("#home"), document.querySelector("#about"), document.querySelector("#reports"), document.querySelector("#community")]
let lastSection = sections[0]

function openMenu() {
    document.body.classList.add('menu-expanded')
}

function closeMenu(sectionName: string) {
    document.body.classList.remove('menu-expanded')

    // Essencial para que o botão clicado seja des-selecionado quando o usuário rolar a página
    const section = document.querySelector(`#${sectionName}`)
    if (section) {
        lastSection = section
    }
}

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

/* O loop abaixo é responsável por fixar a largura dos botões da nav bar para que quando o texto fique em negrito o tamanho não aumente e empurre os outros elementos */
function updateMenuButtonsWidth() {
    const liList = document.querySelectorAll('.menu .list li') as NodeListOf<HTMLElement>;
    liList.forEach(list => {
        list.style.width = `${list.offsetWidth + 15}px`;
    })
}
updateMenuButtonsWidth()

type Props = {
    isHome?: boolean;
}

export default function Header({ isHome }: Props) {

    const navBarButton = document.querySelector("#navigation .button");
    const [isMobile, setIsMobile] = useState(true)
    function handleScreenResize() {
        const width = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        //console.log(width)
        if (width >= 1024) {
            navBarButton.textContent = "Baixar o Aplicativo"

            // O atraso é necessário para que a barra de navegação termine a animação e o botão fique no local correto
            setTimeout(() => {
                const lastSectionId = lastSection.getAttribute("id")
                const menuElement = document.querySelector(`.menu a[href*=${lastSectionId}]`)
                updateNavLine(menuElement)
            }, 250);
        } else {
            navBarButton.textContent = "Baixar o App"
        }
    }

    /* Para já atualizar o texto do botão independente de ter alterado o tamanho da tela */
    handleScreenResize()

    const [isNavVisible, setNavVisible] = useState(false)
    function showNavOnScroll() {
        if (scrollY === 0) {
            setNavVisible(false)
        } else {
            setNavVisible(true)
        }
    }

    const handleScroll = () => {
        showNavOnScroll()
        changeMenuSection()
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        window.addEventListener('resize', handleScreenResize);
        return () => window.removeEventListener('resize', handleScreenResize);
    });

    return (
        <nav id="navigation" className={isNavVisible ? "scroll" : ""}>
            <div className="wrapper">
                <a className="logo" href="/">
                    <Logo />
                </a>

                <div className="menu">
                    <button type="button" className="close-menu" aria-expanded="true" aria-label="Fechar menu"
                        onClick={() => closeMenu}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.41 12L16.59 14.82L25.75 24L16.59 33.18L19.41 36L31.41 24L19.41 12Z" fill="white" />
                        </svg>
                    </button>
                    <div className="content">
                        <ul className="list">
                            <div id="nav-line"></div>
                            <li>
                                <Link onClick={() => closeMenu("home")} href="/#home">
                                    <a className='active' >Início</a>
                                </Link>
                            </li>
                            {
                                isHome ?
                                    <>
                                        <li><a onClick={() => closeMenu("about")} title="Sobre" href="/#about">Sobre</a></li>
                                        <li><a onClick={() => closeMenu("reports")} title="Relatórios" href="/#reports">Relatórios</a></li>
                                        <li><a onClick={() => closeMenu("community")} title="Comunidade" href="/#community">Comunidade</a></li>
                                    </>
                                    : null
                            }
                            <li>
                                <Link onClick={closeMenu} href="/perguntas-frequentes">
                                    <a>F.A.Q</a>
                                </Link>
                            </li>
                        </ul>
                        <div>
                            <a className="button" onClick={() => closeMenu} href="#download">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.4167 8.70833H13.75V3.20833H8.25V8.70833H4.58334L11 15.125L17.4167 8.70833ZM10.0833 10.5417V5.04166H11.9167V10.5417H12.9892L11 12.5308L9.01084 10.5417H10.0833ZM4.58334 16.9583H17.4167V18.7917H4.58334V16.9583Z"
                                        fill="#346259" />
                                </svg>
                                Baixar o APP
                            </a>
                            <ul className="social-links">
                                <li>
                                    <a target="_blank" href="https://instagram.com/appdfl">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17 1.99997H7C4.23858 1.99997 2 4.23855 2 6.99997V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V6.99997C22 4.23855 19.7614 1.99997 17 1.99997Z"
                                                stroke="#FFFAF1" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path
                                                d="M15.9997 11.3701C16.1231 12.2023 15.981 13.0523 15.5935 13.7991C15.206 14.5459 14.5929 15.1515 13.8413 15.5297C13.0898 15.908 12.2382 16.0397 11.4075 15.906C10.5768 15.7723 9.80947 15.3801 9.21455 14.7852C8.61962 14.1903 8.22744 13.4229 8.09377 12.5923C7.96011 11.7616 8.09177 10.91 8.47003 10.1584C8.84829 9.40691 9.45389 8.7938 10.2007 8.4063C10.9475 8.0188 11.7975 7.87665 12.6297 8.00006C13.4786 8.12594 14.2646 8.52152 14.8714 9.12836C15.4782 9.73521 15.8738 10.5211 15.9997 11.3701Z"
                                                stroke="#FFFAF1" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M17.5 6.49997H17.51" stroke="#FFFAF1" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://facebook.com/appdfl">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18 1.99997H15C13.6739 1.99997 12.4021 2.52675 11.4645 3.46444C10.5268 4.40212 10 5.67389 10 6.99997V9.99997H7V14H10V22H14V14H17L18 9.99997H14V6.99997C14 6.73475 14.1054 6.4804 14.2929 6.29286C14.4804 6.10533 14.7348 5.99997 15 5.99997H18V1.99997Z"
                                                stroke="#FFFAF1" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>

                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://twitter.com/appdfl">

                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="backdrop"></div>
                </div>
            </div>
        </nav>
    );
}