import Head from "next/head";
import Box from "@components/Box";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <Head>
        <title>Massi.eth</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full text-center">
        <h1 className="text-4xl font-bold mb-0 sm:mt-8">
          Welcome to <code className="text-blue-600">Massi.eth</code>
        </h1>

        <input
          className="mt-6 py-4 px-4 bg-transparent border-2 border-blue-500 rounded text-lg text-white"
          type="text"
          placeholder="write sth fun..."
        />

        <div className="mt-6 flex">
          <button
            className="bg-blue-500 border-2 border-blue-500 hover:bg-transparent text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Message me
          </button>
          <button
            className="ml-4 bg-blue-500 border-2 border-blue-500 hover:bg-transparent text-white font-bold py-2 px-4 rounded"
            type="button"
          >
            Connect wallet
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-around max-w-4xl my-4">
          <Box />
          <Box />
          <Box />
          <Box />
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24">
        <a
          className="flex items-center justify-center"
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <img src="/vercel.svg" alt="Vercel Logo" className="h-4 ml-2" />
        </a>
      </footer>
    </div>
  );
}
