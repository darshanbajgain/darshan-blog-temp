"use client"

import Link from "next/link"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/post"
import { motion } from "framer-motion"
import { useBlogStore } from "@/store/blog-store"

interface FeaturedPostsProps {
    posts: Post[]
    title?: string
    maxPosts?: number
}

export default function FeaturedPosts({ posts, title = "Featured Posts", maxPosts = 3 }: FeaturedPostsProps) {
    const { getReadingTime } = useBlogStore()

    if (!posts || posts.length === 0) return null

    // Limit the number of posts to display
    const displayPosts = posts.slice(0, maxPosts)

    return (
        <section className="w-full px-6 md:px-12 py-5 max-w-7xl mx-auto">
            <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-textPrimary">{title}</h2>
                    <Link href="/all-posts" className="text-buttons flex items-center text-xs md:text-sm font-medium hover:underline">
                        View all posts <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayPosts.map((post, index) => (
                    <motion.div
                        key={post.slug}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="group"
                    >
                        <div className="relative h-full">
                            {/* Featured badge - positioned absolutely */}
                            <div className="absolute -top-3 -right-3 z-10">
                                <Badge className="bg-buttons text-textSecondary border-none px-3 py-1 shadow-md">Featured</Badge>
                            </div>

                            {/* Main card */}
                            <Link href={`/posts/${post.slug}`}>
                                <div className="relative h-full rounded-xl overflow-hidden bg-cardBackground border border-buttons/20 group-hover:border-buttons/40 transition-all duration-300 shadow-sm group-hover:shadow-lg group-hover:shadow-buttons/10 group-hover:-translate-y-1">
                                    {/* Content area */}
                                    <div className="p-6">
                                        {/* Categories */}
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {post.categories?.slice(0, 3).map((category) => (
                                                <Badge
                                                    key={category}
                                                    variant="outline"
                                                    className="bg-transparent border-buttons/20 text-buttons hover:bg-buttons/5"
                                                >
                                                    {category}
                                                </Badge>
                                            ))}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-xl font-bold mb-3 text-textPrimary group-hover:text-buttons transition-colors duration-300 line-clamp-2">
                                            {post.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-textPrimary/70 mb-4 line-clamp-3">{post.description}</p>

                                        {/* Metadata */}
                                        <div className="flex items-center justify-between pt-3 border-t border-buttons/10">
                                            <div className="flex items-center gap-3 text-xs text-textPrimary/60">
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

                                            <ArrowRight className="h-4 w-4 text-buttons opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}