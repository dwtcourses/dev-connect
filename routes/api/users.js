const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const User = require("../../models/User");

// @route      POST api/users
// @desc       Register user
// @access     Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Must be a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // See if user exists
    const { name, email, password } = req.body;

    try {
      let user = User.findOne({ email });
      if (user) {
        res.status(400).json({ errors: [{ msg: "User already exists" }] });
      }
      // Get user gravatar
      // Encrypt password
      // Return jsonwebtoken
      res.send("User route");
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Servor error");
    }
  }
);

module.exports = router;
