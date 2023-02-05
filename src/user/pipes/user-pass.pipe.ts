import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class UserPassPipe implements PipeTransform {
  transform(value: any) {
    if (!validate(value.id)) throw new BadRequestException();
    return value;
  }
}
