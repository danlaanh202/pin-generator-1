import {Router} from 'express';
import * as pinterestController from '../controllers/pinterestController';

const router = new Router();

router.get('/common', pinterestController.generateDataFromUrl);

export default router;
