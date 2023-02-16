import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;

  constructor(login: string, password: string) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.version = 0;
    this.createdAt = new Date().getTime();
    this.updatedAt = new Date().getTime();
  }
}
