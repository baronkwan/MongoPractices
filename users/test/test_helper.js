const mongoose = require('mongoose');

// Set mongoose promise library to be ES6 promise library (Your Node promise library)
mongoose.Promise = global.Promise;

// This method will only exercute one time
before((done) => {
  mongoose.connect('mongodb://localhost/users_test');
  mongoose.connection
    .once('open', () => { done(); })
    .on('error', (error) => {
      console.warn('Warning', error);
    });
});


// Function#done provided by mocha
beforeEach((done) => {
  // All collection in lowercase
  const { users, blogposts, comments } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
