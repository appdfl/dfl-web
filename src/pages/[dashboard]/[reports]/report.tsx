import Head from "next/head";
import { useRouter } from "next/router";
import { Report } from "../../../@types/application";

import styles from "/src/styles/dashboard.module.css"

import Sidebar from "../../../components/Dashboard/Sidebar/Sidebar";
import DashboardHeader from "../../../components/Dashboard/Header/Header";

import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';

import Left from '@mui/icons-material/ChevronLeft';
import Right from '@mui/icons-material/ChevronRight';
import Map from "../../../components/Dashboard/Map";

export default function AboutPage() {
    const router = useRouter()
    const { id, report } = router.query

    const reportObject = JSON.parse(report.toString()) as Report;

    const date = new Date(reportObject.createdAt)
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
    const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : date.getUTCMonth()

    return (
        <body className={`dashboard`}>
            <Head>
                <title>{reportObject.address}</title>
            </Head>

            <Sidebar />

            <div className={styles.content}>
                <DashboardHeader returnButton title='Relatórios' />

                <div className={styles.reportFrame}>
                    <h2 className={styles.title}>{reportObject.address}</h2>
                    <div className={`${styles.holder} ${styles.subHeader}`}>
                        <div className={styles.holder}>
                            <CalendarIcon />
                            <p>{`${day}/${month}/${date.getUTCFullYear()}`}</p>
                        </div>
                        <span>•</span>
                        <div className={styles.holder}>
                            <img className={styles.profileImage} src={reportObject.profile.image_url} alt="Imagem do perfil do usuário que postou o relatório" />
                            <p>relatado por <strong>{reportObject.profile.username}</strong></p>
                        </div>
                    </div>

                    <div className={styles.holder}>
                        <div className={styles.location}>
                            <h3 className={styles.header}>Localização</h3>
                            <Map />
                        </div>
                        <div className={styles.images}>
                            <div className={`${styles.header}`}>
                                <h3>Imagens</h3>
                                <div className={styles.holder}>
                                    <Left className={styles.arrowIcon} />
                                    <Right className={styles.arrowIcon} />
                                </div>
                            </div>
                            <ul className={styles.holder}>
                                {
                                    reportObject.images_urls.map((url) =>
                                        <li>
                                            <img className={styles.picture} src={url} alt="Imagem de um foco de lixo" />
                                        </li>
                                    )
                                }
                            </ul>
                        </div>
                    </div>

                    <div className={`${styles.holderAlign} ${styles.section2}`}>
                        <p><strong>Sugestão de @{reportObject.profile.username}</ strong><br />
                            {
                                reportObject.suggestion.length > 0 ? reportObject.suggestion
                                    : "[vazio]"
                            }
                        </p>
                        <div className={styles.holderAlign}>
                            <p>O local possui lixeiras?</p>
                            <input type="checkbox" name="hasTrashBins" readOnly checked={reportObject.resolved} />
                        </div>
                    </div>

                    <div className={styles.controlPanel}>
                        <h3 className={styles.header}>Painel de Controle</h3>
                        <div className={styles.container}>
                            <div className={`${styles.holderAlign} ${styles.option}`}>
                                <div className={styles.optionText}>
                                    <h4><strong>Marcar relatório como aprovado</strong> <br /></h4>
                                    <p>Este relatório será exibido para os usuários, tornando possível a interação por meio de comentários e avaliações.</p>
                                </div>
                                <div className={styles.toggle_switch}>
                                    <span onClick={() => console.log("Alteração de estado.")} className={`${styles.switch} ${reportObject.approved && styles.active}`}></span>
                                </div>
                            </div>
                            <div className={styles.line}></div>
                            <div className={`${styles.holderAlign} ${styles.option}`}>
                                <div className={styles.optionText}>
                                    <h4><strong>Marcar relatório como resolvido</strong> <br /></h4>
                                    <p>Este relatório será arquivado, portanto, ele será marcado como “somente-visualização”.</p>
                                </div>
                                <div className={styles.toggle_switch}>
                                    <span onClick={() => console.log("Alteração de estado.")} className={`${styles.switch} ${reportObject.resolved && styles.active}`}></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
