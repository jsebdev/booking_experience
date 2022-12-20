import React from "react";
import { SpacesGrid } from "../components/spacesGrid";
import { useAppSelector } from "../store/store.hooks";
import { selectSpaces } from "../store/slices/spacesSlice";
import Layout from "../components/Layout";

export default function Home() {
  const spaces = useAppSelector(selectSpaces);
  return (
    <Layout>
      <SpacesGrid spaces={spaces} />
    </Layout>
  );
}
