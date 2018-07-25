export class User {
  email: string;
  password: string;
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;

  constructor(id : number , first_name: string, last_name: string, avatar: string) {
    this.id = id;
    this.first_name = first_name;
    this.last_name = last_name;
    this.avatar = avatar;
}

  }