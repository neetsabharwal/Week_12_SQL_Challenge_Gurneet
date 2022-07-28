//Create Router
const express = require('express');
const router = express.Router();

//Route to different files
router.use(require('./departmentRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./employeeRoutes'));

module.exports = router;