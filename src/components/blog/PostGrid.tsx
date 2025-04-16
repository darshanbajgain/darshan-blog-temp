"use client"

import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import type { Post } from "@/lib/post"
import { useBlogStore } from "@/store/blog-store"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"

interface PostGridProps {
    posts: Post[]
    showEmptyState?: boolean
}

export default function PostGrid({ posts, showEmptyState = true }: PostGridProps) {
    const router = useRouter()
    const { getReadingTime, resetFilters } = useBlogStore()

    if (posts.length === 0 && showEmptyState) {
        return (
            <div className="text-center py-12 border rounded-lg bg-card/50">
                <div className="text-4xl mb-3">🔍</div>
                <h3 className="text-lg font-medium mb-1">No posts found</h3>
                <p className="text-muted-foreground text-sm">Try adjusting your search or filter criteria</p>
                <Button variant="outline" className="mt-4" onClick={resetFilters}>
                    Clear filters
                </Button>
            </div>
        )
    }

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
                <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                    <Link href={`/posts/${post.slug}`} className="group block h-full">
                        <article className="relative h-full flex flex-col overflow-hidden rounded-xl border bg-cardBackground text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md group-hover:border-buttons/50">
                            <div className="flex-1 p-6 flex flex-col">
                                {/* Categories */}
                                {post.categories && post.categories.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.categories.map((category) => (
                                            <Badge
                                                key={category}
                                                variant="secondary"
                                                className="text-xs font-normal cursor-pointer transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                onClick={(e) => {
                                                    e.preventDefault()
                                                    e.stopPropagation()
                                                    router.push(`/categories/${encodeURIComponent(category)}`)
                                                }}
                                            >
                                                {category}
                                            </Badge>
                                        ))}
                                    </div>
                                )}

                                {/* Title */}
                                <h3 className="text-xl font-semibold tracking-tight mb-3 group-hover:text-primary transition-colors duration-200">
                                    {post.title}
                                </h3>

                                {/* Description */}
                                <p className="text-muted-foreground text-sm mb-6 line-clamp-3">{post.description}</p>

                                {/* Meta info */}
                                <div className="mt-auto flex items-center justify-between">
                                    <div className="flex items-center text-xs text-muted-foreground gap-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5 text-buttons" />
                                            <time dateTime={post.date}>
                                                {new Date(post.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </time>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5 text-buttons" />
                                            <span>{getReadingTime(post.content)} min read</span>
                                        </div>
                                    </div>

                                    <div className="opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                                        <ArrowRight className="h-4 w-4 text-buttons" />
                                    </div>
                                </div>
                            </div>
                        </article>
                    </Link>
                </motion.div>
            ))}
        </div>
    )
}

