"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { GithubIcon, TwitterIcon, LinkedinIcon, InstagramIcon, MailIcon, MapPinIcon, PhoneIcon } from "lucide-react"
import { toast, Toaster } from "sonner"

// Metadata is moved to a separate file since this is now a client component

export default function ContactPage() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        subject: "",
        message: ""
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            toast.success(data.message || 'Message sent successfully!');

            // Reset form
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                subject: "",
                message: ""
            });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <div className="container max-w-7xl px-6 md:px-12 mx-auto mb-16 py-5">
            <div className="space-y-4">
                <div className="space-y-2">
                    <h1 className="text-3xl md:text-4xl text-buttons font-bold tracking-tight">Contact Me</h1>
                    <p className="text-textPrimary/70 max-w-2xl">
                        Have a question, suggestion, or want to work together? I&apos;d love to hear from you! Fill out the form below or
                        reach out through any of the provided contact methods.
                    </p>
                    <div className="h-1 w-20 bg-buttons"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Contact Form */}
                    <Card className="bg-cardBackground border border-borderColor">
                        <CardHeader>
                            <CardTitle className="text-buttons">Send a Message</CardTitle>
                            <CardDescription>Fill out the form below and I&apos;ll get back to you as soon as possible.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form className="space-y-2" onSubmit={handleSubmit}>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-medium">
                                                First name
                                            </label>
                                            <Input
                                                className="h-11 border-buttons/20 bg-backgroundPrimary focus-visible:ring-buttons"
                                                id="firstName"
                                                placeholder="John"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-medium">
                                                Last name
                                            </label>
                                            <Input
                                                className="h-11 border-buttons/20 bg-backgroundPrimary focus-visible:ring-buttons"
                                                id="lastName"
                                                placeholder="Doe"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium">
                                            Email
                                        </label>
                                        <Input
                                            className="h-11 border-buttons/20 bg-backgroundPrimary focus-visible:ring-buttons"
                                            id="email"
                                            type="email"
                                            placeholder="john.doe@example.com"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="subject" className="text-sm font-medium">
                                            Subject
                                        </label>
                                        <Input
                                            className="h-11 border-buttons/20 bg-backgroundPrimary focus-visible:ring-buttons"
                                            id="subject"
                                            placeholder="How can I help you?"
                                            value={formData.subject}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium">
                                            Message
                                        </label>
                                        <Textarea
                                            className="h-16 border-buttons/20 bg-backgroundPrimary focus-visible:ring-buttons"
                                            id="message"
                                            placeholder="Enter your message here..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <Button
                                        type="submit"
                                        className="w-full mx-auto h-11 bg-buttons hover:bg-buttons/90 text-textSecondary"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <div className="space-y-5">
                        <Card className="bg-cardBackground border border-borderColor">
                            <CardHeader>
                                <CardTitle className="text-buttons">Contact Information</CardTitle>
                                <CardDescription>Here are the ways you can reach me directly.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <MailIcon className="h-5 w-5 text-buttons mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">Email</h3>
                                        <p className="text-sm text-textPrimary/70">your.email@example.com</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <PhoneIcon className="h-5 w-5 text-buttons mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">Phone</h3>
                                        <p className="text-sm text-textPrimary/70">Available on request</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <MapPinIcon className="h-5 w-5 text-buttons mt-0.5" />
                                    <div>
                                        <h3 className="font-medium">Location</h3>
                                        <p className="text-sm text-textPrimary/70">Your City, Country</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-cardBackground border border-borderColor">
                            <CardHeader>
                                <CardTitle className="text-buttons">Connect With Me</CardTitle>
                                <CardDescription>Follow me on social media for updates and more content.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-3">
                                    <Button variant="outline" className="flex items-center gap-2 text-buttons hover:bg-buttons/90 hover:text-white" asChild>
                                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                                            <GithubIcon className="h-4 w-4" />
                                            <span>GitHub</span>
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-2 text-buttons hover:bg-buttons/90 hover:text-white" asChild>
                                        <a href="https://twitter.com/yourusername" target="_blank" rel="noopener noreferrer">
                                            <TwitterIcon className="h-4 w-4" />
                                            <span>Twitter</span>
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-2 text-buttons hover:bg-buttons/90 hover:text-white" asChild>
                                        <a href="https://www.linkedin.com/in/yourusername/" target="_blank" rel="noopener noreferrer">
                                            <LinkedinIcon className="h-4 w-4" />
                                            <span>LinkedIn</span>
                                        </a>
                                    </Button>
                                    <Button variant="outline" className="flex items-center gap-2 text-buttons hover:bg-buttons/90 hover:text-white" asChild>
                                        <a href="https://www.instagram.com/yourusername/" target="_blank" rel="noopener noreferrer">
                                            <InstagramIcon className="h-4 w-4" />
                                            <span>Instagram</span>
                                        </a>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <Toaster position="bottom-right" richColors />
        </div>
    )
}