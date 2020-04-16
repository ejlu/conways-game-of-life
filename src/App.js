import React from 'react'
import Board from './Board'
import './App.css'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      game: new Board(25, 25),
      playInterval: null,
    }
    this.click = this.click.bind(this)
    this.step = this.step.bind(this)
    this.play = this.play.bind(this)
    this.randomize = this.randomize.bind(this)
    this.clear = this.clear.bind(this)
    this.clearPlayInterval = this.clearPlayInterval.bind(this)
  }

  clearPlayInterval() {
    if (this.state.playInterval) {
      clearInterval(this.state.playInterval)
      this.setState({ playInterval: null })
    }
  }

  click(event) {
    const coord = event.target.getAttribute('dataset').split(',')
    const row = +coord[0]
    const col = +coord[1]
    const newGame = Object.assign(this.state.game)
    newGame.board[row][col] = Math.abs(newGame.board[row][col] - 1)
    this.setState({ game: newGame })
  }

  step() {
    const newGame = Object.assign(this.state.game)
    newGame.tick()
    this.setState({ game: newGame })
  }

  play() {
    if (!this.state.playInterval) {
      this.setState({
        playInterval: setInterval(() => {
          this.step()
        }, 500),
      })
    } else {
      clearInterval(this.state.playInterval)
      this.setState({ playInterval: null })
    }
  }

  randomize() {
    this.clearPlayInterval()
    for (let i = 0; i < this.state.game.rows; i++) {
      for (let j = 0; j < this.state.game.cols; j++) {
        const newGame = Object.assign(this.state.game)
        newGame.board[i][j] = Math.round(Math.random())
        this.setState({ game: newGame })
      }
    }
  }

  clear() {
    this.clearPlayInterval()
    this.setState({ game: new Board(25, 25) })
  }

  render() {
    return (
      <div className="container">
        <h1>
          <a
            href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
            rel="noopener noreferrer"
            target="_blank"
          >
            Conway's Game of Life
          </a>
        </h1>
        <table className="board">
          <tbody>
            {this.state.game.board.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((col, colIndex) => (
                  <td
                    className={col === 1 ? 'alive' : ''}
                    key={colIndex}
                    onClick={(e) => this.click(e)}
                    dataset={`${rowIndex},${colIndex}`}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="controls">
          <button className="button" onClick={() => this.step()}>
            Step
          </button>
          <button className="button" onClick={() => this.play()}>
            Play/Pause
          </button>
          <button className="button" onClick={() => this.randomize()}>
            Randomize
          </button>
          <button className="button" onClick={() => this.clear()}>
            Clear
          </button>
        </div>
        <footer>
          <p>
            <a
              href="https://github.com/ejlu/conways-game-of-life"
              rel="noopener noreferrer"
              target="_blank"
            >
              Made by Edward Lu
            </a>
          </p>
        </footer>
      </div>
    )
  }
}

export default App
