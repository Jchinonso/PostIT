import chai from 'chai';
import supertest from 'supertest';
import app from '../../config/app';
import db from '../../models';
import groupHelper from '../Helpers/GroupHelper';
import userHelper from '../Helpers/UserHelper';
import messageHelper from '../Helpers/MessageHelper';


const expect = chai.expect;
const request = supertest(app);
const goodMessage = messageHelper.goodMessage;
const badMessage = messageHelper.badMessage;
const goodGroup = groupHelper.goodGroup1;
const anotherGroup = groupHelper.goodGroup2;
const user = userHelper.anotherUser;
const userDoesntExist = userHelper.goodUser;
const badGroup = groupHelper.badGroup;
const username = userHelper.userName;
let groupId;
let userResponse;


describe('POST api/group', () => {
  beforeEach((done) => {
    request.post('/api/user/signup')
    .send(user)
    .end((err, res) => {
      if (err) return err;
      userResponse = res.body;
      request.post('/api/group')
      .send(goodGroup)
      .end((err, res) => {
        if (err) return err;
        done();
      });
    }); 
  });
  after(() => db.sequelize.sync({ force: true }));
  it('should create a new group', (done) => {
    request.post('/api/group')
    .send(anotherGroup)
    .end((err, res) => {
      if (err) return err;
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property('name');
      expect(res.body).to.have.property('description');
      expect(res.body).to.have.property('createdAt');
      done();
    });
  }); 
  it('should not create group with missing property ', (done) => {
    request.post('/api/group')
    .send(badGroup)
    .end((err, res) => {
      expect(res.body.message).to.equal('unexpected error occured');
      return done();
    });
  });
  it('should not create a group if already exist ', (done) => {
    request.post('/api/group')
    .send(goodGroup)
    .end((err, res) => {
      expect(res.status).to.equal(409);
      expect(res.body.message).to.equal('Group already exist');
      return done();
    });
  });
  it('should add users to group', (done) => {
    request.post('/api/group/1/user')
    .send(username)
    .end((err, res) => {
      expect(res.status).to.equal(201);
      done();
    }); 
  });
  it('should not add user to group if user has not signup', (done) => {
    request.post('/api/group/1/user')
    .send(userDoesntExist)
    .end((err, res) => {
      expect(res.status).to.equal(409);
      done();
    }); 
  });
  it('should not add user to group if user already exist', (done) => {
    request.post('/api/group/1/user')
    .send(username)
    .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    }); 
  });
  it('should get all users in a group', (done) => {
    request.get('/api/group/1/user')
    .end((err, res) => {
      expect(res.body.length).to.equal(1);
      done();
    }); 
  });
  it('should not get user if group doesnt exist', (done) => {
    request.get('/api/group/3/user')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    }); 
  });
  it('should add message to group', (done) => {
    request.post('/api/group/1/message')
    .send(goodMessage)
    .end((err, res) => {
      expect(res.status).to.equal(201);
      done();
    }); 
  });
  it('should not add message to non existing group', (done) => {
    request.post('/api/group/4/message')
    .send(goodMessage)
    .end((err, res) => {
      expect(res.status).to.equal(409);
      done();
    }); 
  });
  it('should send error code for null content', (done) => {
    request.post('/api/group/1/message')
    .send()
    .end((err, res) => {
      expect(res.status).to.equal(400);
      done();
    }); 
  });
  it('should get messages that belongs to group', (done) => {
    request.get('/api/group/1/message')
    .end((err, res) => {
      expect(res.status).to.equal(200);
      done();
    }); 
  });
  it('should not get message if group doesnt exist', (done) => {
    request.get('/api/group/3/message')
    .end((err, res) => {
      expect(res.status).to.equal(404);
      done();
    }); 
  });


  // describe('POST api/group/:id/user', () => {
  //   beforeEach((done) => {
  //     request.post('/api/group')
  //       .send(goodGroup)
  //       .end((err, res) => {
  //         groupId = res.body.id;
  //         request.post('/api/user/signup')
  //         .send(user)
  //         .end((err, res) => {
  //           if (err) return err;
  //           userResponse = res;
  //           console.log(user);
  //           done();
  //         });
  //       });
  //   });

    
  // });
});

