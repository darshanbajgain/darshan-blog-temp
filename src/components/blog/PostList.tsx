"use client"

import { useEffect } from "react"
import type { Post } from "@/lib/post"
import { useBlogStore } from "@/store/blog-store"
import PostGrid from "./PostGrid"
import SearchAndFilter from "./SearchAndFilter"
import Pagination from "./Pagination"

interface PostListProps {
    initialPosts: Post[]
    showSearch?: boolean
}

export default function PostList({ initialPosts, showSearch = true }: PostListProps) {
    const { getFilteredPosts, getPaginatedPosts, postsPerPage, resetFilters } = useBlogStore()

    // Reset filters when component unmounts
    useEffect(() => {
        return () => {
            resetFilters()
        }
    }, [resetFilters])

    // Extract all unique categories from posts
    const allCategories = Array.from(
        new Set(initialPosts.flatMap((post) => (post.categories ? post.categories : []))),
    ).filter(Boolean)

    const filteredPosts = getFilteredPosts(initialPosts)
    const currentPosts = getPaginatedPosts(initialPosts)
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

    return (
        <div className="space-y-5">
       <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
             {/* Search and Filter Bar - Only show if showSearch is true */}
             {showSearch && <SearchAndFilter allCategories={allCategories} totalPosts={filteredPosts.length} />}
            {/* Pagination */}
            <Pagination totalPages={totalPages} />
       </div>
            {/* Blog Post Grid */}
            <PostGrid posts={currentPosts} showEmptyState={showSearch} />


        </div>
    )
}