import { getImageSrc } from "@/components/util/getImageSrc";
import Image from "next/image";
const ModalImage = ({ src, alt }) => (
  <Image
    src={getImageSrc(src || "/img/swiper-default.webp")}
    alt={alt}
    height={80}
    width={80}
    className="object-contain size-full"
  />
);

export default ModalImage;
