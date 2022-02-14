import express, { Router } from 'express';
import * as Schemas from './validationSchemas/gallerySchemas';
import { checkSchema } from 'express-validator';
import { validate } from '../middlewares/validate';
import * as galleryController from '../controllers/galleryController';

import { authorize } from '../middlewares/authorize';
const galleryRouter: Router = express.Router();

galleryRouter.get(
  '/get-photos',
  checkSchema(Schemas.getPhotoSchema),
  validate,
  galleryController.getPhotos
);

galleryRouter.get(
  '/get-albums',
  checkSchema(Schemas.getAlbumSchema),
  validate,
  galleryController.getAlbums
);

galleryRouter.post('/load-photos', authorize(), galleryController.loadPhotos);

galleryRouter.put(
  '/change-album-title',
  authorize(),
  checkSchema(Schemas.updateAlbumTitleSchema),
  validate,
  galleryController.updateAlbumTitle
);

galleryRouter.delete(
  '/delete-photo',
  authorize(),
  checkSchema(Schemas.deletePhotoSchema),
  validate,
  galleryController.deletePhotos
);

galleryRouter.delete(
  '/delete-album',
  authorize(),
  checkSchema(Schemas.deleteAlbumSchema),
  validate,
  galleryController.deleteAlbum
);

export { galleryRouter };
