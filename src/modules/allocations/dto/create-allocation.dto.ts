import { IsInt, IsOptional, IsDateString, ValidateIf, Min, Max } from 'class-validator';

export class CreateAllocationDto {
  @IsInt() userId: number;
  @IsInt() projectId: number;

  @ValidateIf(v => v.pct !== undefined && v.pct !== null)
  @IsInt() @Min(0) @Max(100) pct?: number;

  @ValidateIf(v => v.hoursPerWeek !== undefined && v.hoursPerWeek !== null)
  @IsInt() @Min(0) hoursPerWeek?: number;

  @IsDateString() startDate: string;
  @IsOptional() @IsDateString() endDate?: string | null;
}
