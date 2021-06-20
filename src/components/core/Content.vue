<template>
    <div id="Content">
        <v-main class="content">
            <router-view></router-view>
        </v-main>
    </div>
</template>

<script>
export default {
    name: 'Content',
    components:{
    },
    data() {
        return {
            
        };
    },
    mounted() {
        
    },
    methods: {
        
    },
};
</script>

<style lang="scss" scoped>

.content {
  font-family: "Defago Noto Sans Lao";
  font-size: 24px;
}
</style>