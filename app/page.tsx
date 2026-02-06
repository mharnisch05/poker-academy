'use client';

import { useState } from 'react';
import HandRankings from '@/components/HandRankings';
import PotOddsCalculator from '@/components/PotOddsCalculator';
import PracticeGame from '@/components/PracticeGame';

type Tab = 'learn' | 'calculator' | 'practice';

export default function Home() {
  const [activeTab, setActiveTab] = useState<Tab>('learn');

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-purple-900 shadow-xl">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">🃏 Poker Academy</h1>
              <p className="text-blue-200">Master the game of poker through interactive learning</p>
            </div>
            <div className="text-right text-white">
              <p className="text-sm opacity-75">Learn • Practice • Win</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-gray-800 shadow-md border-b border-gray-700">
        <div className="container mx-auto px-4">
          <nav className="flex gap-2">
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-6 py-4 font-semibold transition-colors relative ${
                activeTab === 'learn'
                  ? 'text-blue-400 bg-gray-900'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              📚 Learn the Rules
              {activeTab === 'learn' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('calculator')}
              className={`px-6 py-4 font-semibold transition-colors relative ${
                activeTab === 'calculator'
                  ? 'text-blue-400 bg-gray-900'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              🧮 Pot Odds Calculator
              {activeTab === 'calculator' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab('practice')}
              className={`px-6 py-4 font-semibold transition-colors relative ${
                activeTab === 'practice'
                  ? 'text-blue-400 bg-gray-900'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700'
              }`}
            >
              🎮 Practice Game
              {activeTab === 'practice' && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-400"></div>
              )}
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'learn' && (
          <div className="animate-fadeIn">
            <div className="mb-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-3">Welcome to Poker Academy! 🎓</h2>
              <p className="text-lg opacity-90 mb-2">
                Texas Hold'em is the most popular variant of poker. Each player receives 2 private cards (hole cards), 
                and 5 community cards are dealt face-up on the table.
              </p>
              <p className="opacity-90">
                Your goal is to make the best 5-card hand using any combination of your 2 hole cards and the 5 community cards.
              </p>
            </div>
            <HandRankings />
            
            <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Basic Game Flow</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
                  <h4 className="font-bold text-lg mb-2 text-gray-800">1. Pre-Flop</h4>
                  <p className="text-gray-600">Each player receives 2 hole cards. First betting round begins.</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
                  <h4 className="font-bold text-lg mb-2 text-gray-800">2. The Flop</h4>
                  <p className="text-gray-600">3 community cards are dealt face-up. Second betting round.</p>
                </div>
                <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-500">
                  <h4 className="font-bold text-lg mb-2 text-gray-800">3. The Turn</h4>
                  <p className="text-gray-600">Fourth community card is dealt. Third betting round.</p>
                </div>
                <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-500">
                  <h4 className="font-bold text-lg mb-2 text-gray-800">4. The River</h4>
                  <p className="text-gray-600">Fifth and final community card. Final betting round and showdown.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="animate-fadeIn">
            <div className="mb-8 bg-gradient-to-r from-green-600 to-teal-600 rounded-lg p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-3">Master Pot Odds 📊</h2>
              <p className="text-lg opacity-90">
                Pot odds are one of the most important concepts in poker. They help you make mathematically sound decisions 
                about whether to call, fold, or raise based on the potential return vs. the cost.
              </p>
            </div>
            <PotOddsCalculator />
          </div>
        )}

        {activeTab === 'practice' && (
          <div className="animate-fadeIn">
            <div className="mb-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-3">Practice Makes Perfect 🎮</h2>
              <p className="text-lg opacity-90">
                Play practice hands and get real-time feedback on your decisions. Watch your equity change as the hand develops 
                and learn when to fold, call, or raise.
              </p>
            </div>
            <PracticeGame />
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 mt-12 py-6">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>Built with Next.js and deployed on Vercel</p>
          <p className="text-sm mt-2">Learn responsibly. Practice makes perfect! 🃏</p>
        </div>
      </footer>
    </main>
  );
}
