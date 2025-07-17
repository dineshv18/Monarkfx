"use client";

import useTrackingScripts from "@/hooks/useTrackingScripts";
import React from "react";

const TrackingScripts: React.FC = () => {
  useTrackingScripts();
  return null; // This component doesn't render anything visible
};

export default TrackingScripts;
