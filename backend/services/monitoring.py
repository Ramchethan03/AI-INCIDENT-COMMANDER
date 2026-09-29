def detect_incident(metrics):

    incidents = []

    if metrics["error_rate"] > 10:
        incidents.append("High error rate")

    if metrics["latency_ms"] > 2000:
        incidents.append("High latency")

    if metrics["http_500_rate"] > 5:
        incidents.append("High HTTP 500 rate")

    if metrics["cpu"] > 90:
        incidents.append("High CPU")

    return incidents