import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private data: Array<{ id: number; name: string }> = [
    { id: 1, name: 'Mohamed' },
    { id: 2, name: 'Khaled' },
    { id: 3, name: 'Omar' },
    { id: 4, name: 'Ahmed' }
  ];

  user(id: number): Promise<{ id: number; name: string }> {
    return Promise.resolve(this.data.find(obj => id === obj.id));
  }

  users(): Promise<Array<{ id: number; name: string }>> {
    return Promise.resolve(this.data);
  }
}
