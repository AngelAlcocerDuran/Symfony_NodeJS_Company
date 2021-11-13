const exp = require('express');
const router = exp.Router();
const pool = require('../database.js');

router.get('/', async(req, res) => {
    let listEmployees = await pool.query('SELECT * FROM employee');
    
    res.json({
        status: 200,
        message: 'se encontraron los registros',
        listEmployees: listEmployees
    });
});

router.get('/:id', async(req, res) => {
    let {id} = req.params;
    let employee = await pool.query('SELECT * FROM employee WHERE id = ?', [id]);

    res.json({
        status: 200,
        message: 'Se encontro el registro',
        employee: employee
    });
});

router.post('/create', async(req, res) => {
    let {name, address, salary, id_office} = req.body;
    let status = 1;
    let today = new Date();

    let d = today.getDate();
    let m = today.getMonth() + 1;
    let y = today.getFullYear();

    if(d < 10) d = '0' + d;
    if(m < 10) m = '0' + m;

    let registered = y+'-'+m+'-'+d;
    
    let employee = {
        name, address, salary, registered, status, id_office
    };

    await pool.query('INSERT INTO employee SET ?', [employee]);

    res.json({
        status: 200,
        message: 'Se registro correctamente',
        employee: employee
    });
});

router.post('/update/:id', async(req, res) => {
    let {id} = req.params;
    let {name, address, salary, id_office} = req.body;
    let today = new Date();

    let d = today.getDate();
    let m = today.getMonth() + 1;
    let y = today.getFullYear();

    if(d < 10) d = '0' + d;
    if(m < 10) m = '0' + m;

    let updated = y+'-'+m+'-'+d;
    
    let employee = {
        name, address, salary, updated, id_office
    };

    await pool.query('UPDATE employee SET ? WHERE id = ?', [employee, id]);

    res.json({
        status: 200,
        message: 'Se modifico correctamente',
        employee: employee
    });
});

router.post('/remove/:id', async(req, res) => {
    let {id} = req.params;
    await pool.query('UPDATE employee e SET e.status = 0 WHERE id = ?', [id]);

    res.json({
        status: 200,
        message: 'Se elimino correctamente'
    });
});

module.exports = router;