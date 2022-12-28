<template>
    <div class="container-fluid">
            <div class="row">
                <ui-left-bar></ui-left-bar>
            <div class="col-md-10 col-lg-10 content-container">
                <div class="container-fluid">
                  <div class="py-4 text-center"><h1>Опрос</h1></div>
                    <div class="d-flex justify-content-center">
                    <ul class="nav">
                      <li class="nav-item">ID: {{ this.id }}</li>
                      <li class="nav-item">Дата начала: {{ dateTime(this.beginDate) }}</li>
                      <li class="nav-item">Дата окончания: {{ dateTime(this.endDate) }}</li>
                      <li class="nav-item">Заголовок: {{ this.title }}</li>
                      <li class="nav-item">Описание: {{ this.description }}</li>
                    </ul>
                    </div>
                </div>
                <div class="container">
                    <div class="bg-light p-5 rounded mt-4">
                      <div class="form-check form-check-inline w-100 me-3' " v-for=" (question, index) in questions">
                        <h3 class="pt-3" > {{ index+1 + '.' }} {{ question.title }}</h3>
                        <div v-for="answer in question.answers">
                          <label class="form-check-label" for="inlineRadio1" >{{ answer.text }}</label>
                          <input  :class=" answer.type === 'single' ? 'form-check-input' : answer.type === 'multiple' ? 'form-check-input' : 'form-control' " 
                                  :type=" answer.type === 'single' ? 'radio' : answer.type === 'multiple' ? 'checkbox' : 'text' " 
                                  :name=" answer.type === 'single' ? 'inlineRadioOptions' : answer.type === 'multiple' ? 'inlineCheckbox1' : '' " 
                                  :placeholder=" answer.type === 'single' ? '' : answer.type === 'multiple' ? '' : 'Введите Ваш ответ' ">
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--кнопка добавления вопроса-->
                <div class="but">
                  <button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#add_button">Добавить вопрос к опросу</button>
                </div>
              </div>
          </div>
    </div>
    </template>
    
    <script>
    import HttpBuilder from '@/api/http.js'
    import UILeftBar from "@/components/ui/UILeftBar.vue";
    import moment from 'moment';
    
    export default {
        components: { UILeftBar },
        name: "SurveyPage",
        data() {
            return {
                id: null,
                beginDate: null,
                endDate: null,
                title: null,
                description: null,
                questions: null
                

            }
    
        },
        methods: {
            async getSurvey() {
              const http = new HttpBuilder().useAuthorization().build();
              const thisSurvey = await http.get('https://projectzero-api-0.herokuapp.com/api/v1.0/surveys/' + this.$route.params.id);
              this.id = thisSurvey.data.id;
              this.beginDate = thisSurvey.data.beginDate;
              this.endDate = thisSurvey.data.endDate;
              this.title = thisSurvey.data.title;
              this.description = thisSurvey.data.description;
              this.questions = thisSurvey.data.questions;
              
              return this
            },
            dateTime(value) {
                moment.lang('ru');
                return moment(value).format('lll');
    }
        },
        mounted() {
            this.getSurvey();
        },
    
        computed: {
           
        }
    }
    </script>
    
    
    <style scoped lang="scss">
    @import "src/styles/colors";

   
    .nav-item {
      padding-left: 60px;
    }

    .but .btn {
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
  .but {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-end;
  flex-wrap: wrap;
  padding: 25px;
  }

    </style>