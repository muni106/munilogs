export const SITE = {
  website: "https://mounirsamite.com/",
  author: "Mounir Samite",
  profile: "https://github.com/muni106",
  desc: "my personal chronicle of exploration, ideas, and continuous growth.",
  title: "Mounir Samite",
  ogImage: "ogImage.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest changes",
    url: "https://github.com/muni106",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Europe/Rome", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
