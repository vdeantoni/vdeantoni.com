import * as $ from "classnames";
import React from "react";
import Layout from "../components/layout/layout";
import Seo from "../components/seo";

const NotFoundPage = () => (
  <Layout>
    <Seo title="404: Page Not Found" />
    <h1 className={$("absolute-center")}>404: Page Not Found</h1>
  </Layout>
);

export default NotFoundPage;
