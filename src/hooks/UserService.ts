// src/services/UserService.ts
import { IUser } from "../model";
import { userData } from "../data"; // Simulated data source

class UserService {
  private users: IUser[] = userData;

  async fetchUsers(): Promise<IUser[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users);
      }, 1000);
    });
  }

  async getUser(id: number): Promise<IUser | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.users.find(user => user.id === id));
      }, 500);
    });
  }

  async createUser(user: IUser): Promise<IUser> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.users.push(user);
        resolve(user);
      }, 500);
    });
  }

  async updateUser(id: number, user: Partial<IUser>): Promise<IUser | undefined> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const index = this.users.findIndex(u => u.id === id);
        if (index !== -1) {
          this.users[index] = { ...this.users[index], ...user };
          resolve(this.users[index]);
        } else {
          resolve(undefined);
        }
      }, 500);
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
}

export default new UserService();
