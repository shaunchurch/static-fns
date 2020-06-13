# static-fns

---

Static functions for building static sites.

_This is alpha software, proceed at your own risk._

Everything here is a work in progress. I was doing similar things in different projects and needed to share the functions. It may or may not be useful to you.

## What?

A basic collection of functions for building static generated sites (best served with Next.js).

### static-fns/loader

The loader adds frontmatter parsing on top of @mdx/loader.

### static-fns/blog

The blog package supplies a set of functions to help generate the paths and pages you need to add lists of posts, tag indexes or simple author pages.

## Usage

Setup your `/pages/posts` directory for .md and .mdx files using @mdx/loader. Then use @static-fns/loader as well. Then do this:

```
npm install @static-fns/blog

import { getPosts } from `@static-fns/blog`


getPosts({limit: 3, directory: './posts'})
```
