import { graphql } from "gatsby";
import * as React from "react";
import { withLayout } from "../components/Layout";

const Viewport = (props) => {
  const { title } = props.data.allFile.edges[0].node.fields;

  const containerRef = React.useRef();

  // biome-ignore lint/correctness/useExhaustiveDependencies: Gatsby needs client-side only packages need to be imported asynchronously
  React.useEffect(() => {
    const containerElement = containerRef.current;

    if (containerElement) {
      let NutrientViewer;
      const nutrientScript = document.createElement("script");

      nutrientScript.onload = () => {
        NutrientViewer = window.NutrientViewer;
        NutrientViewer.load({
          container: containerElement,
          document: `../assets/${title}`,
        });
      };
      // Gatsby needs client-side only packages need to be imported asynchronously
      // https://www.gatsbyjs.com/docs/using-client-side-only-packages/
      nutrientScript.src =
        "https://cdn.cloud.pspdfkit.com/pspdfkit-web@1.4.1/nutrient-viewer.js";
      document.head.appendChild(nutrientScript);

      return () => {
        NutrientViewer?.unload(containerElement);
        nutrientScript.remove();
      };
    }
    // We only want this callback to run once, hence the empty array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div className="viewport" ref={containerRef} />;
};

export default withLayout(Viewport);

export const pageQuery = graphql`
  query FilesQuery($slug: String) {
    allFile(filter: { fields: { slug: { eq: $slug } } }) {
      edges {
        node {
          fields {
            title
          }
        }
      }
    }
  }
`;
