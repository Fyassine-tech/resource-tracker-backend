import { Controller, Get, Post, Body, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOkResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly svc: ProjectsService) {}

  @Get()
  @ApiOkResponse({ description: 'List all projects' })
  list() {
    return this.svc.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Get one project by id' })
  get(@Param('id', ParseIntPipe) id: number) {
    return this.svc.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ description: 'Create a new project' })
  create(@Body() dto: CreateProjectDto) {
    return this.svc.create(dto);
  }

  @Patch(':id')
  @ApiOkResponse({ description: 'Update a project' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProjectDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Delete a project' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
