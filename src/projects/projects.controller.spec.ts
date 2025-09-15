import { Test, TestingModule } from "@nestjs/testing";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";
import { CreateProjectDto } from "./dto/create-project.dto";
import { UpdateProjectDto } from "./dto/update-project.dto";
import { Project } from "./project.entity";

describe("ProjectsController", () => {
  let controller: ProjectsController;

  const mockService = {
    findAll: jest.fn<Promise<Project[]>, []>(async () => []),
    findOne: jest.fn<Promise<Project | null>, [number]>(
      async (id) => ({ id, name: "Demo", description: null }) as Project,
    ),
    create: jest.fn<Promise<Project>, [CreateProjectDto]>(
      async (dto) =>
        ({
          id: 1,
          name: dto.name,
          description: dto.description ?? null,
        }) as Project,
    ),
    update: jest.fn<Promise<Project | null>, [number, UpdateProjectDto]>(
      async (id, dto) =>
        ({
          id,
          name: dto.name ?? "Demo",
          description: dto.description ?? null,
        }) as Project,
    ),
    remove: jest.fn<Promise<boolean>, [number]>(async () => true),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [{ provide: ProjectsService, useValue: mockService }],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("findOne returns a project", async () => {
    const p = await controller.findOne(1);
    expect(p.id).toBe(1);
    expect(mockService.findOne).toHaveBeenCalledWith(1);
  });

  it("create returns created project", async () => {
    const dto: CreateProjectDto = { name: "X", description: "Y" };
    const p = await controller.create(dto);
    expect(p.name).toBe("X");
    expect(mockService.create).toHaveBeenCalledWith(dto);
  });

  it("remove returns { deleted: true }", async () => {
    const res = await controller.remove(1);
    expect(res).toEqual({ deleted: true });
    expect(mockService.remove).toHaveBeenCalledWith(1);
  });
});
