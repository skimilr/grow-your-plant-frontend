<template>
    <div>
        <h1>Your Plant</h1>
        <img :src="plantImage" alt="Plant Image" />
        <p>Status: {{ plantStatus }}</p>
        <button @click="waterPlant">Water</button>
        <button @click="feedPlant">Feed</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import axios from '../axios';

export default defineComponent({
    setup() {
        const plant = ref(null);
        const userId = 1; // Replace with appropriate way to get userId, possibly from Vuex

        const plantStatus = computed(() => {
            return plant.value ? (plant.value.health_level > 0 ? 'Healthy' : 'Withering') : 'Loading...';
        });

        const plantImage = computed(() => {
            return plant.value ? require('@/assets/logo.png') : '';
        });

        const fetchPlantStatus = async () => {
            const response = await axios.get('/plant/status', {
                params: { user_id: userId } // Update to use the correct userId
            });
            plant.value = response.data;
        };

        const waterPlant = async () => {
            await axios.post('/plant/action', { user_id: this.$store.state.userId, action: 'water' });
            fetchPlantStatus();
        };

        const feedPlant = async () => {
            await axios.post('/plant/action', { user_id: this.$store.state.userId, action: 'feed' });
            fetchPlantStatus();
        };

        // Fetch plant status when the component is mounted
        fetchPlantStatus();

        return {
            plant,
            plantStatus,
            plantImage,
            waterPlant,
            feedPlant,
        };
    },
});
</script>

<style scoped>
/* Add your styles here */
</style>

