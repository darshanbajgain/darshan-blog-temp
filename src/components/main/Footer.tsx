"use client"

import Link from "next/link"
import { GithubIcon, TwitterIcon, LinkedinIcon, ArrowRightIcon, InstagramIcon, Check } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { useState } from "react"
import { toast } from "sonner"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    return (
        <footer className="w-full border-t border-borderColor mt-8 bg-cardBackground">
            <div className="container mx-auto max-w-7xl  px-6 md:px-12 py-12 ">
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 my-12">
                    {/* About */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            {/* <span className="bg-buttons text-textSecondary font-mono text-sm px-2 py-1 rounded">DB</span> */}
                            <Avatar className="h-12 w-12 border-2 border-buttons/20 bg-buttons/5">
                                <AvatarImage src="/images/avatar.png" alt="Darshan Bajgain" />
                                <AvatarFallback className="bg-buttons/10 text-buttons">DB</AvatarFallback>
                            </Avatar>
                            <span className="font-semibold text-textPrimary tracking-tight">Next.js Blog</span>
                        </div>
                        <p className="text-sm text-textPrimary/70 w-[80%]">
                            A modern blog template built with Next.js, TypeScript, and Tailwind CSS. Share your insights, tutorials, and experiences.
                        </p>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" className="text-buttons hover:text-buttons hover:bg-buttons/5"
                                asChild>
                                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                    <GithubIcon className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-buttons hover:text-buttons hover:bg-buttons/5" asChild>
                                <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
                                    <TwitterIcon className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-buttons hover:text-buttons hover:bg-buttons/5" asChild>
                                <a href="https://www.linkedin.com/in/yourusername/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                    <LinkedinIcon className="h-4 w-4" />
                                </a>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-buttons hover:text-buttons hover:bg-buttons/5" asChild>
                                <a href="https://www.instagram.com/yourusername/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                                    <InstagramIcon className="h-4 w-4" />
                                </a>
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-medium text-sm tracking-wide uppercase mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link href="/" className="text-textPrimary/70 hover:text-buttons transition-colors">
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link href="/about" className="text-textPrimary/70 hover:text-buttons transition-colors">
                                    About
                                </Link>
                            </li>

                            <li>
                                <Link href="/contact" className="text-textPrimary/70 hover:text-buttons transition-colors">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h3 className="font-medium text-sm tracking-wide uppercase mb-4">Tags</h3>
                        <ul className="space-y-2 text-sm">

                            <li>
                                <Link
                                    href="/categories/React"
                                    className="text-textPrimary/70 hover:text-buttons transition-colors"
                                >
                                    React
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categories/Next.js"
                                    className="text-textPrimary/70 hover:text-buttons transition-colors"
                                >
                                    Next.js
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/categories/TypeScript"
                                    className="text-textPrimary/70 hover:text-buttons transition-colors"
                                >
                                    TypeScript
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <FooterNewsletter />
                </div>

                <div className="border-t border-borderColor pt-12 text-center text-sm text-textPrimary/70">
                    <span>© {currentYear} Your Name. All rights reserved.</span>
                </div>
            </div>
        </footer>
    )
}

const FooterNewsletter = () => {
    const [email, setEmail] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await fetch('/api/subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || 'Subscription failed')
            }

            toast.success(data.message)
            setEmail("")
            setSuccess(true)

            // Reset success message after 5 seconds
            setTimeout(() => setSuccess(false), 5000)
        } catch (error) {
            console.error('Newsletter error:', error)
            toast.error('Failed to subscribe. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div>
            <h3 className="font-medium text-sm tracking-wide uppercase mb-4">Stay Updated</h3>
            {success ? (
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-500">
                        <Check className="h-5 w-5" />
                        <span>Successfully subscribed!</span>
                    </div>
                    <p className="text-sm text-textPrimary/70">
                        Please check your email to confirm your subscription.
                    </p>
                </div>
            ) : (
                <>
                    <p className="text-sm text-textPrimary/70 w-[80%] mb-4">
                        Subscribe to get updates on new blog posts and resources.
                    </p>
                    <form onSubmit={handleSubmit} className="flex gap-2">
                        <Input
                            type="email"
                            placeholder="Your email address"
                            className="h-9 border-buttons/20 bg-backgroundPrimary focus-visible:ring-buttons"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={loading}
                        />
                        <Button
                            type="submit"
                            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:ring-1 focus-visible:ring-ring bg-buttons text-textSecondary shadow hover:bg-buttons/90 h-9 px-3"
                            disabled={loading}
                        >
                            {loading ? "..." : "Subscribe"}
                            <ArrowRightIcon className="ml-2 h-4 w-4" />
                        </Button>
                    </form>
                </>
            )}
        </div>
    )
}
