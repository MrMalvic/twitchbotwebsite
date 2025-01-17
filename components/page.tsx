'use client'

import { useState, useRef } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { ChevronDown } from "lucide-react"
import Image from 'next/image'

interface Command {
  name: string;
  description: string;
  usage: string;
  optOutEnabled?: boolean;
}

// Organize commands by category in the most sensible order
const commandCategories: Record<string, Command[]> = {
  "Fun & Entertainment": [  
    { name: '?8ball', description: 'Ask the magic 8ball a question', usage: '?8ball [question]' },
    { name: '?catfact', description: 'Get a random cat fact', usage: '?catfact' },
    { name: '?chatsummary', description: 'Get a summary of the chat in the past 10 minutes (Aliases: ?cs)', usage: '?chatsummary' },
    { name: '?coinflip', description: 'Flip a coin (Aliases: ?cf)', usage: '?coinflip' },
    { name: '?cookie', description: 'Get your daily fortune cookie', usage: '?cookie' },
    { name: '?dadjoke', description: 'Get a random dad joke', usage: '?dadjoke' },
    { name: '?dogfact', description: 'Get a random dog fact', usage: '?dogfact' },
    { name: '?fact', description: 'Get a random fact', usage: '?fact' },
    { name: '?furry', description: 'Get a random fursona', usage: '?furry [username]' },
    { name: '?gay', description: 'Check how gay someone is', usage: '?gay [username]' },
    { name: '?gif', description: 'Get a random gif', usage: '?gif [query]' },
    { name: '?hi', description: 'Greet a random user in chat', usage: '?hi' },
    { name: '?imagine', description: 'Generate an image with AI (Aliases: ?img)', usage: '?imagine [prompt]' },
    { name: '?joke', description: 'Get a random joke', usage: '?joke' },
    { name: '?love', description: 'Check love compatibility between two users', usage: '?love [user1] [user2]' },
    { name: '?merp', description: 'Get a random merp streamable link', usage: '?merp' },
    { name: '?pyramid', description: 'Make a pyramid', usage: '?pyramid [text]' },
    { name: '?randomclip', description: 'Get a random clip from a specified twitch channel', usage: '?randomclip [channel]' },
    { name: '?randomline', description: 'Get a random message from a user (Aliases: ?rl)', usage: '?randomline [username] [channel]', optOutEnabled: true },
    { name: '?randomquote', description: 'Get a random message from chat (Aliases: ?rq)', usage: '?randomquote [channel]' },
    { name: '?sigma', description: 'Get a random sigma quote', usage: '?sigma' },
    { name: '?smelly', description: 'Check how someone smells (Aliases: ?stinky, ?smell, ?stink)', usage: '?smelly [username]' },
    { name: '?tuck', description: 'Tuck a user in bed with a sweet message', usage: '?tuck [username]' },
    { name: '?wisdom', description: 'Get a random wisdom quote', usage: '?wisdom' },
    { name: '?yourmom', description: 'Get a random your mom joke', usage: '?yourmom' },
  ],
  "Chat & User Info": [  
    { name: '?7tva', description: 'Shows the age of a 7TV account', usage: '?7tva [username]' },
    { name: '?accage', description: 'Shows the age of a Twitch account', usage: '?accage [username]' },
    { name: '?countlines', description: 'Check a user\'s message count in a channel (Aliases: ?cl)', usage: '?countlines [username] [channel]' },
    { name: '?followage', description: 'Check follow age of a user (Aliases: ?fa)', usage: '?followage [username] [channel]' },
    { name: '?namechange', description: 'Check a user\'s name change history', usage: '?namechange [username]', optOutEnabled: true },
    { name: '?profilepicture', description: 'Get a user\'s profile picture (Aliases: ?pfp)', usage: '?profilepicture [username]' },
    { name: '?subage', description: 'Check subscription length', usage: '?subage [username] [channel]' },
    { name: '?user', description: 'Get Twitch user information', usage: '?user [username]' },
    { name: '?whatemoteisit', description: 'Get information about an emote (Aliases: ?weit)', usage: '?whatemoteisit [emote]' },
  ],
  "Information & Search": [  
    { name: '?aisearch', description: 'Search the web for information that will be summarized by AI (Aliases: ?ais)', usage: '?aisearch [query]' },
    { name: '?ask', description: 'Ask a question and get an AI response. Best for more casual conversations (Aliases: ?gpt)', usage: '?ask [question]' },
    { name: '?define', description: 'Get the definition of a word', usage: '?define [word]' },
    { name: '?founders', description: 'Check founders of a channel', usage: '?founders [channel]' },
    { name: '?game', description: 'Get information about a game', usage: '?game [game]' },
    { name: '?horoscope', description: 'Get your horoscope', usage: '?horoscope [sign]' },
    { name: '?isbanned', description: 'Check if a user is banned from twitch and if so, get the reason (Aliases: ?bancheck, ?bc)', usage: '?isbanned [username]' },
    { name: '?isstaff', description: 'Check if a user is a twitch staff member', usage: '?isstaff [username]' },
    { name: '?logs', description: 'Get a user\'s logs from a specified channel', usage: '?logs [username] [channel]', optOutEnabled: true },
    { name: '?movie', description: 'Get information about a movie or tv show (Alias: ?imdb)', usage: '?movie [title]' },
    { name: '?news', description: 'Get latest news', usage: '?news [query]' },
    { name: '?urban', description: 'Look up a term on Urban Dictionary', usage: '?urban [term] [index:n]' },
    { name: '?wolfram', description: 'Query Wolfram Alpha', usage: '?wolfram [query]' },
  ],
  "Music & Last.fm": [ 
    { name: '?lastfm set', description: 'Set your Last.fm username', usage: '?lastfm set [username]' },
    { name: '?mysong', description: 'Show your current playing song on Last.fm (Aliases: ?ms)', usage: '?mysong' },
    { name: '?song', description: "Check another user's currently playing song", usage: '?song [username]' },
    { name: '?songhistory', description: 'Show a user\'s recently played songs', usage: '?songhistory [username]' },
    { name: '?topalbums', description: 'Show top 5 albums from Last.fm (Aliases: ?tal)', usage: '?topalbums' },
    { name: '?topartists', description: 'Show top 5 artists from Last.fm (Aliases: ?ta)', usage: '?topartists' },
    { name: '?topsongs', description: 'Show top 5 songs from Last.fm (Aliases: ?ts)', usage: '?topsongs' },
    { name: '?weekly', description: 'Show your weekly top 5 songs', usage: '?weekly' },
  ],
  "Utility Commands": [  
    { name: '?afk', description: 'Set your AFK status. (Aliases: ?work, ?sleep, ?food, ?lurk, ?gaming, ?gn/?sleep, ?nap, ?poop, ?study)', usage: '?afk [message]' },
    { name: '?checkafk', description: 'Check a user\'s afk status (Aliases: ?ca)', usage: '?checkafk [username]', optOutEnabled: true },
    { name: '?isdown', description: 'Check if a website is down', usage: '?isdown [url]' },
    { name: '?remind', description: 'Set a reminder for a user. To delete a reminder, use ?delreminder|?delremind {6-digit-id}', usage: '?remind [username] [message]', optOutEnabled: true },
    { name: '?remindme', description: 'Set a reminder for yourself', usage: '?remindme [duration] [message]' },
    { name: '?time', description: 'Check time in a location', usage: '?time [location]' },
    { name: '?weather', description: 'Get weather information, You can also set your location with ?weather set [location]. you can also add "hidden" at the end to hide the location from the output', usage: '?weather [location]' },
  ],
  "System Commands": [  
    { name: '?help', description: 'Show available commands', usage: '?help' },
    { name: '?optin', description: 'Opt in to the specified command (Must have opt-out enabled tag)', usage: '?optin [command]' },
    { name: '?optout', description: 'Opt out of the specified command (Must have opt-out enabled tag)', usage: '?optout [command]' },
    { name: '?ping', description: 'Check bot status and response time', usage: '?ping' },
  ],
};

