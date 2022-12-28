<template>
<div class="modal fade" id="add_button" tabindex="-1" aria-labelledby="add_button" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="add_button">Добавление пользователя</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

    <Form @submit="getNewUserData()">
      <div class="modal-body butt">
          <div class="form-group">
        <Field name ="username" type="text" class="form-control"  placeholder="Имя пользователя" v-model="userName" :rules="validateLogin"/>
        <ErrorMessage name="username" class="error-message" />
          </div>
          <div class="form-group">
        <Field name="lastname" type="text" class="form-control"  placeholder="Фамилия" v-model="lastName" :rules="validateLastName"/>
        <ErrorMessage name="lastname" class="error-message" />
          </div>
          <div class="form-group">
        <Field name="firstname" type="text" class="form-control"  placeholder="Имя" v-model="firstName" :rules="validateFirstName" />
        <ErrorMessage name="firstname" class="error-message" />
          </div>
          <div class="form-group">
        <Field name="middlename" type="text" class="form-control"  placeholder="Отчество" v-model="middleName" :rules="validateMiddleName" />
        <ErrorMessage name="middlename" class="error-message"/>
          </div>
          <div class="form-group">
        <Field name="password" type="password" class="form-control"  placeholder="Пароль" v-model="password" :rules="validatePassword" />
        <ErrorMessage name="password" class="error-message" />
          </div>
          <div class="form-group">
        <Field name="confirmpassword" type="password" class="form-control"  placeholder="Повторите пароль" v-model="confirmpassword" :rules="confirmPassword" />
        <ErrorMessage name="confirmpassword" class="error-message" />
          <div class="dropdown mt-3">
                      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">Выберите роль</button>
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                              <li><a class="dropdown-item" href="#" @click="selectRole('admin')">admin</a></li>
                              <li><a class="dropdown-item" href="#" @click="selectRole('interviewer')">interviewer</a></li>
                              <ErrorMessage name="validateRole" class="error-message" />
                          </ul>
            </div>
            <p class="role_text">Выбранная роль: {{this.role}}</p>
        </div>
      </div>
      <div class="modal-footer butt">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
        <button type="submit" class="btn btn-primary">Добавить</button>
      </div>
    </Form>

      
    </div>
  </div>
</div>                
</template>

<script>
import UIAddUserModal from './UIAddUserModal.vue'
import { Field, Form, ErrorMessage } from 'vee-validate';
export default {
  components: { UIAddUserModal, Field, Form, ErrorMessage },
    name : "ui-add-user-modal",
    data() {
      return {
        userName: '',
        firstName: '',
        middleName: '',
        lastName: '',
        password: '',
        confirmpassword:'',
        role: ''
      }
    },
    methods: {
      validateLogin(value) {
        //if field is empty
        if (!value) {
          return 'Введите имя пользователя'; }

        const regex = /^[A-Za-z]\w{4,20}$/;
        if (!regex.test(value)) {
          return 'Имя пользователя должно начинаться только с буквы, содеражть только латинские буквы, цифры и знак нижнего подчеркивания ( _ ), а также не должно содеражть менее 5 или более 20 символов.';
        }
        // All is good
        return true;
      },

      validateLastName(value) {
        if (!value) {
          return 'Введите фамилию'; }

          const regex = /^[A-Z]{1}[a-z]{1,35}$/;
        if (!regex.test(value)) {
          return 'Используйте только латинские заглавые или строчные буквы. Начинайте с заглавной буквы.';
        }
        // All is good
        return true;
        
      },
      
      validateFirstName(value){
        if (!value) {
          return 'Введите имя'; }

          const regex = /^[A-Z]{1}[a-z]{1,35}$/;
        if (!regex.test(value)) {
          return 'Используйте только латинские заглавые или строчные буквы. Начинайте с заглавной буквы.';
        }
        // All is good
        return true;
      },

      validateMiddleName(value){
        if (!value) {
          return 'Введите отчество'; }

          const regex = /^[A-Z]{1}[a-z]{1,35}$/;
        if (!regex.test(value)) {
          return 'Используйте только латинские заглавые или строчные буквы. Начинайте с заглавной буквы.';
        }
        // All is good
        return true;
      },

      validatePassword(value){
        if (!value) {
          return 'Введите пароль'; }

          const regex = /^[A-Za-z1-9]\w{8,35}$/;
        if (!regex.test(value)) {
          return 'Пароль должен содержать неменее 8 и не более 35 символов (заглавные или строчные латинские буквы, цифры, а также символы нижнего подчеркивания).';
        }
        // All is good
        return true;
      },
      
      confirmPassword(value) {
        if (!value) {
          return 'Введите пароль еще раз'; }

        if (this.password !== value) {
          return 'Пароли не совпадают';
        }

        return true;
      },

      getNewUserData() {
        const user = {userName: this.userName,
                      firstName: this.firstName,
                      middleName: this.middleName,
                      lastName: this.lastName,
                      password: this.password,
                      role: this.role}

        this.$emit("onUserCreated", user)
      }, 

      selectRole(role) {
        this.role = role;
      }

    },

    emmits: ["onUserCreated"]
}
</script>

<style scoped lang="scss">
@import "src/styles/colors";

.form-group{
    padding: 0 40px;
    margin: 0 0 25px 0;
   }

.form-control{
    background: $gray-100;
    border: none;
    border-radius: 20px;
    box-shadow: none;
    height: 40px;
    transition: all 0.3s ease 0s;
   }

.form-control:focus{
    background: $gray-300;
    box-shadow: none;
    outline: 0 none;
   }

.butt .btn {
	font-size: 14px;
    color: #fff;
    background: #1088fc;
    border-radius: 20px;
    border: none;
    transition: 0.3s;
    opacity: 0.8;
    outline: none;
	margin-right: 30px;

}

.butt_width {
	width: 50px;
}

.astext {
	background:none;
    border:none;
    margin:0;
    padding:0;
    cursor: pointer;
	font-size: 30px;
}

.astext:focus {
	outline: none !important;
}

.astext:hover{
	color: #1088fc;
}

.role_text {
  text-align: center;
  margin-top: 15px;
  padding-bottom: 0px;
}
.error-message {
  font-size: 11px;
  color: red;
}
</style>