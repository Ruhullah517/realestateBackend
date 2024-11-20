// routes/buyerRoutes.js
const express = require('express');
const router = express.Router();
const buyerController = require('../controllers/buyerController');
const authMiddleware = require('../middlewares/authMiddleware');

// Buyer Authentication & Profile Routes
router.post('/signup', buyerController.signup);
router.post('/login', buyerController.login);
router.get('/logout', authMiddleware, buyerController.logout);
router.get('/profile', authMiddleware, buyerController.getProfile);
router.put('/profile/update', authMiddleware, buyerController.updateProfile);

// Property Management Routes
router.get('/properties', authMiddleware, buyerController.getProperties);
router.post('/property/add', authMiddleware, buyerController.addProperty);
router.get('/property/:propertyId', authMiddleware, buyerController.getPropertyDetails);
// router.delete('/property/:propertyId', authMiddleware, buyerController.deleteProperty);

// Buy it for Me Route
router.post('/buy-it-for-me', authMiddleware, buyerController.buyItForMe);

// Chat System Routes
// router.get('/chat/rooms', authMiddleware, buyerController.getChatRooms);
// router.get('/chat/room/:roomId', authMiddleware, buyerController.getChatHistory);
// router.post('/chat/room/:roomId/send', authMiddleware, buyerController.sendMessage);

// Property Inquiry and Actions Routes
// router.get('/property/:propertyId/contact-info', authMiddleware, buyerController.getPropertyContactInfo);

// Property Wishlist Routes
// router.post('/property/:propertyId/save', authMiddleware, buyerController.saveToWishlist);
// router.get('/wishlist', authMiddleware, buyerController.getWishlist);

// Plans and Payments Routes
// router.get('/plans', authMiddleware, buyerController.getPlans);
// router.post('/plan/subscribe', authMiddleware, buyerController.subscribePlan);

// Notifications Route
// router.get('/notifications', authMiddleware, buyerController.getNotifications);

module.exports = router;
