import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

import { Report } from "../../../@types/application";

import dashboardStyles from "/src/styles/dashboard/dashboard.module.css"
import styles from "/src/styles/dashboard/report.module.css"

import Sidebar from "../../../components/Dashboard/Menu";
import DashboardHeader from "../../../components/Dashboard/Header";
import DashboardButton from "../../../components/Dashboard/Button";
import CommentsList from "../../../components/Dashboard/CommentsList";
import DashboardModal from "../../../components/Dashboard/Modal";

import CheckIcon from '@mui/icons-material/Done';

import SaveIcon from '@mui/icons-material/SaveOutlined';
import ReportIcon from '@mui/icons-material/ReportOutlined';
import DeleteIcon from '@mui/icons-material/DeleteForeverOutlined';
import CalendarIcon from '@mui/icons-material/CalendarTodayOutlined';
import Left from '@mui/icons-material/ChevronLeft';
import Right from '@mui/icons-material/ChevronRight';

import Map from "../../../components/Dashboard/Map";

import { GetRatingsAverage } from "../../../utils/reports";
import { useResize } from "../../../utils/hooks/useResize";

import { api } from "../../../utils/api";
import SuccessAndErrorModal from "../../../components/Dashboard/Modal/Presets/SuccessAndErrorModal";

export default function DashboardReport() {
    const router = useRouter()
    const { report } = router.query

    const [isDeleteModalVisible, setDeleteModalVisible] = useState(false)
    const [isReportModalVisible, setReportModalVisible] = useState(false)

    const reportParsed = report ? JSON.parse(report.toString()) as Report : null;
    const [reportObject, setReportObject] = useState(reportParsed);

    if (!reportObject) {
        router.push('/dashboard/reports')
        return <div></div>
    }

    const date = new Date(reportObject.createdAt)
    const day = date.getUTCDate() < 10 ? `0${date.getUTCDate()}` : date.getUTCDate()
    const month = date.getUTCMonth() < 10 ? `0${date.getUTCMonth() + 1}` : date.getUTCMonth()

    const [approved, setApproved] = useState(reportObject.approved)
    const [resolved, setResolved] = useState(reportObject.resolved)

    const [isLoading, setLoading] = useState(false)

    async function updateReport() {
        setLoading(true)
        const response = await api.patch(`/report/${reportObject.id}`, {
            approved: approved,
            resolved: resolved
        })
        const responseObject = response.data;
        console.log(responseObject, response.status)
        if (response.status === 200) {
            setLoading(false)
            setReportObject(responseObject)
            setErrorOrSuccessMessage("Relatório atualizado com sucesso!")
        } else {
            setLoading(false)
            setErrorOrSuccessMessage("Não foi possível atualizar o relatório. Tente novamente mais tarde :(")
        }
    }

    async function deleteReport() {
        setLoading(true)
        const response = await api.delete(`/report/${reportObject.id}`)
        console.log("Relatório deletado com sucesso.", response.status)
        if (response.status === 200) {
            setDeleteModalVisible(false)
            setErrorOrSuccessMessage("Relatório deletado com sucesso!")
        } else {
            setDeleteModalVisible(false)
            setErrorOrSuccessMessage("Não foi possível deletar o relatório. Tente novamente mais tarde :(")
        }
    }

    async function reportProfile() {
        setLoading(true)
        const response = await api.patch(`/report/${reportObject.id}`, {
            approved: false,
            resolved: false
        })
        const responseObject = response.data;
        console.log(responseObject, response.status)
        if (response.status === 200) {
            setReportModalVisible(false)
            setErrorOrSuccessMessage("O relatório foi denunciado e o usuário que o postou recebeu uma notificação com sucesso!")
        } else {
            setReportModalVisible(false)
            setLoading(false)
            setErrorOrSuccessMessage("Não foi possível denunciar o relatório. Tente novamente mais tarde :(")
        }
    }

    function goToHome() {
        router.push(`/dashboard/reports?successDeleting=true`)
    }

    const { SuccessModal, ErrorModal, setErrorOrSuccessMessage } = SuccessAndErrorModal(isLoading && goToHome)

    const ratingLine = useRef(null);
    const { width } = useResize(ratingLine)

    const totalRatings = reportObject.note1 + reportObject.note2 + reportObject.note3 + reportObject.note4 + reportObject.note5
    const note1Width = (reportObject.note1 * width) / totalRatings
    const note2Width = (reportObject.note2 * width) / totalRatings
    const note3Width = (reportObject.note3 * width) / totalRatings
    const note4Width = (reportObject.note4 * width) / totalRatings
    const note5Width = (reportObject.note5 * width) / totalRatings

    const hasChanges = approved !== reportObject.approved || resolved !== reportObject.resolved ? true : false

    const tagGroups = JSON.parse(reportObject.tags);
    const tags = Object.entries(tagGroups).map((tagGroup: [string, any]) =>
        // [0] = groupTitle
        // [1] = tags
        tagGroup[1].map((tag) =>
            <li key={tag.id.toString()} className={styles.tag}>
                <p className={styles.tagText}>{tag.title}</p>
                <CheckIcon style={{ fontSize: "1.8rem", color: "var(--white)" }} />
            </li>
        )
    );

    return (
        <div className={`dashboard`}>
            <Head>
                <title>{reportObject.address}</title>
            </Head>

            <Sidebar />

            <div style={{ paddingBottom: 0 }} className={dashboardStyles.content}>
                <DashboardHeader returnButton title='Relatórios' subDirectory="/ Relatório" customDirectory={report === null && `/dashboard/reports?updateReports=true`} />

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
                                {/* <div className={styles.holder}>
                                    <Left className={styles.arrowIcon} />
                                    <Right className={styles.arrowIcon} />
                                </div> */}
                            </div>
                            <ul className={styles.holder}>
                                {
                                    reportObject.images_urls && reportObject.images_urls.map((url) =>
                                        <li style={{ display: "flex", flex: 1 }}>
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
                                <input type="checkbox" name="hasTrashBins" readOnly checked={reportObject.hasTrashBins} />
                            </div>
                        </header>
                        <p>
                            {
                                reportObject.suggestion.length > 0 ? `"${reportObject.suggestion}"`
                                    : "[vazio]"
                            }
                        </p>
                    </div>

                    {
                        Object.entries(tagGroups).length > 0 &&
                        <div className={styles.panel}>
                            <h3 className={styles.header}>{`Tags`}</h3>
                            <ul style={{ border: `0.5px solid var(--primary-color-01)` }} className={`${styles.container} ${styles.tagsContainer}`}>
                                {tags}
                            </ul>
                        </div>
                    }

                    <div className={`${styles.panel} ${styles.align}`}>
                        <div className={`${styles.header} ${styles.controlPanel}`}>
                            <h3>Painel de Controle</h3>
                            <DashboardButton
                                title={"Salvar Alterações"}
                                Icon={SaveIcon}
                                iconSize={"small"}
                                fontSize={`1.3rem`}
                                disabled={!hasChanges}
                                isLoading={isLoading}
                                padding={`0.5rem 1.25rem`}
                                color={hasChanges ? `var(--primary-color-01)` : `var(--font-color)`}
                                onClick={updateReport}
                            />
                        </div>
                        <div style={{ border: `0.5px solid var(--primary-color-01)` }} className={`${styles.container}`}>
                            <div className={`${styles.holder} ${styles.align} ${styles.option}`}>
                                <div className={styles.optionText}>
                                    <h4><strong>Marcar relatório como aprovado</strong> <br /></h4>
                                    <p>Este relatório será exibido para os usuários, tornando possível a interação por meio de comentários e avaliações.</p>
                                </div>
                                <div className={styles.toggle_switch}>
                                    <span onClick={() => {
                                        if (!isLoading) {
                                            setApproved(!approved)
                                        }
                                    }} className={`${styles.switch} ${approved && styles.active}`}></span>
                                </div>
                            </div>
                            <div style={{ backgroundColor: "var(--primary-color-01)" }} className={styles.line}></div>
                            <div className={`${styles.holder} ${styles.align} ${styles.option}`}>
                                <div className={styles.optionText}>
                                    <h4><strong>Marcar relatório como resolvido</strong> <br /></h4>
                                    <p>Este relatório será arquivado, portanto, ele será marcado como “somente-visualização”.</p>
                                </div>
                                <div className={styles.toggle_switch}>
                                    <span onClick={() => {
                                        if (!isLoading) {
                                            setResolved(!resolved)
                                        }
                                    }} className={`${styles.switch} ${resolved && styles.active}`}></span>
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
                                <div className={styles.holderRating}>
                                    <span>1{/* {reportObject.note1} */}</span>
                                    <div ref={ratingLine} className={styles.ratingLine}>
                                        <div style={{ width: note1Width }} className={styles.ratingLineAbove}></div>
                                    </div>
                                </div>
                                <div className={styles.holderRating}>
                                    <span>2{/* {reportObject.note2} */}</span>
                                    <div className={styles.ratingLine}>
                                        <div style={{ width: note2Width }} className={styles.ratingLineAbove}></div>
                                    </div>
                                </div>
                                <div className={styles.holderRating}>
                                    <span>3{/* {reportObject.note3} */}</span>
                                    <div className={styles.ratingLine}>
                                        <div style={{ width: note3Width }} className={styles.ratingLineAbove}></div>
                                    </div>
                                </div>
                                <div className={styles.holderRating}>
                                    <span>4{/* {reportObject.note4} */}</span>
                                    <div className={styles.ratingLine}>
                                        <div style={{ width: note4Width }} className={styles.ratingLineAbove}></div>
                                    </div>
                                </div>
                                <div className={styles.holderRating}>
                                    <span>5{/* {reportObject.note5} */}</span>
                                    <div className={styles.ratingLine}>
                                        <div style={{ width: note5Width }} className={styles.ratingLineAbove}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.panel}>
                        <h3 className={styles.header}>{`Comentários (${reportObject.comments ? reportObject.comments.length : 0})`}</h3>
                        <div style={{ width: "100%" }} className={`${styles.holder} ${styles.align}`}></div>
                        <CommentsList comments={reportObject.comments ? reportObject.comments : []} />
                    </div>

                    <div className={`${styles.panel} ${styles.align}`}>
                        <h3 className={styles.header}>Zona de Perigo</h3>
                        <div style={{ border: `0.5px solid #D1351B` }} className={`${styles.container}`}>
                            <div className={`${styles.holder} ${styles.align} ${styles.option}`}>
                                <div className={styles.optionText}>
                                    <h4><strong>Denunciar relatório</strong> <br /></h4>
                                    <p>Este relatório será ocultado e arquivado automaticamente e o usuário que o postou sofrerá uma penalidade.</p>
                                </div>
                                <DashboardButton
                                    title={`Denunciar Relatório`}
                                    Icon={ReportIcon}
                                    iconSize={"small"}
                                    onClick={() => setReportModalVisible(true)}
                                    width={`20rem`}
                                    fontSize={`1.2rem`}
                                />
                            </div>
                            <div style={{ backgroundColor: "#D1351B" }} className={styles.line}></div>
                            <div className={`${styles.holder} ${styles.align} ${styles.option}`}>
                                <div className={styles.optionText}>
                                    <h4><strong>Deletar relatório</strong> <br /></h4>
                                    <p>Ao deletar um relatório, não há mais volta. Pense bem antes de fazer isso.</p>
                                </div>
                                <DashboardButton
                                    title={`Deletar Relatório`}
                                    Icon={DeleteIcon}
                                    iconSize={"small"}
                                    onClick={() => setDeleteModalVisible(true)}
                                    color={`#D1351B`}
                                    width={`20rem`}
                                    fontSize={`1.2rem`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {SuccessModal}
            {ErrorModal}

            <DashboardModal
                isVisible={isReportModalVisible}
                setIsVisible={() => setReportModalVisible(!isReportModalVisible)}
                color={`#747474`}
                Icon={ReportIcon}
                isLoading={isLoading}
                title={"Você está prestes a denunciar esse relatório."}
                description={<p>Este relatório será ocultado e arquivado automaticamente e o usuário que o postou sofrerá uma penalidade.</p>}
                buttonText="Denunciar"
                actionFunction={reportProfile}
            />

            <DashboardModal
                isVisible={isDeleteModalVisible}
                setIsVisible={() => setDeleteModalVisible(!isDeleteModalVisible)}
                color={`#D1351B`}
                Icon={DeleteIcon}
                isLoading={isLoading}
                title={"Você está prestes a deletar esse relatório."}
                description={<p>Ao deletar um relatório, não há mais volta. Pense bem antes de fazer isso.</p>}
                buttonText="Deletar"
                actionFunction={deleteReport}
            />
        </div>
    );
}