import React from "react";

export default class Nutrient extends React.Component {
  ref = React.createRef();

  async componentDidMount() {
    const { pdf, licenseKey } = this.props;

    window.NutrientViewer.load({
      document: pdf,
      licenseKey,
      container: this.ref.current,
      standaloneInstancesPoolSize: 1,
      disableWebAssemblyStreaming: false,
    });
  }

  render() {
    return (
      <div className="Nutrient-container isDone isHidden">
        <div id="Nutrient-container" ref={this.ref} />
      </div>
    );
  }
}
