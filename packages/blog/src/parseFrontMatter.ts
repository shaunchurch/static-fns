const matter = require("gray-matter");

// TODO: Allow excerpt length to be configurable
const EXCERPT_LENGTH = 280;

function parseFrontMatter(file) {
  const { content, data } = matter(file);

  // TODO: validate date for frontmatter and give a nice error message

  if (typeof data.tags === "string") {
    data.tags = data.tags.split(",").map((tag) => tag.trim());
  }

  if (typeof data.author === "string") {
    data.author = data.author.split(",").map((author) => author.trim());
  }

  if (data.excerpt == undefined) {
    let cleanContent = content.replace(/\n/g, "")

    data.excerpt = cleanContent.substr(0, Math.min(EXCERPT_LENGTH, cleanContent.indexOf("#")));
  }

  return {
    data,
    content,
  };
}

// module.exports = parseFrontMatter;
export default parseFrontMatter;
