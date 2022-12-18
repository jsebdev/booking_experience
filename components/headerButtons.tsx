import React from "react";
import { Group } from "@mantine/core";
import { CreateSpaceButton } from "./createSpaceButton";
import Link from "next/link";
import { Button } from "./button";

export const HeaderButtons = ({ home }: { home: boolean }) => {
  return (
    <Group mt="2rem" mb="3rem" position="center">
      {!home && (
        <Link href="/">
          <Button>Go home</Button>
        </Link>
      )}
      <CreateSpaceButton />
    </Group>
  );
};
