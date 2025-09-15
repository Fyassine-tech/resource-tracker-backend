import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiBadRequestResponse,
  ApiParam,
} from "@nestjs/swagger";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./project.entity";

@ApiTags("projects")
@Controller("projects")
@UsePipes(
  new ValidationPipe({
    whitelist: true,
    transform: true,
    forbidNonWhitelisted: true,
  }),
)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  @ApiOperation({ summary: "List all projects" })
  @ApiOkResponse({ description: "Array of projects", type: [Project] })
  async findAll(): Promise<Project[]> {
    return this.projectsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Get a project by id" })
  @ApiParam({ name: "id", type: Number })
  @ApiOkResponse({ description: "Project found", type: Project })
  @ApiNotFoundResponse({ description: "Project not found" })
  async findOne(@Param("id", ParseIntPipe) id: number): Promise<Project> {
    const project = await this.projectsService.findOne(id);
    if (!project) throw new NotFoundException("Project not found");
    return project;
  }

  @Post()
  @ApiOperation({ summary: "Create a project" })
  @ApiCreatedResponse({ description: "Project created", type: Project })
  @ApiBadRequestResponse({ description: "Validation failed" })
  async create(@Body() dto: CreateProjectDto): Promise<Project> {
    return this.projectsService.create(dto);
  }

  @Patch(":id")
  @ApiOperation({ summary: "Update a project" })
  @ApiParam({ name: "id", type: Number })
  @ApiOkResponse({ description: "Project updated", type: Project })
  @ApiNotFoundResponse({ description: "Project not found" })
  async update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateProjectDto,
  ): Promise<Project> {
    const updated = await this.projectsService.update(id, dto);
    if (!updated) throw new NotFoundException("Project not found");
    return updated;
  }

  @Delete(":id")
  @ApiOperation({ summary: "Delete a project" })
  @ApiParam({ name: "id", type: Number })
  @ApiOkResponse({
    description: "Deletion result",
    schema: { type: "object", properties: { deleted: { type: "boolean" } } },
  })
  @ApiNotFoundResponse({ description: "Project not found" })
  async remove(
    @Param("id", ParseIntPipe) id: number,
  ): Promise<{ deleted: boolean }> {
    const deleted = await this.projectsService.remove(id); // boolean
    if (!deleted) throw new NotFoundException("Project not found");
    return { deleted };
  }
}
