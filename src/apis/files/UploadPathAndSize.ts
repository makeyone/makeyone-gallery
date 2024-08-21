const UploadPathAndSize = {
  posts: {
    mainAndListImages: {
      uploadPath: `uploads/${process.env.NODE_ENV}/posts/images/main_and_list`,
      maxSize: 10,
    },
    contentImages: {
      uploadPath: `uploads/${process.env.NODE_ENV}/posts/images/content`,
      maxSize: 10,
    },
  },
};

export default UploadPathAndSize;
