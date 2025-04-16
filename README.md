<div align="center">

# Next.js Personal Blog Template

### A modern, responsive, and SEO-optimized blog platform for developers and content creators

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0+-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)


</div>

## 📋 Overview

This Next.js blog template provides a complete solution for developers and content creators who want to build a professional, SEO-optimized blog. It combines modern web technologies with a clean, responsive design to deliver an exceptional user experience across all devices.

## 🌟 Key Features

### 💻 Technical Features
- **Modern Tech Stack**: Built with Next.js 15+, TypeScript, and Tailwind CSS V4+
- **App Router**: Utilizes Next.js App Router for improved routing and layouts
- **Server Components**: Leverages React Server Components for optimal performance
- **TypeScript**: Full type safety throughout the codebase
- **Fast Performance**: Optimized for Core Web Vitals and page speed
- **SEO Optimized**: Meta tags, Open Graph, structured data, and semantic HTML

### 🎨 Design & UX Features
- **Responsive Design**: Perfectly adapts to all devices (mobile, tablet, desktop)
- **Dark/Light Mode**: Automatic theme detection with manual toggle option
- **Clean Typography**: Optimized reading experience with Geist font family
- **Animations**: Subtle animations for enhanced user experience
- **Accessible UI**: WCAG compliant components and keyboard navigation

### 📝 Content Features
- **Markdown Support**: Write blog posts in Markdown with frontmatter
- **Code Syntax Highlighting**: Beautiful code blocks with language detection
- **Table Support**: Responsive tables that work on all screen sizes
- **Image Optimization**: Automatic image optimization with Next.js Image
- **Categories/Tags**: Organize content with a powerful categorization system
- **Reading Time**: Automatic calculation of post reading time

### 🔌 Integration Features
- **Contact Form**: SendGrid integration for reliable email delivery
- **Newsletter**: ConvertKit integration for building your audience
- **Social Sharing**: Easy sharing of blog posts to social media
- **Analytics Ready**: Prepared for Google Analytics or other tracking tools
- **Toast Notifications**: User-friendly feedback for form submissions

## 📋 Prerequisites

- Node.js 18.x or later
- npm or yarn
- A SendGrid account (for contact form)
- A ConvertKit account (for newsletter, optional)

## 🚀 Getting Started

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/nextjs-blog-template.git
   cd nextjs-blog-template
   ```

2. Install dependencies:

   ```bash
      npm install --legacy-peer-deps

   ```

   use `--legacy-peer-deps` to avoid peer dependency issues, as this uses react19

3. Create a `.env.local` file in the root directory with the following variables:

   ```
   # SendGrid Configuration (for contact form)
   SENDGRID_API_KEY=your_sendgrid_api_key
   SENDGRID_FROM_EMAIL=your_verified_sender_email@example.com
   SENDGRID_TO_EMAIL=your_email@example.com

   # ConvertKit Configuration (for newsletter, optional)
   CONVERTKIT_FORM_ID=your_form_id
   CONVERTKIT_API_KEY=your_api_key
   CONVERTKIT_TAG_ID=your_tag_id

   # Site URL (used for social sharing)
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📝 Creating and Managing Blog Posts

### Blog Post Structure

Blog posts are written in Markdown and stored in the `src/posts` directory. Each post follows a specific structure for optimal SEO and rendering:

```markdown
---
title: "Your SEO-Optimized Post Title"
date: "2025-05-15"
description: "A comprehensive meta description (150-160 characters) that summarizes your post for better SEO"
categories: ["Next.js", "React", "Web Development"]
image: "/images/your-post-image.jpg"
author: "Your Name"
---

Your post content goes here with proper heading structure (H2, H3, etc.)
```

### Frontmatter Fields

| Field | Description | Required | SEO Impact |
|-------|-------------|----------|------------|
| `title` | The title of your blog post | Yes | High |
| `date` | Publication date (YYYY-MM-DD format) | Yes | Medium |
| `description` | A brief summary of your post | Yes | High |
| `categories` | Array of categories for classification | No | Medium |
| `image` | Featured image path (from public directory) | No | Medium |
| `author` | Post author name | No | Low |

### Content Best Practices

- Use proper heading hierarchy (H2 for sections, H3 for subsections)
- Include relevant keywords naturally throughout the content
- Keep paragraphs concise and focused on a single idea
- Use lists and tables to organize information when appropriate
- Include code examples with proper syntax highlighting

### Adding Images to Posts

1. Place your images in the `public/images` directory
2. Optimize images before adding them to the project
3. Reference them in your markdown using standard syntax:

   ```markdown
   ![Alt text with keywords](/images/your-image.jpg)
   ```

4. For responsive images, the template automatically handles proper sizing

### How Blog Posts are Processed

The blog post rendering pipeline works as follows:

