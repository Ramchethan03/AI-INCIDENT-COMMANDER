import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000"
});

export const simulateIncident = () =>
    API.post("/api/incidents/simulate");

export const getHealth = () =>
    API.get("/api/health");