/** @jsx h */

import { h } from "../client_deps.ts";

export default function NavigationBar() {
  const items = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "Map",
      href: "/map",
    },
  ];

  return (
    <nav>
      <ul>
        {items.map((item) => (
          <li>
            <a
              href={item.href}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
