import React from "react";

/**
 * Component to handle file upload. Works for image
 * uploads, but can be edited to work for any file.
 */

export const ImageThumb = ({ image }) => {
  return <img src={URL.createObjectURL(image)} alt={image.name} />;
};