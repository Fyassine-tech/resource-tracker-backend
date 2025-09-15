import { Module } from "@nestjs/common";
import { TerminusModule } from "@nestjs/terminus";
import { HealthController } from "./health.controller";

@Module({
  imports: [TerminusModule], // provides HealthCheckService + TypeOrmHealthIndicator
  controllers: [HealthController],
})
export class HealthModule {}
