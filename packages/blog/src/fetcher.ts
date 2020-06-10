import fetch from "isomorphic-unfetch";

export default async function fetcher(...args: any[]) {
  // @ts-ignore
  const res = await fetch(...args);
  return res.json();
}
