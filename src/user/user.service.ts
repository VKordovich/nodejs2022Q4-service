import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  catchError,
  from,
  map,
  Observable,
  single,
  switchMap,
  tap,
} from 'rxjs';
import { UserModel } from './user.model';
import { DbService } from '../db.service';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(private db: DbService) {}

  getAllUsers(): Observable<UserModel[]> {
    return this.db.getUsers();
  }

  createUser(login: string, password: string): Observable<UserModel> {
    const user: UserModel = new User(login, password);
    return this.db.setUsers(user);
  }

  getUser(id: string): Observable<UserModel> {
    return this.db.getUsers().pipe(
      switchMap((users) => from(users)),
      single((user) => user.id === id),
      catchError(() => {
        throw new NotFoundException('User not found');
      }),
    );
  }

  updateUser(
    id: string,
    oldPassword: string,
    password: string,
  ): Observable<UserModel> {
    return this.getUser(id).pipe(
      tap((user) => {
        if (user.password !== oldPassword)
          throw new ForbiddenException('Wrong password');
      }),
      tap((user) => this.db.deleteUser(user)),
      map((user) => {
        return {
          ...user,
          password,
          version: ++user.version,
          updatedAt: new Date(),
        };
      }),
      switchMap((updatedUser) => this.db.setUsers(updatedUser)),
    );
  }

  deleteUser(id: string): Observable<UserModel> {
    return this.getUser(id).pipe(switchMap((user) => this.db.deleteUser(user)));
  }
}
