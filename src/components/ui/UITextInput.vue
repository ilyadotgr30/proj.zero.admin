 <template>
 	<div class="form-group">
      <input type="text" class="form-control" id="inputEmail" placeholder="Логин"/>
      <font-awesome-icon :icon="['fas', 'user']" id="d"/>
	</div>
   <div class="form-group">
      <input type="password" class="form-control" id="inputPassword" placeholder="Пароль">
       <font-awesome-icon :icon="['fas', 'lock']" id="s"/>
   </div>
</template>



<script>
export default {
      name: "ui-text-input"
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
    padding: 0 20px 0 45px;
    height: 40px;
    transition: all 0.3s ease 0s;
   }

.form-control:focus{
    background: $gray-300;
    box-shadow: none;
    outline: 0 none;
   }

#d {
    font-size: 16px;
    color: #c8c8c8;
    transition : all 0.5s ease 0s;
   }

#s {
    font-size: 16px;
    color: #c8c8c8;
    transition : all 0.5s ease 0s;
   }

.form-control:focus + #d{
    color: $blue-600;
   }

.form-control:focus + #s{
    color: $blue-600;
   }	

.fa-user{	
	position:absolute;
	top: 366px;
	left: 700px;
   }

.fa-lock{
    position: absolute;
   top: 430px;
	left: 700px;
   }

	@media only screen and (max-width: 1023px){
        .form-group{
        padding: 0 25px;
        }
        .fa-user{
        left: 290px;
        }
        .fa-lock{
      	left: 290px;
        }

			.form-control{
            border-radius: 8px;
           }

	}
</style>