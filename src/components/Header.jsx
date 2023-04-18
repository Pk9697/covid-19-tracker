import React from 'react'
import { FormControl, Select, MenuItem,Typography } from '@mui/material'

function Header(props) {
	const { country, countries, onCountryChange } = props || {}
	return (
		<div className='header'>
			<Typography variant='h4'>COVID-19 TRACKER</Typography>
			<FormControl className='header__dropdown'>
				<Select variant='outlined' value={country} onChange={onCountryChange}>
					<MenuItem value='worldwide'>Worldwide</MenuItem>
					{countries.map((country) => (
						<MenuItem value={country.value}>{country.name}</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	)
}

export default Header
