const multer = require('multer');

// Configuración para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Ajusta el tamaño máximo del archivo si es necesario
});

module.exports = upload;
