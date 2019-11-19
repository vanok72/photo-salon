import express from 'express';
import authenticate from '../middlwares/authenticate';
import collection from '../models/collection';
import parseErrors from '../utils/parseErrors';

const router = express.Router();
router.use(authenticate);

router.get('/', (req, res) => {
  collection
    .find({ userId: req.currentUser._id })
    .then(collections => res.json({ collections }));
});

router.post('/', (req, res) => {
  collection
    .create({ ...req.body.collection, userId: req.currentUser._id })
    .then(collection => res.json({ collection }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/delete', (req, res) => {
  const { id } = req.body;
  collection.remove({ _id: id }).then(() => res.json({}));
});

export default router;
