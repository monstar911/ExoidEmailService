import express from 'express';

import emailRouter from './email.router';

const appRoutes = express.Router();

appRoutes.use('/email', emailRouter);

export default appRoutes;
