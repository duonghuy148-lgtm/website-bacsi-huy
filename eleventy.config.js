// Bản xem trước: Cloudflare Pages build một nhánh khác main. Khi đó hiện cả bài nháp và bài hẹn ngày
// để bác sĩ xem trước; web chính (nhánh main) vẫn ẩn chúng.
const isPreview = !!process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== "main";

export default function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addGlobalData("isPreview", isPreview);

  eleventyConfig.addCollection("posts", (api) =>
    api
      .getFilteredByGlob("src/bai-viet/*.md")
      .filter((p) => isPreview || (!p.data.draft && p.date <= new Date()))
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
  eleventyConfig.addFilter("exceptCategory", (posts, name) => posts.filter((p) => p.data.category !== name));
  // Bài liên quan: ưu tiên cùng chuyên mục, thiếu thì lấy bài mới nhất
  eleventyConfig.addFilter("related", (posts, url, category, n) => {
    const others = posts.filter((p) => p.url !== url);
    const same = others.filter((p) => p.data.category === category);
    return [...same, ...others.filter((p) => p.data.category !== category)].slice(0, n);
  });
  // Lấy mã video từ link TikTok dạng https://www.tiktok.com/@kenh/video/1234567890
  eleventyConfig.addFilter("tiktokId", (url) => (String(url || "").match(/\/video\/(\d+)/) || [])[1] || "");

  return {
    dir: { input: "src", output: "_site" },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
