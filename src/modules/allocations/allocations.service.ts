import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Allocation } from './allocation.entity.js';
import { CreateAllocationDto } from './dto/create-allocation.dto.js';
import { UpdateAllocationDto } from './dto/update-allocation.dto.js';
import { User } from '../../users/user.entity.js';
import { Project } from '../../projects/project.entity.js';

@Injectable()
export class AllocationsService {
  constructor(
    @InjectRepository(Allocation) private readonly repo: Repository<Allocation>,
    @InjectRepository(User) private readonly users: Repository<User>,
    @InjectRepository(Project) private readonly projects: Repository<Project>,
  ) {}

  async create(dto: CreateAllocationDto) {
    const user = await this.users.findOneBy({ id: dto.userId });
    const project = await this.projects.findOneBy({ id: dto.projectId });
    if (!user || !project) throw new NotFoundException('User or Project not found');

    const allocation = this.repo.create({
      user,
      project,
      pct: dto.pct ?? null,
      hoursPerWeek: dto.hoursPerWeek ?? null,
      startDate: dto.startDate,
      endDate: dto.endDate ?? null,
    });
    return this.repo.save(allocation);
  }

  findAll() {
    return this.repo.find();
  }

  async update(id: number, dto: UpdateAllocationDto) {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) throw new NotFoundException('Allocation not found');

    if (dto.userId !== undefined) {
      const u = await this.users.findOneBy({ id: dto.userId });
      if (!u) throw new NotFoundException('User not found');
      existing.user = u;
    }
    if (dto.projectId !== undefined) {
      const p = await this.projects.findOneBy({ id: dto.projectId });
      if (!p) throw new NotFoundException('Project not found');
      existing.project = p;
    }
    if (dto.pct !== undefined) existing.pct = dto.pct;
    if (dto.hoursPerWeek !== undefined) existing.hoursPerWeek = dto.hoursPerWeek;
    if (dto.startDate !== undefined) existing.startDate = dto.startDate;
    if (dto.endDate !== undefined) existing.endDate = dto.endDate;

    return this.repo.save(existing);
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { deleted: true };
  }
}
