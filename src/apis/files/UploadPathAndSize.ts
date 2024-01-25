const UploadPathAndSize = {
  posts: {
    images: {
      uploadPath: `uploads/${process.env.NODE_ENV}/posts/images`,
      maxSize: 10,
    },
  },
};

export default UploadPathAndSize;
