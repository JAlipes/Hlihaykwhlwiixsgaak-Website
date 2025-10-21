import { Router } from 'express';
import { GetTestimonials, SaveTestimonials, UploadTestimonialImage, DeleteTestimonial } from '../controllers/TestimonialController';
import { Authenticate } from '../middleware/AuthMiddleware';
import multer from 'multer';

const router = Router();
const upload = multer();

router.get('/', GetTestimonials);
router.post('/save-all', Authenticate, SaveTestimonials);
router.post('/upload-image', Authenticate, upload.single('image'), UploadTestimonialImage);
router.delete('/:id', Authenticate, DeleteTestimonial);

export default router;
