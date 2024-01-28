import logoImg from "@public/vite.svg";
import { LAYOUT_OPTIONS } from "@/utils/config/enums";
import logoIconImg from "@public/vite.svg";

enum MODE {
  DARK = "dark",
  LIGHT = "light"
}

export const siteConfig = {
  title: "Vite + React + TS",
  description: "Vite + React + TS",
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.LAYOUT_1
};

export const metaObject = (title?: string, openGraph?: any, description: string = siteConfig.description): any => {
  return {
    title: siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title,
      description,
      url: "",
      siteName: "Vite + React + TS", // https://developers.google.com/search/docs/appearance/site-names
      images: {
        url: "",
        width: 1200,
        height: 630
      },
      locale: "en_US",
      type: "website"
    }
  };
};
