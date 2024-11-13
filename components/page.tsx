'use client'

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

// Mock data for commands
const commandList = [
  // Fun Commands
  { name: '?accage', description: 'Shows the age of a Twitch account', usage: '?accage [username]' },
  { name: '?ask', description: 'Ask a question and get an AI response', usage: '?ask [question]' },
  { name: '?catfact', description: 'Get a random cat fact', usage: '?catfact' },
  { name: '?cookie', description: 'Get your daily fortune cookie', usage: '?cookie' },
  { name: '?dadjoke', description: 'Get a random dad joke', usage: '?dadjoke' },
  { name: '?define', description: 'Get the definition of a word', usage: '?define [word]' },
  { name: '?dogfact', description: 'Get a random dog fact', usage: '?dogfact' },
  { name: '?gay', description: 'Check how gay someone is', usage: '?gay [username]' },
  { name: '?love', description: 'Check love compatibility between two users', usage: '?love [user1] [user2]' },
  { name: '?merp', description: 'Get a random merp message', usage: '?merp' },
  { name: '?movie', description: 'Get information about a movie', usage: '?movie [title]' },
  { name: '?sigma', description: 'Get a random sigma quote', usage: '?sigma' },
  { name: '?urban', description: 'Look up a term on Urban Dictionary', usage: '?urban [term] [index:n]' },

  // Music Commands
  { name: '?ms', description: 'Show your current playing song on Last.fm', usage: '?ms [emote]' },
  { name: '?song', description: "Check another user's currently playing song", usage: '?song [username]' },
  { name: '?ta', description: 'Show top artists from Last.fm', usage: '?ta [username]' },
  { name: '?ts', description: 'Show top songs from Last.fm', usage: '?ts [username]' },

  // Info Commands
  { name: '?afk', description: 'Set your AFK status', usage: '?afk [message]' },
  { name: '?fa', description: 'Check follow age of a user', usage: '?fa [username] [channel]' },
  { name: '?isdown', description: 'Check if a website is down', usage: '?isdown [url]' },
  { name: '?news', description: 'Get latest news', usage: '?news [query]' },
  { name: '?subage', description: 'Check subscription length', usage: '?subage [username] [channel]' },
  { name: '?time', description: 'Check time in a location', usage: '?time [location]' },
  { name: '?user', description: 'Get Twitch user information', usage: '?user [username]' },
  { name: '?weather', description: 'Get weather information', usage: '?weather [location]' },
  { name: '?wolfram', description: 'Query Wolfram Alpha', usage: '?wolfram [query]' },

  // Chat Logs
  { name: '?rl', description: 'Get a random message from a user', usage: '?rl [username] [channel]' },
  { name: '?rq', description: 'Get a random message from chat', usage: '?rq [channel]' },

  // System Commands
  { name: '?ping', description: 'Check bot status and response time', usage: '?ping' },
  { name: '?help', description: 'Show available commands', usage: '?help' }
];

export function BlockPage() {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCommands = commandList.filter(command => 
    command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) 

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Input
            type="search"
            placeholder="Search commands..."
            className="w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">Mrsmalvic Commands</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredCommands.map((command) => (
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
        {filteredCommands.length === 0 && (
          <p className="text-center text-gray-600 dark:text-gray-400 mt-8">
            No commands found matching your search.
          </p>
        )}
      </main>
    </div>
  )
}