export function BlockPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // Create refs for each category section
  const categoryRefs = {
    "Fun & Entertainment": useRef<HTMLDivElement>(null),
    "Chat & User Info": useRef<HTMLDivElement>(null),
    "Information & Search": useRef<HTMLDivElement>(null),
    "Music & Last.fm": useRef<HTMLDivElement>(null),
    "Utility Commands": useRef<HTMLDivElement>(null),
    "System Commands": useRef<HTMLDivElement>(null),
  }

  const scrollToCategory = (category: keyof typeof categoryRefs) => {
    categoryRefs[category]?.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
    setIsMenuOpen(false)
  }

  // Rest of your filtering logic remains the same
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
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Image 
                  src="/3.png" 
                  alt="Website Logo" 
                  width={32}
                  height={32}
                  className="h-8 w-8"
                />
                <div className="relative">
                  <button
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    onBlur={() => setTimeout(() => setIsMenuOpen(false), 200)}
                  >
                    Categories
                    <ChevronDown className={`w-4 h-4 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isMenuOpen && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                      {Object.keys(commandCategories).map((category) => (
                        <button
                          key={category}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                          onClick={() => scrollToCategory(category as keyof typeof categoryRefs)}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <a
                  href="/add-to-channel"
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Add to Channel
                </a>
              </div>
              <ThemeToggle />
            </div>
            
            <Input
              type="search"
              placeholder="Search commands..."
              className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 border border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500 dark:focus:ring-blue-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {Object.entries(filteredCategories).map(([category, commands]) => (
          <div key={category} ref={categoryRefs[category as keyof typeof categoryRefs]} className="mb-8 scroll-mt-32">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">{category}</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {commands.map((command) => (
                <Card key={command.name}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{command.name}</CardTitle>
                      {command.optOutEnabled && (
                        <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900 px-2.5 py-0.5 text-xs font-medium text-blue-800 dark:text-blue-200">
                          Opt-out enabled
                        </span>
                      )}
                    </div>
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