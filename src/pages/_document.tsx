import { Head, Html, Main, NextScript } from 'next/document';

const favicons = [
    { icon: 'favicon-16x16', size: '16x16' },
    { icon: 'favicon-32x32', size: '32x32' },
    { icon: 'apple-touch-icon', size: '180x180' },
    { icon: 'android-chrome-192x192', size: '192x192' },
    { icon: 'android-chrome-512x512', size: '512x512' },
];

export default function Document() {
    return (
        <Html lang="de">
            <Head>
                {favicons.map((el, key) => {
                    return (
                        <link
                            key={key}
                            rel="icon"
                            href={`/${el.icon}.png`}
                            sizes={el.size}
                            type="image/png"
                        />
                    );
                })}
                <link rel="manifest" href="/webmanifest.json" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
