/* eslint semi: ["error", "never"], no-undef: ["error"] */
/* global $*/

import express from 'express'
import candyController from '../controller/candystore'

const router = express.Router()

/*
 *  List candies
 */
router.get('/', (req, res, next) => {
  res.json(candyController.list())
})

/*
 *  Create candy
 */
router.post('/', (req, res, next) => {
  const newCandy = candyController.create(req.body)
  res.json(newCandy)
})

/*
 *  Get candy
 */
router.get('/:id', (req, res, next) => {
  const candyId = req.params.id
  res.json(candyController.get(candyId))
})

 /*
  *  Update candy
  */
router.put('/', (req, res, next) => {
  const newCandy = candyController.update(req.body)
  res.json(newCandy)
})

  /*
   *  Delete candy
   */
router.delete('/:id', (req, res, next) => {
  const candyId = req.params.id
  res.json(candyController.delete(candyId))
})

export default router
