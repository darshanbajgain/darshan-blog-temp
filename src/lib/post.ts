import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkRehype from "remark-rehype"
import rehypeHighlight from "rehype-highlight"
import rehypeStringify from "rehype-stringify"

// Define the path to the posts directory
const postsDirectory = path.join(process.cwd(), "src/posts")

// Function to process markdown content
async function processMarkdown(content: string): Promise<string> {
    const result = await unified()
        .use(remarkParse) // Parse markdown content
        .use(remarkGfm) // Support GFM (tables, autolinks, etc.)
        .use(remarkRehype, { allowDangerousHtml: true }) // Convert to HTML
        .use(rehypeHighlight, { ignoreMissing: true }) // Add syntax highlighting
        .use(rehypeStringify, { allowDangerousHtml: true }) // Stringify HTML
        .process(content)

    return result.toString()
}

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

export async function getAllPosts(): Promise<Post[]> {
    try {
        // Check if the directory exists
        if (!fs.existsSync(postsDirectory)) {
            console.warn(`Posts directory not found: ${postsDirectory}`)
            return []
        }

        const fileNames = fs
            .readdirSync(postsDirectory)
            .filter((fileName) => {
                try {
                    return fs.statSync(path.join(postsDirectory, fileName)).isFile() && fileName.endsWith(".md")
                } catch (error) {
                    console.error(`Error checking file ${fileName}:`, error)
                    return false
                }
            })

        console.log("Found markdown files:", fileNames)

        // Process all posts in parallel
        const allPostsPromises = fileNames.map(async (fileName) => {
            const slug = fileName.replace(/\.md$/, "")
            const fullPath = path.join(postsDirectory, fileName)
            try {
                const fileContents = fs.readFileSync(fullPath, "utf8")
                const { data, content } = matter(fileContents)

                // Default categories if none provided
                const categories = data.categories || []

                // Process markdown content
                const processedContent = await processMarkdown(content || "")

                return {
                    slug,
                    title: data.title || "Untitled Post",
                    date: data.date || new Date().toISOString().split("T")[0],
                    description: data.description || "No description available",
                    content: processedContent,
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

        // Wait for all posts to be processed
        const allPosts = await Promise.all(allPostsPromises)

        return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    } catch (error) {
        console.error("Error in getAllPosts:", error)
        return []
    }
}

export async function getPostBySlug(slug: string): Promise<Post> {
    try {
        // Check if the directory exists
        if (!fs.existsSync(postsDirectory)) {
            console.warn(`Posts directory not found: ${postsDirectory}`)
            throw new Error(`Posts directory not found: ${postsDirectory}`)
        }

        const fullPath = path.join(postsDirectory, `${slug}.md`)

        // Check if the file exists
        if (!fs.existsSync(fullPath)) {
            console.warn(`Post file not found: ${fullPath}`)
            throw new Error(`Post not found: ${slug}`)
        }

        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        // Default categories if none provided
        const categories = data.categories || []

        // Process markdown content
        const processedContent = await processMarkdown(content || "")

        return {
            slug,
            title: data.title || "Untitled Post",
            date: data.date || new Date().toISOString().split("T")[0],
            description: data.description || "No description available",
            content: processedContent,
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