const express = require("express")
const router = express.Router();
const { addPage, editPage, main, wikiPage } = require('../views')
const { Page, User } = require("../models");

router.get('/', async(req,res) => {
    const pages = await Page.findAll();
    res.send(main(pages));
});

router.get('/add', (req,res) => {
    res.send(addPage())
})

router.post('/', async (req,res,next) => {

  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content
    });
    const author = await User.findOne({where: {name: req.body.name}})
    let user = '';
    if (!author){
        user = await User.create({
            name: req.body.name,
            email: req.body.email
        })
    }
    else{
        user = author;
    }
    console.log(page,user)
    await page.setAuthor(user)
    
    // make sure we only redirect *after* our save is complete! Don't forget to `await` the previous step. `create` returns a Promise.
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) { next(error) }
})

router.get('/:slug', async (req, res, next) => {
  const slug = await Page.findOne({where: {slug: req.params.slug}})
  const user = await slug.getAuthor();
  res.send(wikiPage(slug,user))
});

module.exports = router;