import axios from "axios";
import { Incident } from "../Types";

export const getIncidents = async (carId: number) => {
    try {
        const response = await axios.get(
            `http://34.107.35.234/cars/incidents/${carId}`
        );
        return response.data;
    } catch (error) {
        throw new Error("Unable to fetch incidents from the server.");
    }
};

export const addNewIncident = async (incidentData: Omit<Incident, "id">) => {
    try {
        const response = await axios.post(
            `http://34.107.35.234/incidents/`,
            incidentData
        );
        return response.data as Incident;
    } catch (error) {
        throw new Error("Unable to add incident to the server.");
    }
};

export const deleteIncident = async (incidentId: number) => {
    try {
        const response = await axios.delete(
            `http://34.107.35.234/incidents/${incidentId}/`
        );
        return response.data;
    } catch (error) {
        throw new Error("Unable to delete incident from the server.");
    }
};

export const updateIncident = async (incidentData: Incident) => {
    try {
        const response = await axios.put<Incident>(
            `http://34.107.35.234/incidents/${incidentData.id}/`,
            incidentData
        );
        return response.data;
    } catch (error) {
        throw new Error("Unable to update incident on the server.");
    }
};
