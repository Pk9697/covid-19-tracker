import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@mui/material'
import '../assets/css/Table.css'
import numeral from 'numeral'
import { sortData } from '../helpers/utils'
function Table(props) {
	const { tableData, casesType } = props
	const [countries, setCountries] = useState([])
	useEffect(() => {
		setCountries(sortData(tableData, casesType))
	},[casesType,tableData])
	return (
		<Card className='table'>
			<CardContent>
				<h2>Live {casesType} By Country</h2>
				<div className='table__countries'>
					{countries.map((country, index) => (
						<div key={`table-${index}`} className='table__row'>
							<div className='table__data'>{country.country}</div>
							<div className='table__data'>
								<strong>{numeral(country[casesType]).format('0,0')}</strong>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	)
}

export default Table
