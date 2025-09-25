import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AllocationsService } from './allocations.service.js';
import { CreateAllocationDto } from './dto/create-allocation.dto.js';
import { UpdateAllocationDto } from './dto/update-allocation.dto.js';

@Controller('api/allocations')
export class AllocationsController {
  constructor(private readonly svc: AllocationsService) {}

  @Post()
  create(@Body() dto: CreateAllocationDto) {
    return this.svc.create(dto);
  }

  @Get()
  findAll() {
    return this.svc.findAll();
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateAllocationDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.svc.remove(id);
  }
}
