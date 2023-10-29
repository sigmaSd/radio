import { Head, Partial } from "$fresh/runtime.ts";
import { AppProps } from "$fresh/server.ts";
import NavigationBar from "@/components/NavigationBar.tsx";
import AudioPlay from "@/components/AudioPlay.tsx";

export default function App({ Component }: AppProps) {
  return (
    <>
      <Head>
        <title>Rodio</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="manifest.webmanifest" />
        <link rel="apple-touch-icon" href="foo-icon-48x48.png" />
        <meta name="theme-color" content="#3b82f6" />
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
