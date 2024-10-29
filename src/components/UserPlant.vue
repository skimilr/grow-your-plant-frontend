<template>
    <div class="plant-container">
        <h1>Grow A Plant!</h1>
        
        <div v-if="userId" class="plant-info">
            <img :src="plantImage" alt="Plant Image" class="plant-image" />
            <div class="plant-actions">
                <div class="button-container">
                    <button @click="waterPlant" class="action-button">Water</button>
                    <button @click="feedPlant" class="action-button">Feed</button>
                </div>
                <p>Status: {{ plantStatus }}</p>
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

        <div v-if="userId && !plant" class="plant-actions">
            <button @click="plantSunflower" class="action-button">Plant Your Sunflower</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue';
import axios from '../axios';

export default defineComponent({
    setup() {
        const plant = ref(null);
        const inputUserId = ref<number | null>(null);
        const userId = ref<number | null>(parseInt(localStorage.getItem('userId') || '0'));

        const plantStatus = computed(() => {
            return plant.value ? (plant.value.health_level > 0 ? 'Healthy' : 'Withering') : 'Loading...';
        });

        const plantImage = computed(() => {
            if (!plant.value) return '';
            return `assets/stage_${plant.value.growth_stage}.png`;
        });

        const fetchPlantStatus = async () => {
            if (!userId.value) return;

            try {
                const response = await axios.get('/plant/status', { params: { user_id: userId.value } });
                plant.value = response.data;
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    // No plant found, plant remains null
                } else {
                    console.error("Failed to fetch plant status:", error);
                }
            }
        };

        const plantSunflower = async () => {
            if (!userId.value) return;

            try {
                const response = await axios.post('/plant/create', { user_id: userId.value });
                plant.value = response.data; // Set the new plant data
            } catch (error) {
                console.error("Failed to plant sunflower:", error);
            }
        };

        const waterPlant = async () => {
            if (!userId.value) return;

            await axios.post('/plant/action', { user_id: userId.value, action: 'water' });
            fetchPlantStatus();
        };

        const feedPlant = async () => {
            if (!userId.value) return;

            await axios.post('/plant/action', { user_id: userId.value, action: 'feed' });
            fetchPlantStatus();
        };

        const setUserId = async () => {
            if (!inputUserId.value) return;

            userId.value = inputUserId.value;
            localStorage.setItem('userId', userId.value.toString());

            // Check if user already exists in DB, create if not
            try {
                await axios.post('/plant/create', { user_id: userId.value });
                fetchPlantStatus(); // Fetch plant status for the new user
            } catch (error) {
                console.error("Error creating user or fetching plant:", error);
            }
        };

        const switchUser = () => {
            userId.value = null; // Clear the current user ID
            localStorage.removeItem('userId'); // Remove from local storage
            inputUserId.value = null; // Reset the input field
        };

        onMounted(fetchPlantStatus);

        return { 
            plant, 
            plantStatus, 
            plantImage, 
            waterPlant, 
            feedPlant, 
            plantSunflower,
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
    max-width: 800px; /* Increased width for better layout */
    margin: 0 auto;
    padding: 20px;
    text-align: center;
    font-size: 18px;
    line-height: 1.6;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.plant-info {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
}

.plant-image {
    width: 150px; /* Set width */
    height: auto; /* Keep aspect ratio */
    margin-right: 20px; /* Space between the plant image and actions */
    border: 5px solid #ffcccb; /* Light red border */
    border-radius: 15px; /* Rounded corners */
    padding: 10px; /* Space between the image and border */
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Soft shadow for depth */
    transition: transform 0.3s; /* Smooth scaling on hover */
}

.plant-image:hover {
    transform: scale(1.05); /* Slightly enlarge on hover */
}

.plant-actions {
    display: flex;
    flex-direction: column;
    align-items: center; /* Center align actions vertically */
    margin-left: 20px; /* Space to the left of the buttons */
}

.button-container {
    display: flex; /* Display buttons in a row */
    margin-bottom: 10px; /* Space between buttons and status text */
}

.user-id-input {
    margin-bottom: 20px;
}

.user-login {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
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
    font-family: 'Pacifico', cursive; /* Ensure buttons use the fun font */
}

button:hover {
    background-color: #d0f0c0; /* Light green background on hover */
    transform: translateY(-2px); /* Lift effect */
}

.switch-button {
    background-color: #ffcccb; /* Light red background */
    margin-left: 10px;
}

.action-button {
    background-color: #add8e6; /* Light blue background */
    margin-right: 10px;
}
</style>

