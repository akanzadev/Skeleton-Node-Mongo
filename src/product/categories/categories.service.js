const boom = require('@hapi/boom')
const Category = require('./categories.model')
const createCategory = async (category) => {
  // Validar categoia
  category.name = category.name.toUpperCase()
  const categoryExist = await Category.findOne({ name: category.name })
  if (categoryExist) {
    const error = new Error('Category already registered')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }
  // Crear categoria con modelo
  const newCategory = new Category(category)
  // Guardar categoria
  await newCategory.save()
  // Devolver categoria
  return newCategory
}

const updateCategory = async (id, category) => {
  // Validar categoria
  const categoryExist = await Category.findOne({ name: category.name })
  if (categoryExist && categoryExist._id !== id) {
    const error = new Error('Category already registered')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }
  // Validar si esta desactivado
  const categoryDesactivate = await Category.findOne({ _id: id, status: false })
  if (categoryDesactivate) {
    const error = new Error('Category already desactivated')
    throw boom.boomify(error, {
      statusCode: 400
    })
  }

  // Actualizar categoria
  const updatedCategory = await Category.findByIdAndUpdate(id, { name: category.name.toUpperCase() }, {
    new: true
  })
  if (!updatedCategory) {
    const error = new Error('Category not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver categorias
  return updatedCategory
}

const findCategory = async (id) => {
  // Obtener categoria
  const category = await Category.findOne({ _id: id, status: true }).populate('user', 'name')
  if (!category) {
    const error = new Error('Category not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver categoria
  return category
}

const listCategories = async ({ skip = 0, limit = 5 }) => {
  // Obtener categorias
  const categories = await Category.find({ status: true })
    .skip(Number(skip))
    .limit(Number(limit))
    .populate('user', 'name')
  const countDocument = await Category.countDocuments({ status: true })
  if (!categories) {
    const error = new Error('Categories not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver categorias
  return { docs: countDocument, categories }
}

const desactivateCategory = async ({ id }) => {
  // Eliminar categoria
  const deletedCategory = await Category.findByIdAndUpdate(id, { status: false }, {
    new: true
  })
  if (!deletedCategory) {
    const error = new Error('Category not found')
    throw boom.boomify(error, {
      statusCode: 404
    })
  }
  // Devolver categoria
  return deletedCategory
}

module.exports = {
  createCategory,
  updateCategory,
  listCategories,
  desactivateCategory,
  findCategory
}
