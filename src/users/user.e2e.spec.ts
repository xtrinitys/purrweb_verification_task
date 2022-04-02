import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../app.module";
import * as request from 'supertest';

describe('Users', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleMixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleMixture.createNestApplication();
    await app.init();
  });

  it("should create a new user", () => {
    const testDto = {
      email: "sometest@gmail.com",
      password: "testPassWord"
    }

    return request(app.getHttpServer())
      .post('/users')
      .send(testDto)
      .expect((res) => {
        expect(res.body).toEqual(
            expect.objectContaining({
            id: expect.any(String),
            updatedAt: expect.any(String),
            createdAt: expect.any(String),
            email: testDto.email,
            password: testDto.password
          })
        )
      })
  });

  afterAll(async () => {
    await app.close();
  })
});