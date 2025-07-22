<template>
  <header>
    <h1>Учетные записи</h1>
    <button class="add-new-user-btn" @click="addNewUser">＋</button>
  </header>
  <div class="center-v info-line">  
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2" />
        <path d="M12 16v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      <circle cx="12" cy="10" r="1" fill="currentColor" />
    </svg>
    <span style="margin-left: 5px">Для указания нескольких меток для одной пары логин/пароль используйте разделитель ;</span>
  </div>

  <div class="wrapper">
    <div class="row-wrapper">
      <div class="labels-row">
        <div class="label">Метки</div>
        <div class="label">Тип записи</div>
        <div class="input-container">
          <div class="label">Логин</div>
          <div class="label">Пароль</div>
        </div>
        <div class="label-btn-placeholder"></div>
      </div>
      <div v-for="user in users" :key="user.id" class="user-row">
        <div class="input"
            :class="{ 'input-error': !user.isValid }">
          <input 
            :value="getLabelString(user)"
            @input="($event) => {
              const value = ($event.target as HTMLInputElement).value;
              setLabelFromString(user, value);
              handleLabelBlur(user);
            }"
            placeholder="Метка"
            @blur="handleLabelBlur(user)"
            maxlength="50"
          />
        </div>
        <div class="input">
          <select v-model="user.type" required @change="onTypeChange(user)">
            <option v-for="type in types" :key="type.id" :value="type.id">
              {{ type.name }}
            </option>
          </select>
        </div>
        <div class="input-container">
          <div :class="{ 'input': true, 'input-error': !user.isValid }">
            <input
                v-model="user.login"
                placeholder="Логин"
                @blur="validateUser(user)"
                class="input-flex"
                maxlength="100"
            />
          </div>
          <div class="input password-wrapper"
            :class="{ hidden: !isPasswordVisible(user), 'input-error': !user.isValid }"
            v-if="isPasswordVisible(user)">
            <input 
                v-model="user.password" 
                :type="user.showPassword ? 'text' : 'password'"
                placeholder="Пароль" 
                @blur="validateUser(user)"
                maxlength="100"
                required 
            />
            <button @click="togglePassword(user)" type="button" class="toggle-password-btn btn-min">
              <eye-icon v-if="user.showPassword" />
              <eye-off-icon v-else />
            </button>
          </div>
        </div>
        <button @click="removeUser(user.id)" class="delete-btn btn-min">
          <trash-icon />
        </button>
      </div>
    </div>

  <div v-if="openMenu" class="row-wrapper">
    <h3>Добавить учетную запись</h3>
      <form @submit.prevent="submitNewUser">
        <div class="user-row">
          <div class="input">
            <input 
                v-model="newUser.labelInput"
                placeholder="Метка (можно через ;)"
                @blur="handleLabelBlur(newUser)"
                :class="{ 'input-error': !newUser.isValid }" 
                maxlength="50" 
            />
          </div>
          <div class="input">
          <select v-model="newUser.type" @change="onTypeChange(newUser)" :class="{ 'input-error': !newUser.isValid }">
              <option v-for="type in types" :key="type.id" :value="type.id"
                :selected="newUser.type == type.id">
                {{ type.name }}
              </option>
            </select>
          </div>
          <div class="input-container">
            <div class="input">
              <input
                v-model="newUser.login"
                placeholder="Логин"
                @blur="validateUser(newUser)"
                class="input-flex"
                :class="{ 'input-error': !newUser.isValid }"
                maxlength="100"
              />
            </div>
            <div class="input password-wrapper" :class="{ hidden: !isPasswordVisible(newUser) }" v-if="isPasswordVisible(newUser)">
              <input 
                  v-model="newUser.password" 
                  :type="newUser.showPassword ? 'text' : 'password'"
                  placeholder="Пароль" 
                  @blur="validateUser(newUser)"
                  :class="{ 'input-error': !newUser.isValid }"
                  maxlength="100"
                  required 
              />
              <button @click="togglePassword(newUser)" type="button" class="toggle-password-btn btn-min">
                <eye-icon v-if="newUser.showPassword" />
                <eye-off-icon v-else />
              </button>
            </div>
          </div>
          <button type="submit" class="submit-btn btn-min" @click="submitNewUser">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon" fill="none" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 20.25h12A2.25 2.25 0 0 0 20.25 18V7.5L16.5 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25zm9.75-16.5v5h-9.5v-5zM13 5.5V7m-6.75 4.25h11.5v6.5H6.25Z"></path>
            </svg>
          </button>
        </div>
      </form>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/useUserStore';
import { PlusIcon, EyeIcon, EyeOffIcon, TrashIcon } from '@heroicons/vue/outline';

