'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, RefreshCw, Swords, Trophy, X, CircleIcon as Circle, Star } from 'lucide-react'
import Link from 'next/link'
import { useState, useEffect, useCallback, useRef } from 'react'
import { usePlusGamePointMutation } from '@/queries/useAccount'
import { toast } from '@/components/ui/use-toast'
import configRoute from '@/config/route'

type Player = 'X' | 'O'
type BoardState = (Player | null)[]

// Thuật toán Minimax cho AI
const minimax = (board: BoardState, depth: number, isMaximizing: boolean): number => {
  const winner = checkWinner(board)
  if (winner === 'O') return 10 - depth
  if (winner === 'X') return depth - 10
  if (isBoardFull(board)) return 0

  if (isMaximizing) {
    let bestScore = -Infinity
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'O'
        const score = minimax(board, depth + 1, false)
        board[i] = null
        bestScore = Math.max(score, bestScore)
      }
    }
    return bestScore
  } else {
    let bestScore = Infinity
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = 'X'
        const score = minimax(board, depth + 1, true)
        board[i] = null
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore
  }
}

// Kiểm tra người thắng
const checkWinner = (board: BoardState): Player | 'Draw' | null => {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // columns
    [0, 4, 8],
    [2, 4, 6] // diagonals
  ]

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  if (isBoardFull(board)) return 'Draw'
  return null
}

// Kiểm tra bảng đã đầy chưa
const isBoardFull = (board: BoardState): boolean => {
  return !board.includes(null)
}

