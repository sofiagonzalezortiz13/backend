import { body, param } from "express-validator";

// Validador para el ID de MongoDB
export const idValidator = [
  param("id").isMongoId().withMessage("ID de cita inválido")
];

// Validador para CREAR una cita médica
export const createCitaValidator = [
  body("paciente_id")
    .notEmpty().withMessage("El ID del paciente es obligatorio")
    .isMongoId().withMessage("ID de paciente inválido"),

  body("medico_id")
    .notEmpty().withMessage("El ID del médico es obligatorio")
    .isMongoId().withMessage("ID de médico inválido")
    .custom((value, { req }) => {
      if (value === req.body.paciente_id) {
        throw new Error("El médico y el paciente no pueden ser el mismo");
      }
      return true;
    }),

  body("fecha_hora")
    .notEmpty().withMessage("La fecha y hora son obligatorias")
    .isISO8601().withMessage("Formato de fecha inválido (usa ISO 8601)")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("La fecha de la cita no puede ser en el pasado");
      }
      return true;
    }),

  body("motivo")
    .trim()
    .notEmpty().withMessage("El motivo de la cita es obligatorio")
    .isLength({ min: 3, max: 200 }).withMessage("El motivo debe tener entre 3 y 200 caracteres"),

  body("estado")
    .optional()
    .trim()
    .isIn(["Programada", "Completada", "Cancelada"])
    .withMessage("Estado no válido (Programada, Completada, Cancelada)"),
];

// Validador para ACTUALIZAR una cita médica
export const updateCitaValidator = [
  ...idValidator,

  body("fecha_hora")
    .optional()
    .isISO8601().withMessage("Formato de fecha inválido (usa ISO 8601)")
    .custom((value) => {
      if (new Date(value) < new Date()) {
        throw new Error("La fecha de la cita no puede ser en el pasado");
      }
      return true;
    }),

  body("motivo")
    .optional()
    .trim()
    .isLength({ min: 3, max: 200 }).withMessage("El motivo debe tener entre 3 y 200 caracteres"),

  body("estado")
    .optional()
    .trim()
    .isIn(["Programada", "Completada", "Cancelada"])
    .withMessage("Estado no válido (Programada, Completada, Cancelada)"),

  body("medico_id")
    .optional()
    .isMongoId().withMessage("ID de médico inválido"),

  body("paciente_id")
    .optional()
    .isMongoId().withMessage("ID de paciente inválido"),
];