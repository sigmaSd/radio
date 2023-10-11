import { Head, Partial } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import NavigationBar from "@/components/NavigationBar.tsx";

export default function App({ Component }: AppProps) {
  return (
    <div>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavigationBar />
      <body f-client-nav>
        <Partial name="body">
          <div class="text-center p-4 mx-auto">
            <Component />
          </div>
        </Partial>
      </body>
    </div>
  );
}
