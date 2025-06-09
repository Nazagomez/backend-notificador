const bcrypt = require('bcryptjs');
const db = require('./db');

async function run() {
  try {
    const [rows] = await db.query('SELECT Correo, Contrasena FROM Inicio_Sesion');

    for (const row of rows) {
      const correo = row.Correo;
      const contrasenaPlano = row.Contrasena;

      // Saltar si ya está en formato bcrypt
      if (contrasenaPlano?.startsWith('$2a$') || contrasenaPlano?.startsWith('$2b$')) {
        console.log(`Ya encriptada: ${correo}`);
        continue;
      }

      const hashed = await bcrypt.hash(contrasenaPlano, 10);
      await db.query('UPDATE Inicio_Sesion SET Contrasena = ? WHERE Correo = ?', [hashed, correo]);
      console.log(`✅ Encriptada para ${correo}`);
    }

    console.log('\n🎉 Todas las contraseñas han sido encriptadas correctamente');
    process.exit();
  } catch (error) {
    console.error('❌ Error durante la encriptación:', error);
    process.exit(1);
  }
}

run();
