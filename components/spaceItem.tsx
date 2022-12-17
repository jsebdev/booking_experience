import { Stack } from "@mantine/core";
import React from "react";
import { Space } from "../store/slices/spaces.types";
import spaceItemStyles from "../styles/spaceItem.module.scss";

export const Item = ({ space }: { space: Space }) => {
  return (
    <div className={spaceItemStyles.spaceContainer}>
      <div className={spaceItemStyles.space}>
        <img
          src="https://random.imagecdn.app/500/500"
          className={spaceItemStyles.spaceImage}
        />
        <h4>{space.name}</h4>
        <div className={spaceItemStyles.descriptionContainer}>
          <span>{space.description}</span>
        </div>
      </div>
    </div>
  );
};
