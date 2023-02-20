import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { catchError, from, map, Observable, switchMap, tap } from 'rxjs';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  getAllUsers(): Observable<unknown> {
    return from(this.prisma.user.findMany());
  }

  createUser(login: string, password: string): Observable<any> {
    const data = { login, password, version: 1 };
    return from(this.prisma.user.create({ data })).pipe(
      map(({ password, createdAt, updatedAt, ...rest }) => {
        return {
          ...rest,
          createdAt: new Date(createdAt).getTime(),
          updatedAt: new Date(updatedAt).getTime(),
        };
      }),
    );
  }

  getUser(id: string): Observable<any> {
    return from(this.prisma.user.findUnique({ where: { id } })).pipe(
      map((res) => {
        if (!res) throw '';
        return res;
      }),
      catchError(() => {
        throw new NotFoundException('User not found');
      }),
    );
  }

  updateUser(
    id: string,
    oldPassword: string,
    password: string,
  ): Observable<any> {
    return this.getUser(id).pipe(
      tap((user) => {
        if (user.password !== oldPassword)
          throw new ForbiddenException('Wrong password');
      }),
      switchMap(() =>
        from(
          this.prisma.user.update({
            where: { id },
            data: { password, version: { increment: 1 } },
          }),
        ),
      ),
      map(({ password, createdAt, updatedAt, ...rest }) => {
        return {
          ...rest,
          createdAt: new Date(createdAt).getTime(),
          updatedAt: new Date(updatedAt).getTime(),
        };
      }),
    );
  }

  deleteUser(id: string): Observable<any> {
    return from(this.prisma.user.delete({ where: { id } })).pipe(
      catchError(() => {
        throw new NotFoundException('User not found');
      }),
    );
  }
}
