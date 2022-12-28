<template>
   <div class="container">
        <div class="row">
            <div class="col-md-5 offset-md-3 mrt">
                <Form class="form-horizontal">
                    <span class="heading">АВТОРИЗАЦИЯ</span>
                    <div class="form-group">
                        <Field name ="username" type="text" class="form-control"  placeholder="Имя пользователя" v-model="login" :rules="validateLogin"/>
                         <ErrorMessage name="username" class="error-message" />
                        <i class="fa fa-user"></i>
                    </div>
                    <div class="form-group">
                        <Field name="password" type="password" class="form-control"  placeholder="Пароль" v-model="password" :rules="validatePassword" />
                        <ErrorMessage name="password" class="error-message" />
                        <i class="fa fa-lock" aria-hidden="true"></i>
                    </div>
                    <div class="form-group d-grid gap-2">
                        <button @click="loginFunc()" type="button" class="btn btn-primary btn-lg btn-block">Войти</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions ,mapGetters } from "vuex";
import { Field, Form, ErrorMessage } from 'vee-validate';
import axios from 'axios';
export default {
    components: { Field, Form, ErrorMessage },
    name: "SigninPage",
    data() {
        return {
            login: '',
            password: '',
        }
    },
    methods: {
        ...mapActions(["setAccessToken", "setRefreshToken"]),
        async loginFunc () {
            const result = await axios.post('https://projectzero-api-0.herokuapp.com/api/v1.0/auth/signin', {
                login: this.login,
                password: this.password
            });
            this.setAccessToken(result.data.accessToken);
            this.setRefreshToken(result.data.refreshToken);
            this.$router.push('/userslist');
            

            
        },
        validateLogin(value) {
        //if field is empty
        if (!value) {
          return 'Введите имя пользователя'; }

        const regex = /^[A-Za-z]\w{4,20}$/;
        if (!regex.test(value)) {
          return 'Имя пользователя должно начинаться с буквы, содеражть только латинские буквы.';
        }
        // All is good
        return true;
      },
      validatePassword(value){
        if (!value) {
          return 'Введите пароль'; }

          const regex = /^[A-Za-z1-9]\w{4,20}$/;
        if (!regex.test(value)) {
          return 'Пароль должен содержать неменее 4 и не более 20 символов.';
        }
        // All is good
        return true;
      },
    },
    computed: {
        ...mapGetters(["accessToken", "refreshToken"])
    }
}
</script>

<style scoped>

.test .fa-lock{ 
    position: absolute;
    top: 200px;
}

body {
    background-color: #F5F5F5;
}

.form-horizontal{
    background: #fff;
    padding-bottom: 30px;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: 1px 1px 6px gray;
   }

.form-horizontal .heading{
    font-size: 35px;
    font-weight: 700;
    padding: 35px 0;
    border-bottom: 1px solid #f0f0f0;
    margin-bottom: 30px;
    text-align: center;
   }

.form-horizontal .form-group{
    padding: 0 40px;
    margin: 0 0 25px 0;
   }

.form-horizontal .form-control{
    background: #f0f0f0;
    border: none;
    border-radius: 20px;
    box-shadow: none;
    padding: 0 20px 0 45px;
    height: 40px;
    transition: all 0.3s ease 0s;
   }

.form-horizontal .form-control:focus{
    background: #e0e0e0;
    box-shadow: none;
    outline: 0 none;
   }

.form-horizontal .form-group i{
    font-size: 17px;
    color: #c8c8c8;
    transition : all 0.5s ease 0s;
   }

.form-horizontal .form-control:focus + i{
    color: #1088fc;
   }

.form-horizontal .btn{
    font-size: 14px;
    color: #fff;
    background: #1088fc;
    border-radius: 20px;
    border: none;
    transition: 0.3s;
    opacity: 0.8;
    outline: none;
   }

.btn:hover {opacity: 1}

.fa-user{
    position: absolute;
    top: 385px;
    left: 700px;
   }

.fa-lock{
  top: -30px;
  margin-left: 20px;
  position: relative;
  z-index: 1;
  float: left;
   }

button:focus {
    outline: none !important;
    }


@media only screen and (max-width: 1023px){
        .form-horizontal .form-group{
        padding: 0 25px;
        }
        .fa-user{
        left: 55px;
        }
        .fa-lock{
            position: relative;
            float: left;

        }
        .form-horizontal .btn{
        padding: 10px 20px;
        }
        body {
            background-color: white;
        }

        .form-horizontal {
            border-radius: 8px;
            box-shadow: none;
            border: 1px solid #d3d3d3;
        }
        .form-horizontal .form-control{
            border-radius: 8px;
           }
        .form-horizontal .btn{
            border-radius: 8px;
           }
       }

.mrt {
    margin-top: 220px;
}

.error-message {
  font-size: 11px;
  color: red;
}

</style>