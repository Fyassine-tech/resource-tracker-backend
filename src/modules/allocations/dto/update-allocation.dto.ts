import { IsInt, IsOptional, IsDateString, ValidateIf, Min, Max } from 'class-validator';

export class UpdateAllocationDto {
  @IsOptional() @IsInt() userId?: number;
  @IsOptional() @IsInt() projectId?: number;

  @ValidateIf(v => v.pct !== undefined && v.pct !== null)
  @IsInt() @Min(0) @Max(100) pct?: number | null;

  @ValidateIf(v => v.hoursPerWeek !== undefined && v.hoursPerWeek !== null)
  @IsInt() @Min(0) hoursPerWeek?: number | null;

  @IsOptional() @IsDateString() startDate?: string;
  @IsOptional() @IsDateString() endDate?: string | null;
}
