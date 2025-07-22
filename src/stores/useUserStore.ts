import { defineStore } from 'pinia';

interface Type {
  id: number;
  name: string;
}

interface User {
  id: number;
  labels?: { text: string }[];
  labelInput?:  string;
  type: number;
  login: string;
  password: string | null;
  isValid?: boolean;
  showPassword?: boolean;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    types: [
        {id: 1, name: "Локальная"}, 
        {id: 2, name: "LDAP"},
    ], 
    users: [
      { id: 1, labels: [{text: 'XXXX'}], labelInput: 'XXXX', type: 1, login: 'Значение', password: '123' },
      { id: 2, labels: [{text: 'yyyy'}, {text: 'fgrgeg'},], labelInput: 'yyyy', type: 1, login: 'Значение', password: 'pass' },
      { id: 3, labels: [{text: 'XXXX'}], labelInput: 'XXXX', type: 1, login: 'Значение', password: 'pass' },
      { id: 4, labels: [{text: 'Значение1'}, {text: 'Значение2'}, {text: 'Значение3'}], labelInput: 'Значение1', type: 2, login: 'Значение', password: '' },
      { id: 5, labels: [{text: 'Значение17'}], labelInput: 'Значение1', type: 2, login: 'Значение', password: '' },
    ] as User[],
  }),
  actions: {
    loadFromStorage() {
      const saved = localStorage.getItem('userStore');
        if (saved) {
          this.$patch(JSON.parse(saved));
        }
      },
    saveToStorage() {
      localStorage.setItem('userStore', JSON.stringify(this.$state));
    },
    addUser(user: Omit<User, 'id'>) {
      const id = this.users.length ? this.users[this.users.length - 1].id + 1 : 1;
      this.users.push({ ...user, id });
      this.saveToStorage();
    },
    removeUser(id: number) {
      this.users = this.users.filter(u => u.id !== id);
      this.saveToStorage();
    }
  }
});