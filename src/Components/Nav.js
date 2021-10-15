import React from 'react'
import base_url from '../Functionality/base_url'

const icon = base_url + "/static/img/hades.png"
export default function Nav() {
	return (
		// <div>
		// 	<nav className="navbar navbar-expand-sm bg-dark">
		// 		<a className="navbar-brand" href="/">
		// 			{/* <img src={icon} width="30" height='30'  className="mx-3 d-inline-block align-top" alt="" /> */}
		// 		</a>
		// 	</nav>
		// </div>
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">

			<a className="navbar-brand" href="#!">
				<img src={icon} width="40" height='40'  className="mx-3 d-inline-block align-top" alt="" />
			</a>

		</nav>
	)
}
