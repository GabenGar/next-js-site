import path from "path";
import fse from "fs-extra";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { BLOGS_FOLDER } from "#environment/constants";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt?: string;
  content?: string;
  author?: string;
  created_at: string;

  edited_at?: string;
}

interface MDMatter {
  title: string;
  created_at: string;
  edited_at?: string;
  author?: string;
}

export async function getAllSlugs() {
  const blogFiles = await readBlogFolder();
  const slugs = blogFiles.map((blogFile) => {
    const slug = path.parse(blogFile.name).name;
    return slug;
  });

  return slugs;
}

export async function getBlogPosts() {
  const blogFiles = await readBlogFolder();
  const blogPosts: BlogPost[] = [];

  for await (const blogFile of blogFiles) {
    const slug = path.parse(blogFile.name).name;
    const blogPost = await getBlogPost(slug);
    blogPosts.push(blogPost);
  }

  return blogPosts;
}

export async function readBlogFolder() {
  const blogFiles = await fse.readdir(BLOGS_FOLDER, {
    encoding: "utf-8",
    withFileTypes: true,
  });

  return blogFiles;
}

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(BLOGS_FOLDER, `${slug}.md`);
  const blogFileContent = await fse.readFile(filePath, { encoding: "utf-8" });
  const { content, data } = matter(blogFileContent);
  const parsedContent = await remark().use(html).process(content);
  const blogPost = {
    slug,
    content: parsedContent.toString(),
    ...(data as MDMatter),
  };

  return blogPost;
}
