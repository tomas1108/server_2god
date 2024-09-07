export class User {
    id: string;
    username: string;
    password: string;
    token?: string;
    created_at: Date;
    updated_at: Date;
    removed_at?: Date;
  }
  