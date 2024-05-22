import axios from 'axios';
import {Car} from "../Types";


const CarService = {
    getAllCars: async () => {
        try {
            const response = await axios.get("http://34.107.35.234/cars/");
            return response.data;
        } catch (error) {
            throw new Error('Unable to fetch cars from the server.');
        }
    },

    getCars: async (page: number = 1, pageSize: number = 10) => {
        try {
            const response = await axios.get("http://34.107.35.234/cars/", {
                params: {
                    page: page,
                    page_size: pageSize,
                },
            });
            return response.data;
        } catch (error) {
            throw new Error('Unable to fetch cars from the server.');
        }
    },

    getCarById: async (id: number) => {
        try {
            const response = await axios.get(`http://34.107.35.234/cars/${id}/`);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching car data');
        }
    },

    addCar: async (carData: Omit<Car, 'id'>) => {
        try {
            const response = await axios.post(`http://34.107.35.234/cars/`, carData);
            return response.data as Car;
        } catch (error) {
            throw new Error('Unable to add car to the server.');
        }
    },

    deleteCar: async (carId: number) => {
        try {
            const response = await axios.delete(`http://34.107.35.234/cars/${carId}/`);
            return response.data;
        } catch (error) {
            throw new Error('Unable to delete car from the server.');
        }
    },

    updateCar: async (carData: Car) => {
        try {
            const response = await axios.put<Car>(`http://34.107.35.234/cars/${carData.id}/`, carData);
            return response.data;
        } catch (error) {
            throw new Error('Unable to update car on the server.');
        }
    },

    getHorsepowers: async () => {
        try {
            const response = await axios.get<number[]>(`http://34.107.35.234/horsepowers/`);
            return response.data;
        } catch (error) {
            throw new Error('Unable to fetch horsepower values from the server.');
        }
    },

    async getCarsByHorsepower(horsepower: number) {
        try {
            const response = await axios.get(`http://34.107.35.234/cars/horsepower/${horsepower}/`);
            return response.data;
        } catch (error) {
            throw new Error('Unable to fetch cars by horsepower from the server.');
        }
    },
};

export default CarService;
