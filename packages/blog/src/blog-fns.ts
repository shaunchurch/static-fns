import fs from "fs";
import path from "path";
import parseFrontMatter from "@static-fns/loader/parseFrontMatter";
import { slugify } from "./slugify";

const POSTS_DIRECTORY = findValidDirectory([
  createDirectoryPath("/src/pages/posts"),
  createDirectoryPath("/pages/posts"),
  createDirectoryPath("/src/pages/words"),
  createDirectoryPath("/pages/words"),
  createDirectoryPath("/src/pages/blog"),
  createDirectoryPath("/pages/blog"),
]);

type Cache = {
  posts: PostData[];
  authors: any[];
  tags: any[];
};

let cache: Cache = { posts: [], authors: [], tags: [] };

function isFile(path: string): boolean {
  return path.includes(".");
}

export function findValidDirectory(directoryPaths: string[]) {
  return directoryPaths.find(isDirectoryValid);
}

function isDirectoryValid(directoryPath: string): boolean {
  return fs.existsSync(directoryPath);
}

function createDirectoryPath(directoryPath: string) {
  return path.join(process.cwd(), directoryPath);
}

// File types to load
const FILE_TYPE_REGEX = /\.(tsx|ts|js|jsx|DS_Store|jpeg|jpg|png)$/;

// recursively load posts in directory
type PostPathOptions = {
  directory: string;
};
function getPostPaths(dir: string = "/", options?: PostPathOptions): string[] {
  const { directory = POSTS_DIRECTORY } = options;
  const files = fs
    .readdirSync(`${directory}${dir}`)
    .map((file) => `${dir}${dir !== "/" ? "/" : ""}${file}`)
    .filter((file) => !file.match(FILE_TYPE_REGEX));

  return [
    ...files.filter((file) => isFile(file)),
    ...files
      .filter((file) => !isFile(file))
      .map((file) => getPostPaths(file, options))
      // @ts-ignore
      .flat(),
  ];
}

export type PostData = {
  title?: string;
  body: string;
  path: string;
  date: string;
  tags?: string[];
  author?: string[];
  excerpt?: string;
  draft?: boolean;
};

type PostDataOptions = {
  directory?: string;
};

// load file contents and front matter
function getPostData(posts: string[], options?: PostDataOptions): PostData[] {
  const { directory } = options || {
    directory: POSTS_DIRECTORY,
  };

  return posts.map((postPath) => {
    const filename = path.parse(postPath);
    const file: string = fs.readFileSync(`${directory}/${postPath}`, "utf-8");
    const { content, data } = parseFrontMatter(file);
    console.log("postPath", postPath, filename, __dirname);
    const parseDir = path.parse(directory);
    console.log("parseDir", parseDir, directory);
    return {
      date: "",
      ...data,
      body: content,
      path:
        `/${"posts"}` +
        path.join(filename.dir, filename.name).replace("/index", ""),
    };
  });
}

type GetOptions = {
  cache?: boolean;
  limit?: number;
  directory?: string;
  verbose?: boolean;
};

export function getPosts(options?: GetOptions) {
  const {
    directory = POSTS_DIRECTORY,
    cache: useCache = false,
    limit = undefined,
    verbose = false,
  } = options;
  const TAG = "[ posts ]";

  if (useCache && cache.posts.length > 0) {
    verbose ? console.log(`${TAG} Using cached posts...`) : null;
    return cache.posts;
  }
  cache.posts = [];

  verbose ? console.log(`${TAG} scanning for posts`, `${directory}/**`) : null;

  const postPaths = getPostPaths("/", { directory });
  verbose ? postPaths.forEach((path) => console.log(`${TAG} -`, path)) : null;

  const posts = getPostData(postPaths, { directory })
    .sort(
      (a: PostData, b: PostData) =>
        new Date(b.date || "").getTime() - new Date(a.date).getTime()
    )
    .filter((post) => !post.draft)
    .slice(0, limit);

  cache.posts = posts;
  return posts;
}

export function getTags() {
  return getPosts({ cache: true }).reduce((acc, current) => {
    if (!current.tags) {
      return acc;
    }

    current.tags.forEach((tag) => {
      const tagSlug = slugify(tag);
      if (!acc.hasOwnProperty(tag)) {
        // @ts-ignore
        acc[tagSlug] = [];
      }

      // @ts-ignore
      acc[tagSlug].push(current);
    });

    return acc;
  }, {});
}

export function getAuthors() {
  return getPosts({ cache: true }).reduce((acc, current) => {
    if (!current.author) {
      return acc;
    }

    current.author.forEach((author) => {
      const authorSlug = slugify(author);
      if (!acc.hasOwnProperty(author)) {
        // @ts-ignore
        acc[authorSlug] = [];
      }

      // @ts-ignore
      acc[authorSlug].push(current);
    });

    return acc;
  }, {});
}
