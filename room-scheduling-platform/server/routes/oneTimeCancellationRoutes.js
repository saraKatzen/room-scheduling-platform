import express from 'express';
import * as controller from '../controllers/oneTimeCancellationcontroller.js';

const router = express.Router();

router.post('/', controller.createCancellation);
router.get('/', controller.getAllCancellations);
router.get('/:id', controller.getCancellationById);
router.put('/:id', controller.updateCancellation);
router.delete('/:id', controller.deleteCancellation);

export default router;