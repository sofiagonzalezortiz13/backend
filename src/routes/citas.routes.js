import { Router } from "express";
import {
  createCita,
  getCitas,
  getCitaById,
  deleteCita,
  updateCita 
} from "../controllers/cita.controller.js";

// Importación de tus validadores específicos para citas
import {
  createCitaValidator,
  idValidator
} from "../validators/cita.validator.js";

// Tu middleware de protección (asegúrate de que el archivo se llame así)
import { protect } from "../middleware/auth.middleware.js";

const router = Router();

/** * RUTAS PARA /api/citas 
 * Todas requieren estar logueado para gestionar la agenda médica
 */
router.use(protect);

// GET: Listar citas (con filtros y paginación)
router.get("/", getCitas);

// POST: Crear una nueva cita con validación de datos
router.post("/", createCitaValidator, createCita);

// GET: Ver detalle de una cita por ID
router.get("/:id", idValidator, getCitaById);

// DELETE: Cancelar/Eliminar una cita
router.delete("/:id", idValidator, deleteCita);

// PUT: Actualizar datos de una cita existente
router.put("/:id", idValidator, updateCita);

export default router;