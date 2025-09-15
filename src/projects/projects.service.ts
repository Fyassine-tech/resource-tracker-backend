import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./project.entity";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly repo: Repository<Project>,
  ) {}

  async findAll(): Promise<Project[]> {
    return this.repo.find();
  }

  async findOne(id: number): Promise<Project | null> {
    return this.repo.findOne({ where: { id } });
  }

  async create(dto: CreateProjectDto): Promise<Project> {
    const entity = this.repo.create(dto);
    return this.repo.save(entity);
  }

  async update(id: number, dto: UpdateProjectDto): Promise<Project | null> {
    const existing = await this.repo.findOne({ where: { id } });
    if (!existing) return null;
    const merged = this.repo.merge(existing, dto);
    return this.repo.save(merged);
  }

  /**
   * Returns true if a row was deleted; false otherwise.
   */
  async remove(id: number): Promise<boolean> {
    const res = await this.repo.delete(id);
    return (res.affected ?? 0) > 0;
  }
}
