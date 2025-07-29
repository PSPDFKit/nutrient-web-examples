import React from "react";
import { NutrientWindow } from "../../index";
import { getConfigOptionsFromURL } from "../../lib/utils";

interface NutrientProps {
  pdf: ArrayBuffer | null;
  licenseKey: string | null;
}

export default class Nutrient extends React.Component<NutrientProps> {
  ref = React.createRef<HTMLDivElement>();

  async componentDidMount() {
    const { pdf, licenseKey } = this.props;

    (NutrientWindow.NutrientViewer as any).load({
      document: pdf,
      licenseKey,
      container: this.ref.current,
      standaloneInstancesPoolSize: 1,
      disableWebAssemblyStreaming: false,
      baseUrl: getConfigOptionsFromURL().nutrientConfig.baseUrl,
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
