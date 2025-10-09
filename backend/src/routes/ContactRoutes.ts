import { Router } from 'express';
import { SubmitContact } from '../controllers/ContactController';

const ContactRouter = Router();

// Public endpoint for contact form submissions
ContactRouter.post('/', SubmitContact);

export default ContactRouter;
