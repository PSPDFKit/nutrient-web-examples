const path = require("node:path");
const { createFilePath } = require("gatsby-source-filesystem");

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "File") {
    const slug = createFilePath({ node, getNode, basePath: "pages" });

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
    createNodeField({
      node,
      name: "title",
      value: node.base,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allFile {
        edges {
          node {
            fields {
              slug
              title
            }
          }
        }
      }
    }
  `);

  for (const { node } of result.data.allFile.edges) {
    createPage({
      path: node.fields.slug,
      component: path.resolve("./src/templates/Viewport.js"),
      context: {
        slug: node.fields.slug,
      },
    });
  }
};
