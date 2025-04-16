"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Mail, ArrowRight, Check } from "lucide-react" // Add Check icon
import { useState } from "react"
import { toast } from "sonner"

interface NewsletterProps {
    title?: string
    description?: string
    buttonText?: string
    disclaimer?: string
}

export default function Newsletter({
    title = "Stay Updated",
    description = "Subscribe to my newsletter to get notified when I publish new content.",
    buttonText = "Subscribe",
    disclaimer = "I respect your privacy. Unsubscribe at any time.",
}: NewsletterProps) {
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
            
            // Reset success message after 15 seconds
            setTimeout(() => setSuccess(false), 15000)
        } catch (error) {
            console.error('Newsletter error:', error)
            toast.error('Failed to subscribe. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="w-full max-w-7xl mx-auto px-6 md:px-12 py-5">
            <div className="rounded-xl overflow-hidden border border-buttons/20 bg-cardBackground">
                <div className="grid md:grid-cols-5 items-center">
                    {/* Left content */}
                    <div className="md:col-span-3 p-8 md:p-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="space-y-4"
                        >
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-buttons/10 text-buttons text-sm font-medium mb-2">
                                <Mail className="h-4 w-4" />
                                <span>Newsletter</span>
                            </div>

                            <h2 className="text-xl md:text-2xl font-bold text-textPrimary">
                                {success ? "Thanks for subscribing! 🎉" : title}
                            </h2>

                            <p className="text-textPrimary/70 max-w-md text-sm md:text-base">
                                {success 
                                    ? "Please check your email to confirm your subscription."
                                    : description
                                }
                            </p>

                            {!success && (
                                <form onSubmit={handleSubmit} className="pt-2 space-y-4">
                                    <div className="flex flex-col sm:flex-row gap-3">
                                        <Input
                                            type="email"
                                            placeholder="Your email address"
                                            className="h-11 border-buttons/20 bg-backgroundPrimary focus-visible:ring-buttons"
                                            required
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            disabled={loading}
                                        />
                                        <Button
                                            type="submit"
                                            className="h-11 bg-buttons hover:bg-buttons/90 text-textSecondary"
                                            disabled={loading}
                                        >
                                            {loading ? "Subscribing..." : buttonText}
                                            <ArrowRight className="ml-2 h-4 w-4" />
                                        </Button>
                                    </div>

                                    <p className="text-xs text-textPrimary/60">{disclaimer}</p>
                                </form>
                            )}

                            {success && (
                                <div className="flex items-center gap-2 text-green-500">
                                    <Check className="h-5 w-5" />
                                    <span>Successfully subscribed!</span>
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right decoration */}
                    <div className="hidden md:block md:col-span-2 bg-gradient-to-br from-buttons/10 to-buttons/5 h-full p-10">
                        <div className="h-full flex items-center justify-center">
                            <div className="relative">
                                <div className="absolute -top-10 -left-10 w-20 h-20 border border-buttons/20 rounded-lg"></div>
                                <div className="absolute -bottom-10 -right-10 w-20 h-20 border border-buttons/20 rounded-lg"></div>
                                <div className="w-16 h-16 flex items-center justify-center bg-buttons/10 rounded-lg border border-buttons/20">
                                    <Mail className="h-8 w-8 text-buttons" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

