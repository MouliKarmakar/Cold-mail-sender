import { Router } from "express";
import { useEmailSend } from "../controllers/sevices";
const router = Router();
router.post("/mail/send", useEmailSend);
export default router;
