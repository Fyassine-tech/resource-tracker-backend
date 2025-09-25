import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Project } from "./project.entity";

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepo: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepo.find();
  }

  create(data: Partial<Project>): Promise<Project> {
    const project = this.projectsRepo.create(data);
    return this.projectsRepo.save(project);
  }

  async remove(id: number): Promise<{ deleted: boolean }> {
    await this.projectsRepo.delete(id);
    return { deleted: true };
  }
}
