import { Head } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import NavigationBar from "@/components/NavigationBar.tsx";

export default function App({ Component }: AppProps) {
  return (
    <div>
      <body class="m-0">
      </body>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <div class="text-center p-4 mx-auto">
        <Component />
      </div>
    </div>
  );
}
