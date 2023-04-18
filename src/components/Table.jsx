import React from 'react'
import '../assets/css/Table.css'
function Table(props) {
	const { countries } = props || {}
	console.log(countries)
	return (
		<div className='table'>
			<h2>Live Cases By Country</h2>
			<div className='table__countries'>
				{countries.map(({ country, cases }) => (
					<div className='table__row'>
						<div className='table__data'>{country}</div>
						<div className='table__data'>
							<strong>{cases}</strong>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}

export default Table
