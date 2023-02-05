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
import { UserModel } from './user.model';
import { UserService } from './user.service';
import { UserIdPipe } from './pipes/userId.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-transfer.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAllUsers(): Observable<UserModel[]> {
    return this.userService.getAllUsers();
  }

  @UsePipes(new UserIdPipe())
  @Get(':id')
  getUser(@Param() { id }: { id: string }): Observable<UserModel> {
    return this.userService.getUser(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  createUser(
    @Body() { login, password }: CreateUserDto,
  ): Observable<UserModel> {
    return this.userService.createUser(login, password);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ errorHttpStatusCode: HttpStatus.BAD_REQUEST }))
  @UsePipes(new UserIdPipe())
  updateUser(
    @Param() { id }: { id: string },
    @Body() { oldPassword, newPassword }: UpdatePasswordDto,
  ): Observable<UserModel> {
    return this.userService.updateUser(id, oldPassword, newPassword);
  }

  @Delete(':id')
  @UsePipes(new UserIdPipe())
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param() { id }: { id: string }): Observable<UserModel> {
    return this.userService.deleteUser(id);
  }
}
