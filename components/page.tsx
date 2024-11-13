'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"

// Organize commands by category
const commandCategories = {
  "Fun Commands": [
    { name: '?ask', description: 'Ask a question and get an AI response (Aliases: ?gpt)', usage: '?ask [question]' },
    { name: '?catfact', description: 'Get a random cat fact', usage: '?catfact' },
    { name: '?cookie', description: 'Get your daily fortune cookie', usage: '?cookie' },
    { name: '?dadjoke', description: 'Get a random dad joke', usage: '?dadjoke' },
    { name: '?dogfact', description: 'Get a random dog fact', usage: '?dogfact' },
    { name: '?gay', description: 'Check how gay someone is', usage: '?gay [username]' },
    { name: '?love', description: 'Check love compatibility between two users', usage: '?love [user1] [user2]' },
    { name: '?merp', description: 'Get a random merp streamable link', usage: '?merp' },
    { name: '?sigma', description: 'Get a random sigma quote', usage: '?sigma' },
    { name: '?yourmom', description: 'Get a random your mom joke', usage: '?yourmom' },
  ],
  "Music Commands": [
    { name: '?lastfm set', description: 'Set your Last.fm username', usage: '?lastfm set [username]' },
    { name: '?mysong', description: 'Show your current playing song on Last.fm (Aliases: ?ms)', usage: '?mysong' },
    { name: '?song', description: "Check another user's currently playing song", usage: '?song [username]' },
    { name: '?topartists', description: 'Show top 5 artists from Last.fm (Aliases: ?ta)', usage: '?topartists' },
    { name: '?topsongs', description: 'Show top 5 songs from Last.fm (Aliases: ?ts)', usage: '?topsongs' },
  ],
  "Info Commands": [
    { name: '?game', description: 'Get information about a game', usage: '?game [game]' },
    { name: '?define', description: 'Get the definition of a word', usage: '?define [word]' },
    { name: '?followage', description: 'Check follow age of a user (Aliases: ?fa)', usage: '?followage [username] [channel]' },
    { name: '?isdown', description: 'Check if a website is down', usage: '?isdown [url]' },
    { name: '?movie', description: 'Get information about a movie', usage: '?movie [title]' },
    { name: '?news', description: 'Get latest news', usage: '?news [query]' },
    { name: '?time', description: 'Check time in a location', usage: '?time [location]' },
    { name: '?urban', description: 'Look up a term on Urban Dictionary', usage: '?urban [term] [index:n]' },
    { name: '?weather', description: 'Get weather information, You can also set your location with ?weather set [location]', usage: '?weather [location]' },
    { name: '?wolfram', description: 'Query Wolfram Alpha', usage: '?wolfram [query]' },
  ],
  "Chat Commands": [
    { name: '?accage', description: 'Shows the age of a Twitch account', usage: '?accage [username]' },
    { name: '?afk', description: 'Set your AFK status. (Aliases: ?work, ?sleep, ?food, ?gaming, ?gn/?sleep, ?poop)', usage: '?afk [message]' },
    { name: '?randomline', description: 'Get a random message from a user (Aliases: ?rl)', usage: '?randomline [username] [channel]' },
    { name: '?randomquote', description: 'Get a random message from chat (Aliases: ?rq)', usage: '?randomquote [channel]' },
    { name: '?subage', description: 'Check subscription length', usage: '?subage [username] [channel]' },
    { name: '?user', description: 'Get Twitch user information', usage: '?user [username]' },
  ],
  "System Commands": [
    { name: '?ping', description: 'Check bot status and response time', usage: '?ping' },
    { name: '?help', description: 'Show available commands', usage: '?help' },
  ],
};

export function BlockPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCategories = Object.entries(commandCategories).reduce((acc, [category, commands]) => {
    const filteredCommands = commands.filter(command =>
      command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      command.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredCommands.length > 0) {
      acc[category] = filteredCommands;
    }
    return acc;
  }, {} as Record<string, typeof commandCategories[keyof typeof commandCategories]>);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <img 
              src="/3.png" 
              alt="Website Logo" 
              className="h-8 w-8"
            />
            <Input
              type="search"
              placeholder="Search commands..."
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {Object.entries(filteredCategories).map(([category, commands]) => (
          <div key={category} className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{category}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {commands.map((command) => (
                <Card key={command.name}>
                  <CardHeader>
                    <CardTitle>{command.name}</CardTitle>
                    <CardDescription>{command.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      <strong>Usage:</strong> {command.usage}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
        
        {Object.keys(filteredCategories).length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
            No commands found matching your search.
          </p>
        )}
      </main>

      <footer className="py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        Made with ❤️ by <a 
          href="https://www.twitch.tv/mrmalvic" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:underline rainbow-text"
        >
          MrMalvic
        </a>
      </footer>

      <style jsx global>{`
        @keyframes rainbow {
          0% { color: #ff0000; }
          17% { color: #ff00ff; }
          33% { color: #0000ff; }
          50% { color: #00ffff; }
          67% { color: #00ff00; }
          83% { color: #ffff00; }
          100% { color: #ff0000; }
        }

        .rainbow-text {
          animation: rainbow 8s linear infinite;
        }
      `}</style>
    </div>
  )
}