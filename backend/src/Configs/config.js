import * as url from 'url';
import open from 'open';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT ?? 3000,
  DIRNAME: url.fileURLToPath(new URL('..', import.meta.url)),
  MONGO_URI:process.env.DB_URI,
  
  get UPLOAD_DIR() { return `${this.DIRNAME}/public/img` },

 
  async openBrowser() {
    try {
      await open(`http://localhost:${this.PORT}`);
      console.log('Navegador abierto automáticamente.');
    } catch (error) {
      console.error('Error al abrir el navegador:', error);
    }
  }
};

export default config;
