import { remark } from 'remark';
import html from 'remark-html';
import remarkImages from 'remark-images';
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import { api } from './api';

export async function getPostsData(redactorId?: string, content?: string, published?: boolean, pinned?: boolean, searchCount?: number) {
    const queryString = `/post?${redactorId ? `redactorId=${redactorId}` : ""}${redactorId && content ? "&" : ""}${content ? `content=${content}` : ""}${content && published ? "&" : ""}${published ? `published=${published}` : ""}${published && pinned ? "& " : ""}${pinned ? `pinned=${pinned}` : ""}${pinned && searchCount ? "&" : ""}${searchCount ? `searchCount=${searchCount}` : ""}`
    try {
        const dataResponse = await api.get(queryString)
        if (dataResponse.status === 200) {
            console.log("Posts do blog obtidos com sucesso!", dataResponse.data)
            return dataResponse.data
        } else {
            console.log("Erro ao obter posts do blog!")
        }
    } catch (error) {
        console.log(error)
        return []
    }
}

export async function formatPostContent(postContent) {
    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .use(remarkBreaks)
        .use(remarkGfm)
        .use(remarkImages)
        .process(postContent)
    const contentHtml = processedContent.toString()

    return contentHtml
}