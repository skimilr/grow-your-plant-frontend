<template>
    <div class="plant-container">
        <h1>Grow Plants!</h1>
        <h3>🌱🌻 See how many you can grow... 🌺☀️</h3>
        <p><b>Hint:</b> Give them plenty of water and sunlight to keep them healthy</p>

        <div v-if="userId" class="plants-list">
            <div v-for="(plant, index) in plants" :key="plant.ID" class="plant-info">
                <img :src="getPlantImage(plant)" alt="Plant Image" class="plant-image" />
                <div class="plant-actions">
                    <div class="button-container">
                        <div v-if="plant.GrowthStage === 'Dead'">
                            <button @click="uprootPlant(plant.ID)" class="action-button">❌ Uproot</button>
                        </div>
                        <div v-else>
                            <button @click="waterPlant(plant.ID)" class="action-button">💦</button>
                            <button @click="feedPlant(plant.ID)" class="action-button">☀️</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-button">
                <button @click="addNewPlant('sunflower')" class="action-button">+ 🌻 Sunflower</button>
                <button @click="addNewPlant('redflower')" class="action-button">+ 🌺 Redflower</button>
            </div>
        </div>

        <div v-if="!userId" class="user-id-input">
            <input type="number" v-model="inputUserId" placeholder="Enter your User ID" />
            <button @click="setUserId">Set User ID</button>
        </div>

        <div v-if="userId" class="user-login">
            <p>User: {{ userId }}</p>
            <button @click="switchUser" class="switch-button">Switch User</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted, onUnmounted } from 'vue';
import axios from '../axios';

export default defineComponent({
    setup() {
        const plants = ref([]);
        const inputUserId = ref<number | null>(null);
        const userId = ref<number | null>(parseInt(localStorage.getItem('userId') || '0'));
        let intervalId: ReturnType<typeof setInterval>;

        const fetchPlants = async () => {
            if (!userId.value) return;

            try {
                const response = await axios.get('/plant/status', { params: { user_id: userId.value } });
                plants.value = response.data.length ? response.data : [];
            } catch (error) {
                console.error("Failed to fetch plants:", error);
                plants.value = [];
            }
        };

        const addNewPlant = async (plantType: string) => {
            if (!userId.value) return;

            try {
                const response = await axios.post('/plant/create', { user_id: userId.value, type: plantType });
                plants.value.push(response.data);
            } catch (error) {
                console.error("Failed to add new plant:", error);
            }
        };

        const waterPlant = async (plantId) => {
            if (!userId.value) return;

            try {
                await axios.post('/plant/action', { user_id: userId.value, action: 'water', plant_id: plantId });
                fetchPlants();
            } catch (error) {
                console.error("Failed to water the plant:", error);
            }
        };

        const feedPlant = async (plantId) => {
            if (!userId.value) return;

            try {
                await axios.post('/plant/action', { user_id: userId.value, action: 'feed', plant_id: plantId });
                fetchPlants();
            } catch (error) {
                console.error("Failed to feed the plant:", error);
            }
        };

        const uprootPlant = async (plantId) => {
            if (!userId.value) return;

            try {
                await axios.delete(`/plant/delete`, { data: { user_id: userId.value, plant_id: plantId } });
                fetchPlants();
            } catch (error) {
                console.error("Failed to uproot the plant:", error);
            }
        };

        const getPlantImage = (plant) => {
            var plantStage = plant.GrowthStage.toLowerCase();
            return `/assets/stage_${plantStage}.png`;
        };

        const setUserId = async () => {
            if (!inputUserId.value) return;

            userId.value = inputUserId.value;
            localStorage.setItem('userId', userId.value.toString());
        };

        const switchUser = () => {
            userId.value = null;
            localStorage.removeItem('userId');
            inputUserId.value = null;
            clearInterval(intervalId);
        };

        onMounted(() => {
            fetchPlants();
            intervalId = setInterval(fetchPlants, 5000);
        });

        onUnmounted(() => {
            clearInterval(intervalId);
        });

        return { 
            plants, 
            getPlantImage, 
            waterPlant, 
            feedPlant, 
            uprootPlant,
            addNewPlant,
            setUserId,
            inputUserId,
            userId,
            switchUser 
        };
    },
});
</script>

<style scoped>
.plant-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    font-size: 18px;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.plants-list {
    display: flex;
    flex-wrap: wrap;
    max-width: 100%;
    margin: 0 auto;
    padding: 10px 0;
    gap: 20px;
    justify-content: center;
}

.plant-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    min-width: 100px; 
}

.plant-image {
    width: auto;
    height: 100px;
    object-fit: contain;
    border: 5px solid #ffcccb;
    border-radius: 15px;
    padding: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
}

.plant-image:hover {
    transform: scale(1.05);
}

.plant-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
}

.button-container {
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}

.user-id-input {
    margin-bottom: 20px;
}

.user-login {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px;
    border: 5px solid #ffcccb;
    border-radius: 15px;
    padding: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s;
}

.user-login p {
    margin-right: 15px;
}

input[type="number"] {
    padding: 10px;
    font-size: 16px;
    width: 80%;
    margin-right: 10px;
}

button {
    padding: 10px 15px;
    font-size: 16px;
    cursor: pointer;
    border: none;
    border-radius: 5px;
    transition: background-color 0.3s, transform 0.2s;
    font-family: 'Pacifico';
}

button:hover {
    background-color: #d0f0c0;
    transform: translateY(-2px);
}

.switch-button {
    background-color: #ffcccb;
    margin-left: 10px;
}

.action-button {
    background-color: #add8e6;
    margin: 10px;
}

.add-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px;
    min-width: 100px; 
}
</style>

