import { useState } from "react";
import { nanoid } from "nanoid";
import Die from "./Die.jsx";

export default function App() {
  const [dice, setDice] = useState(generateAllNewDice());

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
  //When a dice is held, isHeld is toggled
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

  //Update the state of the values
  function rollDice() {
    setDice(generateAllNewDice());
  }

  return (
    <main>
      <div className="dice-container">{diceElements}</div>

      <button className="roll-btn" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
