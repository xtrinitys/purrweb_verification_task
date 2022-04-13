import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../src/app.module";
import { faker } from "@faker-js/faker";
import * as request from "supertest";

describe('Auth', () => {
  let app: INestApplication;
  let testEmail: string;
  let testPassword: string;
  let jwtToken: string;

  beforeAll(async () => {
    const moduleMixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleMixture.createNestApplication();
    await app.init();


    testEmail = faker.internet.email();
    testPassword = faker.internet.password(10);
  });

  it('should register a new user and get JWT token', function() {
    const signUpDto = {email: testEmail, password: testPassword};

    return request(app.getHttpServer())
      .post('/auth/signup')
      .send(signUpDto)
      .expect(res => {
        expect(res.body).toEqual(
          expect.objectContaining({
            access_token: expect.any(String)
          }),
        );
        jwtToken = res.body.access_token;
      });
  });

  it("should login and get JWT token", function() {
    const signUpDto = {email: testEmail, password: testPassword};

    return request(app.getHttpServer())
      .post('/auth/signin')
      .send(signUpDto)
      .expect((res) => {
        expect(res.body).toEqual(
          expect.objectContaining({
            access_token: expect.any(String)
          }),
        );
        jwtToken = res.body.access_token;
      });
  });

  it("should get 401, without JWT token", function() {
    return request(app.getHttpServer()).get('/profile').expect(401);
  });

  it("should get access to protected end point with JWT valid", function() {
    return request(app.getHttpServer())
      .get('/profile')
      .auth(jwtToken, {type: "bearer"})
      .expect(200);
  });

  afterAll(async () => {
    await app.close();
  })
});