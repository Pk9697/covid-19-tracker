import { useEffect, useState } from 'react'
import { Card, CardContent } from '@mui/material'
import cors from 'cors'
import './App.css'
import { API_URLS } from './helpers/urls'
import Header from './components/Header'
import InfoBox from './components/InfoBox'
import Table from './components/Table'
import { sortData } from './helpers/utils'
import LineGraph from './components/LineGraph'
// cors()
function App() {
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState('worldwide')
	const [countryInfo, setCountryInfo] = useState({})
	const [tableData, setTableData] = useState([])

	useEffect(() => {
		const getWorldwideCountriesData = async () => {
			const url = API_URLS.getWorldwideCountriesData()
			const res = await fetch(url)
			const data = await res.json()
			setCountryInfo(data)
		}
		getWorldwideCountriesData()
	}, [])

	useEffect(() => {
		const getCountriesData = async () => {
			const url = API_URLS.getAllCountries()
			const res = await fetch(url)
			const data = await res.json()
			setCountries(
				data.map(item => ({
					_id: item.countryInfo._id,
					name: item.country,
					value: item.countryInfo.iso2,
				}))
			)
			const sortedData = sortData(data)
			setTableData(sortedData)
		}
		getCountriesData()
	}, [])

	const onCountryChange = async e => {
		const countryCode = e.target.value
		const url =
			countryCode === 'worldwide'
				? API_URLS.getWorldwideCountriesData()
				: API_URLS.getCountryData(countryCode)
		const res = await fetch(url)
		const data = await res.json()
		setCountry(countryCode)
		setCountryInfo(data)
	}

	return (
		<div className='app'>
			<div className='app__section-1'>
				<Header
					country={country}
					countries={countries}
					onCountryChange={onCountryChange}
				/>
				<div className='app__stats'>
					<InfoBox
						title='Coronavirus Cases'
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
					/>
					<InfoBox
						title='Recovered'
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
					/>
					<InfoBox
						title='Deaths'
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
					/>
				</div>
				{/* Map */}
			</div>
			<Card className='app__section-2'>
				<CardContent>
					<Table countries={tableData} />
				</CardContent>
				<CardContent>
					<LineGraph />
				</CardContent>
			</Card>
		</div>
	)
}

export default App
