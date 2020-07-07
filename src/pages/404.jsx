import * as $ from "classnames";
import React from "react";
import Layout from "../components/layout/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Page Not Found" />
    <h1 className={$("absolute-center")}>404: Page Not Found</h1>
  </Layout>
);

export default NotFoundPage;
