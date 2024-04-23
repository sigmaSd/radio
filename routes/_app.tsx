import { Head, Partial } from "$fresh/runtime.ts";
import type { PageProps } from "$fresh/server.ts";
import NavigationBar from "@/components/NavigationBar.tsx";
import AudioPlay from "@/components/AudioPlay.tsx";

export default function App({ Component }: PageProps) {
  return (
    <>
      <Head>
        <title>Rodio</title>
        <link rel="icon" href="/favicon.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="manifest" href="/pwa/manifest.json" />
        <script defer src="/pwa/app.js" />
      </Head>
      <NavigationBar />
      <body f-client-nav>
        <div class="text-center p-4 mx-auto">
          <AudioPlay />
          <Partial name="body">
            <Component />
          </Partial>
        </div>
      </body>
    </>
  );
}
