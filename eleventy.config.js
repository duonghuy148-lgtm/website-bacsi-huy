export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("src/bai-viet/*.md")
      .filter((p) => !p.data.draft)
      .sort((a, b) => b.date - a.date)
  );

  eleventyConfig.addFilter("ngay", (d) => {
    const x = new Date(d);
    return `${String(x.getDate()).padStart(2, "0")}/${String(x.getMonth() + 1).padStart(2, "0")}/${x.getFullYear()}`;
  });
  eleventyConfig.addFilter("isoDate", (d) => new Date(d).toISOString().slice(0, 10));
  // Thông tin còn trong ngoặc vuông [..] là chỗ giữ chỗ, được tô hồng để dễ nhận ra
  eleventyConfig.addFilter("ph", (v) => {
    const t = String(v ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;");
    return t.replace(/\[[^\]]*\]/g, (m) => `<span class="ph">${m}</span>`);
  });
  eleventyConfig.addFilter("readingTime", (html) => {
    const words = String(html || "").replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  });
  eleventyConfig.addFilter("byCategory", (posts, name) => posts.filter((p) => p.data.category === name));
  eleventyConfig.addFilter("catSlug", (name, cats) => (cats.find((c) => c.name === name) || {}).slug || "");
  eleventyConfig.addFilter("without", (posts, url) => posts.filter((p) => p.url !== url));
  eleventyConfig.addFilter("limit", (arr, n) => arr.slice(0, n));

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
