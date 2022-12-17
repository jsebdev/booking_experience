import React from "react";
import { Spaces } from "../store/slices/spaces.types";
import { Item } from "./spaceItem";
import spacesGridStyles from "../styles/spacesGrid.module.scss";

export const SpacesGrid = ({ spaces }: { spaces: Spaces }) => {
  return (
    <div className={spacesGridStyles.spacesGrid}>
      {Object.values(spaces).map((space) => (
        <Item space={space} key={space.id} />
      ))}
    </div>
  );
};
