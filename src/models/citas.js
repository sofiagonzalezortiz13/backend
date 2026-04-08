import { Schema, model } from "mongoose";

const CitaSchema = new Schema({
  paciente_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  medico_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fecha_hora: {
    type: Date,
    required: true,
    default: Date.now,
  },
  motivo: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200,
  },
  estado: {
    type: String,
    required: true,
    enum: ["Programada", "Completada", "Cancelada"],
    default: "Programada",
  },
}, { timestamps: true });

export default model("Cita", CitaSchema);