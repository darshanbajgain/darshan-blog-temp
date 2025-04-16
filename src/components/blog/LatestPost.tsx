"use client"

import type { Post } from "@/lib/post"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import PostGrid from "./PostGrid"
import { ArrowRight } from "lucide-react"

interface LatestPostsProps {
    posts: Post[]
    totalPosts: number
}

export default function LatestPosts({ posts, totalPosts }: LatestPostsProps) {
    return (
        <section id="latest-posts" className="container max-w-7xl mx-auto  px-6 md:px-12 py-5">
            <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-textPrimary">Latest Posts</h2>
                    <Link href="/all-posts" className="text-buttons flex items-center text-xs md:text-sm font-medium hover:underline">
                        View all posts <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
                <p className="text-textPrimary/60">Explore my most recent articles and tutorials</p>
                <div className="space-y-5">

                    <PostGrid posts={posts} showEmptyState={false} />

                    {totalPosts > posts.length && (
                        <div className="flex justify-center mt-6">
                            <Button variant="outline" asChild>
                                <Link href="/all-posts">View all posts</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>

        </section>

    )
}