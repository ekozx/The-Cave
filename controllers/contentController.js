var Post = require('../models/post.js');
var AWS = require('aws-sdk');
AWS.config.loadFromPath('./credentials.json')

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
  s3Path = "http://s3.amazonaws.com/thecave/sub-wallpapers"
  console.log(process.env);
  console.log(AWS.config);
  var s3 = new AWS.S3();
  s3.listBuckets(function(err, data) {
    if (err) { console.log("Error:", err); }
    else {
      for (var index in data.Buckets) {
        var bucket = data.Buckets[index];
        console.log("Bucket: ", bucket.Name, ' : ', bucket.CreationDate);
      }
    }
  });
};