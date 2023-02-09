import React, {useState, useEffect, useRef} from 'react';

const AutoScalingText = ({children, ...props}) => {

	const node = useRef(null)
	const [scale, setScale] = useState(1)

	useEffect(() => {

    const parentNode = node.parentNode
    
    const availableWidth = parentNode?.offsetWidth
    const actualWidth = node?.offsetWidth
    const actualScale = availableWidth / actualWidth
    
    if (scale === actualScale) return
		console.log({scale, actualScale})
    if (actualScale < 1) {
			setScale(actualScale)
    } else if (scale < 1) {
			setScale(1)
    }

	}, [node, scale])

	return (
		<div
			className="auto-scaling-text"
			style={{ transform: `scale(${scale},${scale})` }}
			ref={node}
		>{children}</div>
	)

}

export const CalculatorDisplay = ({value, ...props}) => {

	const language = navigator.language || 'en-US'
  let formattedValue = parseFloat(value).toLocaleString(language, {
    useGrouping: true,
    maximumFractionDigits: 6
  })

	// Add back missing .0 in e.g. 12.0
	const match = value.match(/\.\d*?(0*)$/)

	if (match) formattedValue += (/[1-9]/).test(match[0]) ? match[1] : match[0]

  return (
		<div {...props} className="calculator-display">			
			<AutoScalingText>{formattedValue}</AutoScalingText>
		</div>
  );
}