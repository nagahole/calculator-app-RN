import { View, Text, SafeAreaView, StyleSheet, Dimensions } from 'react-native'
import React, { useState } from 'react'
import ButtonRow from './components/ButtonRow'
import CalculatorButton from './components/CalculatorButton'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Alert } from 'react-native'

const Operators = {
  plus: "+",
  minus: "-",
  multiply: "×",
  divide: "÷"
}

const InputTypes = {
  number: 0,
  decimal: 1,
  operator: 2,
  equals: 3
}

export default function CalculatorApp() {

  const [ displayText, setDisplayText ] = useState("0");
  const [ currentStoredNumber, setCurrentStoredNumber ] = useState(null);
  const [ lastStoredNumber, setLastStoredNumber ] = useState(null);
  const [ storedOperation, setStoredOperation ] = useState(null);
  const [ lastInputType, setLastInputType ] = useState(null);

  const insets = useSafeAreaInsets();

  function numberInput(n) {

    setCurrentStoredNumber(prev => {

      let res = res = n.toString();;

      if (prev !== null && lastInputType !== InputTypes.equals) {
        res = prev + res;
      }

      setDisplayText(res);
      return res;
    });

    setLastInputType(InputTypes.number);
  }

  function percentageButton() {

    if (currentStoredNumber === null)
      return;

    setCurrentStoredNumber(prev => {
      let newNumber = parseFloat(prev) / 100;

      setDisplayTextRounded(newNumber, 5);

      return newNumber.toString();
    });
  }

  function plusMinusButton() {
    if (lastInputType === InputTypes.operator) {
      if (lastStoredNumber === null)
        return;

      setLastStoredNumber(prev => {
        let newNumber = parseFloat(prev) * -1;

        setDisplayTextRounded(newNumber, 5);

        return newNumber.toString();
      });
    }

    if (currentStoredNumber === null)
      return;

    setCurrentStoredNumber(prev => {
      let newNumber = parseFloat(prev) * -1;

      setDisplayTextRounded(newNumber, 5);

      return newNumber.toString();
    });
  }

  function operatorInput(operator) {
    if (currentStoredNumber !== null && lastInputType !== InputTypes.equals) {
      setCurrentStoredNumber(prev => {

        let lastNumber = parseFloat(lastStoredNumber) || 0;

        let numberToStore;

        switch(storedOperation) {
          case Operators.plus:
              numberToStore = lastNumber + parseFloat(prev);
            break;
          case Operators.minus:
              numberToStore = lastNumber - parseFloat(prev);
            break;
          case Operators.multiply:
              numberToStore = lastNumber * parseFloat(prev);
            break;
          case Operators.divide:
              numberToStore = lastNumber / parseFloat(prev);
            break;
          default:
              numberToStore = parseFloat(prev);
            break;
        }

        setLastStoredNumber(numberToStore.toString());
        setDisplayTextRounded(numberToStore, 5);

        return null;
      });
    }

    if (lastInputType === InputTypes.equals) {
      setCurrentStoredNumber(prev => {
        setLastStoredNumber(prev);
        return null;
      });
    }

    setStoredOperation(operator);
    setLastInputType(InputTypes.operator);
  }

  function acButton() {
    setDisplayText("0");
    setCurrentStoredNumber(null);
    setLastStoredNumber(null);
    setStoredOperation(null);
    setLastInputType(null);
  }

  function decimalButton() {
    setCurrentStoredNumber(prev => {

      prev ||= "";

      let newNumber = lastInputType === InputTypes.equals? "" : prev;

      if (!prev.includes(".")) {
        newNumber += ".";
        setDisplayText(newNumber);
        return newNumber
      }

      setDisplayTextRounded(newNumber, 5);

      return newNumber;
    });

    setLastInputType(InputTypes.decimal);
  }

  function equalsButton() {
    if (storedOperation === null)
      return;

    if (lastInputType === InputTypes.operator) {
      setLastStoredNumber(prev => {

        let lastNumber = parseFloat(prev) || 0;

        let numberToStore;

        switch(storedOperation) {
          case Operators.plus:
              numberToStore = lastNumber + lastNumber;
            break;
          case Operators.minus:
              numberToStore = lastNumber - lastNumber;
            break;
          case Operators.multiply:
              numberToStore = lastNumber * lastNumber;
            break;
          case Operators.divide:
              numberToStore = lastNumber / lastNumber;
            break;
          default:
              console.error("ERR");
            break;
        }

        setDisplayTextRounded(numberToStore, 5);
        setCurrentStoredNumber(numberToStore.toString());
        return prev;
      });
    } else if (lastInputType === InputTypes.equals) {
      setLastStoredNumber(prev => {

        let numberToStore;

        let currentNumber = parseFloat(currentStoredNumber) || 0;
        let lastNumber = parseFloat(prev) || 0;

        switch(storedOperation) {
          case Operators.plus:
              numberToStore = currentNumber + lastNumber;
            break;
          case Operators.minus:
              numberToStore = currentNumber - lastNumber;
            break;
          case Operators.multiply:
              numberToStore = currentNumber * lastNumber;
            break;
          case Operators.divide:
              numberToStore = currentNumber / lastNumber;
            break;
          default:
              console.error("ERR");
            break;
        }

        setDisplayTextRounded(numberToStore, 5);
        setCurrentStoredNumber(numberToStore.toString());
        return prev;
      });
    } else if (lastInputType === InputTypes.number) {
      setCurrentStoredNumber(prev => {

        let numberToStore;

        let lastNumber = parseFloat(lastStoredNumber) || 0;

        switch(storedOperation) {
          case Operators.plus:
              numberToStore = lastNumber + parseFloat(prev);
            break;
          case Operators.minus:
              numberToStore = lastNumber - parseFloat(prev);
            break;
          case Operators.multiply:
              numberToStore = lastNumber * parseFloat(prev);
            break;
          case Operators.divide:
              numberToStore = lastNumber / parseFloat(prev);
            break;
          default:
              console.error("ERR");
            break;
        }

        setDisplayTextRounded(numberToStore, 5);
        setLastStoredNumber(prev);
        return numberToStore.toString();
      });
    }

    setLastInputType(InputTypes.equals);
  }

  function setDisplayTextRounded(n, dp) {
    setDisplayText((Math.round(Math.pow(10, dp) * n) / Math.pow(10, dp)).toString());
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperHalfContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>{displayText}</Text>
        </View>
      </View>
      <View 
        style={[
          styles.buttonContainer, {
            bottom: -insets.bottom,
            paddingBottom: insets.bottom,
            height: Dimensions.get("window").width * 1.2 + insets.bottom,
            marginTop: -insets.bottom
          }
        ]}
      >
        <ButtonRow>
          <CalculatorButton onPress={() => acButton()} label="AC" textColor="#47e5cb"/>
          <CalculatorButton onPress={() => plusMinusButton()} label="+/-" textColor="#47e5cb"/>
          <CalculatorButton onPress={() => percentageButton()} label="%" textColor="#47e5cb"/>
          <CalculatorButton onPress={() => operatorInput(Operators.divide)} label="÷" textColor="#c77277"/>
        </ButtonRow>
        <ButtonRow>
          <CalculatorButton onPress={() => numberInput(7)} label="7"/>
          <CalculatorButton onPress={() => numberInput(8)} label="8"/>
          <CalculatorButton onPress={() => numberInput(9)} label="9"/>
          <CalculatorButton onPress={() => operatorInput(Operators.multiply)} label="×" textColor="#c77277"/>
        </ButtonRow>
        <ButtonRow>
          <CalculatorButton onPress={() => numberInput(4)} label="4"/>
          <CalculatorButton onPress={() => numberInput(5)} label="5"/>
          <CalculatorButton onPress={() => numberInput(6)} label="6"/>
          <CalculatorButton onPress={() => operatorInput(Operators.minus)} label="-" textColor="#c77277"/>
        </ButtonRow>
        <ButtonRow>
          <CalculatorButton onPress={() => numberInput(1)} label="1"/>
          <CalculatorButton onPress={() => numberInput(2)} label="2"/>
          <CalculatorButton onPress={() => numberInput(3)} label="3"/>
          <CalculatorButton onPress={() => operatorInput(Operators.plus)} label="+" textColor="#c77277"/>
        </ButtonRow>
        <ButtonRow>
          <CalculatorButton onPress={() => numberInput(0)} label="0" cols={2}/>
          <CalculatorButton onPress={() => decimalButton()} label="."/>
          <CalculatorButton onPress={() => equalsButton()} label="=" textColor="#c77277"/>
        </ButtonRow>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#23252e"
  },

  upperHalfContainer: {
    flexGrow: 1,
  },

  buttonContainer: {
    backgroundColor: "#2b2d38",
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    paddingTop: 35,
    paddingHorizontal: 10,
  },

  displayContainer: {
    flex: 1,
    position: "absolute",
    bottom: 20,
    width: "100%",
    height: 80,
    justifyContent: "center",
    paddingHorizontal: 20
  },
  
  displayText: {
    color: "white",
    textAlign: "right",
    fontSize: 50,
    fontWeight: "600",
    fontVariant: [ "tabular-nums" ]
  }
});