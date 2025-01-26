import React from "react";
import Header from "../_components/Header/Header";
import Footer from "../_components/Footer";
import CanvasCursor from "@/components/CanvasCursor";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
      <Footer />
      <CanvasCursor />
    </div>
  );
};

export default layout;
