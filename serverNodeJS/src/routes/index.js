const exp = require('express');
const router = exp.Router();

router.get('/', (req, res) => {
    console.log('servicio en ejecución');
});

module.exports = router;