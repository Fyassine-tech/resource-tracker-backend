/* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment,
                  @typescript-eslint/no-unsafe-argument,
                  @typescript-eslint/no-unsafe-member-access,
                  @typescript-eslint/no-explicit-any */

import { Test } from "@nestjs/testing";
import { ProjectsController } from "./projects.controller";
import { ProjectsService } from "./projects.service";

describe("ProjectsController", () => {
  let controller: ProjectsController;
  let service: jest.Mocked<ProjectsService>;

  beforeEach(async () => {
    const serviceMock: jest.Mocked<ProjectsService> = {
      findAll: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    } as any;

    const module = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [{ provide: ProjectsService, useValue: serviceMock }],
    }).compile();

    controller = module.get(ProjectsController);
    service = module.get(ProjectsService);
  });

  afterEach(() => jest.clearAllMocks());

  it("GET /projects", async () => {
    service.findAll.mockResolvedValue([{ id: 1 } as any]);
    await expect(controller.list()).resolves.toEqual([{ id: 1 }]);
  });

  it("GET /projects/:id", async () => {
    service.findOne.mockResolvedValue({ id: 2 } as any);
    await expect(controller.get(2)).resolves.toEqual({ id: 2 });
  });

  it("POST /projects", async () => {
    service.create.mockResolvedValue({ id: 3, name: "N" } as any);
    await expect(controller.create({ name: "N" } as any)).resolves.toEqual({
      id: 3,
      name: "N",
    });
  });

  it("PATCH /projects/:id", async () => {
    service.update.mockResolvedValue({ id: 4, description: "U" } as any);
    await expect(
      controller.update(4, { description: "U" } as any),
    ).resolves.toEqual({ id: 4, description: "U" });
  });

  it("DELETE /projects/:id", async () => {
    service.remove.mockResolvedValue({ deleted: true } as any);
    await expect(controller.remove(5)).resolves.toEqual({ deleted: true });
  });
});
