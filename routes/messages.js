const express = require("express");
const router = express.Router();
const message_controller = require("../controllers/messageController");

router.get("/all", message_controller.message_list);

router.get("/:id", message_controller.message_detail);

router.post("/new", message_controller.message_create_post);

router.delete("/:id", message_controller.message_delete);

module.exports = router;
