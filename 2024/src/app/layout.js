import "./globals.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";
import { GoogleTagManager } from "@next/third-parties/google";
import { Noto_Sans_TC } from "next/font/google";
import { siteMetaData } from "@/components/util/siteMetaData";
import RecruitPopupButton from "@/components/RecruitPopupButton";

const notoSans = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
});

const isProduction = process.env.NODE_ENV === "production";

export const metadata = siteMetaData;

export default function RootLayout({ children, modal }) {
  return (
    <html lang="zh-Hant">
      {isProduction && <GoogleTagManager gaId="G-P6ZH7TZG2D" />}
      <body className={`${notoSans.className} bg-white overflow-x-hidden`}>
        <Header />
        <RecruitPopupButton />
        <div id="modal-root"></div>
        <>{children}</>
        {modal}
        <Footer />
      </body>
    </html>
  );
}
