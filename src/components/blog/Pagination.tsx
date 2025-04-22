"use client"

import { Button } from "@/components/ui/button"
import { useBlogStore } from "@/store/blog-store"

interface PaginationProps {
    totalPages: number
}

export default function Pagination({ totalPages }: PaginationProps) {
    const { currentPage, setCurrentPage } = useBlogStore()

    if (totalPages <= 1) {
        return null
    }

    return (
        <div className="flex justify-center items-center gap-2 my-2 pt-6">
            <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="h-9 px-4 text-textPrimary bg-buttons hover:text-buttons hover:bg-buttons/5 border border-borderColor"

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
                        className={`h-9 w-9 p-0 text-textPrimary  bg-buttons hover:text-buttons hover:bg-buttons/5 border border-borderColor ${currentPage === page ? "pointer-events-none bg-textSecondary text-buttons" : ""}`}
                    >
                        {page}
                    </Button>
                ))}
            </div>

            <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="h-9 px-4 text-textPrimary bg-buttons hover:text-buttons hover:bg-buttons/5 border border-borderColor"
            >
                Next
            </Button>
        </div>
    )
}
