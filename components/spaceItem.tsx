import { Stack } from "@mantine/core";
import React from "react";
import { UPLOADED_IMAGES_DIR } from "../config/constants";
import { imageSrc } from "../helpers/utils";
import { Space } from "../store/slices/spaces.types";
import spaceItemStyles from "../styles/spaceItem.module.scss";

export const Item = ({ space }: { space: Space }) => {
  return (
    <div className={spaceItemStyles.spaceContainer}>
      <div className={spaceItemStyles.space}>
        <div className={spaceItemStyles.imageContainer}>
          <img
            className={spaceItemStyles.image}
            src={imageSrc(space.image, space.test)}
          />
        </div>
        <h4>{space.name}</h4>
        <div className={spaceItemStyles.descriptionContainer}>
          <span>{space.description}</span>
        </div>
      </div>
    </div>
  );
};
