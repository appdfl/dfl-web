import styles from './comments-list.module.css';
import dashboardStyles from '/src/styles/dashboard/dashboard.module.css';

import { Comment } from '../../../@types/application';
import Link from 'next/link';

function CalculateCommentCreatedAt(createdAt) {
    const actualDate = new Date();
    const differenceTime = actualDate.getTime() - new Date(createdAt).getTime()
    const SECONDS = Math.floor(Math.abs(differenceTime) / 1000)
    const MINUTES = Math.floor(SECONDS / 60)
    const HOURS = Math.floor(MINUTES / 60)
    const DAYS = Math.floor(HOURS / 24)
    let createdAtText = ""
    if (HOURS > 24) {
        createdAtText = `${DAYS} dia${DAYS !== 1 ? "s" : ""} atrás`
    } else if (HOURS >= 1) {
        createdAtText = `${HOURS} hora${HOURS !== 1 ? "s" : ""} atrás`
    } else if (MINUTES >= 1) {
        createdAtText = `${MINUTES} minuto${MINUTES !== 1 ? "s" : ""} atrás`
    } else {
        createdAtText = `${SECONDS} segundo${SECONDS !== 1 ? "s" : ""} atrás`
    }
    return createdAtText;
}

import TrashbinIcon from "/public/icons/trashbin.svg";

type Props = {
    comments: Array<Comment>;
}

export default function CommentsList({ comments }: Props) {
    /* const comments_placeholder = [
        {
            id: 1,
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque commodo vestibulum ultricies. Vestibulum quis pretium sem. Morbi et nulla laoreet, tristique mi vitae, luctus ligula. Quisque eget finibus tellus. Nulla bibendum maximus consequat. Praesent semper in nulla a tempor. Praesent rutrum leo in nibh ornare, ac ultrices tellus tempus. Maecenas dignissim dignissim euismod. Vestibulum consequat porttitor placerat.",
            profile: {
                id: 1,
                username: "theduardomaciel",
                image_url: "https://github.com/theduardomaciel.png",
                level: 1,
                experience: 200,
                reports: [],
                ratings: [],
            },
            report: {
                profile: {
                    id: 1,
                    username: "theduardomaciel",
                    image_url: "https://github.com/theduardomaciel.png",
                    level: 1,
                    experience: 200,
                    reports: [],
                    ratings: [],
                },
                id: 1,
                createdAt: "Thu Jun 09 2022 22:40:45 GMT+0000",
                address: "Loteamento Luz do Vale, Feirinha do Tabuleiro, 57081-005, Maceió, AL",
                coordinates: [-54.52256, 24.54711],
                images_urls: ["https://bioresiduosambiental.com.br/wp-content/uploads/2019/02/lixo-industrial.jpg", "https://www.bio.fiocruz.br/images/aumento-lixo-eletronico.jpg", "https://bioresiduosambiental.com.br/wp-content/uploads/2019/02/lixo-industrial.jpg"],
                suggestion: "Deveriam fazer umas coisas assim, é isso ae",
                hasTrashBins: true,
                profile_id: 1,
                note1: 23,
                approved: true,
                note2: 12,
                note3: 54,
                note4: 2,
                note5: 21,
                resolved: false,
                comments: []
            },
            createdAt: "Thu Jun 09 2022 22:40:45 GMT+0000",
        },
        {
            id: 2,
            content: "André adaodaoisdjioadjaiodjaoisd.",
            profile: {
                id: 1,
                username: "theduardomaciel",
                image_url: "https://github.com/theduardomaciel.png",
                level: 1,
                experience: 200,
                reports: [],
                ratings: [],
            },
            report: {
                profile: {
                    id: 1,
                    username: "theduardomaciel",
                    image_url: "https://github.com/theduardomaciel.png",
                    level: 1,
                    experience: 200,
                    reports: [],
                    ratings: [],
                },
                id: 1,
                createdAt: "Thu Jun 09 2022 22:40:45 GMT+0000",
                address: "Loteamento Luz do Vale, Feirinha do Tabuleiro, 57081-005, Maceió, AL",
                coordinates: [-54.52256, 24.54711],
                images_urls: ["https://bioresiduosambiental.com.br/wp-content/uploads/2019/02/lixo-industrial.jpg", "https://www.bio.fiocruz.br/images/aumento-lixo-eletronico.jpg", "https://bioresiduosambiental.com.br/wp-content/uploads/2019/02/lixo-industrial.jpg"],
                suggestion: "Deveriam fazer umas coisas assim, é isso ae",
                hasTrashBins: true,
                profile_id: 1,
                note1: 23,
                approved: true,
                note2: 12,
                note3: 54,
                note4: 2,
                note5: 21,
                resolved: false,
                comments: []
            },
            createdAt: "Thu Jun 09 2022 22:40:45 GMT+0000",
        },
    ] */

    const EmptyItem = () => {
        return (
            <div style={{ alignItems: "center", justifyContent: "center", alignSelf: "center", width: "100%" }}>
                <TrashbinIcon
                    fill={`var(--primary-color-01)`}
                />
                <p style={{
                    color: `var(--primary-color-01)`,
                    fontWeight: 700,
                    fontSize: `1.2rem`,
                    textAlign: "center",
                }}>
                    Está um pouco vazio aqui...
                </p>
            </div>
        )
    }

    const commentsItems = comments.map((comment) => {
        const createdAtText = CalculateCommentCreatedAt(comment.createdAt)
        return (
            <li className={styles.commentContainer} key={comment.id}>
                <img className={styles.profile_image} src={comment.profile.image_url} />
                <div >
                    <p className={styles.usernameText}>
                        {comment.profile.username}
                    </p>
                    <p className={styles.commentText}>
                        {comment.content}
                    </p>
                    <p className={styles.createdAtText}>
                        {createdAtText}
                    </p>
                </div>
            </li>
        )
    });

    return (
        <ul style={{ width: "100%" }}>
            {
                comments.length > 0 ?
                    commentsItems
                    :
                    <EmptyItem />
            }
        </ul>
    );
}