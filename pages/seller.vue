<template>
  <div>
    <div>
      <v-card class="d-flex justify-sm-space-between flex-sm-row flex-column">

        <v-breadcrumbs v-if="items.length"
                       :items="items"
                       divider=">"
        >
          <template v-slot:item="{ item }">

              <nuxt-link
                :to="item.href"
                class="text-decoration-none"
                no-prefetch
              >
                <v-breadcrumbs-item :disabled="item.disabled">
                  {{ item.text.toUpperCase() }}
                </v-breadcrumbs-item>

              </nuxt-link>
          </template>
        </v-breadcrumbs>

        <div v-if="item_name" class="align-self-sm-center align-self-end mx-4 mb-sm-0 mb-3">
          <v-btn :nuxt="true" :to="item_name.url" depressed color="primary">{{ item_name.name }}</v-btn>
        </div>

      </v-card>
    </div>

    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {

  middleware: 'is_seller',
  layout: 'seller',
  computed: {
    ...mapGetters({
      items: 'get_breadcrumbs',
      item_name: 'get_breadcrumbs_name'
    })
  }
}
</script>

<style scoped>

</style>
