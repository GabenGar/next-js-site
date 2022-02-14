import fse from "fs-extra";
import { BLOGS_FOLDER } from "#environment/constants";

export async function getAllSlugs() {
}

export async function getBlogPosts() {
  const blogFiles = await fse.readdir(BLOGS_FOLDER, {
    encoding: "utf-8",
    withFileTypes: true,
  });
  const blogPosts: {}[] = [];
  return blogPosts;
}

export async function getBlogPost(slug: string) {}
