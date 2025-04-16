"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

interface TopCategoriesProps {
    categories: [string, number][]
    title?: string
    description?: string
    maxCategories?: number
}

export default function TopCategories({
    categories,
    title = "Popular Categories",
    description = "Browse posts by your favorite topics",
    maxCategories = 5,
}: TopCategoriesProps) {
    if (!categories || categories.length === 0) return null

    // Limit the number of categories to display
    const displayCategories = categories.slice(0, maxCategories)

    return (
        <section className="w-full max-w-7xl mx-auto  px-6 md:px-12 py-5">
            <div className="flex flex-col gap-2 mb-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl md:text-2xl font-bold tracking-tight text-textPrimary">{title}</h2>
                    <Link href="/all-posts" className="text-buttons flex items-center text-xs md:text-sm font-medium hover:underline">
                        View all categories <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                </div>
                <p className="text-textPrimary/60">{description}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {displayCategories.map(([category, count], index) => (
                    <motion.div
                        key={category}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                        <Link href={`/categories/${encodeURIComponent(category)}`} className="block group">
                            <div className="p-4 border border-borderColor rounded-md bg-cardBackground hover:border-buttons/40 hover:bg-buttons/5 transition-all duration-200 h-full">
                                <div className="flex flex-col h-full">
                                    <h3 className="text-base font-medium mb-1 text-textPrimary group-hover:text-buttons transition-colors">
                                        {category}
                                    </h3>

                                    <p className="text-textPrimary/60 text-sm">
                                        {count} post{count !== 1 ? "s" : ""}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </section>
    )
}