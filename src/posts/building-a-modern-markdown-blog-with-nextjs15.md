---
title: "How I Built a Markdown Blog with Next.js 15, Tailwind CSS v4 & shadcn/ui"
date: "2024-06-20"
description: "A detailed walkthrough of how I built this blog using Next.js 15, Tailwind CSS v4, and shadcn/ui, with markdown files for content management without any backend or database."
categories: ["Next.js", "Tailwind CSS", "Web Development", "Markdown"]
image: "/images/blog-creation.jpg"
author: "Darshan Bajgain"
---

# How I Built a Markdown Blog with Next.js 15, Tailwind CSS v4 & shadcn/ui

In today's digital landscape, having a personal blog is an excellent way to share your thoughts, showcase your work, and establish your online presence. However, traditional blogging platforms often come with limitations, and custom solutions can be complex to build and maintain. That's why I decided to create a modern, lightweight blog using cutting-edge technologies that doesn't require a backend or database.

In this post, I'll walk you through how I built this blog using Next.js 15, Tailwind CSS v4, and shadcn/ui, with markdown files as the content source. This approach offers the perfect balance of simplicity, performance, and developer experience.



## The Tech Stack

### Next.js 15

**[Next.js 15](https://nextjs.org/)** serves as the foundation of this blog, providing a powerful React framework with several key features:

**- App Router**: The new app router in Next.js 15 provides a more intuitive way to handle routing, with support for layouts, nested routes, and loading states.
**- Server Components**: These allow rendering components on the server, improving performance and SEO.
**- Static Site Generation (SSG)**: Perfect for blog content that doesn't change frequently, SSG pre-renders pages at build time for optimal performance.
**- Image Optimization**: Automatic image optimization ensures fast loading times and good Core Web Vitals scores.
**- TypeScript Support**: Built-in TypeScript support provides type safety and better developer experience.

### Tailwind CSS v4

For styling, I chose **[Tailwind CSS v4](https://tailwindcss.com/)**, a complete reimagining of the popular utility-first framework that brings revolutionary improvements:

**- ⚡ Blazing Fast Performance**: The new high-performance engine makes full builds up to 5× faster and incremental builds 100× faster, with processing measured in microseconds. The first-party Vite plugin provides deep integration for maximum speed.

**- 🌐 Modern CSS Features**: Leverages cutting-edge CSS capabilities like `@layer` and CSS Cascade Layers, `@property` for registered custom properties, and `color-mix()` for advanced color blending.

**- 🛠️ Simplified Setup**: Zero configuration required out of the box—just install with a single line in your CSS file. Automatic content detection eliminates the need to define template paths manually.

**- 🎨 Advanced Theming**: CSS-first configuration using `@config` directly in your CSS, no JavaScript config file needed. Native CSS variables expose design tokens for full flexibility, and the new P3 color palette is optimized for wide-gamut displays.

**- 🧱 Enhanced Utilities**: Dynamic utility values auto-generate what you need without checking scales. New features include `@starting-style` for animations, `not-*` variants, 3D transform utilities, native container queries, and expanded gradient support.

### shadcn/ui

To accelerate development and ensure a consistent design language, I integrated [shadcn/ui](https://ui.shadcn.com/), a collection of reusable components:

**- Accessible Components**: All components are built with accessibility in mind.
**- Customizable**: Easy to customize and extend to match your design system.
**- Comprehensive**: Includes everything from buttons and forms to complex components like dialogs and dropdowns.
**- No Runtime Dependencies**: Components are copied into your project, giving you full control.

## Markdown-Based Content Management

Instead of using a traditional CMS or database, I opted for a simpler approach: **Markdown files**. This decision was driven by several factors:

1. **Simplicity**: Markdown is easy to write and read.
2. **Version Control**: Markdown files can be tracked with Git, providing version history.
3. **No Database Required**: Eliminates the need for a database and reduces complexity.
4. **Developer-Friendly**: Writing content in Markdown feels natural for developers.
5. **Portable**: Content can be easily migrated or backed up.

## Implementation Details

Let's dive into the implementation details of this blog:

### Directory Structure

The project follows a clean, organized structure:

```text
my-blog/
├── public/            # Static assets
│   └── images/        # Blog post images
├── src/
│   ├── app/           # Next.js app router pages
│   │   ├── page.tsx   # Homepage
│   │   ├── posts/     # Dynamic blog post routes
│   │   └── [...]      # Other routes
│   ├── components/    # Reusable components
│   │   ├── ui/        # shadcn/ui components
│   │   ├── blog/      # Blog-specific components
│   │   └── [...]      # Other components
│   ├── lib/           # Utility functions
│   │   ├── post.ts    # Markdown processing
│   │   └── utils.ts   # General utilities
│   ├── posts/         # Markdown blog posts
│   │   ├── post-1.md  # Example blog post
│   │   └── [...]      # Other blog posts
│   └── theme/         # Theme configuration
├── tailwind.config.js # Tailwind configuration
└── [...]              # Other configuration files
```

**Check out the live demo and the GitHub repository: 👉 [Live Demo](https://blog.darshanbajgain.com.np/)** | **📦 [GitHub Repo](https://github.com/darshanbajgain/darshan-blog-temp)**

### Processing Markdown Files

The core of the blog is the markdown processing system. Here's how it works:

1. **File Discovery**: The system scans the `src/posts` directory for `.md` files.
2. **Frontmatter Parsing**: Using `gray-matter`, the frontmatter metadata (title, date, description, etc.) is extracted.
3. **Markdown Conversion**: The content is converted to HTML using the `marked` library, configured with GitHub Flavored Markdown support.
4. **Rendering**: The HTML is rendered with proper styling via Tailwind's Typography plugin.

Here's the implementation of the post processing system:

```typescript
// src/lib/post.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { marked } from "marked"

// Configure marked with minimal options
marked.use({
    gfm: true,
    breaks: true
});

const postsDirectory = path.join(process.cwd(), "src/posts")

export interface Post {
    slug: string
    title: string
    date: string
    description: string
    content: string
    categories?: string[]
    image?: string
    author?: string
}

export function getAllPosts(): Post[] {
    const fileNames = fs
        .readdirSync(postsDirectory)
        .filter((fileName) => fs.statSync(path.join(postsDirectory, fileName)).isFile() && fileName.endsWith(".md"))

    console.log("Found markdown files:", fileNames)

    const allPosts = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, "")
        const fullPath = path.join(postsDirectory, fileName)
        try {
            const fileContents = fs.readFileSync(fullPath, "utf8")
            const { data, content } = matter(fileContents)

            // Default categories if none provided
            const categories = data.categories || []

            return {
                slug,
                title: data.title || "Untitled Post",
                date: data.date || new Date().toISOString().split("T")[0],
                description: data.description || "No description available",
                content: marked.parse(content || "") as string,
                categories: Array.isArray(categories) ? categories : [categories],
                image: data.image || null,
                author: data.author || "Darshan Bajgain",
            }
        } catch (error) {
            console.error(`Error processing file ${fileName}:`, error)
            return {
                slug,
                title: "Error Loading Post",
                date: new Date().toISOString().split("T")[0],
                description: "Could not load this post due to an error",
                content: "<p>Error loading content</p>",
                categories: [],
            }
        }
    })

    return allPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): Post {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    try {
        const fileContents = fs.readFileSync(fullPath, "utf8")
        const { data, content } = matter(fileContents)

        // Default categories if none provided
        const categories = data.categories || []

        return {
            slug,
            title: data.title || "Untitled Post",
            date: data.date || new Date().toISOString().split("T")[0],
            description: data.description || "No description available",
            content: marked.parse(content || "") as string,
            categories: Array.isArray(categories) ? categories : [categories],
            image: data.image || null,
            author: data.author || "Darshan Bajgain",
        }
    } catch (error) {
        console.error(`Error loading post with slug ${slug}:`, error)
        return {
            slug,
            title: "Error Loading Post",
            date: new Date().toISOString().split("T")[0],
            description: "Could not load this post due to an error",
            content: "<p>Error loading content</p>",
            categories: [],
        }
    }
}
```

## Key Features

### 1. Responsive Design

The blog is fully responsive and looks great on all devices:

**- Mobile-First Approach**: Designing for mobile first and then scaling up.
**- Responsive Typography**: Text sizes that adjust based on screen size.
**- Flexible Layouts**: Grid and flex layouts that adapt to different screen sizes.
**- Optimized Images**: Images that scale appropriately for different devices.

### 2. Category System

To help readers find related content, I implemented a category system:

**- Multiple Categories**: Posts can belong to multiple categories.
**- Category Pages**: Dedicated pages for each category.
**- Category Filtering**: Ability to filter posts by category.
**- Popular Categories**: Display of the most popular categories on the homepage.

### 3. SEO Optimization

SEO is crucial for any blog. I implemented several SEO best practices:

**- Dynamic Metadata**: Each page has its own title, description, and Open Graph tags.
**- Semantic HTML**: Proper use of HTML5 semantic elements.
**- Optimized Images**: Images with appropriate alt text and dimensions.
**- Sitemap Generation**: Automatic sitemap generation for search engines.

## Benefits of This Approach

### No Backend Required

One of the biggest advantages of this approach is that it doesn't require a backend or database:

**- Simplified Deployment**: The blog can be deployed to static hosting platforms like Vercel, Netlify, or GitHub Pages.
**- Reduced Costs**: No need to pay for database hosting or backend services.
**- Improved Security**: Fewer attack vectors without a database or backend.
**- Better Performance**: Static sites load faster and have better performance.

### Developer-Friendly Workflow

The workflow for adding new content is developer-friendly:

**- Create a file**: Add a new markdown file in the `src/posts` directory.
**- Add metadata**: Include frontmatter with title, date, description, etc.
**- Write content**: Author your post in markdown format.
**- Version control**: Commit and push the changes to your repository.
**- Automatic deployment**: The site automatically rebuilds with the new content.

### Customization and Extensibility

The blog is highly customizable and extensible:

**- Tailwind CSS**: Easy to customize the design with Tailwind's utility classes.
**- shadcn/ui**: Components can be customized to match your design system.
**- Next.js**: Easy to add new features and functionality.
**- Markdown**: Support for rich content with images, code blocks, and more.

## Conclusion

Building a modern blog with Next.js 15, Tailwind CSS v4, and shadcn/ui, using markdown files for content management, has been a rewarding experience. This approach offers the perfect balance of simplicity, performance, and developer experience.

The key advantages are:

**- No backend or database required**
**- Simple, Git-based content management**
**- Excellent performance and SEO**
**- Modern, responsive design**
**- Easy customization and extensibility**

If you're looking to create your own blog, I highly recommend this approach. It's perfect for developers who want a simple, performant, and customizable solution without the complexity of traditional CMS platforms.

Feel free to explore the code and adapt it to your needs. Happy blogging!
