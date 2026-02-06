'use client';

import { useState, useEffect } from 'react';
import { Card as CardType, createDeck, shuffleDeck, evaluateHand, calculateEquity, HandRank } from '@/lib/poker';
import Card from './Card';

type GamePhase = 'preflop' | 'flop' | 'turn' | 'river' | 'showdown';

interface GameState {
  playerHand: CardType[];
  opponentHand: CardType[];
  communityCards: CardType[];
  deck: CardType[];
  phase: GamePhase;
  pot: number;
  playerChips: number;
  opponentChips: number;
  currentBet: number;
  playerBet: number;
  opponentBet: number;
  feedback: string;
  showOpponentCards: boolean;
}

export default function PracticeGame() {
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [selectedAction, setSelectedAction] = useState<string>('');

  const initializeGame = () => {
    const deck = shuffleDeck(createDeck());
    const playerHand = [deck[0], deck[1]];
    const opponentHand = [deck[2], deck[3]];
    const remainingDeck = deck.slice(4);

    setGameState({
      playerHand,
      opponentHand,
      communityCards: [],
      deck: remainingDeck,
      phase: 'preflop',
      pot: 30, // Small blind (10) + Big blind (20)
      playerChips: 980,
      opponentChips: 990,
      currentBet: 20,
      playerBet: 10,
      opponentBet: 20,
      feedback: 'New hand started. You are in the small blind position.',
      showOpponentCards: false,
    });
    setSelectedAction('');
  };

  useEffect(() => {
    if (!gameState) {
      initializeGame();
    }
  }, []);

  if (!gameState) return <div>Loading...</div>;

  const handleAction = (action: 'fold' | 'call' | 'raise') => {
    if (!gameState) return;

    let newState = { ...gameState };
    let feedback = '';

    switch (action) {
      case 'fold':
        feedback = '❌ You folded. The opponent wins the pot. Good fold if you had a weak hand!';
        newState.showOpponentCards = true;
        newState.opponentChips += newState.pot;
        newState.pot = 0;
        break;

      case 'call':
        const toCall = newState.currentBet - newState.playerBet;
        newState.playerChips -= toCall;
        newState.playerBet = newState.currentBet;
        newState.pot += toCall;
        feedback = `✓ You called $${toCall}. Moving to next phase.`;
        newState = advancePhase(newState);
        break;

      case 'raise':
        const raiseAmount = 40;
        const totalCost = raiseAmount + (newState.currentBet - newState.playerBet);
        newState.playerChips -= totalCost;
        newState.playerBet += totalCost;
        newState.currentBet = newState.playerBet;
        newState.pot += totalCost;
        feedback = `💪 You raised to $${newState.currentBet}. Aggressive play!`;
        
        // Opponent responds (simplified AI)
        if (Math.random() > 0.5) {
          const opponentCall = newState.currentBet - newState.opponentBet;
          newState.opponentChips -= opponentCall;
          newState.opponentBet = newState.currentBet;
          newState.pot += opponentCall;
          feedback += ' Opponent calls.';
          newState = advancePhase(newState);
        } else {
          feedback += ' Opponent folds! You win the pot! 🎉';
          newState.playerChips += newState.pot;
          newState.pot = 0;
          newState.showOpponentCards = true;
        }
        break;
    }

    newState.feedback = feedback;
    setGameState(newState);
    setSelectedAction(action);
  };

  const advancePhase = (state: GameState): GameState => {
    const newState = { ...state };
    
    switch (state.phase) {
      case 'preflop':
        // Deal flop (3 cards)
        newState.communityCards = [state.deck[0], state.deck[1], state.deck[2]];
        newState.deck = state.deck.slice(3);
        newState.phase = 'flop';
        newState.currentBet = 0;
        newState.playerBet = 0;
        newState.opponentBet = 0;
        break;

      case 'flop':
        // Deal turn (1 card)
        newState.communityCards = [...state.communityCards, state.deck[0]];
        newState.deck = state.deck.slice(1);
        newState.phase = 'turn';
        newState.currentBet = 0;
        newState.playerBet = 0;
        newState.opponentBet = 0;
        break;

      case 'turn':
        // Deal river (1 card)
        newState.communityCards = [...state.communityCards, state.deck[0]];
        newState.deck = state.deck.slice(1);
        newState.phase = 'river';
        newState.currentBet = 0;
        newState.playerBet = 0;
        newState.opponentBet = 0;
        break;

      case 'river':
        // Showdown
        newState.phase = 'showdown';
        newState.showOpponentCards = true;
        
        const playerAllCards = [...state.playerHand, ...state.communityCards];
        const opponentAllCards = [...state.opponentHand, ...state.communityCards];
        
        const playerResult = evaluateHand(playerAllCards);
        const opponentResult = evaluateHand(opponentAllCards);
        
        if (playerResult.score > opponentResult.score) {
          newState.feedback = `🎉 You win with ${playerResult.rank}! Opponent had ${opponentResult.rank}.`;
          newState.playerChips += newState.pot;
        } else if (opponentResult.score > playerResult.score) {
          newState.feedback = `😔 Opponent wins with ${opponentResult.rank}. You had ${playerResult.rank}.`;
          newState.opponentChips += newState.pot;
        } else {
          newState.feedback = `🤝 Split pot! Both have ${playerResult.rank}.`;
          newState.playerChips += newState.pot / 2;
          newState.opponentChips += newState.pot / 2;
        }
        newState.pot = 0;
        break;
    }
    
    return newState;
  };

  const playerHandEvaluation = evaluateHand([...gameState.playerHand, ...gameState.communityCards]);
  const equity = calculateEquity(gameState.playerHand, gameState.communityCards);

  return (
    <div className="bg-gradient-to-br from-poker-green to-poker-felt rounded-lg shadow-2xl p-8 max-w-6xl mx-auto text-white">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold mb-2">Practice Game</h2>
          <p className="text-green-200">Phase: {gameState.phase.toUpperCase()}</p>
        </div>
        <button
          onClick={initializeGame}
          className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors"
        >
          New Hand
        </button>
      </div>

      {/* Opponent */}
      <div className="mb-8 text-center">
        <div className="flex justify-center gap-2 mb-4">
          {gameState.opponentHand.map((card, i) => (
            <Card key={i} card={card} faceDown={!gameState.showOpponentCards} />
          ))}
        </div>
        <div className="bg-black bg-opacity-30 rounded-lg p-3 inline-block">
          <p className="font-semibold">Opponent Chips: ${gameState.opponentChips}</p>
        </div>
      </div>

      {/* Community Cards */}
      <div className="mb-8">
        <div className="bg-black bg-opacity-40 rounded-xl p-6">
          <div className="flex justify-center gap-2 mb-4">
            {gameState.communityCards.length > 0 ? (
              gameState.communityCards.map((card, i) => (
                <Card key={i} card={card} />
              ))
            ) : (
              <p className="text-green-200 text-xl">Waiting for flop...</p>
            )}
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">POT: ${gameState.pot}</p>
          </div>
        </div>
      </div>

      {/* Player */}
      <div className="mb-6 text-center">
        <div className="flex justify-center gap-2 mb-4">
          {gameState.playerHand.map((card, i) => (
            <Card key={i} card={card} />
          ))}
        </div>
        <div className="bg-black bg-opacity-30 rounded-lg p-3 inline-block mb-4">
          <p className="font-semibold">Your Chips: ${gameState.playerChips}</p>
          <p className="text-sm text-green-200">Current Hand: {playerHandEvaluation.rank}</p>
          <p className="text-sm text-green-200">Estimated Equity: {(equity * 100).toFixed(1)}%</p>
        </div>
      </div>

      {/* Actions */}
      {gameState.pot > 0 && gameState.phase !== 'showdown' && (
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => handleAction('fold')}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Fold
          </button>
          <button
            onClick={() => handleAction('call')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Call ${gameState.currentBet - gameState.playerBet}
          </button>
          <button
            onClick={() => handleAction('raise')}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition-colors text-lg"
          >
            Raise
          </button>
        </div>
      )}

      {/* Feedback */}
      <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
        <p className="text-lg">{gameState.feedback}</p>
      </div>

      {/* Learning Tips */}
      <div className="mt-6 bg-yellow-900 bg-opacity-30 rounded-lg p-4 border-2 border-yellow-500">
        <p className="text-yellow-100">
          <strong>💡 Tip:</strong> Consider your equity vs pot odds. If your equity is higher than 
          the percentage of the pot you need to call, it's usually profitable to call!
        </p>
      </div>
    </div>
  );
}
