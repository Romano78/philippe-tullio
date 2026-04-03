const CLOUD = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

export const cldImage = (publicId: string, transformations = "f_auto,q_auto") =>
  `https://res.cloudinary.com/${CLOUD}/image/upload/${transformations}/${publicId}`;

export const cldVideo = (publicId: string, transformations = "f_auto,q_auto") =>
  `https://res.cloudinary.com/${CLOUD}/video/upload/${transformations}/${publicId}`;

export const cldVideoPoster = (publicId: string) =>
  `https://res.cloudinary.com/${CLOUD}/video/upload/f_jpg,q_auto,so_0/${publicId}`;
