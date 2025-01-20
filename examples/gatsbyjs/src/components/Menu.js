import { Link, graphql, useStaticQuery } from "gatsby";
import React from "react";

const Menu = () => {
  const {
    allFile: { edges },
  } = useStaticQuery(graphql`
    query SidebarItemsQuery {
      allFile(sort: { fields: { title: ASC } }) {
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

  return (
    <ul>
      {edges.map(
        ({
          node: {
            fields: { slug, title },
          },
        }) => (
          <li key={slug} className="menuItem">
            <Link to={slug} target="viewport" activeClassName="active">
              {title}
            </Link>
          </li>
        ),
      )}
    </ul>
  );
};

export { Menu };
