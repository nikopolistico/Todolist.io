<template>
    <v-app id="inspire">
    <v-navagition-drawer  v-model="drawer" app>
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
    </v-navagition-drawer>
</v-app>
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