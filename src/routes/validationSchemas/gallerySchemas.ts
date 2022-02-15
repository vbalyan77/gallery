import { Schema } from 'express-validator';

export const getPhotoSchema: Schema = {
  ownerId: {
    isString: true,
    optional: true,
  },
  maxCount: {
    isInt: true,
    exists: {
      errorMessage: 'maxCount is a required field',
    },
  },
  page: {
    isInt: true,
    exists: {
      errorMessage: 'page is a required field',
    },
  },
};

export const getAlbumSchema: Schema = {
  ownerId: {
    isString: true,
    optional: true,
  },
  maxCount: {
    isInt: true,
    exists: {
      errorMessage: 'maxCount is a required field',
    },
  },
};

export const deletePhotoSchema: Schema = {
  photoId: {
    exists: {
      errorMessage: 'photoId is a required field',
    },
  },
};

export const deleteAlbumSchema: Schema = {
  albumId: {
    isString: true,
    exists: {
      errorMessage: 'albumId is a required field',
    },
  },
};

export const updateAlbumTitleSchema: Schema = {
  albumId: {
    isString: true,
    exists: {
      errorMessage: 'albumId is a required field',
    },
  },
  new_album_name: {
    isString: true,
    exists: {
      errorMessage: 'new_album_name is a required field',
    },
  },
};
