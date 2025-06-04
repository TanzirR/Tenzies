import { useState } from "react"
import Die from "./Die.jsx"


export default function App(){

  const [values, setValues] = useState(generateAllNewDice()) 

  const diceElements = values.map(function(value){
    return (<Die value =  {value}/>)
  })

  //Generate an array of 10 numbers between 1 and 6 inclusive 
  function generateAllNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            const randNum = Math.ceil(Math.random() * 6)
            newDice.push(randNum)
        }
        return newDice
  }

  //Update the state of the values 
  function rollDice(){
    setValues(generateAllNewDice())
  }

  return (
    <main>
      <div className = "dice-container">
        {diceElements}
      </div>
      
      <button className="roll-btn" onClick={rollDice}>Roll</button>

    </main>
    
  )
}