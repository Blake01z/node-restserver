
const {Router} = require('express');
const { usuariosGet, usuariosPost, usuariosPut, usuarioDelete, usuariosPatch } = require('../controllers/usuarios');


const router = Router();


router.get('/', usuariosGet)

router.post('/', usuariosPost)

router.put('/:id', usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/', usuarioDelete)



module.exports = router;