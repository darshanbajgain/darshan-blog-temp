'use client'

import { Button } from "@/components/ui/button"
import { TwitterIcon, LinkedinIcon, FacebookIcon, LinkIcon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

interface SocialShareProps {
    title: string
    url: string
}

export default function SocialShare({ title, url }: SocialShareProps) {
    const [copied, setCopied] = useState(false)

    const encodedTitle = encodeURIComponent(title)
    const encodedUrl = encodeURIComponent(url)

    const shareLinks = {
        twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url).then(() => {
            setCopied(true)
            toast.success("Link copied to clipboard!")
            setTimeout(() => setCopied(false), 2000)
        })
    }

    return (
        <div className="flex flex-wrap gap-2">
            <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-buttons hover:text-buttons hover:bg-buttons/5"
                onClick={() => window.open(shareLinks.twitter, '_blank')}
            >
                <TwitterIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Twitter</span>
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-buttons hover:text-buttons hover:bg-buttons/5"
                onClick={() => window.open(shareLinks.linkedin, '_blank')}
            >
                <LinkedinIcon className="h-4 w-4" />
                <span className="hidden sm:inline">LinkedIn</span>
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-buttons hover:text-buttons hover:bg-buttons/5"
                onClick={() => window.open(shareLinks.facebook, '_blank')}
            >
                <FacebookIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Facebook</span>
            </Button>
            <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-buttons hover:text-buttons hover:bg-buttons/5"
                onClick={copyToClipboard}
            >
                <LinkIcon className="h-4 w-4" />
                <span className="hidden sm:inline">{copied ? "Copied!" : "Copy Link"}</span>
            </Button>
        </div>
    )
}
