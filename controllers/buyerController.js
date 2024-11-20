// controllers/buyerController.js

const Buyer = require('../models/buyer');  // Buyer model
const Property = require('../models/property'); // Property model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Utility to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Buyer Signup
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingBuyer = await Buyer.findOne({ email });
    if (existingBuyer) {
      return res.status(400).json({ message: 'Email already registered' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newBuyer = new Buyer({ name, email, password: hashedPassword });
    await newBuyer.save();
    res.status(201).json({ message: 'Buyer registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering buyer', error });
  }
};

// Buyer Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const buyer = await Buyer.findOne({ email });
    if (!buyer) return res.status(404).json({ message: 'Buyer not found' });
    
    const isMatch = await bcrypt.compare(password, buyer.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = generateToken(buyer._id);
    res.json({ token, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login', error });
  }
};

// Buyer Logout
exports.logout = (req, res) => {
  // Clear the token or handle logout logic here (if needed, e.g., for token blacklisting)
  res.json({ message: 'Logout successful' });
};

// Get Buyer Profile
exports.getProfile = async (req, res) => {
  try {
    const buyer = await Buyer.findById(req.user.id).select('-password'); // Exclude password
    if (!buyer) return res.status(404).json({ message: 'Buyer not found' });
    res.json(buyer);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error });
  }
};

// Update Buyer Profile
exports.updateProfile = async (req, res) => {
  const { name, email } = req.body;
  try {
    const updatedBuyer = await Buyer.findByIdAndUpdate(
      req.user.id,
      { name, email },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from response

    res.json(updatedBuyer);
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error });
  }
};

// Property Listing for Buyer
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find({ buyerId: req.user.id });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

exports.addProperty = async (req, res) => {
    const { title, location, price, description } = req.body;
    try {
      // Create the new property
      const newProperty = new Property({
        title,
        location,
        price,
        description,
        buyer: req.user._id, // Assuming `req.user` is set by auth middleware
      });
  
      await newProperty.save();
  
      // Update buyer's properties array
      await Buyer.findByIdAndUpdate(req.user._id, { $push: { properties: newProperty._id } });
  
      res.status(201).json(newProperty);
    } catch (error) {
      res.status(500).json({ message: 'Error adding property', error });
    }
  };

// Buy it for Me
exports.buyItForMe = async (req, res) => {
  const { propertyDetails, location } = req.body;
  try {
    // Implement business logic for "buy it for me" request
    // For example, save a request record with commission and details
    res.status(200).json({ message: 'Buy it for me request submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error with buy it for me request', error });
  }
};

exports.getPropertyDetails = async (req, res) => {
    try {
      const propertyId = req.params.propertyId;
      const property = await Property.findById(propertyId).populate('buyer', 'name email'); // Adjust fields as needed
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  };
// Additional functions for chat, saving property to wishlist, and more could be added here
