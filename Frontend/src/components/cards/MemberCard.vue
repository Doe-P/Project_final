<template>
  <div>
    <v-hover v-slot="{ hover }" open-delay="200">
      <v-card
        transition="scale-transition"
        :elevation="hover ? 16 : 2"
        :class="{ 'on-hover': hover }"
      >
        <v-list>
          <v-list-item>
            <v-list-item-avatar tile size="50" v-bind:color="bg_color">
              <v-icon color="white">{{ avatar_ic }}</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>
                <span>{{ title }}</span>
              </v-list-item-title>
              <v-list-item-subtitle>
                <span>{{ subtitle }} <small>ສະຫາຍ</small></span>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </v-hover>
  </div>
</template>

<script>
export default {
  name: "MenberCard",
  props: ["bg_color", "avatar_ic", "title", "subtitle"],
  data() {
    return {};
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="scss" scoped></style>
