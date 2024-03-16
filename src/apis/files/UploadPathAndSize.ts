const UploadPathAndSize = {
  posts: {
    mainAndListImages: {
      uploadPath: `uploads/${process.env.NODE_ENV}/posts/images/main_and_list`,
      maxSize: 30,
    },
    contentImages: {
      uploadPath: `uploads/${process.env.NODE_ENV}/posts/images/content`,
      maxSize: 30,
    },
  },
};

export default UploadPathAndSize;
