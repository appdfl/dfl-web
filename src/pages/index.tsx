import { useEffect, useState } from 'react';

import Link from 'next/link';
import Image from "next/image";

import Icon from '@mui/material/Icon';
import LinkIcon from '/public/icons/link_icon.svg'
import InfoIcon from '/public/icons/info_icon.svg'

import { getReportsData } from '../utils/reports';
import { getAboutData } from '../utils/about';

import Header from '../components/Header';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

import styles from '../styles/landing.module.css';
import Modal from '../components/Modal';
import { isScreenWide } from '../utils/isScreenWide';
import { Report } from '../@types/application';
import { getUsersData } from '../utils/users';

const ANIMATION_TIME = 250 // 0.25 segundos

export async function getStaticProps() {
    const aboutData = await getAboutData();

    try {
        const reportsData = await getReportsData("Maceió, AL") as Array<Report>;
        const reportsAmount = reportsData.length
        const resolvedReportsAmount = [...reportsData].filter(report => report.resolved === true).length

        const reportsObject = {
            "reportsAmount": reportsAmount,
            "resolvedReportsAmount": resolvedReportsAmount,
        }

        /* const usersData = await getUsersData()
        const usersAmount = await usersData.length */
        const usersAmount = 0


        return {
            props: {
                aboutData,
                reportsObject,
                usersAmount
            },
        };
    } catch (error) {
        console.log(error)
    }
}

type Props = {
    aboutData: Array<Object>;
    reportsObject: {
        "reportsAmount": number,
        "resolvedReportsAmount": number
    };
    usersAmount: number;
}

