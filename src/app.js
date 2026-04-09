import express from "express";
import cors from "cors";
import morgan from "morgan";

// 1. Importaciones de rutas
import authRoutes from "./routes/auth.routes.js";
import citaRoutes from "./routes/citas.routes.js"; 

const app = express();

// Configuración de CORS
app.use(cors({
    origin: [
        "https://frontend-kappa-two-30.vercel.app", 
        "http://localhost:5173"                     
    ],
    credentials: true
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// --- RUTA RAIZ (Evita el 404 en Render) ---
app.get("/", (req, res) => {
    res.send("🚀 API de Citas Médicas funcionando correctamente en Render");
});

// 2. Registro de rutas
app.use("/api/auth", authRoutes);
app.use("/api/citas", citaRoutes); 

// Ruta de salud del sistema
app.get("/health", (req, res) => {
    res.json({ 
        status: "OK",
        message: "API funcionando correctamente"
    });
});

// Manejador de errores global
app.use((err, req, res, next) => {
    console.error('❌ Error detectado:', err);
    res.status(500).json({
         message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
     });
});

export default app;