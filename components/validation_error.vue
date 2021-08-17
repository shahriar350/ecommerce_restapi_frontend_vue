<template>
  <div class="red lighten-5 px-2 py-2 rounded" v-if="server_err !== null">
    <div v-for="(errors,index) in server_err" :key="index">
      <div class="d-flex mb-2">
        <p class="pr-5 title">{{ index }}</p>
        <ul v-for="(error,errorIndex) in errors" :key="errorIndex">
          <li class="subtitle-1"> {{error}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {

    created() {
      this.$store.commit('set_validation_error', '')
    },
    computed: {
      server_err(){
        return this.$store.getters.get_validation_error
      }
    }
  }
</script>
