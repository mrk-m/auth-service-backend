const express = require('express');

const controller = require('../controllers/user.controller');
const authenticated = require('../middlewares/authenticated');

const router = express.Router();

router.route('/')
    .get(authenticated, controller.getUserInfo);

router.route('/updatedetails')
    .post(authenticated, controller.updateDetails);

router.route('/signup')
    .post(controller.createUser);

router.route('/signin')
    .post(controller.signIn);

router.route('/signout')
    .post(authenticated, controller.signOut);

router.route('/signoutall')
    .post(authenticated, controller.signOutAll);
    
module.exports = router;