// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

// Local modules: use .js because you're on NodeNext
import { AllocationsModule } from './modules/allocations/allocations.module.js';
// If/when you add metrics, uncomment the next two lines:
// import { MetricsModule } from './modules/metrics/metrics.module.js';
// (and add MetricsModule to the imports array)

@Module({
  imports: [
    // Loads .env and makes process.env available
    ConfigModule.forRoot({ isGlobal: true }),

    // TypeORM connection (DEV settings)
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST ?? 'db',   // 'db' if API runs in Docker; '127.0.0.1' if running locally
      port: parseInt(process.env.DATABASE_PORT ?? '5432', 10),
      username: process.env.DATABASE_USER ?? 'postgres',
      password: process.env.DATABASE_PASSWORD ?? 'postgres',
      database: process.env.DATABASE_NAME ?? 'resource_tracker',

      // The two you asked for:
      autoLoadEntities: true,   // auto-detects @Entity classes used in forFeature(...)
      synchronize: true,        // DEV ONLY – auto-creates/updates tables

      // Optional dev logging:
      // logging: ['error', 'warn'],
    }),

    // Feature modules
    AllocationsModule,
    // MetricsModule,
  ],
})
export class AppModule {}
