import React from "react";

const Video = ({ src, className, controls = true }) => {
  return <video src={src} controls={controls} className={className} />;
};

export { Video };
