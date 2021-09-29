import { useState } from 'react'

const InputField = (type='text', init='') =>
{
	const [value, setValue] = useState(init)
	// handler for when state changes - for example, when filling a form
	function onChange(event)
	{
		const val = event.target.value
		setValue(val)
	}
	// resets the content of the component
	function reset()
	{
		setValue('')
	}

	return {
		// main makes it easy to use the component in fields e.g..
		// const name = InputField('text','James')
		// <input {...name.main} /> - Uses object destructuring to add "type", "onChange", and "value" as parameters to the input
		// transforms into..
		// <input type={name.main.type} onChange={name.main.Onchange} value={name.main.value} />
		main: {
			type: type, 
			onChange: onChange,
			value: value
		},
		// "state" references the content of the component - the same thing in "main.value"
		state : value,
		// changes the state of component
		setState: setValue,
		reset
	}
}

export default InputField