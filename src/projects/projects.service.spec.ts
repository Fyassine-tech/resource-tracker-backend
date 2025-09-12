import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsService } from './projects.service';
import { Project } from './project.entity';

type Repo = Partial<Record<keyof Repository<Project>, jest.Mock>>;

function makeRepoMock(): Repo {
  return {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };
}

describe('ProjectsService', () => {
  let service: ProjectsService;
  let repo: Repo;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: getRepositoryToken(Project), useValue: makeRepoMock() },
      ],
    }).compile();

    service = module.get(ProjectsService);
    repo = module.get(getRepositoryToken(Project));
  });

  afterEach(() => jest.clearAllMocks());

  it('findAll returns list', async () => {
    repo.find!.mockResolvedValue([{ id: 1, name: 'A' }]);
    await expect(service.findAll()).resolves.toEqual([{ id: 1, name: 'A' }]);
  });

  it('findOne returns one by id', async () => {
    repo.findOne!.mockResolvedValue({ id: 1, name: 'A' });
    await expect(service.findOne(1)).resolves.toEqual({ id: 1, name: 'A' });
    expect(repo.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
  });

  it('create saves a new project', async () => {
    const dto = { name: 'New' };
    repo.create!.mockReturnValue(dto);
    repo.save!.mockResolvedValue({ id: 1, ...dto });
    await expect(service.create(dto)).resolves.toEqual({ id: 1, name: 'New' });
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalled();
  });

  it('update patches then returns entity', async () => {
    repo.update!.mockResolvedValue(undefined);
    repo.findOne!.mockResolvedValue({ id: 2, name: 'X', description: 'Y' });
    await expect(service.update(2, { description: 'Y' })).resolves.toEqual({
      id: 2,
      name: 'X',
      description: 'Y',
    });
    expect(repo.update).toHaveBeenCalledWith(2, { description: 'Y' });
  });

  it('remove deletes and confirms', async () => {
    repo.delete!.mockResolvedValue(undefined);
    await expect(service.remove(3)).resolves.toEqual({ deleted: true });
    expect(repo.delete).toHaveBeenCalledWith(3);
  });
});
