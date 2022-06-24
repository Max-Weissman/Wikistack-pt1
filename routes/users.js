const express = require("express")
const router = express.Router();
const { Page, User } = require("../models");
const { addPage, editPage, userList, userPages, } = require('../views')

router.get('/', async (req, res, next) => {
  const users = await User.findAll()
  res.send(userList(users))
});

router.get('/:id', async (req, res, next) => {
    console.log('1')
  const user = await User.findByPk(req.params.id)
  console.log('1')
  const pages = await Page.findAll({where: {authorId: req.params.id}})
  console.log('1')
  res.send(userPages(user,pages))
});

module.exports = router;