import { Repository, DeleteResult } from "typeorm";
import { ProjectsService } from "./projects.service";
import { Project } from "./project.entity";

describe("ProjectsService", () => {
  let service: ProjectsService;
  let repo: jest.Mocked<Partial<Repository<Project>>>;

  beforeEach(() => {
    repo = {
      find: jest.fn(),
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
      merge: jest.fn(),
      delete: jest.fn(),
    };

    // Inject the mocked repository

    service = new ProjectsService(repo as any);
  });

  it("findAll returns list", async () => {
    const list: Project[] = [{ id: 1, name: "A", description: "a" } as Project];
    (repo.find as jest.Mock).mockResolvedValue(list);

    await expect(service.findAll()).resolves.toEqual(list);
    expect(repo.find).toHaveBeenCalledTimes(1);
  });

  it("findOne returns item", async () => {
    const item: Project = { id: 2, name: "B", description: "b" } as Project;
    (repo.findOne as jest.Mock).mockResolvedValue(item);

    await expect(service.findOne(2)).resolves.toEqual(item);
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
  });

  it("create saves and returns entity", async () => {
    const dto = { name: "New", description: "desc" };
    const created: Project = {
      id: 3,
      name: "New",
      description: "desc",
    } as Project;

    (repo.create as jest.Mock).mockReturnValue(created);
    (repo.save as jest.Mock).mockResolvedValue(created);

    await expect(service.create(dto)).resolves.toEqual(created);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(created);
  });

  it("update patches then returns entity", async () => {
    const existing: Project = { id: 2, name: "X", description: "Z" } as Project;
    const merged: Project = { id: 2, name: "X", description: "Y" } as Project;

    (repo.findOne as jest.Mock).mockResolvedValue(existing);
    (repo.merge as jest.Mock).mockReturnValue(merged);
    (repo.save as jest.Mock).mockResolvedValue(merged);

    await expect(service.update(2, { description: "Y" })).resolves.toEqual(
      merged,
    );
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 2 } });
    expect(repo.merge).toHaveBeenCalledWith(existing, { description: "Y" });
    expect(repo.save).toHaveBeenCalledWith(merged);
  });

  it("update returns null when not found", async () => {
    (repo.findOne as jest.Mock).mockResolvedValue(null);
    await expect(service.update(999, { name: "nope" })).resolves.toBeNull();
  });

  it("remove deletes and confirms", async () => {
    (repo.delete as jest.Mock).mockResolvedValue({
      affected: 1,
    } as DeleteResult);

    await expect(service.remove(3)).resolves.toBe(true);
    expect(repo.delete).toHaveBeenCalledWith(3);
  });

  it("remove returns false when nothing deleted", async () => {
    (repo.delete as jest.Mock).mockResolvedValue({
      affected: 0,
    } as DeleteResult);
    await expect(service.remove(123)).resolves.toBe(false);
  });
});
