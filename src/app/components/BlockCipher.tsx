"use client"; // Mark this file as a client component

import { useState } from 'react';

// Function to perform Vigenère encryption/decryption with modulo 26, handling spaces, and logging steps
function vigenere(input: string, key: string, decrypt: boolean = false): { output: string; steps: string[] } {
    let output = '';
    const steps = []; // Array to hold the steps of encryption/decryption
    const baseCharCode = 'A'.charCodeAt(0); // Base character code for 'A' (65)
    let keyIndex = 0; // Separate index for the key to skip spaces in the input

    for (let i = 0; i < input.length; i++) {
        const inputChar = input[i].toUpperCase();

        if (inputChar === ' ') {
            // Preserve spaces in the output without processing
            output += ' ';
            steps.push(`Space encountered at position ${i}, no operation performed.`);
            continue;
        }

        const keyChar = key[keyIndex % key.length].toUpperCase();
        const inputVal = inputChar.charCodeAt(0) - baseCharCode;
        const keyVal = keyChar.charCodeAt(0) - baseCharCode;

        // Vigenère calculation with modulo 26
        const resultVal = decrypt
            ? (inputVal - keyVal + 26) % 26
            : (inputVal + keyVal) % 26;

        const resultChar = String.fromCharCode(resultVal + baseCharCode);
        output += resultChar;

        // Log the detailed formula for each encryption or decryption step
        const operation = decrypt ? '-' : '+';
        steps.push(
            `${inputChar} (${inputVal}) ${operation} ${keyChar} (${keyVal}): (${inputVal}${operation}${keyVal}) mod 26 = ${resultVal} ➔ ${resultChar}`
        );

        keyIndex++; // Increment key index only when a character is processed
    }

    return { output, steps };
}

// BlockCipher component
const BlockCipher = () => {
    const [plaintext, setPlaintext] = useState('');
    const [key, setKey] = useState('');
    const [encrypted, setEncrypted] = useState('');
    const [decrypted, setDecrypted] = useState('');
    const [encryptionSteps, setEncryptionSteps] = useState<string[]>([]);
    const [decryptionSteps, setDecryptionSteps] = useState<string[]>([]);

    const encrypt = () => {
        const { output, steps } = vigenere(plaintext, key); // Perform Vigenère encryption
        setEncrypted(output);
        setEncryptionSteps(steps); // Set encryption steps
        setDecrypted(''); // Clear decrypted output
        setDecryptionSteps([]); // Clear decryption steps
    };

    const decrypt = () => {
        const { output, steps } = vigenere(encrypted, key, true); // Perform Vigenère decryption
        setDecrypted(output);
        setDecryptionSteps(steps); // Set decryption steps
    };

    return (
        <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center text-gray-800">Vigenère Cipher Demo</h1>

            <div className="my-4 p-4 border rounded-lg bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-700">Encryption</h2>
                <div className="mb-4">
                    <label className="block text-gray-600">Plaintext:</label>
                    <input
                        type="text"
                        value={plaintext}
                        onChange={(e) => setPlaintext(e.target.value)}
                        placeholder="Enter plaintext"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Key:</label>
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Enter key"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>
                <button
                    className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
                    onClick={encrypt}
                >
                    Encrypt
                </button>
                <div className="mt-4">
                    <label className="block text-gray-600">Encrypted:</label>
                    <input
                        type="text"
                        value={encrypted}
                        readOnly
                        placeholder="Encrypted text will appear here"
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    />
                </div>
                {encryptionSteps.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-600">Encryption Steps:</h3>
                        <ul className="list-disc pl-5">
                            {encryptionSteps.map((step, index) => (
                                <li key={index} className="text-gray-500">{step}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            <div className="my-4 p-4 border rounded-lg bg-gray-50">
                <h2 className="text-xl font-semibold text-gray-700">Decryption</h2>
                <div className="mb-4">
                    <label className="block text-gray-600">Key:</label>
                    <input
                        type="text"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        placeholder="Enter key"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600">Encrypted Text:</label>
                    <input
                        type="text"
                        value={encrypted}
                        onChange={(e) => setEncrypted(e.target.value)}
                        placeholder="Enter encrypted text"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-400"
                    />
                </div>
                <button
                    className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
                    onClick={decrypt}
                >
                    Decrypt
                </button>
                <div className="mt-4">
                    <label className="block text-gray-600">Decrypted:</label>
                    <input
                        type="text"
                        value={decrypted}
                        readOnly
                        placeholder="Decrypted text will appear here"
                        className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                    />
                </div>
                {decryptionSteps.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-600">Decryption Steps:</h3>
                        <ul className="list-disc pl-5">
                            {decryptionSteps.map((step, index) => (
                                <li key={index} className="text-gray-500">{step}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlockCipher;
