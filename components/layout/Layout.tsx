import cn from "classnames";
import React, { FC, ReactNode } from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div
      className={cn(
        "flex",
        "flex-col",
        "max-w-6xl",
        "min-h-screen",
        "px-4",
        "mx-auto",
        "sm:px-6",
        "lg:px-8"
      )}
    >
      <Header />
      <main className={cn("flex-1", "py-8", "md:py-12")}>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
