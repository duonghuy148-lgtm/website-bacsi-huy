// Bài nháp (draft: true) và bài hẹn ngày tương lai không được tạo trang, không vào sitemap.
const hidden = (data) => data.draft || (data.page && data.page.date > new Date());
export default {
  layout: "post.njk",
  eleventyComputed: {
    permalink: (data) => (hidden(data) ? false : `/bai-viet/${data.page.fileSlug}/`),
    eleventyExcludeFromCollections: (data) => hidden(data),
  },
};
