import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { isScreenWide } from '../../utils/isScreenWide';

import styles from './header.module.css';
import Logo from '/public/logo.svg'

import InstagramIcon from '/public/icons/instagram_icon.svg'
import FacebookIcon from '/public/icons/facebook_icon.svg'
import TwitterIcon from '/public/icons/twitter_icon.svg'

type Props = {
    isHome?: boolean;
    selected?: string;
}

export default function Header({ isHome, selected }: Props) {

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

    const [lastSectionId, setLastSectionId] = useState("home");

    const closeMenu = (button) => {
        setMenuVisible(false)
        setLastSectionId(button.title)
        console.log(lastSectionId)
    }

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
                        console.log("Removeu de", lastSectionId)

                        setLastSectionId(sectionId)
                    }
                }
            });
        }
        if (isHome) {
            changeMenuSection()
        }
    }

    const [isMobile, setIsMobile] = useState(false);
    function handleScreenResize() {
        const isWide = isScreenWide()
        if (isWide) {
            setIsMobile(false)

            if (lastSectionId) {
                const menuElement = document.querySelector(`.${styles.menu} a[title*=${lastSectionId}]`)
                // O atraso é necessário para que a barra de navegação termine a animação e o botão fique no local correto
                setTimeout(() => {
                    updateNavLine(menuElement)
                }, 250);
            }
        } else {
            setIsMobile(true)
        }
    }

    useEffect(() => {
        navLine.current.style.display = "none"

        function updateMenuButtonsWidth() {
            const liList = document.querySelectorAll('.list') as NodeListOf<HTMLElement>;

            liList.forEach(list => {
                console.log(list.offsetWidth)
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

                            {
                                isHome ?
                                    <>
                                        <li className='list'>
                                            <Link href="/">
                                                <a onClick={(event) => closeMenu(event.target)} className={styles.active} title="home">Início</a>
                                            </Link>
                                        </li>
                                        <li className='list'><a onClick={(event) => closeMenu(event.target)} title="about" href="/#about">Sobre</a></li>
                                        <li className='list'><a onClick={(event) => closeMenu(event.target)} title="reports" href="/#reports">Relatórios</a></li>
                                        <li className='list'><a onClick={(event) => closeMenu(event.target)} title="community" href="/#community">Comunidade</a></li>
                                    </>
                                    : null
                            }
                            {
                                isMobile || !isHome &&
                                <li className='list'>
                                    <Link href="/perguntas-frequentes">
                                        <a className={selected === "perguntas-frequentes" && styles.active} onClick={closeMenu}>F.A.Q</a>
                                    </Link>
                                </li>
                            }
                            <li className='list'>
                                <Link href="/blog">
                                    <a className={selected === "blog" && styles.active} onClick={closeMenu}>Blog</a>
                                </Link>
                            </li>
                        </ul>
                        <div>
                            <Link href="/#download">
                                <a className={`button ${styles.button}`} onClick={closeMenu}>
                                    <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M17.4167 8.70833H13.75V3.20833H8.25V8.70833H4.58334L11 15.125L17.4167 8.70833ZM10.0833 10.5417V5.04166H11.9167V10.5417H12.9892L11 12.5308L9.01084 10.5417H10.0833ZM4.58334 16.9583H17.4167V18.7917H4.58334V16.9583Z"
                                            fill="#346259" />
                                    </svg>
                                    {isMobile ? "Baixar o APP" : "Baixar o Aplicativo"}
                                </a>
                            </Link>
                            <ul className={`social-links ${styles["social-links"]}`}>
                                <li>
                                    <a target="_blank" href="https://instagram.com/appdfl">
                                        <InstagramIcon />
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://facebook.com/appdfl">
                                        <FacebookIcon />
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://twitter.com/appdfl">
                                        <TwitterIcon />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.backdrop}></div>
                </div>

                <button type='button' className={styles['open-menu']} aria-expanded="false" aria-label="Abrir menu" onClick={() => setMenuVisible(true)}>
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