import dynamic from "next/dynamic";
import { Noto_Sans_TC } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import Header from "@/components/ui/Header";

const Footer = dynamic(() => import("@/components/ui/Footer"), {
  ssr: false,
});

const notoSans = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const isProduction = process.env.NODE_ENV === "production";

export const metadata = {
  title: "MOPCON 2024",
  description:
    "MOPCON 2024，堅持在濁水溪以南的行動科技年會。無論受到既有人類技術引發的靈感、科幻電影的啟發又或是 Generative AI 鼓舞的點子，MOPCON 2024 選擇以 Inspiration 為年度議題，讓我們一起尋找未來行動科技的敲門磚。",
  keywords: [
    "MOPCON 2024",
    "MOPCON",
    "Mobile / Open / Platform Conference",
    "行動科技年會 2024",
  ],
  openGraph: {
    title: "MOPCON 2024",
    description:
      "MOPCON 2024，堅持在濁水溪以南的行動科技年會。無論受到既有人類技術引發的靈感、科幻電影的啟發又或是 Generative AI 鼓舞的點子，MOPCON 2024 選擇以 Inspiration 為年度議題，讓我們一起尋找未來行動科技的敲門磚。",
    url: "https://mopcon.org/2024",
    siteName: "MOPCON 2024",
    locale: "zh_TW",
    type: "website",
  },
};
export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className={`${notoSans.className} bg-white overflow-x-hidden`}>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
      {isProduction && <GoogleTagManager gaId="G-P6ZH7TZG2D" />}
    </html>
  );
}
