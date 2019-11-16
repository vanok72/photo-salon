import express from 'express';
import authenticate from '../middlwares/authenticate';
import sponsor from '../models/sponsor';
import parseErrors from '../utils/parseErrors';

const router = express.Router();
router.use(authenticate);

router.get('/', (req, res) => {
    sponsor.find({ userId: req.currentUser._id }).then(sponsors => res.json({ sponsors }));
});

router.post('/', (req, res) => {
   sponsor
    .create({ ...req.body.sponsor, userId: req.currentUser._id })
    .then(sponsor => res.json({ sponsor }))
    .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});

router.post('/delete', (req, res) => {
    sponsor.find({ userId: req.currentUser._id }).then(sponsors => res.json({ sponsors }));
});




export default router;
