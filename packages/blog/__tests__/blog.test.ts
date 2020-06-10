import path from "path";
import { getPosts } from "../src/blog-engine";

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
});
