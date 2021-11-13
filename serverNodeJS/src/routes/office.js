const { count } = require('console');
const exp = require('express');
const router = exp.Router();
const pool = require('../database.js');

router.get('/', async(req, res) => {
    let listOffices = await pool.query('SELECT * FROM office');
    
    res.json({
        status: 200,
        message: 'se encontraron los registros',
        listOffices: listOffices
    });
});

router.get('/:id', async(req, res) => {
    let {id} = req.params;
    let office = await pool.query('SELECT * FROM office WHERE id = ?', [id]);

    res.json({
        status: 200,
        message: 'Se encontro el registro',
        office: office
    });
});

router.post('/create', async(req, res) => {
    let {office_code,address} = req.body;
    
    let office = {
        office_code, address
    }

    await pool.query('INSERT INTO office SET ?', [office]);

    res.json({
        status: 200,
        message: 'Se registro correctamente',
        office: office
    });
});

router.post('/update/:id', async(req, res) => {
    let {id} = req.params;
    let {office_code, address} = req.body;
    
    let office = {
        office_code, address
    }

    await pool.query('UPDATE office SET ? WHERE id = ?', [office, id]);

    res.json({
        status: 200,
        message: 'Se modifico correctamente',
        office: office
    });
});

router.post('/remove/:id', async(req, res) => {
    let {id} = req.params;
    await pool.query('UPDATE employee e SET e.id_office = 0 WHERE e.id_office = ?', [id]);
    await pool.query('DELETE FROM office WHERE id = ?', [id]);

    res.json({
        status: 200,
        message: 'Se elimino correctamente'
    });
});

module.exports = router;