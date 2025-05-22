import { Bookmark, FileText, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import CountUp from "@/components/blog/CountUp"
import { Post } from "@/lib/post"

interface HeroProps {
    posts: Post[]
}

const Hero = ({ posts }: HeroProps) => {
    // Count posts by category
    const categoryCount = posts.reduce(
        (acc, post) => {
            if (post.categories) {
                post.categories.forEach((cat) => {
                    acc[cat] = (acc[cat] || 0) + 1
                })
            }
            return acc
        },
        {} as Record<string, number>,
    )
    return (
        <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 bg-gradient-to-b from-[var(--background-primary)] via-buttons/10 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]" />
            </div>

            <div className=" px-6 md:px-12 py-5 max-w-7xl w-full mx-auto">
                <div className="flex flex-col items-center text-center space-y-8">

                    <h1 className="text-3xl font-bold tracking-tight md:text-6xl text-textPrimary mt-8">
                        Modern <span className="text-buttons">Blog Template</span>
                    </h1>

                    <p className="text-lg md:text-xl text-textPrimary/70 max-w-2xl">
                        A feature-rich blog template built with Next.js, TypeScript, and Tailwind CSS. Share your insights, tutorials, and experiences with the world.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                        <Button
                            asChild
                            size="lg"
                            className="rounded-full px-6 text-textSecondary bg-textPrimary backdrop-blur-sm hover:bg-textPrimary/90 hover:shadow-buttons/5 transition-all duration-300"
                        >
                            <Link href="#latest-posts">
                                Explore Latest Posts
                                <ChevronRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                        {/* <Button
                            variant="outline"
                            asChild
                            size="lg"
                            className="rounded-full px-6 bg-cardBackground border border-borderColor text-textPrimary hover:bg-buttons/5 backdrop-blur-sm hover:shadow-buttons/5 transition-all duration-300"
                        >
                            <Link href="/about">About Me</Link>
                        </Button> */}
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
                        <Card className="overflow-hidden max-w-sm border border-borderColor bg-cardBackground backdrop-blur-sm hover:shadow-buttons/5 transition-all duration-300">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-buttons/10 flex items-center justify-center">
                                    <FileText className="h-6 w-6 text-buttons" />
                                </div>
                                <div className="text-left">
                                    <div className="text-3xl font-bold text-buttons">
                                        <CountUp end={posts.length} duration={1500} />
                                    </div>
                                    <p className="text-textPrimary/70">Total Posts</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden  max-w-sm border border-borderColor bg-cardBackground backdrop-blur-sm hover:shadow-buttons/5 transition-all duration-300">
                            <CardContent className="p-6 flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-buttons/10 flex items-center justify-center">
                                    <Bookmark className="h-6 w-6 text-buttons" />
                                </div>
                                <div className="text-left">
                                    <div className="text-3xl font-bold text-buttons">
                                        <CountUp end={Object.keys(categoryCount).length} duration={1500} delay={300} />
                                    </div>
                                    <p className="text-textPrimary/70">Categories</p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="overflow-hidden  max-w-sm border border-borderColor bg-cardBackground backdrop-blur-sm hover:shadow-buttons/5 transition-all duration-300">
                            <CardContent className="p-6 flex items-center gap-4">
                                <Avatar className="h-20 w-20 border-2 border-buttons/20 bg-buttons/5">
                                    <AvatarImage src="/images/avatar.png" alt="Darshan Bajgain" />
                                    <AvatarFallback className="bg-buttons/10 text-buttons">DB</AvatarFallback>
                                </Avatar>
                                <div className="text-left">
                                    <div className="text-lg font-bold text-buttons">Darshan Bajgain</div>
                                    <p className="text-textPrimary/70">Author</p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-buttons/10 to-transparent" />
        </section>
    )
}

export default Hero