var Post = require('../models/post.js');

exports.index = function(req, res) {
  posts = [];

  createPosts();
  
  // postNames = ["Zapcord", "Visual-Computing-with-Processing"];
  // posts = [];
  // for (var i = 0; i < postNames.length; i++) {
  //   Post.findOne({indexTitle: postNames[i]}, function(err, post) {
  //     if(post != null) {
  //       posts.push(post);
  //     } else {
  //       res.render('/404');
  //     }
  //     if(posts.length === postNames.length) {
  //       res.render('index', {posts: posts});
  //     }
  //   });
  // }
  res.render('index', {posts: posts});
};

function createPosts() {

}