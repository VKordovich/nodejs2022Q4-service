import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-transfer.dto';
import { IdPipe } from '../pipes/id.pipe';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll(): Observable<any> {
    return this.userService.getAllUsers();
  }

  @UsePipes(new IdPipe())
  @Get(':id')
  getById(@Param() { id }: { id: string }): Observable<any> {
    return this.userService.getUser(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  create(@Body() { login, password }: CreateUserDto): Observable<unknown> {
    return this.userService.createUser(login, password);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @UsePipes(new IdPipe())
  update(
    @Param() { id }: { id: string },
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ): Observable<unknown> {
    return this.userService.updateUser(id, oldPassword, newPassword);
  }

  @Delete(':id')
  @UsePipes(new IdPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param() { id }: { id: string }): Observable<any> {
    return this.userService.deleteUser(id);
  }
}
