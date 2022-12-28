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
							<th scope="col">Имя пользователя</th>
							<th scope="col">Фамилия И.О.</th>
							<th scope="col">Роль</th>
							<th colspan="2" scope="col" class="temp">Редактирование</th>
							
						</tr>
						</thead>
						<caption>Список пользователей</caption>
						<tbody>
						<tr v-for="item in items">
							<td data-label="ID">{{ item.id }}</td>
							<td data-label="Имя пользователя">{{ item.userName }}</td>
							<td data-label="Фамилия И.О.">{{ item.lastName + " " + item.firstName + " " + item.middleName}}</td>
							<td data-label="Роль">{{ item.role }}</td>
                <td data-label="" class="col_s"><a href="#"><button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#delete_button" type="button" @click="deleteUserButtonClicked(item.id)">Удалить</button></a></td>
                <td data-label="" class="col_s"><a href="#"><button class="btn btn-primary btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#update_button" type="button" @click="updateUserButtonClicked(item.id)">Изменить</button></a></td>
						</tr>
						</tbody>
					</table>
                    
                    <ui-del-modal @onYesButton="delUser" @onNoButton="cancelDelUser"></ui-del-modal>
                    <ui-add-user-modal @onUserCreated="createUser"></ui-add-user-modal>
                    <ui-update-user-modal @onUserUpdated="updateUser"></ui-update-user-modal>

					<div class="but">
							<button class="btn btn-primary btn-lg" type="button" @click="getUsers()">Получить актуальный список пользователей</button>
							<button type="button" class="btn btn-primary btn-lg" data-bs-toggle="modal" data-bs-target="#add_button">Добавить пользователя</button>
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

export default {
	components: { UILeftBar, UIDelModal, UIUpdateModal },
    name: "UsersList",
    data() {
		return {
			total: null,
			items: null,
			update_items: null,
			user_to_delete: null,
      userToUpdate: null,
		}

	},
    methods: {
        async getUsers() {
          const http = new HttpBuilder().useAuthorization().build();
          const userslist = await http.get('https://projectzero-api-0.herokuapp.com/api/v1.0/accounts');
          this.total = userslist.data.total;
          this.items = userslist.data.items;
          return this
		},
		deleteUserButtonClicked(id) {
			this.user_to_delete = id;
		},
    updateUserButtonClicked(id) {
			this.userToUpdate = id;
		},
		async delUser() {
			const http = new HttpBuilder().useAuthorization().build();
				await http.delete('https://projectzero-api-0.herokuapp.com/api/v1.0/accounts/'+this.user_to_delete); 
				this.items = this.items?.filter(item => item.id !== this.user_to_delete);
				this.user_to_delete = null;
			
		},
		cancelDelUser() {
			this.user_to_delete = null;
		},	
    cancelUpdateUser() {
			this.userToUpdate = null;
		},	
		async updateUser(useru) {
			const http = new HttpBuilder().useAuthorization().build();
			await http.put('https://projectzero-api-0.herokuapp.com/api/v1.0/accounts/'+this.userToUpdate, useru);
      this.userToUpdate = null;
      this.items = [...this.items, useru];
		},
		async createUser(user) {
			const http = new HttpBuilder().useAuthorization().build();
			await http.post('https://projectzero-api-0.herokuapp.com/api/v1.0/accounts/', user);
			this.items = [...this.items, user];
		}
    },
    mounted() {
        this.getUsers();
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