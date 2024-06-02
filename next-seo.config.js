const seo = {
  title:
    "Ossi Pesonen - Software Architect & Freelance UI/UX Designer - ossi.dev",
  description:
    "Currently employed as a Lead Software Architect, I've been working as a software engineer and freelance UI designer for over 10 years now. This is my portfolio.",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://ossi.dev/",
    site_name:
      "Ossi Pesonen - Software Architect & Freelance UI/UX Designer - ossi.dev",
    images: [{ url: process.env.NEXT_PUBLIC_APP_URL + "/img/avatar.png" }],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

export default seo;