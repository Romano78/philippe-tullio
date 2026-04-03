const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const cldImage = (publicId, transformations = 'f_auto,q_auto') =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations}/${publicId}`;

export const cldVideo = (publicId, transformations = 'f_auto,q_auto') =>
  `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/${transformations}/${publicId}`;
