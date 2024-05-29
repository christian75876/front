// Importa la librería bcryptjs
const bcrypt = require('bcryptjs');

// Define una contraseña para cifrar
const password = 'miContraseñaSegura';

// Genera un salt (un valor aleatorio utilizado en el algoritmo de cifrado)
const salt = bcrypt.genSaltSync(10);

// Cifra la contraseña utilizando el salt
const hash = bcrypt.hashSync(password, salt);

// Imprime el hash resultante
console.log('Hash de la contraseña:', hash);

// Verifica si una contraseña coincide con su hash
const esCoincidente = bcrypt.compareSync('miContraseñaSegura', hash);
console.log('¿La contraseña coincide con el hash?', esCoincidente); // Debería imprimir true
