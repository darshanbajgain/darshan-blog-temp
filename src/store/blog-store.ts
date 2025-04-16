import { create } from "zustand"
import type { Post } from "@/lib/post"

interface BlogState {
  // Search state
  search: string
  setSearch: (search: string) => void

  // Category state
  selectedCategory: string
  setSelectedCategory: (category: string) => void

  // Pagination state
  currentPage: number
  setCurrentPage: (page: number) => void

  // Posts per page
  postsPerPage: number

  // Helper functions
  getFilteredPosts: (posts: Post[]) => Post[]
  getPaginatedPosts: (posts: Post[]) => Post[]
  getReadingTime: (content: string) => number
  resetFilters: () => void
}

export const useBlogStore = create<BlogState>((set, get) => ({
  // Search state
  search: "",
  setSearch: (search) => {
    set({ search, currentPage: 1 })
  },

  // Category state
  selectedCategory: "all",
  setSelectedCategory: (category) => {
    set({ selectedCategory: category, currentPage: 1 })
  },

  // Pagination state
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  // Posts per page
  postsPerPage: 6,

  // Helper functions
  getFilteredPosts: (posts) => {
    const { search, selectedCategory } = get()

    return posts.filter((post) => {
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
  },

  getPaginatedPosts: (posts) => {
    const { currentPage, postsPerPage, getFilteredPosts } = get()
    const filteredPosts = getFilteredPosts(posts)

    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage

    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  },

  getReadingTime: (content) => {
    const wordCount = content.trim().split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)
    return readingTime < 1 ? 1 : readingTime
  },

  resetFilters: () => {
    set({
      search: "",
      selectedCategory: "all",
      currentPage: 1,
    })
  },
}))

