import { Inter } from "@next/font/google";
import { SpacesGrid } from "../components/spacesGrid";
import { useAppSelector } from "../store/store.hooks";
import { selectSpaces } from "../store/slices/spacesSlice";
import Layout from "../components/Layout";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const spaces = useAppSelector(selectSpaces);
  return (
    <Layout>
      <SpacesGrid spaces={spaces} />
    </Layout>
  );
}
