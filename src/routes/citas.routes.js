import { Router } from "express";
import {
  createCita,
  getCitas,
  getCitaById,
  updateCita,
  deleteCita,
} from "../controllers/cita.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/",      protect, createCita);
router.get("/",       protect, getCitas);
router.get("/:id",    protect, getCitaById);
router.put("/:id",    protect, updateCita);
router.delete("/:id", protect, deleteCita);

export default router;