import { validationResult } from "express-validator";
import Cita from "../models/citas.js";

const handleValidation = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return true;
  }
  return false;
};

/** Crear Cita Médica */
export const createCita = async (req, res, next) => {
  try {
    if (handleValidation(req, res)) return;

    const payload = {
      paciente_id: req.user.uid,  // ✅ viene del token
      medico_id: req.body.medico_id,
      fecha_hora: req.body.fecha_hora ?? new Date(),
      motivo: req.body.motivo,
      estado: req.body.estado ?? "Programada",
    };

    const created = await Cita.create(payload);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
};

/** Listar Citas */
export const getCitas = async (req, res, next) => {
  try {
    const { q, page = 1, limit = 20 } = req.query;

    const filter = q
      ? {
          $or: [
            { motivo: new RegExp(q, "i") },
            { estado: new RegExp(q, "i") },
          ],
        }
      : {};

    const skip = (Number(page) - 1) * Number(limit);

    const [items, total] = await Promise.all([
      Cita.find(filter)
        .populate("paciente_id", "email")
        .populate("medico_id", "email")
        .sort({ fecha_hora: 1 })
        .skip(skip)
        .limit(Number(limit)),
      Cita.countDocuments(filter),
    ]);

    res.json({ items, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    next(err);
  }
};

/** Obtener Cita por ID */
export const getCitaById = async (req, res, next) => {
  try {
    const item = await Cita.findById(req.params.id)
      .populate("paciente_id", "email")
      .populate("medico_id", "email");

    if (!item) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(item);
  } catch (err) {
    next(err);
  }
};

/** Actualizar Cita */
export const updateCita = async (req, res, next) => {
  try {
    // Si usas validadores en la ruta, esto atrapará errores antes de procesar
    if (handleValidation(req, res)) return;

    const { id } = req.params;
    // Limpiamos el ID por si llega con caracteres extraños como :1
    const cleanId = id.includes(':') ? id.split(':')[0] : id;

    const campos = {};
    if (req.body.medico_id)  campos.medico_id  = req.body.medico_id;
    if (req.body.fecha_hora) campos.fecha_hora = req.body.fecha_hora;
    if (req.body.motivo)     campos.motivo     = req.body.motivo;
    if (req.body.estado)     campos.estado     = req.body.estado;

    const updated = await Cita.findByIdAndUpdate(
      cleanId, // Usamos el ID limpio
      { $set: campos },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Cita no encontrada" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};
/** Eliminar Cita */
export const deleteCita = async (req, res, next) => {
  try {
    const deleted = await Cita.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Cita no encontrada" });
    res.json({ message: "Cita eliminada correctamente" });
  } catch (err) {
    next(err);
  }
};