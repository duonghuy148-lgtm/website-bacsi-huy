// Bài nháp (draft: true) và bài hẹn ngày tương lai không được tạo trang, không vào sitemap.
// Riêng bản xem trước (Cloudflare Pages build nhánh khác main) thì hiện hết để bác sĩ xem trước khi duyệt.
const isPreview = !!process.env.CF_PAGES_BRANCH && process.env.CF_PAGES_BRANCH !== "main";
const scheduled = (data) => !!(data.page && data.page.date > new Date());
const hidden = (data) => !isPreview && (data.draft || scheduled(data));
export default {
  layout: "post.njk",
  eleventyComputed: {
    permalink: (data) => (hidden(data) ? false : `/bai-viet/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => hidden(data),
    isScheduled: (data) => scheduled(data),
  },
};
