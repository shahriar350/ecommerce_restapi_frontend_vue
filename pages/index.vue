<template>
  <v-main>
    <loading_page v-if="$fetchState.pending"></loading_page>
    <div v-else>
      <v-row>
        <client-only>
          <v-col lg="2" md="3" sm="4" cols="6" v-for="(product,index) in products" :key="index">
            <v-card max-width="344" :to="{path: `/product/${product.slug}/${product.id}`}" :nuxt="true">
              <img-mine :thumbnail="product.get_product_image[0].image"/>
              <v-card-title>{{ product.name | capfirst }}</v-card-title>
              <v-card-subtitle>
                <div>
                  <p v-if="product.multi_price">{{ product.multi_price }}</p>
                  <div v-else>
                    <div class="d-inline-block">&#2547{{
                        product.selling_price | offer(product.offer_price,product.offer_price_start,product.offer_price_end)
                      }}
                    </div>
                    <div class="d-inline-block px-2" v-if="parseFloat(product.product_price) > parseFloat(product.selling_price)">
                      <del>&#2547{{
                          product.product_price | offer(product.offer_price,product.offer_price_start,product.offer_price_end)
                        }}
                      </del>
                    </div>
                  </div>
                </div>
              </v-card-subtitle>
            </v-card>
          </v-col>
        </client-only>

      </v-row>
      <v-row>
        <client-only placeholder="Loading...">
          <v-row dense class="grey lighten-5 px-2">
            <v-col cols="12" class="py-2 border md:text-xl text-lg gray--text text--lighten-1">Top Shops Categories:
            </v-col>
            <v-col lg="2" sm="3" cols="4" v-for="(category,index) in categories" :key="index">
              <v-card max-width="240" :nuxt="true" :to="`/frontend/shop/${category.slug}?cat=`">
                <img-mine :thumbnail="category.image">
                  <template slot="text">
                    <v-card-title>
                      <p class="white rounded px-2 py-1 d-inline">{{ category.name }}</p>
                    </v-card-title>
                  </template>
                </img-mine>
              </v-card>
            </v-col>
          </v-row>

        </client-only>
      </v-row>
    </div>

  </v-main>
</template>

<script>

import Loading_page from "../components/loading_page";
import ImgMine from "../components/my_image";

export default {
  components: {ImgMine, Loading_page},
  data() {
    return {
      type_variance: [],
      products: [],
      categories: []
    }
  },

  async fetch() {
    const data = await this.$axios.get('/api/user/frontend/main/product/')
    const category = await this.$axios.get('/api/nonuser/shop/categories/all/')
    this.categories = category.data
    this.products = data.data.products
  },
  fetchOnServer: true,

  // async asyncData({ $axios }) {
  //   const data = await $axios.$get('/api/user/frontend/main/product/')
  //   // const related = await $axios.$get('/api/user/frontend/category/related/')
  //   return {
  //     // category: related,
  //     products: data.products
  //   }
  // },
  mounted() {
    const chatSocket = new WebSocket(
      'ws://127.0.0.1:8000/ws/');
    chatSocket.onclose = function (e) {
      console.error('Chat socket closed unexpectedly');
    };
    this.$axios.get('/api/user/frontend/category/related/')
      .then(res => {
        this.type_variance = res.data
      })
  },
  methods: {
    hello() {
      console.log('hello world')
    }
  },
  filters: {
    offer: function (value, offer_percent, start, end) {
      const todaydate = new Date()
      const today = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) //new Date(2011,8,20)

      if (start !== undefined && end !== undefined) {
        if (start === null && end === null) {
          return value
        } else {
          const date_start = new Date(start)
          const date_end = new Date(end)
          if (today >= new Date(date_start.getFullYear(), date_start.getMonth(), date_start.getDate())
            && today <= new Date(date_end.getFullYear(), date_end.getMonth(), date_end.getDate())) {
            return value - (value * (offer_percent / 100))
          } else {
            return value
          }
        }
      }
    }
  }
}
</script>
