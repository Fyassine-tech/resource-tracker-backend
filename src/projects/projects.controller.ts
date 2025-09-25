import { Controller, Get, Post, Body, Delete, Param } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { Project } from "./project.entity";

@Controller("projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Post()
  create(@Body() body: Partial<Project>): Promise<Project> {
    return this.projectsService.create(body);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.projectsService.remove(id);
  }
}
