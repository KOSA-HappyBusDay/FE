<template>
    <div>
    </div>
</template>
<script>
    export default {
        name: "Logout",
        async created() {
            const result = confirm("로그아웃 하시겠습니까?");
            console.log(result)
            if(result) {
               this.$store.commit("setToken", "");
                this.$router.push({name:'Home'}); //성공 시 home으로 이동
            }else{
                
            }
        
        },
    }
</script>
<style scoped>
</style>