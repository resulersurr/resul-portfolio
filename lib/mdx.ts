import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const root = process.cwd()
const blogsPath = path.join(root, 'content/blogs')

export type BlogPost = {
  slug: string
  title: string
  date: string
  description: string
  readingTime: string
  content: string
}

export function getBlogSlugs() {
  if (!fs.existsSync(blogsPath)) {
    return []
  }
  return fs.readdirSync(blogsPath).filter((file) => file.endsWith('.mdx'))
}

export function getBlogBySlug(slug: string): BlogPost | null {
  try {
    const realSlug = slug.replace(/\.mdx$/, '')
    const fullPath = path.join(blogsPath, `${realSlug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug: realSlug,
      title: data.title,
      date: data.date,
      description: data.description,
      readingTime: data.readingTime || '5 min read',
      content,
    }
  } catch (error) {
    return null
  }
}

export function getAllBlogs(): BlogPost[] {
  const slugs = getBlogSlugs()
  const blogs = slugs
    .map((slug) => getBlogBySlug(slug))
    .filter((blog): blog is BlogPost => blog !== null)
    .sort((a, b) => (a.date > b.date ? -1 : 1))
  return blogs
}
