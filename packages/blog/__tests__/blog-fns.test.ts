import path from "path";
import {
  getPosts,
  getTags,
  getTagPostsBySlug,
  getAuthors,
  getAuthorPostsBySlug,
  findValidDirectory,
  getStaticTagPaths,
  getStaticAuthorPaths,
} from "../src/blog-fns";

const getPostsDefaultOptions = {
  cache: false,
  directory: path.join(process.cwd(), `/packages/blog/__tests__/test-posts`),
};

describe("blog-fns", () => {
  it("needs tests", () => {
    expect(2 + 2).toBe(4);
  });

  it("should read a set of posts from the filesystem and return an array", () => {
    const posts = getPosts(getPostsDefaultOptions);
    expect(posts).toHaveLength(4);
    expect(posts[0].title).toBe("First post");
  });

  it("should read a set of posts from the filesystem and return a limited subset", () => {
    const posts = getPosts({ ...getPostsDefaultOptions, limit: 2 });
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("First post");
  });

  it("should read a set of posts from the filesystem in a default location", () => {
    const posts = getPosts({ limit: 2 });
    expect(posts).toHaveLength(2);
    expect(posts[0].title).toBe("First post");
  });

  it("should read a set of posts from the filesystem in a default location without any additional options", () => {
    const posts = getPosts();
    expect(posts).toHaveLength(4);
    expect(posts[0].title).toBe("First post");
  });

  it("should read a set of posts from the filesystem and derive a tag object", () => {
    const tags = getTags();
    expect(Object.keys(tags)[0]).toEqual("tag-one");
    expect(Object.keys(tags)[1]).toEqual("tag-two");
    expect(tags[Object.keys(tags)[0]]).toHaveLength(1);
    expect(tags[Object.keys(tags)[2]]).toHaveLength(2);
  });

  it("should return a list of posts for a single tag slug", () => {
    const tagPosts = getTagPostsBySlug("tag-one");
    expect(tagPosts).toHaveLength(1);
    expect(tagPosts[0].title).toEqual("Two post");
  });

  it("should return a list of Next.js StaticPath objects for tags", () => {
    const paths = getStaticTagPaths();
    expect(paths).toBeInstanceOf(Array);
    expect(paths).toHaveLength(6);
    expect(paths[0].params.tagSlug).toEqual("tag-one");
    expect(paths[1].params.tagSlug).toEqual("tag-two");
  });

  it("should read a set of posts from the filesystem and derive a tag object", () => {
    const authors = getAuthors();
    expect(Object.keys(authors)[0]).toEqual("author-one");
    expect(Object.keys(authors)[1]).toEqual("author-two");
    expect(authors[Object.keys(authors)[0]]).toHaveLength(1);
    expect(authors[Object.keys(authors)[2]]).toHaveLength(1);
  });

  it("should return a list of posts for a single author slug", () => {
    const authorPosts = getAuthorPostsBySlug("testy-mctestface");
    expect(authorPosts).toHaveLength(1);
    expect(authorPosts[0].title).toEqual("Three post");
    expect(authorPosts[0].author[0]).toEqual("Testy McTestface");
  });

  it("should return a list of Next.js StaticPath objects for author", () => {
    const paths = getStaticAuthorPaths();
    expect(paths).toBeInstanceOf(Array);
    expect(paths).toHaveLength(3);
    expect(paths[0].params.authorSlug).toEqual("author-one");
    expect(paths[1].params.authorSlug).toEqual("author-two");
  });
});

describe("filesystem-fns", () => {
  it("should find a valid directory in an array of paths", () => {
    const dirs = [
      "/path/to/nowhere",
      "/beaten/path",
      getPostsDefaultOptions.directory,
    ];
    const directory = findValidDirectory(dirs);
    const posts = getPosts(getPostsDefaultOptions);
    expect(directory).toBe(getPostsDefaultOptions.directory);
    expect(posts[0].path).toEqual("/test-posts/post");
  });
});
