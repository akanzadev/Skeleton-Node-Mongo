const { response, request } = require('express')
const { handleSuccess } = require('../config/response')
const { searchForTerm } = require('./search.service')

const findTerm = async (req = request, res = response, next) => {
  try {
    const { collection, term } = req.params
    const results = await searchForTerm(collection, term)
    handleSuccess(res, req, results, 'Term searched', 200)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  findTerm
}
