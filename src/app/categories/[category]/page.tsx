import PostList from "@/components/blog/PostList";
import { getAllPosts } from "@/lib/post";
import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

interface CategoryPageProps {
    params: Promise<{
        category: string
    }>
}


export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    return {
        title: `${decodedCategory} Posts | Darshan's Blog`,
        description: `Browse all articles and tutorials about ${decodedCategory}`,
    };
}

export async function generateStaticParams() {
    const posts = await getAllPosts();
    const categories = new Set<string>();
    posts.forEach((post) => {
        if (post.categories) {
            post.categories.forEach((category) => categories.add(category));
        }
    });
    return Array.from(categories).map((category) => ({
        category: encodeURIComponent(category),
    }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const decodedCategory = decodeURIComponent(category);
    const allPosts = await getAllPosts();
    const categoryPosts = allPosts.filter(
        (post) => post.categories && post.categories.includes(decodedCategory)
    );

    if (categoryPosts.length === 0) {
        notFound();
    }

    return (
        <div className="container mb-16">
            <div className="max-w-7xl mx-auto space-y-5  px-6 md:px-12 py-5">
                <Button variant="ghost" asChild className="mb-8 pl-2">
                    <Link
                        href="/"
                        className="flex items-center gap-1 text-textPrimary/70 hover:text-textPrimary"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Go Back
                    </Link>
                </Button>
                <header className="mb-10">
                    <h1 className="text-3xl font-bold tracking-tight mb-3">
                        {decodedCategory} Posts
                    </h1>
                    <p className="text-textPrimary/70">
                        Browse all {categoryPosts.length} articles and tutorials about {decodedCategory}.
                    </p>
                </header>
                <PostList initialPosts={categoryPosts} showSearch={true} />
            </div>
        </div>
    );
}