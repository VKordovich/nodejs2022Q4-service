import { Injectable } from '@nestjs/common';
import { UserModel } from './user/user.model';
import { Observable, of } from 'rxjs';

@Injectable()
export class DbService {
  private readonly USERS = new Set<UserModel>();

  getUsers(): Observable<UserModel[]> {
    return of(Array.from(this.USERS));
  }

  setUsers(user: UserModel): Observable<UserModel> {
    this.USERS.add(user);
    return of(user);
  }

  deleteUser(user: UserModel): Observable<UserModel> {
    this.USERS.delete(user);
    return of(user);
  }
}
