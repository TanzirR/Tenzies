import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import Die from "./Die.jsx";

export default function App() {
  const [dice, setDice] = useState(() => generateAllNewDice());

  //Check if the game is won
  /**
   * 1. All dice are being held
   * 2. all the dice have the same value
   */
  function gameWon() {
    if (
      dice.every((die) => die.isHeld) &&
      dice.every((die) => die.value === dice[0].value)
    ) {
      return true;
    }
  }
  const won = gameWon();

  //Generate an array of 10 numbers between 1 and 6 inclusive
  function generateAllNewDice() {
    // newDice is an array of objs: { value: <random number>, isHeld: false }
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      const randNum = Math.ceil(Math.random() * 6);
      newDice.push({ id: nanoid(), value: randNum, isHeld: false });
    }
    return newDice;
  }

  //Map over the newDice to display the 10 die
  const diceElements = dice.map(function (diceObj) {
    return (
      <Die
        key={diceObj.id}
        value={diceObj.value}
        isHeld={diceObj.isHeld}
        hold={() => hold(diceObj.id)}
      />
    );
  });

  //When a dice is held, isHeld is toggled to true
  function hold(id) {
    setDice((prevDice) => {
      return prevDice.map((prev) => {
        if (id === prev.id) {
          return { ...prev, isHeld: !prev.isHeld };
        } else {
          return prev;
        }
      });
    });
  }

  //Only update the state of the values whose isHeld is false
  // if game is won, start a new game
  function rollDice() {
    if (!won) {
      setDice((prevDice) => {
        return prevDice.map((prev) => {
          if (prev.isHeld === false) {
            return { ...prev, value: Math.ceil(Math.random() * 6) };
          } else {
            return prev;
          }
        });
      });
    } else {
      return setDice(generateAllNewDice());
    }
  }

  return (
    <main>
      {won && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="game-instruction">
        <h1>TENZIES</h1>
        <p>
          Roll until all dice are the same. Click on each die to freeze it at
          its current value between rolls.
        </p>
      </div>
      <div className="dice-container">{diceElements}</div>

      <button className="roll-btn" onClick={rollDice}>
        {won ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
