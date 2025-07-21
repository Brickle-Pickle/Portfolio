const express = require('express');
const { body, validationResult } = require('express-validator');

const router = express.Router();
const cvPassword = process.env.PASSWORD_CV;

/**
 * CV Routes
 * @param {string} input
 * @returns {boolean}
 */

router.get('/api/cv', (req, res) => {
  const { password } = req.query;

  if (password !== cvPassword) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.status(200).json({ message: 'CV data retrieved successfully' });
});

module.exports = router;