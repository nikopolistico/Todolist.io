<template>
  <v-container class="about pa-5">
    <h1 class="text-center mb-5">About Us</h1>
    
    <!-- Grid layout for images and descriptions -->
    <v-row>
      <v-col
        v-for="(item, index) in items"
        :key="index"
        cols="12"
        md="4"
        class="text-center"
      >
        <!-- Image Box -->
        <v-card>
          <v-img :src="item.image" alt="About image" height="200px"></v-img>

          <!-- Description Box -->
          <v-card-text>
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const items = [
  {
    image: "https://via.placeholder.com/200",
    title: "Our Mission",
    description: "We strive to deliver the best solutions to our clients."
  },
  {
    image: "https://via.placeholder.com/200",
    title: "Our Vision",
    description: "To become a global leader in providing innovative services."
  },
  {
    image: "https://via.placeholder.com/200",
    title: "Our Values",
    description: "Integrity, commitment, and excellence guide us."
  }
];
</script>

<style scoped>
.about {
  background-color: #f8efef;
}
.v-img {
  object-fit: cover;
}
</style>

