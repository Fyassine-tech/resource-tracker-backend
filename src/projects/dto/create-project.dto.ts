import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsIn } from 'class-validator';

export class CreateProjectDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ enum: ['Planned','In-Progress','Blocked','At-Risk','Done'] })
  @IsIn(['Planned','In-Progress','Blocked','At-Risk','Done'])
  @IsOptional()
  status?: 'Planned'|'In-Progress'|'Blocked'|'At-Risk'|'Done';

  @ApiPropertyOptional({ enum: ['Low','Med','High'] })
  @IsIn(['Low','Med','High'])
  @IsOptional()
  priority?: 'Low'|'Med'|'High';
}
