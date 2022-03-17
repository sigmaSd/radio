/** @jsx h */

import { h } from "../client_deps.ts";

export default function NavigationBar() {
  const items = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Favourite",
      href: "/fav",
    },
    {
      name: "Search",
      href: "/search",
    },
    {
      name: "Top",
      href: "/top",
    },
    {
      name: "Map",
      href: "/map",
    },
    {
      name: "Github",
      href: "https://github.com/sigmaSd/freshRadio",
    },
  ];

  const ulS = {
    listStyleType: "none",
    margin: "0",
    padding: "0",
    overflow: "hidden",
    backgroundColor: "#333",
  };
  const liS = {
    float: "left",
    display: "block",
    color: "white",
    textAlign: "center",
    textDecoration: "none",
  };
  const aS = {
    display: "block",
    color: "white",
    textAlign: "center",
    padding: "14px 16px",
    textDecoration: "none",
  };

  return (
    <nav>
      <ul style={ulS}>
        {items.map((item) => (
          <li style={liS}>
            <a style={aS} href={item.href}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
