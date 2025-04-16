import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon, MailIcon, GlobeIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
    title: "About Me | Next.js Blog Template",
    description: "Learn more about the author of this blog",
}

export default function AboutPage() {
    return (
        <div className="container max-w-7xl px-6 md:px-12 mx-auto mb-16 py-5">
            <div className="space-y-5">
                {/* Header Section */}
                <div className="space-y-4">
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About Me</h1>
                    <div className="h-1 w-20 bg-textPrimary"></div>
                </div>



                {/* Main Content - 2 Column Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left Column - Bio */}
                    <div className="space-y-6 prose dark:prose-invert max-w-none">
                        {/* Profile Section */}
                        <div className="flex flex-col sm:flex-row gap-8 items-start">

                            <div className="space-y-4">
                                <h2 className="text-2xl font-semibold">Your Name</h2>
                                <p className="text-muted-foreground">Web Developer & Content Creator</p>

                                <div className="flex flex-wrap items-center gap-3">
                                    <Button variant="outline" size="icon" className="text-buttons hover:bg-buttons/90   hover:text-white" asChild>
                                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                            <GithubIcon className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="icon" className="text-buttons hover:bg-buttons/90   hover:text-white" asChild>
                                        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                            <TwitterIcon className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="icon" className="text-buttons hover:bg-buttons/90   hover:text-white" asChild>
                                        <a href="https://www.linkedin.com/in/yourusername/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                            <LinkedinIcon className="h-4 w-4" />
                                        </a>

                                    </Button>
                                    <Button variant="outline" size="icon" className="text-buttons hover:bg-buttons/90 hover:text-white"
                                        asChild>
                                        <a href="mailto:your.email@example.com" aria-label="Email">
                                            <MailIcon className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-2  text-buttons hover:bg-buttons/90 hover:text-white" asChild>
                                        <a href="https://yourwebsite.com/" target="_blank" rel="noopener noreferrer">
                                            <GlobeIcon className="h-4 w-4" />
                                            <span>yourwebsite.com</span>
                                        </a>
                                    </Button>
                                    <Button variant="outline" size="icon"
                                        className="text-buttons hover:bg-buttons/90 hover:text-white" asChild>
                                        <a href="https://www.instagram.com/yourusername/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                            <InstagramIcon className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <h3 className="text-2xl font-semibold">My Journey</h3>

                        <p>
                            Hi there! I&apos;m a passionate web developer and content creator with a focus on modern web technologies.
                            I love building intuitive, responsive, and accessible web applications that provide great user experiences.
                        </p>

                        <p>
                            I specialize in frontend development with React and Next.js, and I&apos;m constantly exploring new technologies
                            to enhance my skills. I believe in writing clean, maintainable code and creating user-friendly interfaces.
                        </p>

                        <h3 className="text-2xl font-semibold">Why I Blog</h3>
                        <p>
                            I created this blog to share my knowledge and experiences with the web development community. Writing
                            helps me solidify my understanding of concepts and hopefully helps others learn along the way. I cover
                            topics ranging from basic tutorials to advanced techniques in web development.
                        </p>

                        <p>
                            My goal is to make complex technical concepts accessible to developers at all levels. I believe in
                            learning in public and sharing both successes and challenges along the way.
                        </p>

                        <p>
                            When I&apos;m not coding or writing, you can find me hiking, reading, or experimenting with new technologies.
                            I&apos;m passionate about continuous learning and sharing what I discover along the way.
                        </p>
                    </div>

                    {/* Right Column - Skills & Contact */}
                    <div className="space-y-10">
                        {/* Skills Section - Single Card */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold">My Skills</h3>

                            <Card className="overflow-hidden bg-cardBackground">
                                <CardContent className="p-6">
                                    <div className="space-y-6">
                                        <div>
                                            <h4 className="font-medium mb-3">Languages</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >JavaScript</Badge>
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >TypeScript</Badge>
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >HTML</Badge>
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >CSS</Badge>
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-medium mb-3">Frameworks</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >React</Badge>
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >Next.js</Badge>

                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >Tailwind CSS</Badge>

                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-medium mb-3">State Management</h4>
                                            <div className="flex flex-wrap gap-2">

                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >Zustand</Badge>
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >Context API</Badge>

                                            </div>
                                        </div>


                                        <div>
                                            <h4 className="font-medium mb-3">Tools & Others</h4>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >Git</Badge>
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >Vite</Badge>
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >npm</Badge>
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >Vercel</Badge>
                                                <Badge variant="secondary" className="text-xs cursor-pointer font-normal transition-colors duration-200 bg-buttons text-textSecondary border-none px-3 py-1 shadow-md hover:bg-buttons/80"
                                                >Figma</Badge>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Get in Touch Section */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-semibold">Get in Touch</h3>

                            <Card className="bg-cardBackground">
                                <CardContent className="p-6">
                                    <p className="mb-4 text-textPrimary">
                                        I&apos;m always open to new opportunities, collaborations, or just chatting about web development.
                                        Feel free to reach out to me through any of the social links above or via email.
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <MailIcon className="h-5 w-5 text-buttons" />
                                            <span className="text-textPrimary/70">your.email@example.com</span>
                                        </div>

                                        <div className="flex justify-start">
                                            <Button asChild className="h-9 bg-buttons hover:bg-buttons/90 text-textSecondary">
                                                <Link href="/contact">Contact Me</Link>
                                            </Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}