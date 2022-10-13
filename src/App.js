import React, { useState } from "react";
import { Keypad } from "./components/keypad/Keypad";
import { OutputScreen } from "./components/outputScreen/OutputScreen";

const App = () => {
  const [accValue, setAccValue] = useState(null);
  const [screenValue, setScreenValue] = useState("0");
  const [currentOperator, setCurrentOperator] = useState(null);
  const [expectsOperand, setExpectsOperand] = useState(false);

  const allClear = () => {
    setAccValue(null);
    setScreenValue("0");
    setCurrentOperator(null);
    setExpectsOperand(false);
  };

  const clearScreen = () => {
    setScreenValue("0");
  };
  const isScreenClear = screenValue === "0";

  const percentage = () => {
    setScreenValue(String(parseFloat(screenValue) / 100));
  };

  const addDecimalPoint = () => {
    if (expectsOperand) {
      setScreenValue("0.");
    } else {
      if (!screenValue.includes(".")) setScreenValue(screenValue + ".");
    }
    setExpectsOperand(false);
  };

  const handleClickNumericKey = (value) => {
    if (expectsOperand) {
      setScreenValue(String(value));
      setExpectsOperand(false);
    } else
      setScreenValue(screenValue === "0" ? String(value) : screenValue + value);
  };

  const handleClickFunctionKey = (value) => {
    switch (value) {
      case "AC":
        allClear();
        break;
      case "C":
        clearScreen();
        break;
      case "%":
        percentage();
        break;
      case ".":
        addDecimalPoint();
        break;
      default :
      break;
    }
  };
  const handleClickOperator = (operator) => {
    const inputValue = parseFloat(screenValue);
    if (accValue === null) {
      setAccValue(inputValue);
    } else {
      if (currentOperator) {
        const resultValue = operate(currentOperator, accValue, inputValue);
        setAccValue(resultValue);
        setScreenValue(String(resultValue));
      }
    }
    setExpectsOperand(true);
    setCurrentOperator(operator);
  };

  const handleActionToPerform = (value, keyType) => {
    switch (keyType) {
      case "fx":
        handleClickFunctionKey(value);
        break;
      case "numeric":
        handleClickNumericKey(value);
        break;
      case "operator":
        handleClickOperator(value);
        break;
      default :
      break;  
    }
  };

  const operate = (operator, accValue, inputValue) => {
    switch (operator) {
      case "+":
        return accValue + inputValue;
      case "-":
        return accValue - inputValue;
      case "x":
        return accValue * inputValue;
      case "/":
        return accValue / inputValue;
      case "=":
        return inputValue;
      default:
      break;  
    }
  };
  return (
    <div className="text-white font-thin flex-col flex-wrap justify-center items-center calculator-view">
      <div className="flex flex-col flex-wrap justify-between items-center viewport">
        <OutputScreen value={screenValue} />
        <Keypad
          actionToPerform={handleActionToPerform}
          allClear={isScreenClear}
        />
      </div>
    </div>
  );
};
export default App;
