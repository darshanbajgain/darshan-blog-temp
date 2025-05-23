import PostList from "@/components/blog/PostList"
import { Button } from "@/components/ui/button"
import { getAllPosts } from "@/lib/post"
import { ChevronLeft } from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
    title: "All Posts | Darshan's Blog",
    description: "Browse all articles and tutorials on web development, JavaScript, React, and more",
}

export default async function AllPostsPage() {
    const posts = await getAllPosts()

    return (
        <div className="container mx-auto  max-w-7xl  px-6 md:px-12 py-5 mb-16">
            <div className="space-y-5">

                <header className="mb-10">
                    <Button variant="ghost" asChild className="mb-8 pl-2">
                        <Link
                            href="/"
                            className="flex items-center gap-1 text-textPrimary/70 hover:text-textPrimary"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Go Back
                        </Link>
                    </Button>
                    <h1 className="text-3xl font-bold tracking-tight mb-3 text-textPrimary">All Posts</h1>
                    <p className="text-textPrimary/70">
                        Browse all {posts.length} articles and tutorials on web development, JavaScript, React, and more.
                    </p>
                </header>

                <PostList initialPosts={posts} showSearch={true} />
            </div>
        </div>
    )
}

