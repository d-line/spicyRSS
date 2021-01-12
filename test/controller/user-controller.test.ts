// import bodyParser from 'body-parser';
// import express from 'express';
// import request from 'supertest';
// import { useExpressServer } from 'routing-controllers';
// import { UserController } from '../../src/controller/user-controller';
// import { GlobalErrorHandler } from '../../src/middleware/global-error-handler';
// import { Info } from '../../src/models/info';

// let server;

describe('FeedsController', () => {
  // beforeAll(async () => {
  //   server = express();
  //   server.use(bodyParser.json());
  //   useExpressServer(server, {
  //     controllers: [UserController],
  //     middlewares: [GlobalErrorHandler],
  //     defaultErrorHandler: false
  //   });
  // });

  // afterEach(() => {
  //   jest.restoreAllMocks();
  // });

  // it('should successfully postOne with full body', () => {
  //   const userController = new UserController();
  //   const testBody = {
  //     country: 'USA',
  //     city: 'Tampa'
  //   };
  //   const res = userController.postOne(testBody as Info);
  //   expect(res).toBeUndefined();
  // });

  // it('should not return error if postOne has full body ', done => {
  //   request(server)
  //     .post('/users')
  //     .send({ country: 'USA', city: 'Weed' } as Info)
  //     .expect(204)
  //     .end((err, res) => {
  //       if (err) throw new Error(JSON.stringify(res.body));
  //       done();
  //     });
  // });

  // it('should return error if postOne does not have full body ', done => {
  //   request(server)
  //     .post('/users')
  //     .send({ city: 'Weed' } as Info)
  //     .expect(400)
  //     .end((err, res) => {
  //       if (err) throw new Error(JSON.stringify(res.body));
  //       done();
  //     });
  // });
});
