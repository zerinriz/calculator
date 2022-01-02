import React, { useState } from "react";

function App() {
  const [rpnInput, setRpnInput] = useState("");
  const [validation, setValidation] = useState("");
  const [result, setResult] = useState("");

  const clear = () => {
    setRpnInput("");
    setResult("");
    setValidation("");
  };
  const compute = () => {
    let expr = rpnInput.split(",");
    let stack = [];
    if (rpnInput === "") {
      setValidation("You did not enter anything!");
      return;
    }
    if (expr.length === 1) {
      setValidation("Something went wrong");
      return;
    }

    var numberPattern = new RegExp(/^[A-Za-z]+$/);

    if (rpnInput.match(numberPattern)) {
      setValidation("Only numbers and aritmetic operators are valid");
      return;
    }
    let operands = 0;
    let operators = 0;
    for (let i = 0; i < expr.length; i++) {
      if (!isNaN(expr[i]) && isFinite(expr[i])) {
        stack.push(expr[i]);
        operands++;
      } else {
        let a = stack.pop();
        let b = stack.pop();
        if (expr[i] === "+") {
          stack.push(parseFloat(a) + parseFloat(b));
          operators++;
        } else if (expr[i] === "-") {
          stack.push(parseFloat(b) - parseFloat(a));
          operators++;
        } else if (expr[i] === "*") {
          stack.push(parseFloat(a) * parseFloat(b));
          operators++;
        } else if (expr[i] === "/") {
          stack.push(parseFloat(b) / parseFloat(a));
          operators++;
        } else {
          setValidation("Only numbers and aritmetic operators are valid");
          return;
        }
      }
    }
    let sum = operands - operators;
    if (operators >= operands) {
      setValidation("Something went wrong! Check the number of OPERATORS");
      return;
    } else if (sum !== 1) {
      setValidation("Something went wrong! Check the number of OPERANDS");
      return;
    }

    if (stack.length > 1) {
      setValidation("Something went wrong");
    } else {
      let res = "=";
      res += stack[0];
      setResult(res);
    }
  };
  return (
    <div className="App">
      <h1>Reverse Polish Notation Calculator</h1>
      <br />
      <input
        type="text"
        onChange={(e) => {
          setRpnInput(e.target.value);
          setValidation("");
        }}
        value={rpnInput + result}
        id="operand"
        placeholder="Enter the operand and operator:2,6,5,5,4,+,-,/"
      />
      <button className="button" onClick={clear}>
        Clear
      </button>
      <button className="button" onClick={compute}>
        Compute
      </button>
      <div className="validation">{validation}</div>
    </div>
  );
}

export default App;
