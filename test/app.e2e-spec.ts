import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Server } from 'http';
import request, { Response as SupertestResponse } from 'supertest';
import { AppModule } from '../src/app.module';

// If your e2e relies on a local DB container, set env here (optional):
// beforeAll(() => {
//   process.env.DATABASE_HOST = '127.0.0.1';
//   process.env.DATABASE_PORT = '5432';
//   process.env.DATABASE_USER = 'postgres';
//   process.env.DATABASE_PASSWORD = 'postgres';
//   process.env.DATABASE_NAME = 'resource_tracker';
// });

describe('App e2e', () => {
  let app: INestApplication;
  let server: Server;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    server = app.getHttpServer() as Server;
  });

  afterAll(async () => {
    await app?.close();
  });

  it('health works', async () => {
    const res: SupertestResponse = await request(server).get('/health');
    expect(res.status).toBe(200);
    expect((res.body as any).status).toBe('ok');
  });
});
