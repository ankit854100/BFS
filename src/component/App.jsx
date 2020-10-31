import React, { useEffect, useRef, useState } from "react";
import dimension, {
  drawBlock,
  blackCoordinates,
  mouse,
  possibleXY,
  path,
  shortestPath,
  drawGrid,
  createDestinations,
  factor,
  target,
  start
} from "./Assets";
import { Button } from "react-bootstrap";

// setting the h1Value in main() only once
let j = 0;
// for calling createDestinations() just once
let k = 0;
let ctx;

export default function App() {
  const ref = useRef();
  const [textInputState, setState] = useState(false);
  const [inputValue, setInputValue] = useState(0);
  const [h1Value, setH1Value] = useState("");
  const [playAgain, setPlayAgain] = useState(false);

  useEffect(() => {
    let canvas = ref.current;
    canvas.width = dimension.w;
    canvas.height = dimension.h;

    ctx = canvas.getContext("2d");

    canvas.addEventListener("mousedown", (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;

      let tempX = 0;
      let tempY = 0;
      let blackCheck = true;

      for (let i = 0; i < possibleXY.length; i++) {
        if (mouse.x > possibleXY[i] && mouse.x < possibleXY[i] + factor) {
          tempX = possibleXY[i];
        }
      }

      for (let i = 0; i < possibleXY.length; i++) {
        if (mouse.y > possibleXY[i] && mouse.y < possibleXY[i] + factor) {
          tempY = possibleXY[i];
        }
      }

      if (blackCoordinates[tempY / factor][tempX / factor] === 1) {
        blackCheck = false;
      }

      if (blackCheck === true && mouse.state === 0) {
        path[tempY / factor][tempX / factor] = 1;
        // console.log(path);
      }

      mouse.x = tempX;
      mouse.y = tempY;
    });

    if (k === 0) createDestinations();
    main();
    k++;
  });

  function main() {
    ctx.clearRect(0, 0, dimension.x, dimension.y);
    drawGrid(ctx);
    drawBlock(ctx, "#000", blackCoordinates);
    drawBlock(ctx, "darkgrey", path);

    if (target[mouse.y / factor][mouse.x / factor] === 1) {
      mouse.state = 1;
      j++;
    }

    if (j === 1) {
      setState(true);
    }
    if (mouse.state === 1) {
      drawBlock(ctx, "red", start);
      drawBlock(ctx, "lightgreen", target);
    }

    requestAnimationFrame(main);
  }

  function handleSubmit() {
    if (inputValue.toString() === shortestPath.toString()) {
      setH1Value("Congratulations you win!!");
      setState(false);
      setPlayAgain(true);
    } else {
      setH1Value("Your answer is wrong please try again!");
    }
  }

  function handleChange(event) {
    const value = event.target.value;

    setInputValue(value);
  }

  function handlePlayAgain() {
    // document.location.reload();
    ctx.clearRect(0, 0, dimension.w, dimension.h);
  }

  return (
    <div className="App">
      <canvas ref={ref} id="canvas"></canvas>
      {textInputState && (
        <div>
          <label>Enter shortest path: </label>
          <input
            id="input"
            type="text"
            value={inputValue}
            onChange={handleChange}
            autoComplete="off"
          ></input>
          <Button variant="dark" size="sm" onClick={handleSubmit}>
            {" "}
            Submit{" "}
          </Button>
          <p> {h1Value} </p>
        </div>
      )}
      {playAgain && (
        <div>
          <Button variant="dark" size="sm" onClick={handlePlayAgain}>
            {" "}
            Play Again{" "}
          </Button>
        </div>
      )}
    </div>
  );
}

// canvas.addEventListener("mousemove", (event) => {
//   const rect = canvas.getBoundingClientRect();
//   let x = event.clientX - rect.left;
//   let y = event.clientY - rect.top;

//   let tempX = 0;
//   let tempY = 0;
//   let blackCheck = true;

//   for (let i = 0; i < possibleXY.length; i++) {
//     if (mouse.x > possibleXY[i] && mouse.x < possibleXY[i] + factor) {
//       tempX = possibleXY[i];
//     }
//   }

//   for (let i = 0; i < possibleXY.length; i++) {
//     if (mouse.y > possibleXY[i] && mouse.y < possibleXY[i] + factor) {
//       tempY = possibleXY[i];
//     }
//   }

//   if (blackCoordinates[tempY / factor][tempX / factor] === 1) {
//     blackCheck = false;
//   }

//   if (blackCheck === false) {
//     canvas.cursor = "none";
//   } else {
//     console.log(x, y);
//   }
// });
