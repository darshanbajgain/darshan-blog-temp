import { getPostBySlug, getAllPosts } from "@/lib/post"
import type { Metadata } from "next"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ChevronLeft, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"
import SocialShare from "@/components/blog/SocialShare"
import { Toaster } from "sonner"

interface PostPageProps {
    params: Promise<{
        slug: string
    }>
}

// Generate metadata for the page
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    try {
        const { slug } = await params;
        const post = getPostBySlug(slug)

        return {
            title: `${post.title} | Darshan's Blog`,
            description: post.description,
        }
    } catch {
        return {
            title: "Post Not Found | Darshan's Blog",
            description: "The requested post could not be found.",
        }
    }
}

// Generate static paths
export function generateStaticParams() {
    const posts = getAllPosts()
    return posts.map((post) => ({
        slug: post.slug,
    }))
}

// Estimate reading time (1 min per 200 words)
function getReadingTime(content: string) {
    const wordCount = content
        .replace(/<[^>]*>/g, "")
        .trim()
        .split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)
    return readingTime < 1 ? 1 : readingTime
}

export default async function PostPage({ params }: PostPageProps) {
    let post

    try {
        const { slug } = await params;
        post = getPostBySlug(slug)
    } catch {
        notFound()
    }

    const readingTime = getReadingTime(post.content)
    const publishDate = new Date(post.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    })

    return (
        <article className="container max-w-7xl px-4 sm:px-6 md:px-12 py-5 mx-auto mb-16">
            <Button variant="ghost" asChild className="mb-8 text-textPrimary/70 hover:text-textPrimary">
                <Link href="/" className="flex items-center gap-1 ">
                    <ChevronLeft className="h-4 w-4" />
                    Back to all posts
                </Link>
            </Button>

            <div className="mb-8">
                {/* Post categories */}
                {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {post.categories.map((category) => (
                            <Link href={`/categories/${encodeURIComponent(category)}`} key={category}>
                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                >
                                    {category}
                                </Badge>
                            </Link>
                        ))}
                    </div>
                )}

                {/* Post title */}
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">{post.title}</h1>

                {/* Post description */}
                <p className="text-lg sm:text-xl text-textPrimary/70 mb-6">{post.description}</p>

                {/* Post meta */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-textPrimary/70">
                    <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4 text-buttons" />
                        <time dateTime={post.date}>{publishDate}</time>
                    </div>
                    <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-buttons" />
                        <span>{readingTime} min read</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <User className="h-4 w-4 text-buttons" />
                        <span>By {post.author || "Darshan Bajgain"}</span>
                    </div>
                </div>
            </div>

            {/* Post divider */}
            <div className="border-t mb-10" />

            {/* Post content */}
            <div
                className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-2xl prose-h3:text-xl prose-a:text-primary/70 prose-pre:bg-muted prose-pre:text-textPrimary/70 prose-pre:border prose-img:rounded-lg prose-code:bg-muted prose-code:text-textPrimary/70 prose-code:border prose-code:rounded prose-table:overflow-x-auto sm:prose-table:overflow-visible prose-table:w-full prose-table:my-6 prose-table:border-collapse"
                dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Post footer */}
            <div className="border-t mt-12 sm:mt-16 pt-6 sm:pt-8">
                <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Share this post</h3>
                <SocialShare
                    title={post.title}
                    url={`${process.env.NEXT_PUBLIC_SITE_URL || 'https://blog.darshanbajgain.com.np'}/posts/${post.slug}`}
                />
                <Toaster position="bottom-right" richColors />
            </div>


        </article>
    )
}