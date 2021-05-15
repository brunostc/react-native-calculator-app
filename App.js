import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  operation: null,
  values: [0, 0],
};

export default class App extends Component {
  state = { ...initialState };
  
  /**
   * Clears the display and the memory.
   */
  clearMemory = () => {
    this.setState({ displayValue: '0' });
    this.setState({ values: [0, 0] });
  };

  /**
   * Sets the next operation.
   * @param {string} op operation
   */
  setOperation = (op) => {
    this.setState({ operation: op });
    this.setState({ displayValue: op });
  };

  /**
   * Executes the operation
   * @param {string} op mathemathical operators ('+', '-', '*', '/')
   */
  executeOperation = (op) => {
    let v1 = Number(this.state.values[0]);
    let v2 = Number(this.state.values[1]);
    
    this.setState({ operation: null });

    if (op === '/') {
      if (! v2) {
        return NaN;
      }

      if (v1 % v2 == 0) {
        return v1 / v2;
      }

      return (v1 / v2).toFixed(4);
    }

    if (op === '*') {
      if (! v2 || ! v1) {
        return 0;
      }

      return v1 * v2;
    }

    if (op === '+') {
      return v1 + v2;
    }

    if (op === '-') {
      return v1 - v2;
    }
  }

  /**
   * Calculates the result
   */
  getResult = () => {
    const op = this.state.operation; 

    if (! op) {
      return;
    }

    let result = this.executeOperation(op);

    this.setState({ displayValue: result })
    this.setState({ values: [result, 0] })
  };

  /**
   * Inserts a value into the display and the memory
   * @param {string} digit last digit typed.
   * @param {boolean} secondValue if it is the second operation value or not
   */
  insertValue = (digit, secondValue) => {
    let v1 = this.state.values[0].toString();
    let v2 = this.state.values[1].toString();

    if (! secondValue) {
      if (v1.length > 8) return;

      if (digit == '0' && v1 == '0') return;

      if (digit != '0' && v1 == '0') {
        let newDisplay = '' + digit + '';

        this.setState({ displayValue: newDisplay });
        this.setState({ values: [ newDisplay , v2 ] });
      }

      if (digit != '0' && v1 != '0') {
        let newDisplay = '' + v1 + digit + '';

        this.setState({ displayValue: newDisplay });
        this.setState({ values: [ newDisplay , v2 ] });
      }

      if (digit == '0' && v1 != '0') {
        let newDisplay = '' + v1 + digit + '';

        this.setState({ displayValue: newDisplay });
        this.setState({ values: [ newDisplay , v2 ] });
      }
    } else {
      this.setState({ displayValue: null })
      if (v2.length > 8) return;

      if (digit == '0' && v2 == '0') return;

      if (digit != '0' && v2 == '0') {
        let newDisplay = '' + digit + '';

        this.setState({ displayValue: newDisplay });
        this.setState({ values: [ v1 , newDisplay ] });
      }

      if (digit != '0' && v2 != '0') {
        let newDisplay = '' + v2 + digit + '';

        this.setState({ displayValue: newDisplay });
        this.setState({ values: [ v1 , newDisplay ] });
      }

      if (digit == '0' && v2 != '0') {
        let newDisplay = '' + v2 + digit + '';

        this.setState({ displayValue: newDisplay });
        this.setState({ values: [ v1 , newDisplay ] });
      }
    }
  };

  /**
   * Adds a digit to the display.
   * @param {string} digit pressed digit.
   */
  addDigit = (digit) => {
    const op = this.state.operation;

    if (op) {
      this.insertValue(digit, true);
    } else {
      this.insertValue(digit, false);
    }
  };

  /**
   * Deletes the last digit from the display and memory
   */
  deleteLastDigit = () => {
    let values = this.state.values;

    if (values[0] == 0 && values[1] == 0) {
      return;
    }

    if (values[0] != 0 && values[1] == 0) {
      if (values[0].toString().length == 1) {
        this.setState({ displayValue: 0 })
        this.setState({ values: [0, 0] })
      } else {
        let newValue = values[0].toString().slice(0, -1);
        
        this.setState({ displayValue: newValue })
        this.setState({ values: [newValue, 0] })
      }
      
      return;
    }

    if (values[0] != 0 && values[1] != 0) {
      if (values[1].length == 1) {
        this.setState({ displayValue: 0 })
        this.setState({ values: [values[0], 0] })
      } else {
        let newValue = values[1].slice(0, -1);
        
        this.setState({ displayValue: newValue })
        this.setState({ values: [values[0], newValue] })
      }
      
      return;
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} ></Display>
        <View style={styles.buttons}>
          <Button label='AC' double onClick={this.clearMemory} />
          <Button label='C' operation onClick={this.deleteLastDigit} />
          <Button label='/' operation onClick={() => this.setOperation('/')} />
        </View>
        <View style={styles.buttons}>
          <Button label='7' onClick={() => this.addDigit(7)} />
          <Button label='8' onClick={() => this.addDigit(8)} />
          <Button label='9' onClick={() => this.addDigit(9)} />
          <Button label='*' operation onClick={() => this.setOperation('*')} />
        </View>
        <View style={styles.buttons}>
          <Button label='4' onClick={() => this.addDigit(4)} />
          <Button label='5' onClick={() => this.addDigit(5)} />
          <Button label='6' onClick={() => this.addDigit(6)} />
          <Button label='-' operation onClick={() => this.setOperation('-')} />
        </View>
        <View style={styles.buttons}>
          <Button label='1' onClick={() => this.addDigit(1)} />
          <Button label='2' onClick={() => this.addDigit(2)} />
          <Button label='3' onClick={() => this.addDigit(3)} />
          <Button label='+' operation onClick={() => this.setOperation('+')} />
        </View>
        <View style={styles.buttons}>
          <Button label='0' double onClick={() => this.addDigit(0)} />
          <Button label='.' onClick={() => this.addDigit('.')} />
          <Button label='=' operation onClick={() => this.getResult()} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: Dimensions.get('window').width,
  },
  zButton : {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
