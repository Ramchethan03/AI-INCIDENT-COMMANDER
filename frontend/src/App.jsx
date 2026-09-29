import { useState } from "react";
import "./App.css";

function App() {
  const [incident, setIncident] = useState(null);
  const [investigating, setInvestigating] = useState(false);
  const [resolved, setResolved] = useState(false);

  const simulateIncident = async () => {
    setInvestigating(true);
    setResolved(false);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/incidents/simulate",
        {
          method: "POST",
        }
      );

      const data = await response.json();
      setIncident(data);
    } catch (error) {
      console.error(error);

      // Demo fallback
      setIncident({
        incident_id: "INC-001",
        service: "payment-api",
        severity: "SEV-1",
        status: "INVESTIGATING",
        message: "Database connection pool exhaustion detected",
      });
    }

    setTimeout(() => {
      setInvestigating(false);
    }, 1000);
  };

  const approveRollback = () => {
    setResolved(true);
  };

  return (
    <div className="app">

      {/* Sidebar */}
      <aside className="sidebar">

        <div className="logo">
          <div className="logo-icon">⚡</div>
          <div>
            <h2>Incident</h2>
            <h2>Commander</h2>
          </div>
        </div>

        <nav>
          <div className="nav-item active">
            <span>▣</span>
            Dashboard
          </div>

          <div className="nav-item">
            <span>⚠</span>
            Incidents
          </div>

          <div className="nav-item">
            <span>◉</span>
            Monitoring
          </div>

          <div className="nav-item">
            <span>◫</span>
            Postmortems
          </div>

          <div className="nav-item">
            <span>⚙</span>
            Settings
          </div>
        </nav>

        <div className="sidebar-bottom">
          <div className="system-status">
            <span className="status-dot"></span>
            All systems operational
          </div>
        </div>

      </aside>

      {/* Main */}
      <main className="main">

        {/* Header */}
        <header className="header">

          <div>
            <h1>AI Incident Commander</h1>
            <p>Detect. Diagnose. Decide. Recover. Learn.</p>
          </div>

          <div className="header-right">
            <div className="demo-badge">
              ● DEMO MODE
            </div>

            <div className="avatar">
              RC
            </div>
          </div>

        </header>

        {/* Statistics */}
        <section className="stats">

          <div className="stat-card">
            <div className="stat-title">ACTIVE INCIDENTS</div>
            <div className="stat-value">
              {incident && !resolved ? "1" : "0"}
            </div>
            <div className="stat-sub">Currently investigating</div>
          </div>

          <div className="stat-card critical">
            <div className="stat-title">CRITICAL</div>
            <div className="stat-value">
              {incident && !resolved ? "1" : "0"}
            </div>
            <div className="stat-sub">SEV-1 incidents</div>
          </div>

          <div className="stat-card success">
            <div className="stat-title">RESOLVED TODAY</div>
            <div className="stat-value">
              {resolved ? "1" : "0"}
            </div>
            <div className="stat-sub">Successfully recovered</div>
          </div>

          <div className="stat-card">
            <div className="stat-title">MTTR</div>
            <div className="stat-value">8m</div>
            <div className="stat-sub">Average recovery time</div>
          </div>

        </section>

        {/* Main grid */}
        <section className="dashboard-grid">

          {/* Incident panel */}
          <div className="panel incident-panel">

            <div className="panel-header">
              <div>
                <h2>Incident Control Center</h2>
                <p>Live incident investigation</p>
              </div>

              <div className="live">
                <span></span>
                LIVE
              </div>
            </div>

            {!incident ? (

              <div className="empty-state">

                <div className="empty-icon">
                  ⚡
                </div>

                <h2>No active incidents</h2>

                <p>
                  Simulate a production incident to start
                  the AI investigation.
                </p>

                <button
                  className="primary-button"
                  onClick={simulateIncident}
                >
                  🚨 SIMULATE INCIDENT
                </button>

              </div>

            ) : (

              <div>

                <div className="incident-title">

                  <div>
                    <span className="severity">
                      SEV-1
                    </span>

                    <h2>
                      Payment API Outage
                    </h2>

                    <p>
                      Incident ID: {incident.incident_id}
                    </p>
                  </div>

                  <div className="incident-status">
                    {resolved ? "RESOLVED" : incident.status}
                  </div>

                </div>

                {/* Metrics */}
                <div className="metrics">

                  <div className="metric-card danger">
                    <span>Error Rate</span>
                    <strong>
                      {resolved ? "0.8%" : "18.4%"}
                    </strong>
                    <small>
                      {resolved ? "↓ recovered" : "↑ critical"}
                    </small>
                  </div>

                  <div className="metric-card danger">
                    <span>Latency</span>
                    <strong>
                      {resolved ? "210ms" : "2400ms"}
                    </strong>
                    <small>
                      {resolved ? "↓ recovered" : "↑ critical"}
                    </small>
                  </div>

                  <div className="metric-card danger">
                    <span>HTTP 500</span>
                    <strong>
                      {resolved ? "0.2%" : "17%"}
                    </strong>
                    <small>
                      {resolved ? "↓ recovered" : "↑ critical"}
                    </small>
                  </div>

                </div>

                {/* AI Investigation */}
                <div className="ai-box">

                  <div className="ai-title">
                    <span>🤖</span>
                    AI INVESTIGATION
                  </div>

                  {investigating ? (

                    <div className="loading">
                      AI agents are investigating the incident...
                    </div>

                  ) : resolved ? (

                    <div className="recovery-message">
                      <h3>🟢 Incident Recovered</h3>

                      <p>
                        Rollback completed successfully.
                        System health has returned to normal.
                      </p>
                    </div>

                  ) : (

                    <>

                      <div className="root-cause">

                        <div className="label">
                          PROBABLE ROOT CAUSE
                        </div>

                        <h3>
                          Database connection pool exhaustion
                        </h3>

                        <div className="confidence">
                          Confidence: <strong>93%</strong>
                        </div>

                      </div>

                      <div className="evidence">

                        <div className="label">
                          EVIDENCE
                        </div>

                        <ul>
                          <li>
                            Database connection timeout errors detected
                          </li>

                          <li>
                            Connection pool exhausted
                          </li>

                          <li>
                            HTTP 500 errors increased to 17%
                          </li>

                          <li>
                            Deployment v2.4.1 occurred shortly
                            before incident
                          </li>

                        </ul>

                      </div>

                      <div className="recommendation">

                        <div className="label">
                          AI RECOMMENDATION
                        </div>

                        <h3>
                          Rollback payment-api
                        </h3>

                        <p>
                          v2.4.1 → v2.4.0
                        </p>

                        <button
                          className="approve-button"
                          onClick={approveRollback}
                        >
                          ✓ APPROVE ROLLBACK
                        </button>

                      </div>

                    </>

                  )}

                </div>

              </div>

            )}

          </div>

          {/* Right panel */}
          <div className="right-column">

            {/* Service Health */}
            <div className="panel">

              <div className="panel-header">
                <div>
                  <h2>Service Health</h2>
                  <p>Production services</p>
                </div>
              </div>

              <div className="service">

                <div className="service-info">
                  <span className="service-dot"></span>

                  <div>
                    <strong>payment-api</strong>
                    <small>Production</small>
                  </div>
                </div>

                <span className={
                  resolved ? "healthy" : "unhealthy"
                }>
                  {resolved ? "HEALTHY" : "DEGRADED"}
                </span>

              </div>

              <div className="service">

                <div className="service-info">
                  <span className="service-dot healthy-dot"></span>

                  <div>
                    <strong>user-api</strong>
                    <small>Production</small>
                  </div>
                </div>

                <span className="healthy">
                  HEALTHY
                </span>

              </div>

              <div className="service">

                <div className="service-info">
                  <span className="service-dot healthy-dot"></span>

                  <div>
                    <strong>notification-api</strong>
                    <small>Production</small>
                  </div>
                </div>

                <span className="healthy">
                  HEALTHY
                </span>

              </div>

            </div>

            {/* Deployment */}
            <div className="panel">

              <div className="panel-header">
                <div>
                  <h2>Recent Deployment</h2>
                  <p>payment-api</p>
                </div>
              </div>

              <div className="deployment">

                <div className="version">
                  v2.4.1
                </div>

                <div>
                  <strong>
                    Database configuration update
                  </strong>

                  <p>
                    7 minutes before incident
                  </p>
                </div>

              </div>

            </div>

            {/* Incident Timeline */}
            <div className="panel">

              <div className="panel-header">
                <div>
                  <h2>Incident Timeline</h2>
                  <p>AI investigation events</p>
                </div>
              </div>

              <div className="timeline">

                <div>
                  <span></span>
                  <p>
                    <strong>Incident detected</strong>
                    <small>Just now</small>
                  </p>
                </div>

                <div>
                  <span></span>
                  <p>
                    <strong>AI investigation started</strong>
                    <small>Just now</small>
                  </p>
                </div>

                <div>
                  <span></span>
                  <p>
                    <strong>Root cause identified</strong>
                    <small>AI analysis</small>
                  </p>
                </div>

                {resolved && (

                  <div>
                    <span className="green"></span>
                    <p>
                      <strong>Rollback completed</strong>
                      <small>System recovered</small>
                    </p>
                  </div>

                )}

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default App;