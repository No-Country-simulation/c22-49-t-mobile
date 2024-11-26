const admin = require('firebase-admin');
const serviceAccount = require('./firebase-key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function fetchData() {
  const snapshot = await db.collection('canchas')
    .where('location', '==', 'Recoleta') // Cambia si el valor es diferente.
    .where('price', '<=', 20000) // Ajusta si el tipo de dato no coincide.
    .get();

  console.log('Documents:', snapshot.docs.map(doc => doc.data()));
}

fetchData();

fetchData();
