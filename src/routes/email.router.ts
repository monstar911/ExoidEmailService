import express from 'express';

import { emailController } from 'controllers';

const emailRouter = express.Router();


emailRouter.post(
  '/sendemail',
  emailController.sendEmailValidator(),
  emailController.sendEmail
);

export default emailRouter;
