// /Users/thiagotavares/Projects/Services/apps/api/src/common/pipes/zod-validation.pipe.ts

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, _metadata: ArgumentMetadata): unknown {
    try {
      const parsedValue = this.schema.parse(value) as unknown;
      return parsedValue;
    } catch {
      throw new BadRequestException('Validation failed');
    }
  }
}
