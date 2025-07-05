const express = require('express');
const router = express.Router();
const studentDetailController = require('../controllers/studentDetailController');
const connection = require('../config/dbConfig');

router.get('/', (req, res) => {
    const query = "SELECT * FROM aptitude";
    connection.query(query, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.json(results);
    });
});

router.delete('/delete/:id', (req, res) => {
const { id } = req.params;

const query = "DELETE FROM aptitude WHERE aid = ?";
connection.query(query, [id], (err, result) => {
    if (err) {
        console.log(err);
    return res.status(500).send(err);
    }
    res.json({ success: true });
});
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    // const { title } = req.body;
    
    const query = "UPDATE aptitude SET status = (not status) WHERE aid = ?";
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      res.json({ success: true });
    });
  });
  
  
module.exports = router;