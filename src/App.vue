<template>
  <v-container dark>
    <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer" app
      >
        <v-list-item>
            <v-list-item-content>
              <v-list-item-title>
                Todolist-Activity
              </v-list-item-title>
              <v-list-item-subtitle>
                with vuejs
              </v-list-item-subtitle>
            </v-list-item-content>
        </v-list-item>


        <v-divider></v-divider>

        <v-list dense nav>
        <v-list-item v-for="item in items"
        :key="item.title"
        :to="item.to"
        link>
        
          <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
              <v-list-item-title>
                  {{ item.title }}
              </v-list-item-title>
          </v-list-item-content>

        </v-list-item>
      </v-list>
      </v-navigation-drawer>

   <v-app-bar
    app
    dark
    promiment
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Vuetify todo</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
          <v-icon class="mdi mdi-magnify"></v-icon>
      </v-btn>
      <v-btn icon>
          <v-icon class="mdi mdi-account-circle"></v-icon>
      </v-btn>
      <v-btn icon>
          <v-icon class="mdi mdi-reddit"></v-icon>
      </v-btn>
   </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>


  </v-app>
</v-container>
</template>

<script>
  export default {
    data: () => ({ drawer: null,
    items: [
      {title: 'Portfolio', icon: 'mdi-help-box', to: '/portfolio'},
      {title: 'Todo-List', icon: 'mdi-format-list-checks', to: '/'},
      {title: 'About', icon: 'mdi-help-box', to: '/about'}
    ]
    }),

  }
</script>