import path from "path";
import { getPosts, findValidDirectory } from "../src/blog-fns";

const getPostsDefaultOptions = {
  cache: false,
  directory: path.join(process.cwd(), `/packages/blog/__tests__/test-posts`),
};

describe("blog", () => {
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

  // it("should read a set of posts from the filesystem without a specified directory", () => {
  //   const posts = getPosts({ cache: false, limit: 2 });
  //   expect(posts).toHaveLength(2);
  //   expect(posts[0].title).toBe("First post");
  // });
});

describe("filesystem", () => {
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
