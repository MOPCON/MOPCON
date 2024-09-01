import { getImageSrc } from "@/components/util/getImageSrc";
import Image from "next/image";
import { twMerge } from "tailwind-merge";
const ModalImage = ({ src, alt, className }) => (
  <Image
    src={getImageSrc(src || "/img/swiper-default.webp")}
    alt={alt}
    height={80}
    width={80}
    className={twMerge("object-cover size-full", className)}
  />
);

export default ModalImage;
