import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(login: string, password: string) {
    this.id = uuidv4();
    this.login = login;
    this.password = password;
    this.version = 0;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}