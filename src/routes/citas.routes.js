// src/routes/cita.routes.js
import { Router } from 'express';
import { 
    createCita,    // Antes tenías 'crearCita'
    getCitas,      // Antes tenías 'obtenerCitas'
    getCitaById,   // Antes tenías 'obtenerCitaPorId'
    updateCita,    // Antes tenías 'actualizarCita'
    deleteCita     // Antes tenías 'eliminarCita'
} from '../controllers/cita.controller.js';

const router = Router();

// Endpoint: /api/citas/register
router.post('/register', createCita); 

// Endpoint: /api/citas/all
router.get('/all', getCitas); 

// Endpoint: /api/citas/details/:id
router.get('/details/:id', getCitaById);

// Endpoint: /api/citas/update/:id
router.put('/update/:id', updateCita); 

// Endpoint: /api/citas/delete/:id
router.delete('/delete/:id', deleteCita); 

export default router;