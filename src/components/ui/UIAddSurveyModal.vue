<template>
    <div class="modal fade" id="add_button" tabindex="-1" aria-labelledby="add_button" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="update_button">Добавление опроса</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

          <Form @submit="getNewSurveyData()">
      <div class="modal-body butt">
          <div class="form-group">
        <p class="p-text">Дата начала опроса</p>
        <Field name ="begindate" type="text" class="form-control"  placeholder="8 нояб. 2022 г., 16:22" v-model="beginDate" :rules="validateBeginDate"/>
        <ErrorMessage name="begindate" class="error-message" />
          </div>
          <div class="form-group">
        <p class="p-text">Дата окончания опроса</p>
        <Field name="enddate" type="text" class="form-control"  placeholder="10 нояб. 2022 г., 12:37" v-model="endDate" :rules="validateEndDate"/>
        <ErrorMessage name="enddate" class="error-message" />
          </div>
          <div class="form-group">
        <p class="p-text">Название опроса</p>
        <Field name="title" type="text" class="form-control"  placeholder="Введите название опроса" v-model="title" :rules="validateTitle" />
        <ErrorMessage name="title" class="error-message" />
          </div>
          <div class="form-group">
        <p class="p-text">Описание опроса</p>
        <Field name="description" type="text" class="form-control"  placeholder="Введите описание опроса" v-model="description" :rules="validateDescription" />
        <ErrorMessage name="description" class="error-message"/>
          </div>
          <div class="form-group">
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
    import UIAddSurveyModal from './UIAddSurveyModal.vue'
    import { Field, Form, ErrorMessage } from 'vee-validate';
export default {
  components: { UIAddSurveyModal, Field, Form, ErrorMessage },
        name : "ui-add-survey-modal",
        data() {
          return {
            beginDate: null,
            endDate: null,
            title: null,
            description: null,
          }
        },
        methods: {
          validateBeginDate(value) {
        //if field is empty
        if (!value) {
          return 'Введите дату начала'; }

        const regex = /[]/;
        if (!regex.test(value)) {
          return 'Дата должна быть следующего вида: 11 нояб. 2022г., 15:43';
        }
        // All is good
        return true;
      },

      validateEndDate(value) {
        //if field is empty
        if (!value) {
          return 'Введите дату начала'; }

        const regex = /[]/;
        if (!regex.test(value)) {
          return 'Дата должна быть следующего вида: 11 нояб. 2022г., 15:43';
        }
        // All is good
        return true;
      },
      validateTitle(value) {
        //if field is empty
        if (!value) {
          return 'Необходимо ввести название опроса'; }

        const regex = /[A-Za-zА-Яа-я1-9]/;
        if (!regex.test(value)) {
          return 'Название опроса должно состоять только цифр, а также русских или латинских символов';
        }
        // All is good
        return true;
      },
      validateDescription(value) {
        //if field is empty
        if (!value) {
          return 'Необходимо ввести название опроса'; }

        const regex = /[A-Za-zА-Яа-я1-9]/;
        if (!regex.test(value)) {
          return 'Описание опроса должно состоять только цифр, а также русских или латинских символов';
        }
        // All is good
        return true;
      },

        

          getNewSurveyData() {
            const survey = {beginDate: this.beginDate,
                            endDate: this.endDate,
                            title: this.title,
                            description: this.description}
    
            this.$emit("onSurveyCreated", survey)
          }, 
    
        },
    
        emmits: ["onSurveyCreated"]
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
    .p-text {
      margin:0 0 0 5px;
      padding:0 0 5px 0;
    }
    
    </style>