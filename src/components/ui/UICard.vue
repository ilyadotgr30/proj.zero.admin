<template>
<div class="container">
    <div class="row">
        <div class="col-md-6 offset-md-3 mrt">
            <form class="form-horizontal">
                <span class="heading">АВТОРИЗАЦИЯ</span>
                <ui-text-input></ui-text-input>
                <btn></btn>
            </form>
        </div>
    </div>
 </div>
</template>

<script>
import UIButton from './UIButton.vue'
export default {
  components: { UIButton },
    name : "ui-card"
}
</script>

<style scoped lang="scss">
@import "src/styles/colors";

body {
    background-color: #F5F5F5;
}

.form-horizontal{
    background: $white;
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
    border-bottom: 1px solid $gray-100;
    margin-bottom: 30px;
    text-align: center;
   }
.mrt {
    margin-top: 200px;
}

@media only screen and (max-width: 1023px){
.form-horizontal {
            border-radius: 8px;
            box-shadow: none;
            border: 1px solid $gray-200;
}

}
</style>