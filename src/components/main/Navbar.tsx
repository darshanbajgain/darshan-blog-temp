"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Menu, X, Github, Twitter, Linkedin, Moon, Sun, GithubIcon, TwitterIcon, LinkedinIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [mounted, setMounted] = useState(false)
    const { setTheme, resolvedTheme } = useTheme()

    // Add effect to handle body scroll
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        // Cleanup function to reset overflow when component unmounts
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    // Handle mounting to prevent hydration mismatch with theme
    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <header
            className={`fixed top-0 z-[100] w-full transition-all duration-200 p-2 ${isScrolled ? "bg-backgroundPrimary border-b border-borderColor" : "bg-backgroundPrimary"}`}
        >
            <div className="container mx-auto max-w-7xl px-6 md:px-12 py-4 flex h-16 items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2">
                    {/* <span className="bg-buttons text-textSecondary font-mono text-sm px-2 py-1 rounded">DB</span> */}
                    <Avatar className="h-12 w-12 border-2 border-buttons/20 bg-buttons/5">
                        <AvatarImage src="/images/avatar.png" alt="Blog Logo" />
                        <AvatarFallback className="bg-buttons/10 text-buttons">NB</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold tracking-tight text-textPrimary">Next.js Blog</span>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex items-center gap-6">
                    {/* <Link href="/" className="text-textPrimary/80 hover:text-buttons leading-6 tracking-wide transition-colors">
                        Home
                    </Link> */}
                    {/* <Link href="/about" className="text-textPrimary/80 hover:text-buttons leading-6 tracking-wide transition-colors">
                        About
                    </Link> */}
                    {/* <Link href="/all-posts" className="text-textPrimary/80 hover:text-buttons leading-6 tracking-wide transition-colors">
                        All Posts
                    </Link> */}
                    {/* <Link href="/contact" className="text-textPrimary/80 hover:text-buttons leading-6 tracking-wide transition-colors">
                        Contact
                    </Link> */}
                </nav>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    {/* Social Links - Desktop */}
                    <div className="hidden md:flex items-center gap-1">
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
                    </div>

                    {/* Theme Toggle - Only show when mounted to prevent hydration mismatch */}
                    {mounted && (
                        <Button
                            variant="ghost"
                            className="text-buttons hover:text-buttons hover:bg-buttons/5"
                            size="icon"
                            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                            aria-label="Toggle theme"
                        >
                            {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                        </Button>
                    )}

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden text-buttons hover:text-buttons hover:bg-buttons/5"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>

                {/* Mobile Menu Overlay */}
                {isMenuOpen && (
                    <div className="fixed h-screen scrollbar-none overflow-clip inset-0 z-[200] bg-backgroundPrimary md:hidden">
                        <div className="container mx-auto px-6 py-2 h-full flex flex-col">
                            <div className="flex items-end justify-end h-16">
                                <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
                                    <X className="h-12 w-12 text-textPrimary/80" />
                                </Button>
                            </div>

                            <nav className="flex flex-col items-center justify-center gap-6 flex-1">
                                <Link
                                    href="/"
                                    className="text-2xl text-textPrimary/80 hover:text-buttons leading-6 tracking-wide transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-2xl text-textPrimary/80 hover:text-buttons leading-6 tracking-wide transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    About
                                </Link>
                                <Link
                                    href="/all-posts"
                                    className="text-2xl text-textPrimary/80 hover:text-buttons leading-6 tracking-wide transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    All Posts
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-2xl text-textPrimary/80 hover:text-buttons leading-6 tracking-wide transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Contact
                                </Link>

                                {/* Social Links - Mobile */}
                                <div className="flex items-center gap-4 mt-4">
                                    <Button variant="outline" className="text-buttons hover:text-buttons hover:bg-buttons/5"
                                        size="icon" asChild>
                                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                            <Github className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="text-buttons hover:text-buttons hover:bg-buttons/5"
                                        size="icon" asChild>
                                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                                            <Twitter className="h-4 w-4" />
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="text-buttons hover:text-buttons hover:bg-buttons/5"
                                        size="icon" asChild>
                                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                            <Linkedin className="h-4 w-4" />
                                        </a>
                                    </Button>
                                </div>
                            </nav>
                        </div>
                    </div>
                )}
            </div>
        </header>
    )
}