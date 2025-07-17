"use client";

import React from "react";
import AddChapters from "../../_components/AddChapters";

const ChapterCreate = ({ params }: { params: { slug: string } }) => {
  return (
    <div className="min-h-screen">
      <AddChapters params={params} />
    </div>
  );
};

export default ChapterCreate;
