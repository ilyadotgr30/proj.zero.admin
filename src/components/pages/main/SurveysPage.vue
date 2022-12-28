<template>
<div class="container-fluid">
		<div class="row">
            <ui-left-bar></ui-left-bar>
	    <div class="col-md-10 col-lg-10 content-container">
			<div class="container-fluid">
				<div class="row wa">
                    <div class="col-xs-12 col-sm-12 col-md-9 col-lg-9 col-xl-10 ml-auto mr-auto con">
                        <table class="table table-borderless table-hover table-striped">
							<thead class="thead-info">
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Дата начала</th>
							<th scope="col">Дата окончания</th>
							<th scope="col">Заголовок</th>
							<th scope="col">Описание</th>
              <th colspan="2" scope="col" class="temp">Редактирование</th>
                            
						</tr>
						</thead>
						<caption>Опросы</caption>
						<tbody>
						<tr v-for="item in items" >
							<td data-label="ID" @click="goToSurvey(item.id)" >{{ item.id }}</td>
							<td data-label="Дата начала" @click="goToSurvey(item.id)" >{{ dateTime(item.beginDate) }}</td>
							<td data-label="Дата окончания" @click="goToSurvey(item.id)" >{{ dateTime(item.endDate) }}</td>
							<td data-label="Заголовок" @click="goToSurvey(item.id)" >{{ item.title }}</td>
              <td data-label="Описание" @click="goToSurvey(item.id)" >{{ item.description }}</td>
              <td data-label="" class="col_s"><a href="#"><button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#delete_button" type="button" @click="deleteSurveyButtonClicked(item.id)">Удалить</button></a></td>
							<td data-label="" class="col_s"><a href="#"><button class="btn btn-primary btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#update_button" type="button" @click="updateSurveyButtonClicked(item.id)">Изменить</button></a></td>
						</tr>
						</tbody>
					</table>
                    <ui-del-modal @onYesButton="delSurvey" @onNoButton="cancelDelSurvey"></ui-del-modal>
                    <ui-update-survey-modal @onSurveyUpdated="updateSurvey"></ui-update-survey-modal>
                    <ui-add-survey-modal @onSurveyCreated="createSurvey"></ui-add-survey-modal>
          <div class="but">
						<button class="btn btn-primary btn-lg" type="button" @click="getSurvey()">Получить актуальный список</button>
						<button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#add_button">Добавить</button>	
					</div>
               
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import HttpBuilder from '@/api/http.js'
import UILeftBar from "@/components/ui/UILeftBar.vue";
import UIDelModal from '@/components/ui/UIDelModal.vue';
import UIUpdateModal from '@/components/ui/UIUpdateUserModal.vue';
import moment from 'moment';

export default {
	components: { UILeftBar, UIDelModal, UIUpdateModal },
    name: "UsersList",
    data() {
		return {
      total: null,
			items: null,
      survey_to_delete: null,
      surveyToUpdate: null
			
		}

	},
    methods: {
        async getSurvey() {
          const http = new HttpBuilder().useAuthorization().build();
          const surveyslist = await http.get('https://projectzero-api-0.herokuapp.com/api/v1.0/surveys');
          this.total = surveyslist.data.total;
          this.items = surveyslist.data.items;
          return this
        },

        async delSurvey() {
          const http = new HttpBuilder().useAuthorization().build();
          await http.delete('https://projectzero-api-0.herokuapp.com/api/v1.0/surveys/'+this.survey_to_delete); 
				  this.items = this.items?.filter(item => item.id !== this.survey_to_delete);
				  this.survey_to_delete = null;
        },
        deleteSurveyButtonClicked(id) {
			    this.survey_to_delete = id;
		},
        cancelDelSurvey() {
			    this.survey_to_delete = null;
		},	
        updateSurveyButtonClicked(id) {
          this.surveyToUpdate = id;
		},
    async updateSurvey(surveyu) {
			const http = new HttpBuilder().useAuthorization().build();
			await http.put('https://projectzero-api-0.herokuapp.com/api/v1.0/surveys/'+this.surveyToUpdate, surveyu);
      this.surveyToUpdate = null;
      this.items = [...this.items, surveyu];
    },
    cancelUpdateSurvey() {
			this.surveyToUpdate = null;
		},	
    async createSurvey(survey) {
			const http = new HttpBuilder().useAuthorization().build();
			await http.post('https://projectzero-api-0.herokuapp.com/api/v1.0/accounts/', survey);
			this.items = [...this.items, survey];
		},
    goToSurvey(id) {
      this.$router.push({ name: "survey", params: {id: id } })
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
.but {
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: flex-end;
    flex-wrap: wrap;
}

.but .btn{
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

.wa {
  margin-top: 300px;
}

.con {
    margin-left: 150px;
}


@media (max-width: 1023px) {
  .wa {
    margin-top: 40px;
  }
.but {
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: center;
  align-items: center;
    flex-wrap: wrap;
}
.btn {
    margin-top: 10px;
}

.con {
    margin-left: 0px;
}

  }
.thead-info {
  background-color: #1088fc;
  color: #fff;
}

.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color: #b6e3ff;
}
.btn-sm {
  font-size: 15px;
    color: #fff;
    background: #1088fc;
    border-radius: 20px;
    border: none;
    transition: 0.3s;
    opacity: 0.8;
    outline: none;
  	margin-right: 30px;
	width: 100px;
}

.col_s {
  width: 100px;
}

.temp {
	padding-left: 70px;
}

@media (max-width: 1023px) {
  .wa {
    margin-top: 40px;
  }
   .thead-info {
    display: none;
  }
   tr {
    display: block;
  }
  td {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
  }
 td::before {
    content: attr(data-label);
    font-weight: bold;
    margin-right: 20px;
   }
  #navbar {
    text-align: center;
    margin-top: 0px;
  }
  #exit {
    margin-top:0px;
  }
  .navbar-container {
    overflow-x: hidden;
    }
  .but {
    margin-top: 70px;
    height: 0%;
  }
  }
</style>