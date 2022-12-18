import { UPLOADED_IMAGES_DIR } from "../config/constants";

export const imageSrc = (
  image: string | undefined | null,
  test: boolean | undefined
) =>
  image ? `${test ? "" : UPLOADED_IMAGES_DIR}/${image}` : "images/no-image.png";
