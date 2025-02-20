import './App.css';
import ParticlesComponent from './ParticlesComponent';
import { TextField } from '@mui/material';

import React, { useState, useEffect } from 'react';

const minLevel = 0;
const maxLevel = 544;

function setNumberBox(boxValue)
{
  if (isNaN(parseInt(boxValue)))
  {
    return 0;
  }
  else
  {
    var val = Math.max(minLevel, parseInt(boxValue) )
    val = Math.min(maxLevel, parseInt(boxValue) )

    if (val < 0)
      return 0;

    return val;
  }
} 

function App() {

  const [echoes, setEchoes] = useState("0");
  const [currentLevel, setCurrentLevel] = useState(12);
  const [targetLevel, setTargetLevel] = useState(13);
  const [errorText, setErrorText] = useState("None");

  useEffect(() => {
    calculateEchoes()
  }, [currentLevel, targetLevel])

  function checkForErrors()
  {
    var levelRange = targetLevel - currentLevel;
    if (levelRange < 0)
    {
      setErrorText("Invalid level range!");
      return true;
    }
    else if (currentLevel < 12 || targetLevel > 544)
    {
      setErrorText("Invalid Level Range (Min: 12, Max: 544)");
      return true;
    }
    
    setErrorText("None");
    return false;
  }

  function calculateEchoes()
  {
    if (checkForErrors())
    {
      setEchoes("0");
    }
    else
    {
      // Calculate echoes needed.
      // Wiki page about the formula: 
      // https://www.bloodborne-wiki.com/2015/03/level.html

      var levelRange = targetLevel - currentLevel;
      var echoesNeeded = 0;
      for (let i = 1; i <= levelRange; i++)
      {
        echoesNeeded += (0.02 * Math.pow(currentLevel + i, 3)) + (3.06 * Math.pow(currentLevel + i, 2)) + (105.6 * (currentLevel + i)) - 895;
      }
      setEchoes(Math.ceil(echoesNeeded));
    }
  }

  return (
  
    <div className="App">
      <div className="App-header">
        <div id="particles-js">
          <ParticlesComponent/>
        </div>
        <div className='Main-Area'>
          <h1 className='App-Title'>Blood Level Calculator</h1>
          <div className='Input-Area'>
          <TextField
            label="Current Level"
            variant='outlined'            
            type='number'
            defaultValue={12}
            onInput = {(e) =>{
              var boxValue = setNumberBox(e.target.value)
              e.target.value = boxValue.toString().slice(0,12)
              setCurrentLevel(boxValue);
            }}
            sx={{
              // Root class for the input field
              "& .MuiOutlinedInput-root": {
                color: "white",
                fontFamily: "Arial",
                fontWeight: "bold",
                // Class for the border around the input field
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
              },
              // Class for the label of the input field
              "& .MuiInputLabel-outlined": {
                color: "#1976d2",
                fontWeight: "bold",
              },
            }}
          />
          <TextField
            label="Target Level"
            variant='outlined'            
            type='number'
            defaultValue={13}
            onInput = {(e) =>{
              var boxValue = setNumberBox(e.target.value)
              e.target.value = boxValue.toString().slice(0,12)
              setTargetLevel(boxValue)
            }}
            sx={{
              // Root class for the input field
              "& .MuiOutlinedInput-root": {
                color: "white",
                fontFamily: "Arial",
                fontWeight: "bold",
                // Class for the border around the input field
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#1976d2",
                  borderWidth: "2px",
                },
              },
              // Class for the label of the input field
              "& .MuiInputLabel-outlined": {
                color: "#1976d2",
                fontWeight: "bold",
              },
            }}
          />

          </div>
          <div className='Results-Area'>
            {errorText === "None" ? <p className='Title-Text'>Echoes Needed</p> :
            <p className='Error-Text'>{errorText}</p>
            }
            
            <h2 className='Echoes-Needed'>{echoes.toLocaleString('de-DE')}</h2>
            
          </div>
        </div>
        <div className='Footer'>
          <a href="https://github.com/tr3m" className='Github-Link' >
            <img className='Github-Icon' src="./github-icon.png" />
          </a>
        </div>
      </div>
      
    </div>

  );
}

export default App;