1. **File Discovery**: The system scans the `src/posts` directory for `.md` files
2. **Frontmatter Parsing**: Using `gray-matter`, the frontmatter metadata is extracted
3. **Markdown Conversion**: The `marked` library converts Markdown content to HTML
4. **HTML Rendering**: The HTML is rendered with proper styling via Tailwind's Typography plugin
5. **SEO Optimization**: Metadata is used to generate SEO tags and structured data

## 🎨 Customization

### Changing Colors and Theme

The template uses Tailwind CSS for styling. You can customize the colors by editing the `tailwind.config.js` file.

### Updating Personal Information

1. Update the site metadata in `src/app/layout.tsx`
2. Modify the About page content in `src/app/about/page.tsx`
3. Update social links in `src/components/main/Footer.tsx`

### Customizing Components

All UI components are located in the `src/components` directory and can be modified to suit your needs.

## 📦 Project Structure

```text
├── public/               # Static assets
│   ├── images/           # Blog post images
│   └── ...
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── about/        # About page
│   │   ├── api/          # API routes
│   │   │   ├── contact/   # Contact form API
│   │   │   └── subscribe/ # Newsletter API
│   │   ├── categories/   # Categories pages
│   │   ├── contact/      # Contact page
│   │   ├── posts/        # Blog post pages
│   │   │   └── [slug]/   # Dynamic post routes
│   │   ├── all-posts/    # All posts page
│   │   ├── globals.css   # Global styles
│   │   └── layout.tsx    # Root layout with metadata
│   ├── components/       # React components
│   │   ├── blog/         # Blog-specific components
│   │   │   ├── FeaturedPost.tsx # Featured post component
│   │   │   ├── LatestPost.tsx   # Latest posts component
│   │   │   ├── PostGrid.tsx     # Post grid display
│   │   │   └── SocialShare.tsx  # Social sharing
│   │   ├── main/         # Main layout components
│   │   │   ├── Footer.tsx      # Site footer
│   │   │   ├── Header.tsx      # Site header
│   │   │   └── Newsletter.tsx  # Newsletter form
│   │   └── ui/           # Reusable UI components
│   │       ├── button.tsx     # Button component
│   │       ├── card.tsx       # Card component
│   │       ├── table.tsx      # Table component
│   │       └── ...            # Other UI components
│   ├── lib/              # Utility functions
│   │   ├── post.ts       # Blog post processing
│   │   ├── convertkit.ts # ConvertKit integration
│   │   └── utils.ts      # General utilities
│   ├── posts/            # Markdown blog posts
│   │   ├── example-post-1.md # Example blog post
│   │   └── example-post-2.md # Example blog post
│   ├── store/            # State management
│   │   └── blog-store.ts # Blog state with Zustand
│   └── theme/            # Theme configuration
├── .env.local.example    # Example environment variables
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

### Key Files and Their Purposes

- **`src/lib/post.ts`**: Core file that handles blog post processing, including:
  - Reading Markdown files from the `src/posts` directory
  - Parsing frontmatter with `gray-matter`
  - Converting Markdown to HTML with `marked`
  - Sorting posts by date
  - Extracting metadata for SEO

- **`src/app/posts/[slug]/page.tsx`**: Dynamic route for individual blog posts that:
  - Fetches post content based on the URL slug
  - Generates metadata for SEO
  - Calculates reading time
  - Renders the post with proper styling
  - Provides social sharing functionality

## 🔧 Key Implementation Details

### Blog Post Rendering System

The blog post rendering system is a core feature of this template, providing a seamless way to create, manage, and display content:

#### Processing Pipeline

1. **File Discovery**: The system scans the `src/posts` directory for Markdown (`.md`) files
2. **Metadata Extraction**: Using `gray-matter`, the frontmatter metadata is parsed from each file
3. **Content Processing**: The Markdown content is converted to HTML using the `marked` library
4. **Syntax Highlighting**: Code blocks are enhanced with syntax highlighting
5. **Responsive Tables**: Tables are processed to ensure they display correctly on all devices
6. **Reading Time Calculation**: Estimated reading time is calculated based on word count

#### Key Components

- **`src/lib/post.ts`**: Contains the core functions for processing blog posts:

  ```typescript
  // Main functions for blog post handling
  export function getAllPosts(): Post[] { ... }  // Gets all blog posts sorted by date
  export function getPostBySlug(slug: string): Post { ... }  // Gets a specific post by slug
  ```

- **`src/app/posts/[slug]/page.tsx`**: Renders individual blog posts with:
  - Dynamic routing based on post slug
  - SEO metadata generation
  - Reading time calculation
  - Social sharing functionality
  - Responsive layout

#### Styling and Typography

Blog posts are styled using Tailwind's Typography plugin, which provides beautiful typography defaults while maintaining consistency with the rest of the site. Custom styles are added for:

- Code blocks with syntax highlighting
- Responsive tables
- Images with proper sizing
- Blockquotes and lists
- Headings with proper hierarchy

### Contact Form with SendGrid

The contact form uses the SendGrid API to send emails. The implementation includes:

- A client-side form with validation in `src/app/contact/page.tsx`
- A server-side API route in `src/app/api/contact/route.ts`
- Toast notifications for user feedback

### Newsletter with ConvertKit

The newsletter subscription form integrates with ConvertKit:

- A client-side form component in `src/components/NewsletterForm.tsx`
- A server-side API route in `src/app/api/subscribe/route.ts`

### Dark Mode

The template uses a dark mode theme by default, implemented with:

- Theme provider in `src/theme/theme-provider.tsx`
- CSS variables for theme colors
- Tailwind CSS dark mode configuration

## 📱 Responsive Design

The template is fully responsive and looks great on all devices:

- Mobile-first approach with Tailwind CSS
- Responsive navigation with mobile menu
- Properly sized images and typography
- Optimized layouts for different screen sizes

## 🔍 SEO Optimization

This template is built with SEO as a priority, implementing numerous best practices to help your content rank well in search engines:

### Metadata and Tags

- **Dynamic Metadata Generation**: Each page and blog post automatically generates appropriate metadata
- **Open Graph Protocol**: Social sharing metadata for Facebook, Twitter, and other platforms
- **Canonical URLs**: Properly configured canonical URLs to prevent duplicate content issues
- **Structured Data**: JSON-LD structured data for rich search results

### Content Optimization

- **Semantic HTML**: Proper heading hierarchy and semantic elements for better accessibility and SEO
- **Optimized Images**: Images include alt text and are properly sized for fast loading
- **Responsive Design**: Mobile-friendly design that passes Google's mobile usability tests
- **URL Structure**: Clean, descriptive URLs for better user experience and SEO

### Performance Optimization

- **Fast Page Loading**: Optimized for Core Web Vitals metrics
- **Server-Side Rendering**: Critical content is rendered server-side for faster indexing
- **Static Generation**: Blog posts use static generation for optimal performance
- **Minimal JavaScript**: Reduced client-side JavaScript for faster loading and better SEO

### SEO Implementation Details

The SEO implementation is primarily handled in these files:

- **`src/app/layout.tsx`**: Contains the default metadata for the site
- **`src/app/posts/[slug]/page.tsx`**: Generates dynamic metadata for each blog post
- **`src/lib/post.ts`**: Extracts SEO-relevant information from blog post frontmatter

## 📈 Performance

The template is optimized for performance:

- Static generation for blog posts
- Optimized images with proper sizing
- Minimal JavaScript with efficient React components
- Fast page loads with Next.js optimizations

## 🤝 Contributing to This Open Source Project

Contributions are highly encouraged and appreciated! This project aims to provide a high-quality, feature-rich blog template for developers and content creators.

### Ways to Contribute

- **Bug Reports**: If you find a bug, please create an issue with detailed steps to reproduce
- **Feature Requests**: Have an idea for a new feature? Open an issue to discuss it
- **Code Contributions**: Submit pull requests for bug fixes or new features
- **Documentation**: Help improve the documentation or add more examples
- **Testing**: Test the template on different devices and browsers

### Contribution Guidelines

1. **Fork the repository** and create your branch from `main`
2. **Install dependencies** with `npm install --legacy-peer-deps`
3. **Make your changes** and ensure they follow the project's coding style
4. **Test your changes** thoroughly
5. **Update documentation** if necessary
6. **Submit a pull request** with a clear description of the changes

### Development Workflow

```bash
# Clone your fork
git clone https://github.com/your-username/nextjs-blog-template.git
cd nextjs-blog-template

# Install dependencies
npm install --legacy-peer-deps

# Start development server
npm run dev

# Build for production
npm run build
```

All contributions will be reviewed and merged if they align with the project's goals and quality standards.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```text
MIT License

Copyright (c) 2025 Darshan Bajgain

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgements

This project wouldn't be possible without these amazing open-source projects:

- [Next.js](https://nextjs.org/) - The React framework for production
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Lucide Icons](https://lucide.dev/) - Beautiful & consistent icons
- [SendGrid](https://sendgrid.com/) - Email delivery service
- [ConvertKit](https://convertkit.com/) - Email marketing for creators
- [gray-matter](https://github.com/jonschlinkert/gray-matter) - Front matter parser
- [marked](https://marked.js.org/) - Markdown parser and compiler

---

<div align="center">

### Made  by [Darshan Bajgain](https://github.com/darshanbajgain)

If you find this project helpful, please consider giving it a star ⭐

</div>
