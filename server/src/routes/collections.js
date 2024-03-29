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

router.get('/getCollectionByID', (req, res) => {
  const { id } = req.query;

  collection
    .findOne({ userId: req.currentUser._id, _id: id })
    .then(collection => {
      if (collection) {
        res.json({ collection });
      } else {
        res
          .status(400)
          .json({ errors: { global: 'There is no collection with such id' } });
      }
    });
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
