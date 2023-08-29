const express = require("express");

const blogRouter = express.Router({mergeParams: true});
// mergeParam - дает возможность получать id с другого роута(TourRouts)

const blogFuncs = require('../../controllesFunctionsPizza/Blog/blogFuncs')


blogRouter.route('/')
  .post(blogFuncs.createBlog)
  .get(blogFuncs.getAllBlogs)


// blogRouter.route('/:id')
//   .get(blogFuncs.getAllBooks)
//   .delete(blogFuncs.deleteBook)


module.exports = blogRouter;