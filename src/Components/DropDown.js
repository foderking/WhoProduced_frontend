import React from 'react'
import RandomNumGen from "../Functionality/random"


const DropDown = (props) => 
<span className={props.class}>
	<select name={props.name} value={props.value} onChange={props.onChange}>
		{
			props.parameters.map( each => 
				<option key={RandomNumGen()} value={each} id={`select-${each}`} >{each}</option>
			)
		}
	</select>
</span>



export default DropDown