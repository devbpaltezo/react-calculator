import React, {useState, useEffect, useContext} from 'react'

//SELF IMPORTS
import {CalculatorDisplay, CalculatorKey, CalculatorOperations} from '../components'
import { AppContext } from '../provider'

export const Calculator = ({...props}) => {

	//CONTEXT
	const {toggleFullScreen, setToggleFullScreen} = useContext(AppContext)

	const [query, setQuery] = useState('0')
	const [value, setValue] = useState(null)
	const [displayValue, setDisplayValue] = useState('0')
	const [operator, setOperator] = useState(null)
	const [waitingForOperand, setWaitingForOperand] = useState(false)

	const clearAll = () => {
		setQuery('0')
		setValue(false)
		setDisplayValue('0')
		setOperator(null)
		setWaitingForOperand(false)
	}

	const clearDisplay = () => {
		setQuery('0')
		setDisplayValue('0')
	}

	const clearLastChar = () => {
		const value = displayValue
		setDisplayValue(value.substring(0, value.length - 1) || '0')
	}

	const toggleSign = () => {
		const newValue = parseFloat(displayValue) * -1
		setDisplayValue(String(newValue))		
	}

	const inputPercent = () => {
		const currentValue = parseFloat(displayValue)
		if (currentValue === 0) return

    const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
    const newValue = parseFloat(displayValue) / 100
    
		setDisplayValue(String(newValue.toFixed(fixedDigits.length + 2)))
	}

	const inputDot = () => {
		if (!(/\./).test(displayValue)) {      
			setDisplayValue(displayValue + '.')
			setWaitingForOperand(false)
    }
	}

	const inputDigit = (digit) => {

    if (waitingForOperand) {
			setDisplayValue(String(digit))
			setWaitingForOperand(false)
    } else {      
			setDisplayValue(displayValue === '0' ? String(digit) : displayValue + digit + '')
    }
  }

	const performOperation = (nextOperator) => {    

    const inputValue = parseFloat(displayValue)
    
    if (value == null) {      
			
			setValue(inputValue)

    } else if (operator) {

      const currentValue = value || 0
      const newValue = CalculatorOperations[operator](currentValue, inputValue)
            
			console.log("NEW VALUE", newValue)
			setValue(newValue)
			setDisplayValue(String(newValue))
    }
    
		setWaitingForOperand(true)
		setOperator(nextOperator)
  }

	const handleKeyDown = (event) => {
    let { key } = event
    
    if (key === 'Enter') key = '='
    
    if ((/\d/).test(key)) {
      event.preventDefault()
      inputDigit(parseInt(key, 10))
    } else if (key in CalculatorOperations) {
      event.preventDefault()
      performOperation(key)
    } else if (key === '.') {
      event.preventDefault()
      inputDot()
    } else if (key === '%') {
      event.preventDefault()
      inputPercent()
    } else if (key === 'Backspace') {
      event.preventDefault()
      clearLastChar()
    } else if (key === 'Clear') {
      event.preventDefault()
      
      if (displayValue !== '0') {
        clearDisplay()
      } else {
        clearAll()
      }
    }
  };

	useEffect(() => {
		
		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}

	}, [handleKeyDown])

	return (
		<>
		{/* FROM CONTEXT */}
		{!toggleFullScreen && <small>Toggle full screen view for higher digits <br /></small>}
		{toggleFullScreen && <h3 style={{ marginLeft: 20}}>Full Screen View</h3>}

		<div className="calculator">
			<CalculatorDisplay value={displayValue}/>
			<div className="calculator-keypad">
				<div className="input-keys">
					<div className="function-keys">
						<CalculatorKey 
							className="key-clear" 
							onPress={() => displayValue !== '0' ? clearDisplay() : clearAll()}>
								{displayValue !== '0' ? 'C' : 'AC'}
						</CalculatorKey>
						
						<CalculatorKey className="key-sign" onPress={() => toggleSign()}>±</CalculatorKey>
						<CalculatorKey className="key-percent" onPress={() => inputPercent()}>%</CalculatorKey>
					</div>
					<div className="digit-keys">
						<CalculatorKey className="key-0" onPress={() => inputDigit(0)}>0</CalculatorKey>
						<CalculatorKey className="key-dot" onPress={() => inputDot()}>●</CalculatorKey>
						<CalculatorKey className="key-1" onPress={() => inputDigit(1)}>1</CalculatorKey>
						<CalculatorKey className="key-2" onPress={() => inputDigit(2)}>2</CalculatorKey>
						<CalculatorKey className="key-3" onPress={() => inputDigit(3)}>3</CalculatorKey>
						<CalculatorKey className="key-4" onPress={() => inputDigit(4)}>4</CalculatorKey>
						<CalculatorKey className="key-5" onPress={() => inputDigit(5)}>5</CalculatorKey>
						<CalculatorKey className="key-6" onPress={() => inputDigit(6)}>6</CalculatorKey>
						<CalculatorKey className="key-7" onPress={() => inputDigit(7)}>7</CalculatorKey>
						<CalculatorKey className="key-8" onPress={() => inputDigit(8)}>8</CalculatorKey>
						<CalculatorKey className="key-9" onPress={() => inputDigit(9)}>9</CalculatorKey>
					</div>
				</div>
				<div className="operator-keys">
					<CalculatorKey className="key-divide" onPress={() => performOperation('/')}>÷</CalculatorKey>
					<CalculatorKey className="key-multiply" onPress={() => performOperation('*')}>×</CalculatorKey>
					<CalculatorKey className="key-subtract" onPress={() => performOperation('-')}>−</CalculatorKey>
					<CalculatorKey className="key-add" onPress={() => performOperation('+')}>+</CalculatorKey>
					<CalculatorKey className="key-equals" onPress={() => performOperation('=')}>=</CalculatorKey>
				</div>
			</div>
		</div>		
		</>
	)

}