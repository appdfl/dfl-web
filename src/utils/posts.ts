import { remark } from 'remark';
import html from 'remark-html';
import remarkImages from 'remark-images';
import remarkBreaks from 'remark-breaks'
import remarkGfm from 'remark-gfm'
import remarkDirective from 'remark-directive'
import { api } from './api';
import { Post } from '../@types/application';

export async function getPostsData(redactorId?: string, content?: string, published?: boolean, pinned?: boolean, searchCount?: number) {
    const queryString = `/post?${redactorId ? `redactorId=${redactorId}` : ""}${redactorId && content ? "&" : ""}${content ? `content=${content}` : ""}${content && published ? "&" : ""}${published ? `published=${published}` : ""}${published && pinned ? "& " : ""}${pinned ? `pinned=${pinned}` : ""}${pinned && searchCount ? "&" : ""}${searchCount ? `searchCount=${searchCount}` : ""}`
    try {
        const dataResponse = await api.get(queryString)
        if (dataResponse.status === 200) {
            console.log("Posts do blog obtidos com sucesso!")
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
        .use(remarkDirective)
        .use(remarkImages)
        .process(postContent)
    const contentHtml = processedContent.toString()

    return contentHtml
}

export async function getAllPostIds() {
    const posts = await getPostsData() as Array<Post>;
    return posts.map((post) => {
        /* post.title.toLowerCase().replace(/ /g, '-') */
        return {
            params: {
                id: post.id.toString(),
            },
        };
    });
}

export async function getPostsDataFormatted() {
    const posts = await getPostsData(null, null, true, null, null) as Array<Post>;
    const postsObjects = await Promise.all(posts.map(async (post) => {
        const contentHtml = await formatPostContent(post.content)
        const date = new Date(post.createdAt).toLocaleDateString('pt-BR')
        return {
            post: post,
            date,
            contentHtml,
        }
    }));
    return postsObjects;
}

export async function getPostDataFormatted(id: string) {
    const dataResponse = await api.get(`/post/${id}`)
    const post = dataResponse.data;
    const contentHtml = await formatPostContent(post.content)
    const date = new Date(post.createdAt).toLocaleDateString('pt-BR')
    return {
        ...post,
        date,
        contentHtml,
    }
}

/* import { visit } from 'unist-util-visit' */

// This plugin is an example to turn `::note` into divs, passing arbitrary
// attributes.
// @type {import('unified').Plugin<[], import('mdast').Root>} */
/* function myRemarkPlugin() {
    return (tree) => {
        visit(tree, (node) => {
            if (
                node.type === 'textDirective' ||
                node.type === 'leafDirective' ||
                node.type === 'containerDirective'
            ) {
                if (node.name !== 'note') return

                const data = node.data || (node.data = {})
                const tagName = node.type === 'textDirective' ? 'span' : 'div'

                data.hName = tagName
                data.hProperties = h(tagName, node.attributes).properties
            }
        })
    }
} */