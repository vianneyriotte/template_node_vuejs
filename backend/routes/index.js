import express from 'express';

import home from './home';
import auth from './auth';
import secured from './secured';

const router = express.Router();

export default [ home, router.use('/auth', auth), router.use('/secured', secured) ];
