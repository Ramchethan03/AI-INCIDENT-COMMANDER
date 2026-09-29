from fastapi import FastAPI
from datetime import datetime

app = FastAPI(
    title="AI Incident Commander",
    description="AI-powered DevOps Incident Management Platform",
    version="1.0.0"
)


@app.get("/")
def root():
    return {
        "status": "healthy",
        "service": "AI Incident Commander"
    }


@app.get("/api/health")
def health_check():
    return {
        "status": "healthy",
        "service": "AI Incident Commander"
    }


@app.post("/api/incidents/simulate")
def simulate_incident():
    return {
        "incident_id": "INC-001",
        "service": "payment-api",
        "severity": "SEV-1",
        "status": "INVESTIGATING",
        "message": "Database connection pool exhaustion detected",
        "created_at": datetime.now().isoformat()
    }