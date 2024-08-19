// src/services/UserService.ts
import { IUser } from "../model";
import { userData } from "../data"; // Simulated data source

class UserService {
  private users: IUser[] = userData;

  async fetchUsers(): Promise<IUser[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 200);
    });
  }

  async getUser(id: number): Promise<IUser | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users.find(user => user.id === id));
      }, 100);
    });
  }

  async createUser(user: IUser): Promise<IUser> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.users = [...this.users, user];
        console.log('create user service called')
        resolve(user);
      }, 500);
    });
  }

  async updateUser(id: number, user: Partial<IUser>): Promise<IUser | undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = this.users.findIndex(u => u.id === id);
      if (index !== -1) {
        const updatedUser = { ...this.users[index], ...user };
        this.users = [
          ...this.users.slice(0, index),
          updatedUser,
          ...this.users.slice(index + 1)
        ];
        resolve(updatedUser);
      } else {
        resolve(undefined);
      }
    }, 100);
  });
}


  async deleteUser(id: number): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.users = this.users.filter(user => user.id !== id);
        resolve(true);
      }, 500);
    });
  }

  async deleteUsersByIds(ids: number[]): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.users = this.users.filter(user => !ids.includes(user.id));
        resolve();
      }, 500);
    });
  }
}

export default new UserService();
