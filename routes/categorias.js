const {Router} = require('express');
const {check} = require('express-validator');
const { crearCategoria,obtenerCategorias,obtenerCategoria, actualizarCategoria, borrarCategoria} = require('../controllers/categorias');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const {validarJWT, validarCampos, esAdminRole} = require('../middlewares');

const router = Router();

//Obtener todas la categorias - publico
router.get('/',obtenerCategorias);


//Obtener una categoria por id - publico
router.get('/:id', [
    check('id','No es un id valido de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos,
],obtenerCategoria);


//Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);

//actualizar un registro por id - privado
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
] ,actualizarCategoria);


//Borrar si es una categoria - admin
router.delete('/:id',[
    validarJWT,
    esAdminRole,
    check('id','No es un id valido de Mongo').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);


module.exports = router;