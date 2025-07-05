const express = require('express');
const connection = require('../config/dbConfig');
const router = express.Router();

// Create a new slab
// Create a new slab
router.post('/slabs', (req, res) => {
    const { descs, min_sal, max_sal } = req.body;
  
    if (!descs || min_sal == null || max_sal == null) {
      return res.status(400).json({ error: 'Description, minimum salary, and maximum salary are required' });
    }
  
    connection.query(
      'INSERT INTO salary_slabs_policy (descs, min_sal, max_sal) VALUES (?, ?, ?)',
      [descs, min_sal, max_sal],
      (err, result) => {
        if (err) {
          return res.status(500).json({ error: 'Failed to create slab' });
        }
        res.status(200).json({ message: 'Slab created successfully', slabId: result.insertId });
      }
    );
  });
  
// Delete a slab by ID
router.delete('/slabs/:id', (req, res) => {
  const { id } = req.params;

  connection.query('DELETE FROM salary_slabs_policy WHERE salad_id = ?', [id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to delete slab' });
    }
    if (result.affectedRows > 0) {
      res.status(200).json({ message: 'Slab deleted successfully' });
    } else {
      res.status(404).json({ error: 'Slab not found' });
    }
  });
});

// Get all slabs
router.get('/slabs', (req, res) => {
  connection.query('SELECT * FROM salary_slabs_policy', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to retrieve slabs' });
    }
    res.status(200).json(rows);
  });
});

module.exports = router;
