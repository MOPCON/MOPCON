import dynamic from "next/dynamic";
import { Noto_Sans_TC } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";
import RecruitPopupButton from "@/components/RecruitPopupButton";
import Header from "@/components/ui/Header";
import { siteMetaData } from "@/components/util/siteMetaData";

const Footer = dynamic(() => import("@/components/ui/Footer"), {
  ssr: false,
});

const notoSans = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const isProduction = process.env.NODE_ENV === "production";

export const metadata = siteMetaData;

export default function RootLayout({ children }) {
  return (
    <html lang="zh-Hant">
      <body className={`${notoSans.className} bg-white overflow-x-hidden`}>
        <Header />
        <RecruitPopupButton />
        <div id="modal-root"></div>
        <main>{children}</main>
        <Footer />
      </body>
      {isProduction && <GoogleTagManager gaId="G-P6ZH7TZG2D" />}
    </html>
  );
}
