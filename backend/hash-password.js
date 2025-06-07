// hash-password.js
const bcrypt = require('bcrypt');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter password to hash: ', async function (password) {
  try {
    const hashed = await bcrypt.hash(password, 10);
    console.log('\n🔐 Hashed Password:\n');
    console.log(hashed);
  } catch (err) {
    console.error('Error hashing password:', err);
  } finally {
    rl.close();
  }
});
