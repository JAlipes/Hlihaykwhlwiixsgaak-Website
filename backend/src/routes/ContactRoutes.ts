import { Router } from 'express';
import { SubmitContact } from '../controllers/ContactController';
import { RateLimit } from '../middleware/RateLimit';

const ContactRouter = Router();

// Public endpoint for contact form submissions with a simple rate limit
ContactRouter.post('/', RateLimit({ windowMs: 60_000, max: 5 }), SubmitContact); // 5 requests per minute per IP

export default ContactRouter;
