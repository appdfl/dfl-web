import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { isScreenWide } from '../../utils/isScreenWide';

import styles from './header.module.css';
import Logo from '/public/logo.svg'

type Props = {
    isHome?: boolean;
}

export default function Header({ isHome }: Props) {
    const [downloadText, setDownloadText] = useState("Baixar o App")

    const navLine = useRef(null);

    function updateNavLine(button) {
        // navLine.style.left = `${element.offsetLeft}px`;
        // navLine.style.width = `${element.offsetWidth}px`;
        if (button) {
            navLine.current.style.left = `${button.offsetLeft + (button.offsetWidth / 2) - (navLine.current.offsetWidth / 2)}px`;
        } else {
            return console.warn("Um botão não foi encontrado para ser selecionado.")
        }
    }

    const [isMenuVisible, setMenuVisible] = useState(false)
    const [isScreenScrolled, setScreenScrolled] = useState(false)

    function showNavOnScroll() {
        if (scrollY === 0) {
            setScreenScrolled(false)
        } else {
            setScreenScrolled(true)
        }
    }

    const closeMenu = (button) => {
        setMenuVisible(false)
        lastSectionId = button.title
    }

    let lastSectionId = "home";

    const handleScroll = () => {
        showNavOnScroll()

        function changeMenuSection() {
            const sections = [document.querySelector("#home"), document.querySelector("#about"), document.querySelector("#reports"), document.querySelector("#community")]
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
                const lastSection = document.querySelector(`#${lastSectionId}`)
                if (section !== lastSection) {
                    const sectionIsInBoundaries = getCurrentSection(section)
                    if (sectionIsInBoundaries) {
                        const sectionId = section.getAttribute("id")

                        const menuElement = document.querySelector(`.${styles.menu} a[title*=${sectionId}]`)
                        menuElement.classList.add(styles.active)

                        updateNavLine(menuElement)

                        const lastMenuElement = document.querySelector(`.${styles.menu} a[title*=${lastSectionId}]`)
                        lastMenuElement.classList.remove(styles.active)
                        lastSectionId = sectionId
                    }
                }
            });
        }
        changeMenuSection()
    }

    function handleScreenResize() {
        const isWide = isScreenWide()
        if (isWide) {
            setDownloadText("Baixar o Aplicativo")

            if (lastSectionId) {
                const menuElement = document.querySelector(`.${styles.menu} a[title*=${lastSectionId}]`)
                // O atraso é necessário para que a barra de navegação termine a animação e o botão fique no local correto
                setTimeout(() => {
                    updateNavLine(menuElement)
                }, 250);
            }
        } else {
            setDownloadText("Baixar o App")
        }
    }

    useEffect(() => {
        function updateMenuButtonsWidth() {
            const liList = document.querySelectorAll('.list') as NodeListOf<HTMLElement>;

            liList.forEach(list => {
                console.log(list.style.width)
                list.style.width = `${list.offsetWidth + 15}px`;
            })
            console.log("Tamanhos atualizados!")

            // Atualizamos a navLine para a posição do primeiro botão (após atualizarmos o tamanho dos botões, claro)
            updateNavLine(liList[0])
        }
        updateMenuButtonsWidth()
    }, [])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        window.addEventListener('resize', handleScreenResize);
        return () => window.removeEventListener('resize', handleScreenResize);
    });

    return (
        <nav className={`${styles.nav} ${isMenuVisible && styles.menuExpanded} ${isScreenScrolled && styles.scroll}`}>
            <div className={`wrapper ${styles.wrapper}`}>
                <a href="/">
                    <Logo className={styles.logo} />
                </a>

                <div className={styles.menu}>
                    <button type="button" className={styles["close-menu"]} aria-expanded="true" aria-label="Fechar menu"
                        onClick={closeMenu}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.41 12L16.59 14.82L25.75 24L16.59 33.18L19.41 36L31.41 24L19.41 12Z" fill="white" />
                        </svg>
                    </button>
                    <div className={styles.content}>
                        <ul className={styles.list}>
                            <div ref={navLine} className={styles.navLine}></div>
                            <li className='list'>
                                <Link href="/">
                                    {/* Há um problema aqui. Como o href está redirecionando para /#home, a página não rola totalmente para o topo */}
                                    {/* Poderíamos tirar isso se o função não trocasse os botões de acordo com o href */}
                                    <a onClick={(event) => closeMenu(event.target)} className={styles.active} title="home">Início</a>
                                </Link>
                            </li>
                            {
                                isHome ?
                                    <>
                                        <li className='list'><a onClick={(event) => closeMenu(event.target)} title="about" href="/#about">Sobre</a></li>
                                        <li className='list'><a onClick={(event) => closeMenu(event.target)} title="reports" href="/#reports">Relatórios</a></li>
                                        <li className='list'><a onClick={(event) => closeMenu(event.target)} title="community" href="/#community">Comunidade</a></li>
                                    </>
                                    : null
                            }
                            <li className='list'>
                                <Link href="/perguntas-frequentes">
                                    <a onClick={closeMenu}>F.A.Q</a>
                                </Link>
                            </li>
                        </ul>
                        <div>
                            <a className={`button ${styles.button}`} onClick={closeMenu} href="#download">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.4167 8.70833H13.75V3.20833H8.25V8.70833H4.58334L11 15.125L17.4167 8.70833ZM10.0833 10.5417V5.04166H11.9167V10.5417H12.9892L11 12.5308L9.01084 10.5417H10.0833ZM4.58334 16.9583H17.4167V18.7917H4.58334V16.9583Z"
                                        fill="#346259" />
                                </svg>
                                {downloadText}
                            </a>
                            <ul className={`social-links ${styles["social-links"]}`}>
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
                    <div className={styles.backdrop}></div>
                </div>

                <button type='button' className={styles['open-menu']} aria-expanded="false" aria-label="Abrir menu" onClick={closeMenu}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 20H30" stroke="#346259" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M10 12H30" stroke="#346259" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M18 28L30 28" stroke="#346259" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </nav>
    );
}