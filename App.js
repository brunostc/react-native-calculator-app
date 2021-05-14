import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './src/components/Button';
import Display from './src/components/Display';

const initialState = {
  displayValue: '0',
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  currentValue: 0,
};

export default class App extends Component {
  state = { ...initialState };
  
  clearMemory = () => {
    this.setState({ displayValue: '0' });
    this.setState({ values: [0, 0] });
  };

  setOperation = (op) => {
    this.setState({ operation: op });
    this.setState({ displayValue: op });
  };

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

  getResult = () => {
    const op = this.state.operation; 

    if (! op) {
      return;
    }

    const result = this.executeOperation(op);

    this.setState({ displayValue: result })
    this.setState({ values: [result, 0] })
  };

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

  addDigit = (digit) => {
    const op = this.state.operation;

    if (op) {
      this.insertValue(digit, true);
    } else {
      this.insertValue(digit, false);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Display value={this.state.displayValue} ></Display>
        <View style={styles.buttons}>
          <Button label='AC' triple onClick={this.clearMemory} />
          <Button label='/' operation onClick={() => this.setOperation('/')} />
          <Button label='7' onClick={() => this.addDigit(7)} />
          <Button label='8' onClick={() => this.addDigit(8)} />
          <Button label='9' onClick={() => this.addDigit(9)} />
          <Button label='*' operation onClick={() => this.setOperation('*')} />
          <Button label='4' onClick={() => this.addDigit(4)} />
          <Button label='5' onClick={() => this.addDigit(5)} />
          <Button label='6' onClick={() => this.addDigit(6)} />
          <Button label='-' operation onClick={() => this.setOperation('-')} />
          <Button label='1' onClick={() => this.addDigit(1)} />
          <Button label='2' onClick={() => this.addDigit(2)} />
          <Button label='3' onClick={() => this.addDigit(3)} />
          <Button label='+' operation onClick={() => this.setOperation('+')} />
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
  },
  zButton : {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
