require('dotenv').config(); // Charge les variables d'environnement depuis .env
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration de la connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connexion à la base de données
db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base de données:', err.stack);
    process.exit(1); // Arrête l'application en cas d'erreur de connexion
  }
  console.log('Connecté à la base de données MySQL.');
});

// Route pour tester la connexion à la base de données
app.get('/api/test-db', (req, res) => {
  db.query('SELECT 1 + 1 AS solution', (err, results) => {
    if (err) {
      console.error('Erreur lors de la requête:', err);
      return res.status(500).json({ success: false, error: 'Erreur de requête à la base de données.' });
    }
    res.json({ success: true, message: 'Connexion réussie à la base de données !', data: results[0] });
  });
});

// Route d'exemple pour une API
app.get('/api', (req, res) => {
  res.json({ success: true, message: 'Bienvenue sur l\'API Bercyfolies !' });
});

// Démarrage du serveur
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});

// Gestion des erreurs de connexion à la base de données
db.on('error', (err) => {
  console.error('Erreur de connexion à la base de données:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Connexion à la base de données perdue.');
  } else {
    throw err;
  }
});

module.exports = app; // Export pour les tests ou une utilisation future
