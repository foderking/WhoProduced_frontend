import React from 'react'
import base_url from '../Functionality/base_url'

const icon = base_url + "/static/img/hades.png"
export default function Nav() {
	return (
		<div>
			<nav className="navbar bg-dark">
				<a className="navbar-brand" href="/">
					<img src={icon} width="30px"  className="mx-3 d-inline-block align-top" alt="" />
				</a>
			</nav>
		</div>
	)
}
