import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { validate } from 'uuid';

@Injectable()
export class UserIdPipe implements PipeTransform {
  transform(value: any) {
    if (value.id && !validate(value.id)) throw new BadRequestException();
    return value;
  }
}
