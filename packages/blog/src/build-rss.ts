import fs from "fs";
import path from "path";
import RSS from "rss";
import { getPosts } from "./blog-engine";

const previewItems = getPosts(true);

type RSSOptions = {
  outputPath: string;
  rootUrl?: string;
  siteName?: string;
};

export function generateRSS(options: RSSOptions) {
  const feed = new RSS({
    title: options.siteName,
    site_url: options.rootUrl,
    feed_url: options.rootUrl + "/rss.xml",
  });

  previewItems.map((post: any) => {
    feed.item({
      title: post.title || "",
      url: options.rootUrl + post.path,
      date: post.date,
      description: post.excerpt || post.body || "",
      // custom_elements: [].concat(
      //   post.author.map((author) => ({ author: [{ name: author.name }] }))
      // ),
    });
  });

  const rss = feed.xml({ indent: true });
  fs.writeFileSync(path.join(options.outputPath, "feed.xml"), rss);
}

// generateRSS({ outputPath: "./public" });
