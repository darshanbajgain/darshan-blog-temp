"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"
import { useBlogStore } from "@/store/blog-store"

interface SearchAndFilterProps {
    allCategories: string[]
    totalPosts: number
}

export default function SearchAndFilter({ totalPosts }: SearchAndFilterProps) {

    const { search, setSearch } = useBlogStore()


    return (
        <div className="space-y-5">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
                <div className="relative flex-1 w-full max-w-lg">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                        placeholder="Search posts..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 h-11 border-buttons/20 bg-backgroundPrimary focus-visible:ring-buttons" />
                    {search && (
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
                            onClick={() => setSearch("")}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    )}
                </div>


            </div>

            {/* Stats */}
            <div className="text-sm my-2 text-muted-foreground">
                Found {totalPosts} post{totalPosts !== 1 ? "s" : ""}
            </div>
        </div>
    )
}