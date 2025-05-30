// pages/index.js
import Link from 'next/link';
import { FaFacebook } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen bg-red-700 text-white p-8">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <h1 className="text-4xl font-bold">My Projects</h1>
        <p className="text-lg">Check out the websites I’ve built:</p>

        <div className="grid gap-4">
          <Link href="https://lyrics-liart.vercel.app/">
            <button className="bg-white text-red-700 py-2 px-4 rounded hover:bg-gray-100 transition">Lyrics</button>
          </Link>
          <Link href="https://profile-guard.vercel.app/">
            <button className="bg-white text-red-700 py-2 px-4 rounded hover:bg-gray-100 transition">Profile Guard</button>
          </Link>
          <Link href="https://getnew-xi.vercel.app/">
            <button className="bg-white text-red-700 py-2 px-4 rounded hover:bg-gray-100 transition">Token Getter (Cookie Method)</button>
          </Link>
        </div>

        <div className="mt-10 text-sm">
          <p>{new Date().toLocaleString()}</p>
        </div>

        <div className="mt-10">
          <a
            href="https://www.facebook.com/profile.php?id=61576992292379"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white flex items-center justify-center gap-2 hover:underline"
          >
            <FaFacebook /> Follow me on Facebook
          </a>
        </div>
      </div>
    </div>
  );
}
