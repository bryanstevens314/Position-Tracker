const router = require('express').Router()
const {Positions} = require('../db/models')
module.exports = router

router.post('/', async (req, res, next) => {
  try {
    const position = await Positions.create(req.body)
    res.json(position)
  } catch (err) {
    next(err)
  }
})