export default function TicTacToeGamePage() {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X')
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null)
  const [xWins, setXWins] = useState(0)
  const [oWins, setOWins] = useState(0)
  const [draws, setDraws] = useState(0)
  const [gamePoints, setGamePoints] = useState(0)
  const [pointsAwarded, setPointsAwarded] = useState(false)
  const [consecutiveWins, setConsecutiveWins] = useState(0)

  // Use a ref to track game state changes
  const gameStateRef = useRef({
    resultProcessed: false
  })

  const plusGamePointMutation = usePlusGamePointMutation()

  // AI move
  const makeAIMove = useCallback(() => {
    if (currentPlayer === 'O' && !winner) {
      let bestScore = -Infinity
      let bestMove = 0

      for (let i = 0; i < board.length; i++) {
        if (!board[i]) {
          board[i] = 'O'
          const score = minimax(board, 0, false)
          board[i] = null

          if (score > bestScore) {
            bestScore = score
            bestMove = i
          }
        }
      }

      const newBoard = [...board]
      newBoard[bestMove] = 'O'
      setBoard(newBoard)
      setCurrentPlayer('X')
    }
  }, [board, currentPlayer, winner])

  // Check for winner after each move
  useEffect(() => {
    const result = checkWinner(board)

    // Only process result if it exists and hasn't been processed yet for this game
    if (result && !gameStateRef.current.resultProcessed) {
      setWinner(result)
      gameStateRef.current.resultProcessed = true

      if (result === 'X') {
        // Player wins
        setXWins((prev) => prev + 1)
        setConsecutiveWins((prev) => prev + 1)

        // Award points if not already awarded for this game
        if (!pointsAwarded) {
          // Fixed points amount - consistent 2 points per win
          const newPoints = 2
          setGamePoints((prev) => prev + newPoints)

          plusGamePointMutation.mutate(
            { point: newPoints },
            {
              onSuccess: () => {
                toast({
                  title: 'Cập nhật điểm thành công',
                  description: `Bạn đã nhận được ${newPoints} điểm!`
                })
                setPointsAwarded(true)
              },
              onError: () => {
                toast({
                  title: 'Không thể cập nhật điểm',
                  description: 'Đã xảy ra lỗi khi cập nhật điểm',
                  variant: 'destructive'
                })
              }
            }
          )
        }
      } else if (result === 'O') {
        // AI wins - reset consecutive wins counter
        setOWins((prev) => prev + 1)
        setConsecutiveWins(0)
      } else {
        // Draw - maintain consecutive wins counter
        setDraws((prev) => prev + 1)
      }
    }
  }, [board, plusGamePointMutation, pointsAwarded, consecutiveWins])

  // AI's turn
  useEffect(() => {
    if (currentPlayer === 'O') {
      const timer = setTimeout(makeAIMove, 500) // Delay để tạo cảm giác AI đang suy nghĩ
      return () => clearTimeout(timer)
    }
  }, [currentPlayer, makeAIMove])

  const handleClick = (index: number) => {
    if (board[index] || winner || currentPlayer !== 'X') return

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)
    setCurrentPlayer('O')
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setCurrentPlayer('X')
    setWinner(null)
    setPointsAwarded(false)
    // Reset the result processed flag for the new game
    gameStateRef.current.resultProcessed = false
  }

  const renderCell = (index: number) => {
    return (
      <button
        key={`cell-${index}`}
        className={`
          aspect-square flex items-center justify-center text-4xl font-bold 
          border border-slate-200 bg-white hover:bg-slate-50 cursor-pointer
          transition-colors duration-200
          ${board[index] === 'X' ? 'text-rose-500' : board[index] === 'O' ? 'text-indigo-500' : ''}
        `}
        onClick={() => handleClick(index)}
        disabled={!!winner || currentPlayer !== 'X'}
      >
        {board[index] === 'X' && <X className='w-10 h-10 text-rose-500' />}
        {board[index] === 'O' && <Circle className='w-10 h-10 text-indigo-500' />}
      </button>
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* Game Header */}
      <div className='flex items-center justify-between mb-8'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center'>
            <Swords className='w-6 h-6 text-white' />
          </div>
          <div>
            <h2 className='text-2xl font-bold text-slate-800'>Tic Tac Toe</h2>
            <p className='text-slate-600'>Trò chơi cờ ca rô thú vị</p>
          </div>
        </div>

        <Link href={configRoute.kid.game}>
          <Button variant='ghost' className='text-slate-600 hover:text-rose-600'>
            <ArrowLeft className='h-5 w-5 mr-2' />
            Quay lại
          </Button>
        </Link>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
        {/* Game Area */}
        <div className='lg:col-span-3 space-y-6'>
          {/* Game Stats */}
          <div className='grid grid-cols-3 gap-4'>
            <Card className='p-4 bg-gradient-to-br from-rose-50 to-pink-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-rose-100'>
                  <X className='w-5 h-5 text-rose-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>{xWins}</div>
                  <div className='text-sm text-slate-600'>X thắng</div>
                </div>
              </div>
            </Card>

            <Card className='p-4 bg-gradient-to-br from-indigo-50 to-purple-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-indigo-100'>
                  <Circle className='w-5 h-5 text-indigo-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>{oWins}</div>
                  <div className='text-sm text-slate-600'>O thắng</div>
                </div>
              </div>
            </Card>

            <Card className='p-4 bg-gradient-to-br from-amber-50 to-orange-50'>
              <div className='flex items-start gap-3'>
                <div className='p-2 rounded-lg bg-amber-100'>
                  <Star className='w-5 h-5 text-amber-600' />
                </div>
                <div>
                  <div className='text-2xl font-bold text-slate-800'>{draws}</div>
                  <div className='text-sm text-slate-600'>Hòa</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Game Board */}
          <Card className='border-0 shadow-md overflow-hidden'>
            <div className='bg-gradient-to-r from-rose-500 to-purple-600 p-4 text-white'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center gap-2'>
                  <Swords className='h-5 w-5' />
                  <h2 className='font-bold'>Lượt chơi</h2>
                </div>
                {!winner && (
                  <div className='flex items-center gap-2'>
                    <span>Lượt:</span>
                    {currentPlayer === 'X' ? (
                      <X className='w-5 h-5 text-rose-200' />
                    ) : (
                      <Circle className='w-5 h-5 text-indigo-200' />
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className='p-6'>
              <div className='grid grid-cols-3 gap-2 max-w-md mx-auto'>
                {Array(9)
                  .fill(null)
                  .map((_, index) => renderCell(index))}
              </div>
            </div>
          </Card>
        </div>

        {/* Game Info & Controls */}
        <div className='space-y-6'>
          {/* Current Game Info */}
          <Card className='border-0 shadow-md overflow-hidden'>
            <div className='bg-gradient-to-r from-slate-700 to-slate-800 p-4 text-white'>
              <h2 className='font-bold flex items-center'>
                <Trophy className='h-5 w-5 mr-2' />
                Thông tin trận đấu
              </h2>
            </div>

            <div className='p-6 space-y-6'>
              {winner && (
                <div className='text-center'>
                  <div className='text-3xl font-bold mb-2'>
                    {winner === 'Draw' ? (
                      <span className='text-amber-500'>Hòa!</span>
                    ) : winner === 'X' ? (
                      <span className='text-rose-500'>X Thắng!</span>
                    ) : (
                      <span className='text-indigo-500'>O Thắng!</span>
                    )}
                  </div>
                  {winner === 'X' && pointsAwarded && (
                    <div className='mb-4 p-2 bg-rose-50 rounded text-rose-600 text-sm font-medium'>
                      +2 điểm game ({consecutiveWins} thắng liên tiếp)
                    </div>
                  )}
                </div>
              )}

              <div className='space-y-4'>
                <div className='flex items-center justify-between pb-3 border-b border-slate-100'>
                  <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center'>
                      <X className='w-5 h-5 text-rose-500' />
                    </div>
                    <span className='font-medium text-slate-800'>Người chơi X</span>
                  </div>
                  <span className='text-xl font-bold text-rose-500'>{xWins}</span>
                </div>

                <div className='flex items-center justify-between pb-3 border-b border-slate-100'>
                  <div className='flex items-center gap-2'>
                    <div className='w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center'>
                      <Circle className='w-5 h-5 text-indigo-500' />
                    </div>
                    <span className='font-medium text-slate-800'>Người chơi O</span>
                  </div>
                  <span className='text-xl font-bold text-indigo-500'>{oWins}</span>
                </div>

                <div className='flex items-center justify-between pt-2'>
                  <span className='font-medium text-slate-800'>Tổng điểm</span>
                  <span className='text-xl font-bold text-purple-500'>{gamePoints}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Game Controls */}
          <Card className='p-6 border-0 shadow-md'>
            <div className='space-y-3'>
              <Button onClick={resetGame} className='w-full bg-rose-500 hover:bg-rose-600 text-white'>
                <RefreshCw className='w-4 h-4 mr-2' />
                Ván mới
              </Button>
            </div>
          </Card>

          {/* Game Rules */}
          <Card className='border-0 shadow-md overflow-hidden'>
            <div className='p-6'>
              <h3 className='font-bold text-slate-800 mb-3'>Luật chơi</h3>
              <ul className='space-y-2 text-sm text-slate-600'>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    1
                  </div>
                  <span>Hai người chơi lần lượt đánh X và O vào bảng 3x3.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    2
                  </div>
                  <span>Người đầu tiên tạo được một hàng ngang, dọc hoặc chéo sẽ thắng.</span>
                </li>
                <li className='flex items-start gap-2'>
                  <div className='w-5 h-5 rounded-full bg-slate-100 flex-shrink-0 flex items-center justify-center text-xs font-medium text-slate-600 mt-0.5'>
                    3
                  </div>
                  <span>Nếu bảng đầy mà không ai thắng, trò chơi sẽ hòa.</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
