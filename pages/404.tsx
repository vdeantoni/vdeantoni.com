import cn from "classnames";
import Head from "next/head";
import React from "react";

const NotFoundPage = () => (
  <>
    <Head>
      <title>vdeantoni.com | 404: Page Not Found</title>
      <meta name="description" content="A page that could not be found" />
    </Head>
    <h1 className={cn("absolute-center")}>404: Page Not Found</h1>
  </>
);

export default NotFoundPage;
