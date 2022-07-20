/** @jsxImportSource @emotion/react */

import Head from "next/head";
import {ThemeProvider } from "@emotion/react";
import Theme from "../styles/theme";

export default function Home() {
    return (
        <div>
            <Head>
                <title>AniBrowse</title>
                <meta
                    name="description"
                    content="Simple application to browse your favourite anime with!"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1
                css={{
                    color: Theme.colors.primary
                }}
            >
                Hello This is AniBrowse
            </h1>
        </div>
    );
}
