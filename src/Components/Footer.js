import React from 'react'
import base_url from '../Functionality/base_url'

const logo = base_url + '/static/img/github.png'

export default function Footer() {
	return (
		<div>
			<footer className="page-footer font-small blue">
				<div className='text-center'>
					<div>
						<a href="https://github.com/foderking/WhoProduced">
							<img height='80px' src={logo} alt="GitHub Logo" draggable="false" />
						</a>
					</div>
				</div>
			</footer>
		</div>
	)
}
