import Image from 'next/image'

export default function UnderDevelopmentPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <Image
          src="/construction.webp"
          alt="Construction"
          className="h-24 w-40 mx-auto mb-6"
        />
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Under Development
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The bot is currently under development and not yet available for public use.
          If you&apos;ll like to test it out, use <a href="https://www.twitch.tv/popout/zoil/chat" target="_blank" rel="noopener noreferrer" style={{ color: '#6441a5', textDecoration: 'underline' }}>zoil&apos;s chat</a>
        </p>
        <a
          href="/"
          className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Return Home
        </a>
      </div>
    </div>
  )
} 