export interface UserRecord {
  id: number;
  labels: { text: string }[],
  labelInput?: string;
  type: number;
  login: string;
  password: string | null; 
  isValid: boolean;
  showPassword?: boolean;
}
const userStore = useUserStore();
const users = computed(() => userStore.users);
const types = computed(() => userStore.types);
const openMenu = ref(false);

const newUser = ref<Partial<UserRecord>>({
  labelInput: '',
  type: 1,
  login: '',
  password: null,
  isValid: true,
  showPassword: false
  
});

const addNewUser = () => {
  openMenu.value = true;
};

const getLabelString = (user: UserRecord) => {
  return user.labels?.map(l => l.text).join('; ') || '';
};

const setLabelFromString = (user: UserRecord, value: string) => {
  if (!value) {
    user.labels = [];
  } else {
    user.labels = value.split(';').map(text => ({ text: text.trim() }));
  }
};

const isPasswordVisible = (user: UserRecord) => {
  const selectedType = types.value.find(t => t.id === user.type);
  return selectedType?.name === 'Локальная';
};

const validateUser = (user: UserRecord) => {
  const isLoginValid = user.login && user.login.length <= 100;
  const isPasswordValid = !isPasswordVisible(user) || (user.password && user.password.length <= 100);

  user.isValid = isLoginValid && isPasswordValid;

  if (user.isValid) {
    handleLabelBlur(user); 
  }
};

const togglePassword = (user: UserRecord) => {
  user.showPassword = !user.showPassword;
};

const handleLabelBlur = (user: UserRecord) => {
  if (!user.labelInput) {
    user.labels = [];
  } else {
    user.labels = user.labelInput.split(';').map(text => ({ text: text.trim() }));
  }

  validateUser(user);
};

const onTypeChange = (user: UserRecord) => {
  if (user.type === 1) {
    user.password = null;
  } else if (user.type === 2) {
    user.password = ''; 
  }

  validateUser(user);
};

const submitNewUser = () => {
  if (newUser.value.login === '') return;

  const id = userStore.users.length ? userStore.users[userStore.users.length - 1].id + 1 : 1;

  const labels = newUser.value.labelInput
    ? newUser.value.labelInput.split(';').map(text => ({ text: text.trim() }))
    : [];

  const userToAdd = {
    id,
    labels,
    type: newUser.value.type || 0,
    login: newUser.value.login,
    password: newUser.value.password,
    isValid: true,
    showPassword: false
  } as UserRecord;

  userStore.addUser(userToAdd);

  newUser.value = {
    labelInput: '',
    type: 1,
    login: '',
    password: '',
    isValid: true
  };
};

const removeUser = (id: number) => {
  userStore.removeUser(id);
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
}

header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}

.add-new-user-btn {
  background: #fff;
  border: solid 1px #ccc;
  border-radius: 5px;
  font-size: 1.5em;
  line-height: 1.5em;
  font-weight: bold;
}

.add-new-user-btn:hover {
  background: #eee;
}

button {
  color: #696969;
  cursor: pointer;
}

.btn-min {
  background: transparent;
  border: none;
}

.center-v {
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.info-line {
  background-color: #e1f1ff;
  padding: 0.5em 0.7em;
  margin: 0.5em 0;
}

input, select {
  margin: 4px 8px 4px 0;
  padding: 6px;
}

svg {
  width: 20px;
  height: 20px;
  color: #696969;
}

.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

}

.row-wrapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  width: 100%;
}

.formAdd {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-row, .labels-row {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
}

.labels-row .label {
  flex: 1;
  color: #666;
  font-size: 0.8em;
}

.input-flex {
  flex: 1;
}

.input {
  flex: 1;
  border: solid 1px #ccc;
}

.input input, .input select {
  border: none;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
}

.input-container {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 2;
}

.input-error {
  border: 1px solid red;
}

.password-wrapper {
  position: relative;
}

.password-wrapper.hidden {
  display: none;
}

.btnAdd {
  width: 80px;
  height: 30px;
}

.help-text {
  font-size: 14px;
  margin-bottom: 10px;
}

.password-wrapper input {
  padding-right: 36px;
  border: none;
  margin: 0;
  width: 100%;
  box-sizing: border-box;
}

.toggle-password-btn {
  position: absolute;
  right: 0px;
  top: 0;
  bottom: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #696969;
  display: flex;
  align-items: center;
}

.delete-btn, .submit-btn {
  width: 36px;
  height: 36px;
  padding: 4px;
  color: #696969;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.labels-row .label-btn-placeholder {
  width: 36px;
  height: 36px;
  padding: 4px;
}

form {
  position: relative;
  width: 100%;
}

h3 {
  margin-top: 1em;
}
</style>