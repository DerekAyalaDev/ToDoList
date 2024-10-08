import { useEffect, useState } from "react";

/**
 * Data Transfer Object (DTO) for the metrics response from the backend.
 */
interface MetricsDTO {
  averageTime: string;
  lowTime: string;
  mediumTime: string;
  highTime: string;
}

/**
 * A component that fetches and displays metrics about the ToDo items.
 * Metrics include the average time to complete tasks and the average time grouped by priority.
 */
export const Metrics = () => {
  const [metrics, setMetrics] = useState<MetricsDTO>({
    averageTime: "00:00:00",
    lowTime: "00:00:00",
    mediumTime: "00:00:00",
    highTime: "00:00:00",
  });
  const [error, setError] = useState<string | null>(null);

  // Fetches metrics from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:9090/api/todos/metrics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching metrics");
        }
        return response.json();
      })
      .then((data: MetricsDTO) => {
        setMetrics(data);
        console.log("Metrics fetched successfully:", data);
      })
      .catch((error) => {
        console.error("Error fetching metrics:", error);
        setError(error.message);
      });
  }, []);

  // Displays an error message if the fetch fails
  if (error) {
    return (
      <div className="container-item container-border border-dotted padding-vertical-20 error-message">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="container-item container-border border-dotted padding-vertical-20">
      <h4>Average time to finish tasks</h4>
      <div className="grid-two-column">
        <div className="metrics-container">
          <p className="tittle">Average time</p>
          <span>{metrics.averageTime}</span>
          <p>HH:MM:SS</p>
        </div>
        <div className="metrics-container">
          <p className="tittle">Average time by priority</p>
          <div>
            <p>
              Low: <span>{metrics.lowTime}</span>
            </p>
            <p>
              Medium: <span>{metrics.mediumTime}</span>
            </p>
            <p>
              High: <span>{metrics.highTime}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

