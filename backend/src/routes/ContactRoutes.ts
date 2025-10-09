import { Router } from 'express';
import { SubmitContact } from '../controllers/ContactController';
import { rateLimit } from '../middleware/RateLimit';

const ContactRouter = Router();

// Public endpoint for contact form submissions with a simple rate limit
ContactRouter.post('/', rateLimit({ windowMs: 60_000, max: 10 }), SubmitContact);

export default ContactRouter;
