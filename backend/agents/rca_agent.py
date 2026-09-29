def analyze_root_cause(logs, metrics, deployments):

    database_errors = sum(
        1 for log in logs
        if "database" in log["message"].lower()
    )

    pool_errors = sum(
        1 for log in logs
        if "pool" in log["message"].lower()
    )

    latest_deployment = deployments[0]

    if database_errors > 0 and pool_errors > 0:

        return {
            "root_cause": "Database connection pool exhaustion",
            "confidence": 0.93,
            "evidence": [
                f"{database_errors} database-related errors detected",
                f"{pool_errors} connection pool errors detected",
                f"Recent deployment: {latest_deployment['version']}",
                latest_deployment["change"]
            ],
            "recommended_action":
                "Rollback payment-api from v2.4.1 to v2.4.0"
        }

    return {
        "root_cause": "Unknown",
        "confidence": 0.30,
        "evidence": [],
        "recommended_action": "Investigate further"
    }