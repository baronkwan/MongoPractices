const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach((done) => {
    joe = new User({ name: 'Joe', likes: 0 });
    joe.save()
      .then(() => done());
  });

  function assertName(operation, done) {
    operation
      .then(() => User.find({}))
      .then((users) => {
        assert(users.length === 1);
        assert(users[0].name === 'Baron');
        done();
      })
      .catch((err) => console.log(err)); // For Unhandled promise rejection
  };

  it('instance type using set n save', (done) => {
    joe.set('name', 'Baron'); // Only stay in memory if not save
    assertName(joe.save(), done);
    });

  it('A model instance can update', (done) => {
    assertName(joe.update({ name: 'Baron' }), done);
  });

  it('A model class can update', (done) => {
    assertName(
      User.update({ name: 'Joe' }, { name: 'Baron' }),
      done
    );
  });

  it('A model class can update one record', (done) => {
    assertName(
      User.findOneAndUpdate({ name: 'Joe'}, { name: 'Baron'}),
      done
    );
  });

  it('A model class can find a record with an Id and update', (done) => {
    assertName(
      User.findByIdAndUpdate(joe._id, { name: 'Baron'}),
      done
    );
  });

  it('A user can have their likes incremented by 1', (done) => {
    User.update({ name: 'Joe' }, { $inc: { likes: 10 } })
      .then(() => User.findOne({ name: 'Joe' }))
      .then((user) => {
        // assert(joe.likes === 1);
        // The variable joe here is not updated from the server,
        // Therefore, when you do the above assert it doesn't work
        assert(user.likes === 10);
        done();
      });
  });

});
