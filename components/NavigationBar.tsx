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

  return (
    <nav>
      <ul class="list-none m-0 p-0 overflow-hidden bg-gray-800">
        {items.map((item) => (
          <li key={item.name} class="float-left">
            <a
              class="block text-white text-center py-4 px-6 no-underline"
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
