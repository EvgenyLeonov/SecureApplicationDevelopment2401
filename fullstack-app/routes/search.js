const express = require('express');
const router = express.Router();

const searchController = require("../controllers/searchController");

router.get("/", searchController.getSearchForm);
router.get("/form", searchController.getSearchForm);
router.post("/do", searchController.performSearch);

module.exports = router;