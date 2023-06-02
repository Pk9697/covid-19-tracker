import React from 'react'
import { FormControl, Select, MenuItem, Typography } from '@mui/material'
import '../assets/css/Header.css'

function Header(props) {
	const { country, countries, onCountryChange } = props || {}
	return (
		<div className='header'>
			<h2 className='header__name'>COVID-19 TRACKER</h2>
			<FormControl className='header__dropdown'>
				<Select variant='outlined' value={country} onChange={onCountryChange}>
					<MenuItem key={`menu-0`} value='worldwide'>Worldwide</MenuItem>
					{countries.map((country,index) => (
						<MenuItem key={`menu-${index+1}`} value={country.value}>
							{country.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}

export default Header