const Landing = ({ aboutData, reportsObject, usersAmount }: Props) => {
    const [modalOpen, setModalOpen] = useState(false);

    const [isMobile, setIsMobile] = useState(false);
    // Determinamos o padrão como sendo falso já que a exibição da seção "about" também funciona normalmente no telefone

    const [currentTag, setCurrentTag] = useState("community" as string)
    const [aboutInstancesVisible, setAboutInstancesVisible] = useState(true)

    function changeAboutInstance(instance: string) {
        setAboutInstancesVisible(false)
        console.log(`Atualizando instância do "sobre" para ${instance}.`)

        setTimeout(() => {
            setCurrentTag(instance)
            setAboutInstancesVisible(true)
        }, ANIMATION_TIME);
    }

    useEffect(() => {
        function handleScreenResize() {
            const isWide = isScreenWide();
            if (isWide) {
                setIsMobile(false)
            } else {
                setIsMobile(true)
            }
        }

        window.addEventListener('resize', handleScreenResize);
        return () => window.removeEventListener('resize', handleScreenResize);
    })

    const Column1 = <div className={`${styles[`column-1`]} ${aboutInstancesVisible === true ? "fadeIn" : "fadeOut"}`}>
        <div className={styles["info-container"]}>
            <div className={styles["info-shape"]}>
                <Icon className={styles.info}>{aboutData[currentTag][0].icon}</Icon>
            </div>
            <p><span className="bolder">{aboutData[currentTag][0].title}</span><br />
                {aboutData[currentTag][0].description}
            </p>
        </div>
        <div className={styles["info-container"]}>
            <div className={styles["info-shape"]}>
                <Icon className={styles.info}>{aboutData[currentTag][1].icon}</Icon>
            </div>
            <p><span className="bolder">{aboutData[currentTag][1].title}</span><br />
                {aboutData[currentTag][0].description}
            </p>
        </div>
        <div className={styles["info-container"]}>
            <div className={styles["info-shape"]}>
                <Icon className={styles.info}>{aboutData[currentTag][2].icon}</Icon>
            </div>
            <p><span className="bolder">{aboutData[currentTag][2].title}</span><br />
                {aboutData[currentTag][2].description}
            </p>
        </div>
    </div>

    const Column2 = aboutData[currentTag].length > 3 && <div className={`${styles[`column-2`]} ${aboutInstancesVisible === true ? "fadeIn" : "fadeOut"}`}>
        <div className={styles["info-container"]}>
            <div className={styles["info-shape"]}>
                <Icon className={styles.info}>{aboutData[currentTag][3].icon}</Icon>
            </div>
            <p><span className="bolder">{aboutData[currentTag][3].title}</span><br />
                {aboutData[currentTag][3].description}
            </p>
        </div>
        <div className={styles["info-container"]}>
            <div className={styles["info-shape"]}>
                <Icon className={styles.info}>{aboutData[currentTag][4].icon}</Icon>
            </div>
            <p><span className="bolder">{aboutData[currentTag][4].title}</span><br />
                {aboutData[currentTag][4].description}
            </p>
        </div>
        <div className={styles["info-container"]}>
            <div className={styles["info-shape"]}>
                <Icon className={styles.info}>{aboutData[currentTag][5].icon}</Icon>
            </div>
            <p><span className="bolder">{aboutData[currentTag][5].title}</span><br />
                {aboutData[currentTag][5].description}
            </p>
        </div>
    </div>

    const PhoneContainer = <div className={styles["phone-container"]}>
        <div className={styles["overlay-container"]}>
            <img className={styles["phone-overlay"]} src="/images/phone_overlay.png"
                alt="Modelo de telefone que circunda imagens de telas presentes no aplicativo." />
        </div>
        <img className={`${styles["app-overlay"]} ${aboutInstancesVisible === true ? "fadeIn" : "fadeOut"}`} src={currentTag === "community" ? "/images/screens/CommunityScreen.png" : currentTag === "reports" ? "/images/screens/ReportsScreen.png" : "/images/screens/ReportScreen_1.png"}
            alt='Tela da seção "Comunidade" do aplicativo móvel.' />
    </div>

    const PhoneContainer2 = <div className={`${styles["phone-container"]} ${aboutInstancesVisible === true ? "fadeIn" : "fadeOut"}`}>
        <div className={styles["overlay-container"]}>
            <img className={styles["phone-overlay"]} src="/images/phone_overlay.png"
                alt="Modelo de telefone que circunda imagens de telas presentes no aplicativo." />
        </div>
        <img className={`${styles["app-overlay"]}`} src={"/images/screens/ReportScreen_2.png"}
            alt='Tela da seção "Comunidade" do aplicativo móvel.' />
    </div>

    return (
        <body>
            <Header isHome />

            <section id='home' className={styles.home}>
                <div className={`wrapper ${styles.wrapper}`}>
                    <div className={`${styles["col-a"]}`}>
                        <header>
                            <h4>CONHEÇA O</h4>
                            <h1>Detector de Focos de Lixo</h1>
                        </header>
                        <div className={styles.content}>
                            <p>
                                Um aplicativo que irá lhe ajudar a reportar focos de lixo e encontrar pontos de coleta em sua
                                cidade.
                            </p>
                            <a href="#download" className={`button ${styles.button}`}>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.4166 8.70833H13.75V3.20833H8.24998V8.70833H4.58331L11 15.125L17.4166 8.70833ZM10.0833 10.5417V5.04167H11.9166V10.5417H12.9891L11 12.5308L9.01081 10.5417H10.0833ZM4.58331 16.9583H17.4166V18.7917H4.58331V16.9583Z"
                                        fill="#F3F7F4" />
                                </svg>

                                Baixe o Aplicativo
                            </a>
                            <div className={styles.platforms}>
                                Disponível em:
                                <svg width="36" height="20" viewBox="0 0 36 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_172_132)">
                                        <path
                                            d="M22.6544 16.5024C22.19 16.5024 21.8122 16.1302 21.8122 15.6731C21.8122 15.2159 22.19 14.844 22.6544 14.844C23.1188 14.844 23.4966 15.2158 23.4966 15.6731C23.4966 16.1303 23.1188 16.5024 22.6544 16.5024ZM13.3456 16.5024C12.8812 16.5024 12.5035 16.1302 12.5035 15.6731C12.5035 15.2159 12.8811 14.844 13.3456 14.844C13.81 14.844 14.1877 15.2158 14.1877 15.6731C14.1877 16.1303 13.8101 16.5024 13.3456 16.5024ZM22.9564 11.5082L24.6396 8.63831C24.6859 8.55911 24.6985 8.46505 24.6744 8.37677C24.6504 8.28849 24.5918 8.2132 24.5114 8.16742C24.431 8.12183 24.3354 8.10951 24.2458 8.13316C24.1561 8.15682 24.0796 8.21451 24.0331 8.2936L22.3289 11.1997C21.0255 10.6142 19.5619 10.288 18 10.288C16.4381 10.288 14.9745 10.6142 13.6712 11.1997L11.9669 8.2936C11.9204 8.21451 11.8439 8.15682 11.7542 8.13316C11.6645 8.10951 11.569 8.12183 11.4885 8.16742C11.4081 8.21316 11.3495 8.28845 11.3254 8.37675C11.3014 8.46505 11.314 8.55913 11.3604 8.63831L13.0435 11.5082C10.1533 13.0557 8.17652 15.9362 7.88733 19.3394H28.1126C27.8232 15.9363 25.8465 13.0557 22.9564 11.5081"
                                            fill="#3DDB85" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_172_132">
                                            <rect width="36" height="18.9818" fill="white" transform="translate(0 0.357574)" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div className={`${styles["col-b"]}`}>
                        <img className={styles.landing} src="/images/character/character_1.svg" alt="" />
                    </div>
                </div>
            </section>

            <section id='about' className={styles.about}>
                <div className="wrapper">
                    <header>
                        <h4>Sobre</h4>
                        <h2>Estamos juntos nessa.</h2>
                        <p>Com a sua ajuda podemos combater o lixo e eliminar os focos espalhados por sua cidade.</p>
                    </header>
                    <div className={styles.content}>
                        <div className={styles.tags}>
                            <button onClick={() => changeAboutInstance("community")}
                                className={`${styles.tag}
                                 ${currentTag === "community" ? styles.selected : null}`}>
                                Comunidade
                            </button>
                            <button onClick={() => changeAboutInstance("reports")}
                                className={`${styles.tag} 
                                ${currentTag === "reports" ? styles.selected : null}`}>
                                Relatórios
                            </button>
                            <button onClick={() => changeAboutInstance("notify")}
                                className={`${styles.tag} 
                                ${currentTag === "notify" ? styles.selected : null}`}>
                                Notificar Foco
                            </button>
                        </div>
                        <div className={styles.description}>
                            {
                                isMobile ?
                                    <>
                                        {PhoneContainer}
                                        {Column1}
                                        {Column2}
                                    </>
                                    :
                                    <>
                                        {Column1}
                                        {PhoneContainer}
                                        {
                                            currentTag === "notify" ?
                                                PhoneContainer2
                                                : Column2
                                        }
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </section>

            <section id='reports' className={styles.reports}>
                <div className={`wrapper ${styles.reportsWrapper}`}>
                    <header>
                        <h4>Relatórios</h4>
                        <h2>O quanto <strong>sua</strong> cidade está ficando mais limpa?</h2>
                    </header>
                    <div className={styles.content}>
                        <h4>Maceió, AL - Brasil</h4>
                        <div className={styles.cards}>
                            <div className={`${styles.card} ${styles["card-1"]}`}>
                                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M38.5 10V38H10.5V10H38.5ZM38.5 6H10.5C8.3 6 6.5 7.8 6.5 10V38C6.5 40.2 8.3 42 10.5 42H38.5C40.7 42 42.5 40.2 42.5 38V10C42.5 7.8 40.7 6 38.5 6Z"
                                        fill="#7FB883" />
                                    <path d="M28.5 34H14.5V30H28.5V34ZM34.5 26H14.5V22H34.5V26ZM34.5 18H14.5V14H34.5V18Z"
                                        fill="#7FB883" />
                                </svg>
                                <h3>+{reportsObject.reportsAmount}</h3>
                                <p>focos de lixo reportados</p>
                            </div>
                            <div className={`${styles.card} ${styles["card-2"]}`}>
                                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M24.5 4C13.46 4 4.5 12.96 4.5 24C4.5 35.04 13.46 44 24.5 44C35.54 44 44.5 35.04 44.5 24C44.5 12.96 35.54 4 24.5 4ZM24.5 40C15.68 40 8.5 32.82 8.5 24C8.5 15.18 15.68 8 24.5 8C33.32 8 40.5 15.18 40.5 24C40.5 32.82 33.32 40 24.5 40ZM33.68 15.16L20.5 28.34L15.32 23.18L12.5 26L20.5 34L36.5 18L33.68 15.16Z"
                                        fill="#7FB883" />
                                </svg>
                                <h3>+{reportsObject.resolvedReportsAmount}</h3>
                                <p>focos de lixo resolvidos</p>
                            </div>
                            <div className={`${styles.card} ${styles["card-3"]}`}>
                                <svg width="49" height="48" viewBox="0 0 49 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M24.5 24C22.3 24 20.5 22.2 20.5 20C20.5 17.8 22.3 16 24.5 16C26.7 16 28.5 17.8 28.5 20C28.5 22.2 26.7 24 24.5 24ZM36.5 20.4C36.5 13.14 31.2 8 24.5 8C17.8 8 12.5 13.14 12.5 20.4C12.5 25.08 16.4 31.28 24.5 38.68C32.6 31.28 36.5 25.08 36.5 20.4ZM24.5 4C32.9 4 40.5 10.44 40.5 20.4C40.5 27.04 35.16 34.9 24.5 44C13.84 34.9 8.5 27.04 8.5 20.4C8.5 10.44 16.1 4 24.5 4Z"
                                        fill="#7FB883" />
                                </svg>
                                <h3>em breve...</h3>
                                <p>ecopontos localizados</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id='community' className={styles.community}>
                <div className="wrapper">
                    <header>
                        <h4>Comunidade</h4>
                        <h2>Somos melhores juntos.</h2>
                    </header>
                    <div className={styles.content}>
                        <p>Pertencer a uma comunidade de pessoas com o mesmo objetivo é crucial para facilitar a resolução dos
                            problemas com o lixo.</p>
                        <img src="/images/mundi_project.png"
                            alt="Mapa mundial com diversos marcadores com as cores do DFL em diferentes continentes." />
                        <p>Junte-se a <span className="big">{usersAmount}</span> outras pessoas que decidiram tornar suas cidades mais
                            limpas.</p>
                    </div>
                </div>
            </section>

            <section id='download' className={styles.download}>
                <div className={`wrapper ${styles.wrapper}`}>
                    <header>
                        <h4>Download</h4>
                        <h2>Preparado para tornar sua cidade em um lugar mais limpo?</h2>
                        <p>Ajude o planeta reportando focos de lixo descartado irregularmente e encontre e pontos de coleta
                            em
                            sua cidade.</p>
                        <button onClick={() => setModalOpen(true)} className={`button ${styles.button}`}>
                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.4166 8.70825H13.75V3.20825H8.24998V8.70825H4.58331L11 15.1249L17.4166 8.70825ZM10.0833 10.5416V5.04159H11.9166V10.5416H12.9891L11 12.5308L9.01081 10.5416H10.0833ZM4.58331 16.9583H17.4166V18.7916H4.58331V16.9583Z"
                                    fill="#F3F7F4" />
                            </svg>
                            Baixar o Aplicativo
                        </button>
                        <div className={styles["coming-soon"]}>
                            Em breve
                            <img src="/images/google_play.png"
                                alt="Ícone que indica que o aplicativo estará disponível na Google Play" />
                        </div>
                    </header>
                    <div className={styles.content}>
                        <img src="/images/phonewithicon_placeholder.png"
                            alt="Telefone exibindo a tela inicial do aplicativo junto com a moça do ícone do app ao lado" />
                    </div>
                </div>
                <div className={`wrapper ${styles.second}`}>
                    <header>
                        <h4>Guia de Download</h4>
                        <h2>Como instalar o aplicativo?</h2>
                        <p>Ainda estamos trabalhando no aplicativo, por isso, não tivemos a oportunidade de tornar o aplicativo
                            disponível na PlayStore.<br />
                            <span className="underlined">Por enquanto, pedimos que siga os seguinte passos:</span>
                        </p>
                    </header>
                    <div className={styles.content}>
                        <div className={styles.step}>
                            <div className={styles.circle}>
                                1
                            </div>
                            <p><strong>Baixe</strong> o arquivo .apk do aplicativo pelo seu navegador</p>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.circle}>
                                2
                            </div>
                            <div>
                                <p><strong>Instale</strong> o aplicativo por meio do arquivo .apk</p>
                                <p className={styles.hint}>Na maioria dos dispositivos Android, instalar aplicativos por fontes externas
                                    requer algum passos adicionais. <br /> <br />
                                    Em dispositivos com a versão Android 8.0 ou superior, você deve navegar para a tela
                                    “Instalar app desconhecidos” nas configurações do sistema do dispositivo de um local
                                    específico (por exemplo, o navegador web que você está usando agora). <br /> <br />
                                    Em dispositivos com a versão Android 7.1.1 ou inferior, você deve ativar a configuração do
                                    sistema “Fontes desconhecidas”, encontrada em: Configurações '&gt;' Segurança no seu dispositivo.
                                </p>
                            </div>
                        </div>
                        <div className={styles.step}>
                            <div className={styles.circle}>
                                3
                            </div>
                            <p><strong>Pronto!</strong> Agora você está apto a tornar sua cidade mais limpa.</p>
                        </div>
                    </div>
                </div>
                <div className={`wrapper ${styles.faq}`}>
                    <h4>F.A.Q</h4>
                    <div className={styles.question}>
                        <a href="/perguntas-frequentes#por-que-o-aplicativo-nao-esta-disponivel-para-dispositivos-ios">
                            <InfoIcon width={"3rem"} height={"3rem"} />
                            Por que o aplicativo não está disponível para dispositivos iOS?
                            <LinkIcon className={styles.linkIcon} />
                        </a>
                        <a href="/perguntas-frequentes#por-que-o-aplicativo-nao-esta-disponivel-na-playstore">
                            <InfoIcon width={"3rem"} height={"3rem"} />
                            Por que o aplicativo não está disponível na PlayStore?
                            <LinkIcon className={styles.linkIcon} />
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
            <BackToTop />
            <Modal
                title={`Eita! Parece que temos um problema...`}
                content={
                    <p>
                        Como você já deve estar sabendo, o aplicativo ainda não está pronto. <br />
                        Pedimos a você que fique atento às nossas <a target="_blank"
                            href="https://instagram.com/appdfl">redes sociais</a> pois por lá postaremos qualquer novidade
                        acerca do estado atual de desenvolvimento do app. <br />
                        Mas <small><i>spoilerzinho</i></small>: tamo chegando lá.
                        <br /> <br />
                        - Atenciosamente, Edu da Equipe DFL 💚
                        <br /> <br />
                        <a target="_blank" href="https://instagram.com/appdfl">Instagram</a>
                    </p>
                }
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            />
        </body>
    );
}

Landing.theme = "light"
export default Landing;