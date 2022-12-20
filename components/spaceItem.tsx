import { Stack } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { SPACE_DETAILS_PATH } from "../config/constants";
import { imageSrc } from "../helpers/utils";
import { Space } from "../store/slices/spaces.types";
import spaceItemStyles from "../styles/spaceItem.module.scss";

export const Item = ({ space }: { space: Space }) => {
  return (
    <div className={spaceItemStyles.spaceContainer}>
      <Link
        href={SPACE_DETAILS_PATH(space.id)}
        className={spaceItemStyles.space}
      >
        <div className={spaceItemStyles.imageContainer}>
          <Image
            className={spaceItemStyles.image}
            src={imageSrc(space.image, space.test)}
            alt={space.name}
            fill
          />
        </div>
        <h4>{space.name}</h4>
        <div className={spaceItemStyles.descriptionContainer}>
          {space.description
            .split(/[\n\r]/)
            .filter((p) => p !== "")
            .map((p, i) => (
              <p key={i}>{p}</p>
            ))}
        </div>
      </Link>
    </div>
  );
};
