import React from "react";
import Head from "next/head";
import { Container } from "@mantine/core";
import { HeaderButtons } from "./headerButtons";
import layoutStyles from "../styles/layout.module.scss";

const Layout = ({
  children,
  home = true,
}: {
  children: React.ReactNode;
  home?: boolean;
}) => {
  return (
    <>
      <Head>
        <title>Booking Experience</title>
        <meta name="description" content="Created by Sebastian Caicedo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container size="md" className={layoutStyles.mainContainer}>
        <HeaderButtons home={home} />
        {children}
      </Container>
    </>
  );
};

export default Layout;
