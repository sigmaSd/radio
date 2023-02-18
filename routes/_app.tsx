import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import NavigationBar from "@/components/NavigationBar.tsx";

export default function App({ Component }: AppProps) {
  const appStyle = {
    textAlign: "center",
    padding: "1em",
    margin: "0 auto",
  };

  return (
    <div>
      <body style={{ margin: 0 }}>
      </body>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <div style={appStyle}>
        <Component />
      </div>
    </div>
  );
}
