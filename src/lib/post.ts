import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

// Configure marked with minimal options
marked.use({
    gfm: true,
    breaks: true
});

const postsDirectory = path.join(process.cwd(), "src/posts")

export interface Post {
    slug: string
    title: string
    date: string
    description: string
    content: string
    categories?: string[]
    image?: string
    author?: string
}

export function getAllPosts(): Post[] {
    const fileNames = fs
        .readdirSync(postsDirectory)
        .filter((fileName) => fs.statSync(path.join(postsDirectory, fileName)).isFile() && fileName.endsWith(".md"))

    console.log("Found markdown files:", fileNames)

    const allPosts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        try {
            const fileContents = fs.readFileSync(fullPath, "utf8")
            const { data, content } = matter(fileContents)

            // Default categories if none provided
            const categories = data.categories || []

            return {
                slug,
                title: data.title || "Untitled Post",
                date: data.date || new Date().toISOString().split("T")[0],
                description: data.description || "No description available",
                content: marked.parse(content || "") as string,
                categories: Array.isArray(categories) ? categories : [categories],
                image: data.image || null,
                author: data.author || "Darshan Bajgain",
            }
        } catch (error) {
            console.error(`Error processing file ${fileName}:`, error)
            return {
                slug,
                title: "Error Loading Post",
                date: new Date().toISOString().split("T")[0],
                description: "Could not load this post due to an error",
                content: "<p>Error loading content</p>",
                categories: [],
            }
        }
    })

    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    try {
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        // Default categories if none provided
        const categories = data.categories || []

        return {
            slug,
            title: data.title || "Untitled Post",
            date: data.date || new Date().toISOString().split("T")[0],
            description: data.description || "No description available",
            content: marked.parse(content || "") as string,
            categories: Array.isArray(categories) ? categories : [categories],
            image: data.image || null,
            author: data.author || "Darshan Bajgain",
        }
    } catch (error) {
        console.error(`Error loading post with slug ${slug}:`, error)
        return {
            slug,
            title: "Error Loading Post",
            date: new Date().toISOString().split("T")[0],
            description: "Could not load this post due to an error",
            content: "<p>Error loading content</p>",
            categories: [],
        }
    }
}