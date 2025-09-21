import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AllocationsService } from './allocations.service.js';
import { AllocationsController } from './allocations.controller.js';
import { Allocation } from './allocation.entity.js';
import { User } from '../../users/user.entity.js';
import { Project } from '../../projects/project.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Allocation, User, Project])],
  providers: [AllocationsService],
  controllers: [AllocationsController],
  exports: [AllocationsService],
})
export class AllocationsModule {}
