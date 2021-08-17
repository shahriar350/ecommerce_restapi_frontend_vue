<template>
  <div class="mt-4">
    <v-row>
      <v-col md="2" sm="3">
        <v-card>
          <v-card-subtitle>Total active products</v-card-subtitle>
          <v-card-text>{{ total_product }}</v-card-text>
        </v-card>
      </v-col>
      <v-col md="2" sm="3">
        <v-card>
          <v-card-subtitle>Total active shops</v-card-subtitle>
          <v-card-text>{{ total_shops }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
  export default {
    async asyncData({ $axios}) {
      let data = await $axios.get('/api/seller/dashboard/basicinfo/')
      return {
        total_product: data.data.products,
        total_shops: data.data.shops,
      }
    },
    created() {
      this.set_breadcrumbs()
    },

    methods: {
      set_breadcrumbs() {
        const data = [
          {
            text: 'Dashboard',
            disabled: true,
            href: '/seller'
          },
        ]
        this.$store.commit('set_breadcrumbs', data)
        this.$store.commit('set_breadcrumbs_name', null)
      }
    }
  }
</script>

<style scoped>

</style>
