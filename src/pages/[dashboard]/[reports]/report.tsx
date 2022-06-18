import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Report } from "../../../@types/application";

import dashboardStyles from "/src/styles/dashboard/dashboard.module.css"
import styles from "/src/styles/dashboard/report.module.css"

import Sidebar from "../../../components/Dashboard/Sidebar";
import DashboardHeader from "../../../components/Dashboard/Header";
import DashboardButton from "../../../components/Dashboard/Button";

import ReportIcon from '@mui/icons-material/ReportOutlined';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import Left from '@mui/icons-material/ChevronLeft';
import Right from '@mui/icons-material/ChevronRight';

import Map from "../../../components/Dashboard/Map";

import { GetRatingsAverage } from "../../../utils/reports";

import { useResize } from "../../../utils/hooks/useResize";
import CommentsList from "../../../components/Dashboard/CommentsList";

export default function AboutPage() {
    const router = useRouter()
    const { id, report } = router.query

    useEffect(() => {
        if (report === undefined) {
            router.push('/dashboard/reports')
        }
    }, [])

    if (report === undefined) {
        return (
            <body>

            </body>
        )
    }

    const reportObject = JSON.parse(report.toString()) as Report;

    const date = new Date(reportObject.createdAt)
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
    const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth()}` : date.getUTCMonth()

    const ratingLine = useRef(null);
    /* const [ratingLineWidth, setRatingLineWidth] = useState(0)

    useEffect(() => {
        setRatingLineWidth(ratingLine.current?.offsetWidth)
    }, [ratingLine]) */
    const { width } = useResize(ratingLine)

    const totalRatings = reportObject.note1 + reportObject.note2 + reportObject.note3 + reportObject.note4 + reportObject.note5
    const note1Width = (reportObject.note1 * width) / totalRatings
    const note2Width = (reportObject.note2 * width) / totalRatings
    const note3Width = (reportObject.note3 * width) / totalRatings
    const note4Width = (reportObject.note4 * width) / totalRatings
    const note5Width = (reportObject.note5 * width) / totalRatings

    return (
        <body className={`dashboard`}>
            <Head>
                <title>{reportObject.address}</title>
            </Head>

            <Sidebar />

            <div className={dashboardStyles.content}>
                <DashboardHeader returnButton title='Relatórios' />

                <div className={styles.reportFrame}>
                    <header>
                        <h2 className={styles.title}>{reportObject.address}</h2>
                        <div className={`${styles.holder} ${styles.subHeader}`}>
                            <div className={styles.holder}>
                                <CalendarIcon />
                                <p>{`${day}/${month}/${date.getUTCFullYear()}`}</p>
                            </div>
                            <span>•</span>
                            <div className={styles.holder}>
                                <img className={dashboardStyles.profileImage} src={reportObject.profile.image_url} alt="Imagem do perfil do usuário que postou o relatório" />
                                <p>relatado por <strong>{reportObject.profile.username}</strong></p>
                            </div>
                        </div>
                    </header>

                    <div className={styles.holder}>
                        <div className={styles.location}>
                            <h3 className={styles.header}>Localização</h3>
                            <Map latitude={parseFloat(reportObject.coordinates[0])} longitude={parseFloat(reportObject.coordinates[1])} />
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

                    <div className={`${styles.section2} ${styles.align}`}>
                        <header>
                            <h4>Sugestão de <strong>@{reportObject.profile.username}:</ strong></h4>
                            <div style={{ gap: "1.5rem", justifyContent: "space-between" }} className={`${styles.holder} `}>
                                <p>O local possui lixeiras?</p>
                                <input type="checkbox" name="hasTrashBins" readOnly checked={reportObject.resolved} />
                            </div>
                        </header>
                        <p>
                            {
                                reportObject.suggestion.length > 0 ? `"${reportObject.suggestion}"`
                                    : "[vazio]"
                            }
                        </p>
                    </div>

                    <div className={`${styles.panel} ${styles.align}`}>
                        <h3 className={styles.header}>Painel de Controle</h3>
                        <div style={{ border: `0.5px solid var(--primary-color-01)` }} className={`${styles.container}`}>
                            <div className={`${styles.holder} ${styles.align} ${styles.option}`}>
                                <div className={styles.optionText}>
                                    <h4><strong>Marcar relatório como aprovado</strong> <br /></h4>
                                    <p>Este relatório será exibido para os usuários, tornando possível a interação por meio de comentários e avaliações.</p>
                                </div>
                                <div className={styles.toggle_switch}>
                                    <span onClick={() => console.log("Alteração de estado.")} className={`${styles.switch} ${reportObject.approved && styles.active}`}></span>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "var(--primary-color-01)" }} className={styles.line}></div>
                            <div className={`${styles.holder} ${styles.align} ${styles.option}`}>
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

                    <div className={styles.panel}>
                        <h3 className={styles.header}>Resumo das Avaliações</h3>
                        <div style={{ width: "100%" }} className={`${styles.holder} ${styles.align}`}>
                            <div className={styles.ratingsNumbers}>
                                <h4 className={styles.ratingTitle}>{GetRatingsAverage(reportObject)}</h4>
                                <p className={styles.ratingDescription}>{`(${reportObject.note1 + reportObject.note2 + reportObject.note3 + reportObject.note4 + reportObject.note5})`}</p>
                            </div>
                            <div className={styles.ratingLines}>
                                <div ref={ratingLine} className={styles.ratingLine}>
                                    <div style={{ width: note1Width }} className={styles.ratingLineAbove}></div>
                                </div>
                                <div className={styles.ratingLine}>
                                    <div style={{ width: note2Width }} className={styles.ratingLineAbove}></div>
                                </div>
                                <div className={styles.ratingLine}>
                                    <div style={{ width: note3Width }} className={styles.ratingLineAbove}></div>
                                </div>
                                <div className={styles.ratingLine}>
                                    <div style={{ width: note4Width }} className={styles.ratingLineAbove}></div>
                                </div>
                                <div className={styles.ratingLine}>
                                    <div style={{ width: note5Width }} className={styles.ratingLineAbove}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.panel}>
                        <h3 className={styles.header}>{`Comentários (${reportObject.comments.length})`}</h3>
                        <div style={{ width: "100%" }} className={`${styles.holder} ${styles.align}`}></div>
                        <CommentsList comments={reportObject.comments} />
                    </div>

                    <div className={`${styles.panel} ${styles.align}`}>
                        <h3 className={styles.header}>Zona de Perigo</h3>
                        <div style={{ border: `0.5px solid #D1351B` }} className={`${styles.container}`}>
                            <div className={`${styles.holder} ${styles.align} ${styles.option}`}>
                                <div className={styles.optionText}>
                                    <h4><strong>Denunciar relatório</strong> <br /></h4>
                                    <p>Este relatório será ocultado e arquivado automaticamente e o usuário que o postou sofrerá uma penalidade.</p>
                                </div>
                                <DashboardButton title={`Reportar Relatório`} Icon={ReportIcon} onClick={() => { }} width={`17.5rem`} />
                            </div>
                            <div style={{ backgroundColor: "#D1351B" }} className={styles.line}></div>
                            <div className={`${styles.holder} ${styles.align} ${styles.option}`}>
                                <div className={styles.optionText}>
                                    <h4><strong>Deletar relatório</strong> <br /></h4>
                                    <p>Ao deletar um relatório, não há mais volta. Pense bem antes de fazer isso.</p>
                                </div>
                                <DashboardButton title={`Deletar Relatório`} Icon={DeleteIcon} onClick={() => { }} color={`#D1351B`} width={`17.5rem`} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    );
}
