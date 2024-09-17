export const Metrics = () => {
  return (
    <div className="container-item container-border border-dotted padding-vertical-20">
      <h4>Average time to finish tasks</h4>
      <div className="grid-two-column">
        <div className="metrics-container">
          <p className="tittle">Average time</p>
          <span>00:00:00</span>
          <p>HH:MM:SS</p>
        </div>
        <div className="metrics-container">
          <p className="tittle">Average time by priority</p>
          <div>
            <p>
              Low: <span>00:00:00</span>
            </p>
            <p>
              Medium: <span>00:00:00</span>
            </p>
            <p>
              High: <span>00:00:00</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
