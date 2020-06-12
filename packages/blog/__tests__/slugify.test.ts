import { slugify, deSlugify } from "../src/slugify";

describe("blog-fns", () => {
  it("turn a string into a slug", () => {
    const testString = "test slug";
    const expected = "test-slug";
    const actual = slugify(testString);
    expect(actual).toEqual(expected);
  });

  it("turn a slug into a string with spaces", () => {
    const testSlug = "test-slug";
    const expected = "test slug";
    const actual = deSlugify(testSlug);
    expect(actual).toEqual(expected);
  });
});
