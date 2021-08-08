import { useState } from 'react'

const InputField = (type, init) =>
{
	const [value, setValue] = useState(init)


	function onChange(event)
	{
		const val = event.target.value
		setValue(val)
	}

	function reset()
	{
		setValue('')
	}

	return {
		main: {
			type: type, 
			onChange: onChange,
			value: value
		},
		state : value,
		setState: setValue,
		reset
	}
}

export default InputField