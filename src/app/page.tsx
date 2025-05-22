import { getAllPosts } from "@/lib/post"
import LatestPosts from "@/components/blog/LatestPost"
import FeaturedPosts from "@/components/blog/FeaturedPost"
import TopCategories from "@/components/blog/TopCategories"
import Newsletter from "@/components/blog/Newsletter"
import Hero from "@/components/blog/Hero"

export default async function Home() {
  const posts = await getAllPosts()

  // Get the latest 6 posts for the homepage
  const latestPosts = posts.slice(0, 6)

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

  // Get top 5 categories
  const topCategories = Object.entries(categoryCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  // Get featured posts - you can customize this selection
  // Option 1: Use the latest posts
  // const featuredPost = posts.slice(0, 2)

  // Option 2: Select specific posts by slug
  // const featuredPosts = [
  //   posts.find(post => post.slug === 'getting-started-with-nextjs'),
  //   posts.find(post => post.slug === 'another-post-slug'),
  //   posts.find(post => post.slug === 'third-post-slug'),
  // ].filter(Boolean) as Post[]

  // Option 3: Select posts by category
  const featuredPost = posts.filter(post =>
    post.categories?.includes('ConvertKit') || post.categories?.includes('Troubleshooting')
  ).slice(0, 3)

  //  Select specific posts by slug
  // const featuredPost = [
  //   posts.find(post => post.slug === 'getting-started-with-nextjs'),
  //   posts.find(post => post.slug === 'setting-up-convertkit-for-email-subscriptions'),
  // ].filter(Boolean) as Post[]

  return (
    <div className="flex flex-col gap-16 pb-16 mb-8">
      {/* Hero Section with Stats */}
      <Hero posts={posts} />

      {/* Featured Post */}
      <FeaturedPosts posts={featuredPost} title="Featured Posts" maxPosts={3} />


      {/* Top Categories */}
      <TopCategories
        categories={topCategories}
        title="Popular Categories"
        description="Browse posts by your favorite topics"
        maxCategories={5}
      />

      {/* Latest Posts */}
      <LatestPosts posts={latestPosts} totalPosts={posts.length} />

      {/* Newsletter */}
      <Newsletter />
    </div>
  )
}