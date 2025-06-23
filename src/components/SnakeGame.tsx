import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from './ui/button';
import { RefreshCw } from 'lucide-react';

// Types
interface Position {
  x: number;
  y: number;
}

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

interface GameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  isGameOver: boolean;
  isPaused: boolean;
  score: number;
}

// Constants
const CELL_SIZE = 15;
const GAME_SPEED = 100; // ms
const BOARD_WIDTH = 20;
const BOARD_HEIGHT = 20;
const INITIAL_SNAKE_LENGTH = 3;

// Colors
const COLORS = {
  background: '#1a1a1a',
  snake: '#10b981', // Green color matching the primary button
  food: '#ef4444', // Red color for food
  border: '#333333',
  text: '#ffffff',
};

const SnakeGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [gameState, setGameState] = useState<GameState>(() => initGameState());
  const [gameLoopId, setGameLoopId] = useState<number | null>(null);
  const [canvasSize, setCanvasSize] = useState({ width: 300, height: 300 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Initialize game state
  function initGameState(): GameState {
    // Create initial snake in the middle of the board
    const snake: Position[] = [];
    const midX = Math.floor(BOARD_WIDTH / 2);
    const midY = Math.floor(BOARD_HEIGHT / 2);
    
    for (let i = 0; i < INITIAL_SNAKE_LENGTH; i++) {
      snake.push({ x: midX - i, y: midY });
    }

    return {
      snake,
      food: generateFood(snake),
      direction: 'RIGHT',
      nextDirection: 'RIGHT',
      isGameOver: false,
      isPaused: false,
      score: 0,
    };
  }

  // Generate food at a random position that's not occupied by the snake
  function generateFood(snake: Position[]): Position {
    const food: Position = {
      x: Math.floor(Math.random() * BOARD_WIDTH),
      y: Math.floor(Math.random() * BOARD_HEIGHT),
    };

    // Check if food is on the snake
    const isOnSnake = snake.some(segment => segment.x === food.x && segment.y === food.y);
    if (isOnSnake) {
      return generateFood(snake); // Recursively try again
    }

    return food;
  }

  // Draw the game on canvas
  const drawGame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = canvas;
    const cellWidth = width / BOARD_WIDTH;
    const cellHeight = height / BOARD_HEIGHT;

    // Clear canvas
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, width, height);

    // Draw grid (optional)
    ctx.strokeStyle = COLORS.border;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= BOARD_WIDTH; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellWidth, 0);
      ctx.lineTo(i * cellWidth, height);
      ctx.stroke();
    }
    for (let i = 0; i <= BOARD_HEIGHT; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellHeight);
      ctx.lineTo(width, i * cellHeight);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = COLORS.food;
    ctx.beginPath();
    ctx.arc(
      gameState.food.x * cellWidth + cellWidth / 2,
      gameState.food.y * cellHeight + cellHeight / 2,
      Math.min(cellWidth, cellHeight) / 2,
      0,
      2 * Math.PI
    );
    ctx.fill();

    // Draw snake
    ctx.fillStyle = COLORS.snake;
    gameState.snake.forEach((segment, index) => {
      // Draw rounded rectangle for the snake head
      if (index === 0) {
        const radius = Math.min(cellWidth, cellHeight) / 4;
        const x = segment.x * cellWidth;
        const y = segment.y * cellHeight;
        const width = cellWidth;
        const height = cellHeight;
        
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.arcTo(x + width, y, x + width, y + height, radius);
        ctx.arcTo(x + width, y + height, x, y + height, radius);
        ctx.arcTo(x, y + height, x, y, radius);
        ctx.arcTo(x, y, x + width, y, radius);
        ctx.closePath();
        ctx.fill();
        
        // Draw eyes
        ctx.fillStyle = '#ffffff';
        const eyeSize = radius / 2;
        const eyeOffset = radius;
        
        // Position eyes based on direction
        let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
        
        switch (gameState.direction) {
          case 'UP':
            leftEyeX = x + width / 3;
            leftEyeY = y + height / 3;
            rightEyeX = x + width * 2/3;
            rightEyeY = y + height / 3;
            break;
          case 'DOWN':
            leftEyeX = x + width / 3;
            leftEyeY = y + height * 2/3;
            rightEyeX = x + width * 2/3;
            rightEyeY = y + height * 2/3;
            break;
          case 'LEFT':
            leftEyeX = x + width / 3;
            leftEyeY = y + height / 3;
            rightEyeX = x + width / 3;
            rightEyeY = y + height * 2/3;
            break;
          case 'RIGHT':
          default:
            leftEyeX = x + width * 2/3;
            leftEyeY = y + height / 3;
            rightEyeX = x + width * 2/3;
            rightEyeY = y + height * 2/3;
            break;
        }
        
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = COLORS.snake;
      } else {
        // Draw body segments slightly smaller for a segmented look
        ctx.fillRect(
          segment.x * cellWidth + 1,
          segment.y * cellHeight + 1,
          cellWidth - 2,
          cellHeight - 2
        );
      }
    });

    // Draw game over overlay
    if (gameState.isGameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = COLORS.text;
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('GAME OVER', width / 2, height / 2 - 15);
      
      ctx.font = '16px sans-serif';
      ctx.fillText(`Score: ${gameState.score}`, width / 2, height / 2 + 15);
      ctx.fillText('Press SPACE to restart', width / 2, height / 2 + 40);
    }
    
    // Draw pause overlay
    if (gameState.isPaused && !gameState.isGameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, width, height);
      
      ctx.fillStyle = COLORS.text;
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('PAUSED', width / 2, height / 2);
      ctx.font = '16px sans-serif';
      ctx.fillText('Press SPACE to continue', width / 2, height / 2 + 30);
    }
  }, [gameState]);

  // Update game state
  const updateGame = useCallback(() => {
    if (gameState.isGameOver || gameState.isPaused) return;

    setGameState(prevState => {
      // Update direction from nextDirection
      const direction = prevState.nextDirection;
      
      // Calculate new head position
      const head = { ...prevState.snake[0] };
      
      switch (direction) {
        case 'UP':
          head.y -= 1;
          break;
        case 'DOWN':
          head.y += 1;
          break;
        case 'LEFT':
          head.x -= 1;
          break;
        case 'RIGHT':
          head.x += 1;
          break;
      }

      // Check for wall collision (wrap around)
      if (head.x < 0) head.x = BOARD_WIDTH - 1;
      if (head.x >= BOARD_WIDTH) head.x = 0;
      if (head.y < 0) head.y = BOARD_HEIGHT - 1;
      if (head.y >= BOARD_HEIGHT) head.y = 0;

      // Check for self collision
      const selfCollision = prevState.snake.some(
        (segment, index) => index > 0 && segment.x === head.x && segment.y === head.y
      );
      
      if (selfCollision) {
        return { ...prevState, isGameOver: true };
      }

      // Create new snake array with new head
      const newSnake = [head, ...prevState.snake];
      
      // Check for food collision
      let newFood = prevState.food;
      let newScore = prevState.score;
      
      if (head.x === prevState.food.x && head.y === prevState.food.y) {
        // Snake ate the food
        newFood = generateFood(newSnake);
        newScore += 10;
      } else {
        // Remove tail if no food was eaten
        newSnake.pop();
      }

      return {
        ...prevState,
        snake: newSnake,
        food: newFood,
        direction,
        score: newScore,
      };
    });
  }, [gameState.isGameOver, gameState.isPaused]);

  // Game loop
  useEffect(() => {
    if (gameState.isGameOver || gameState.isPaused) {
      if (gameLoopId !== null) {
        clearInterval(gameLoopId);
        setGameLoopId(null);
      }
      return;
    }

    if (gameLoopId === null) {
      const id = setInterval(() => {
        updateGame();
      }, GAME_SPEED);
      setGameLoopId(id);
    }

    return () => {
      if (gameLoopId !== null) {
        clearInterval(gameLoopId);
      }
    };
  }, [gameState.isGameOver, gameState.isPaused, gameLoopId, updateGame]);

  // Draw on canvas when game state changes
  useEffect(() => {
    drawGame();
  }, [gameState, drawGame]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState.isGameOver) {
        if (e.code === 'Space') {
          setGameState(initGameState());
        }
        return;
      }

      if (e.code === 'Space') {
        setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
        return;
      }

      if (gameState.isPaused) return;

      // Change direction, but prevent 180-degree turns
      setGameState(prevState => {
        let nextDirection = prevState.nextDirection;

        switch (e.code) {
          case 'ArrowUp':
          case 'KeyW':
            if (prevState.direction !== 'DOWN') {
              nextDirection = 'UP';
            }
            break;
          case 'ArrowDown':
          case 'KeyS':
            if (prevState.direction !== 'UP') {
              nextDirection = 'DOWN';
            }
            break;
          case 'ArrowLeft':
          case 'KeyA':
            if (prevState.direction !== 'RIGHT') {
              nextDirection = 'LEFT';
            }
            break;
          case 'ArrowRight':
          case 'KeyD':
            if (prevState.direction !== 'LEFT') {
              nextDirection = 'RIGHT';
            }
            break;
        }

        return { ...prevState, nextDirection };
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState.isGameOver, gameState.isPaused]);

  // Resize canvas to fit container
  useEffect(() => {
    const updateCanvasSize = () => {
      if (containerRef.current) {
        // Make the canvas square but fit within the container
        const containerWidth = containerRef.current.clientWidth;
        const size = Math.min(containerWidth, 400); // Max size of 400px
        setCanvasSize({ width: size, height: size });
      }
    };

    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  // Restart game
  const handleRestart = () => {
    setGameState(initGameState());
  };

  // Toggle pause
  const handleTogglePause = () => {
    setGameState(prev => ({ ...prev, isPaused: !prev.isPaused }));
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="flex items-center justify-between w-full">
        <div className="text-lg font-medium">Score: {gameState.score}</div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleTogglePause}
            disabled={gameState.isGameOver}
          >
            {gameState.isPaused ? 'Resume' : 'Pause'}
          </Button>
          <Button
            size="sm"
            onClick={handleRestart}
          >
            <RefreshCw className="h-4 w-4 mr-1" />
            Restart
          </Button>
        </div>
      </div>
      
      <div 
        ref={containerRef}
        className="w-full border border-border rounded-md bg-background overflow-hidden"
      >
        <canvas
          ref={canvasRef}
          width={canvasSize.width}
          height={canvasSize.height}
          className="block"
        />
      </div>
      
      <div className="text-sm text-center text-muted-foreground">
        Use arrow keys or WASD to control the snake.<br />
        Press SPACE to pause/resume.
      </div>
    </div>
  );
};

export default SnakeGame;
