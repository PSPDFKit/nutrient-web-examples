import React from "react";

export default class PSPDFKit extends React.Component {
  ref = React.createRef();

  async componentDidMount() {
    const { pdf, licenseKey, isWasm } = this.props;

    window.PSPDFKit.load({
      document: pdf,
      licenseKey,
      container: this.ref.current,
      disableWebAssemblyStreaming: true,
      disableWebAssembly: !isWasm,
      standaloneInstancesPoolSize: 1,
    });
  }

  render() {
    return (
      <div className="PSPDFKit-container isDone isHidden">
        <div id="PSPDFKit-container" ref={this.ref} />
      </div>
    );
  }
}
