export function getImageSrc(src) {
  const prefix =
    process.env.NODE_ENV === "production" ? "/2024/assets" : "/assets";
  return `${prefix}${src}`;
}
