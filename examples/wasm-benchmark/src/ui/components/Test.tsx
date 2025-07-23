import React from "react";

interface TestProps {
  id: string;
  heading: string;
  description: React.ReactElement;
  data: {
    state: string;
    progress: number;
    totalTime?: number;
    medians?: Array<{ name: string; median: number }>;
  };
}

export default class Test extends React.Component<TestProps> {
  render() {
    const { id, heading, description, data } = this.props;

    const state = data ? data.state : "idle";
    const progress = data ? data.progress : 0;
    const totalTime = data ? data.totalTime : 0;
    const medians = data ? data.medians : [];

    const summary = (
      <React.Fragment>
        <div className="Bench-heading">
          <h3>{heading}</h3>
          {state === "idle" && <span className="Bench-info">Pending...</span>}
          {state === "running" && (
            <span className="Bench-info Bench-info--running">
              Running
              <span className="Progress">
                <span className="Progress-dots">...</span>
              </span>
            </span>
          )}

          {state === "complete" && (
            <span className="Bench-info Bench-info--complete">
              {Math.round(totalTime || 0)} ms
            </span>
          )}
        </div>
        <div className="ProgressBar">
          <div
            className="ProgressBar-percentage"
            style={{
              maxWidth:
                progress === 0
                  ? state === "running"
                    ? "1%"
                    : "0%"
                  : `${progress}%`,
              width: "100%",
            }}
          />
        </div>
      </React.Fragment>
    );

    const details = (
      <React.Fragment>
        <div className="Bench-description">{description}</div>

        {medians && medians.length > 1 && state === "complete" && (
          <div className="Bench-partials">
            <h4>Partial results</h4>
            {medians.map(({ name, median }: { name: string; median: number }) => (
              <p className="Bench-partialResult" key={name}>
                <span>{name}</span>
                <span>{Math.round(median)} ms</span>
              </p>
            ))}
          </div>
        )}
      </React.Fragment>
    );

    return (
      <div id={id} className={`Bench Bench--${state}`}>
        {state === "running" ? (
          <React.Fragment>
            {summary}
            {details}
          </React.Fragment>
        ) : (
          <details>
            <summary>{summary}</summary>
            {details}
          </details>
        )}
      </div>
    );
  }
}
