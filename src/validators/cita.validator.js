import { check } from "express-validator";

export const createCitaValidator = [
  // ELIMINAMOS la línea de paciente_id porque ahora viene del token
  
  check("medico_id")
    .notEmpty().withMessage("El ID del médico es obligatorio")
    .isMongoId().withMessage("ID de médico inválido"),
    
  check("motivo")
    .notEmpty().withMessage("El motivo de la cita es obligatorio")
    .isLength({ min: 10 }).withMessage("El motivo debe tener al menos 10 caracteres"),
    
  check("fecha_hora")
    .optional()
    .isISO8601().withMessage("Formato de fecha inválido (debe ser ISO8601)"),
];

export const idValidator = [
  check("id").isMongoId().withMessage("ID inválido")
];