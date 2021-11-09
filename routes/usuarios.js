
const {Router} = require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosPost, usuariosPut, usuarioDelete, usuariosPatch } = require('../controllers/usuarios');
const { esRoleValido, emailExiste, exiteUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


router.get('/', usuariosGet)

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio y debe de tener mas de 6 caracteres').isLength({min: 6}),
    check('correo','El correo no es válido').isEmail(),
    check('correo').custom(emailExiste),
    // check('rol','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
] ,usuariosPost)

router.put('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(exiteUsuarioPorId),
    check('rol').custom(esRoleValido), //puedo evitar actualizar el rol
    validarCampos
],usuariosPut)

router.patch('/', usuariosPatch)

router.delete('/:id',[
    check('id','No es un ID valido').isMongoId(),
    check('id').custom(exiteUsuarioPorId),
    validarCampos
],usuarioDelete)



module.exports = router;