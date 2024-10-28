import Head from 'next/head';
import BlockCipher from './components/BlockCipher';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Vigenère Cipher Demo</title>
                <meta name="description" content="Block Cipher using XOR in Next.js" />
            </Head>
            <main style={{ padding: '20px' }}>
                <h1>Vigenère Cipher Demo</h1>
                <BlockCipher />
            </main>
        </div>
    );
}
