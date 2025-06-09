const bcrypt = require('bcryptjs');
const db = require('./db');

async function actualizarContrasenas() {
  try {
    const [usuarios] = await db.query('SELECT * FROM Inicio_Sesion');

    for (const usuario of usuarios) {
      const yaHasheada = usuario.Contrasena.startsWith('$2a$') || usuario.Contrasena.startsWith('$2b$');

      if (!yaHasheada) {
        const hash = await bcrypt.hash(usuario.Contrasena, 10);
        await db.query(
          'UPDATE Inicio_Sesion SET Contrasena = ? WHERE Correo = ?',
          [hash, usuario.Correo]
        );
        console.log(`✅ Contraseña actualizada para: ${usuario.Correo}`);
      }
    }

    console.log('✔️ Todas las contraseñas han sido hasheadas.');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al actualizar contraseñas:', error);
    process.exit(1);
  }
}

actualizarContrasenas();
