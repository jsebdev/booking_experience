export const imageSrc = (
  image: File | string | undefined | null,
  test: boolean | undefined
) => {
  if (typeof image === "string") {
    return `${image}`;
  }
  if (typeof image === "object") {
    return URL.createObjectURL(image as unknown as File);
  }
  return "images/no-image.png";
};
