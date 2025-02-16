import { Router } from "express";
import { createContact, deleteContact, getAllContacts, getContactById } from "../controllers/controllers/contact.controllers.js";
import { verifyJWTToken } from "../middlewares/auth.middleware.js";
import { verifyAdmin } from "../middlewares/admin.middleware.js";

const router = Router();

router.route("/create").post(createContact);


// Admin routes
router.route("/all").get(verifyJWTToken, verifyAdmin, getAllContacts);
router.route("/:id")
    .get(verifyJWTToken, verifyAdmin, getContactById)
    .delete(verifyJWTToken, verifyAdmin, deleteContact);

export default router;