"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import type { Post } from "@/lib/post"
import { Calendar, Clock, Search, X } from "lucide-react"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"

interface PostListProps {
    initialPosts: Post[]
}

export default function PostList({ initialPosts }: PostListProps) {
    const router = useRouter()
    const searchParams = useSearchParams()
    const categoryParam = searchParams.get("category")

    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || "all")
    const postsPerPage = 6

    // Extract all unique categories from posts
    const allCategories = Array.from(
        new Set(initialPosts.flatMap((post) => (post.categories ? post.categories : []))),
    ).filter(Boolean)

    // Filter posts based on search query and selected category
    const filteredPosts = initialPosts.filter((post) => {
        const title = post.title || ""
        const description = post.description || ""
        const content = post.content || ""

        const matchesSearch =
            title.toLowerCase().includes(search.toLowerCase()) ||
            description.toLowerCase().includes(search.toLowerCase()) ||
            content.toLowerCase().includes(search.toLowerCase())

        const matchesCategory =
            selectedCategory === "all" || (post.categories && post.categories.includes(selectedCategory))

        return matchesSearch && matchesCategory
    })

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

    // Reset to first page when filters change
    useEffect(() => {
        setCurrentPage(1)
    }, [search, selectedCategory])

    // Update URL when category changes
    useEffect(() => {
        if (selectedCategory && selectedCategory !== "all") {
            router.push(`/?category=${selectedCategory}`, { scroll: false })
        } else if (categoryParam) {
            router.push("/", { scroll: false })
        }
    }, [selectedCategory, router, categoryParam])

    // Set selected category from URL parameter on initial load
    useEffect(() => {
        if (categoryParam) {
            setSelectedCategory(categoryParam)
        }
    }, [categoryParam])

    // Estimate reading time (1 min per 200 words)
    const getReadingTime = (content: string) => {
        const wordCount = content.trim().split(/\s+/).length
        const readingTime = Math.ceil(wordCount / 200)
        return readingTime < 1 ? 1 : readingTime
    }

    return (
        <div className="space-y-8">
            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 w-full"
                    />
                    {search && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7"
                            onClick={() => setSearch("")}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-[200px]">
                        <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="all">All categories</SelectItem>
                            {allCategories.map((category) => (
                                <SelectItem key={category} value={category}>
                                    {category}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* Stats */}
            <div className="text-sm text-muted-foreground">
                Found {filteredPosts.length} post{filteredPosts.length !== 1 ? "s" : ""}
                {selectedCategory !== "all" && (
                    <span>
                        {" "}
                        in{" "}
                        <Badge variant="outline" className="ml-1 font-normal">
                            {selectedCategory}
                        </Badge>
                    </span>
                )}
            </div>

            {/* Blog Post Grid */}
            {currentPosts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {currentPosts.map((post) => (
                        <Link key={post.slug} href={`/posts/${post.slug}`} className="group block h-full">
                            <article className="relative h-full flex flex-col overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-200 hover:shadow-md hover:translate-y-[-2px]">
                                {/* Featured image placeholder - would come from post.image if available */}
                                <div className="bg-gradient-to-r from-primary/5 to-primary/10 h-32 w-full relative overflow-hidden">
                                    <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors duration-200"></div>
                                </div>

                                <div className="flex-1 p-5 flex flex-col">
                                    {/* Categories */}
                                    {post.categories && post.categories.length > 0 && (
                                        <div className="flex flex-wrap gap-2 mb-3">
                                            {post.categories.map((category) => (
                                                <Badge
                                                    key={category}
                                                    variant="secondary"
                                                    className="text-xs font-normal cursor-pointer"
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
                                    <h3 className="text-xl font-semibold tracking-tight mb-2 group-hover:text-primary transition-colors duration-200">
                                        {post.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{post.description}</p>

                                    {/* Meta info */}
                                    <div className="mt-auto flex items-center text-xs text-muted-foreground gap-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="h-3.5 w-3.5" />
                                            <time dateTime={post.date}>
                                                {new Date(post.date).toLocaleDateString("en-US", {
                                                    year: "numeric",
                                                    month: "short",
                                                    day: "numeric",
                                                })}
                                            </time>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock className="h-3.5 w-3.5" />
                                            <span>{getReadingTime(post.content)} min read</span>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 border rounded-lg bg-card/50">
                    <div className="text-4xl mb-3">🔍</div>
                    <h3 className="text-lg font-medium mb-1">No posts found</h3>
                    <p className="text-muted-foreground text-sm">Try adjusting your search or filter criteria</p>
                    {(search || selectedCategory !== "all") && (
                        <Button
                            variant="outline"
                            className="mt-4"
                            onClick={() => {
                                setSearch("")
                                setSelectedCategory("all")
                            }}
                        >
                            Clear filters
                        </Button>
                    )}
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-6">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="h-8 px-3"
                    >
                        Previous
                    </Button>

                    <div className="flex items-center gap-1">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                size="sm"
                                onClick={() => setCurrentPage(page)}
                                className={`h-8 w-8 p-0 ${currentPage === page ? "pointer-events-none" : ""}`}
                            >
                                {page}
                            </Button>
                        ))}
                    </div>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="h-8 px-3"
                    >
                        Next
                    </Button>
                </div>
            )}
        </div>
    )
}
