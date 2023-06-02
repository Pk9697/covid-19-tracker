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
import Map from './components/Map'
// cors()
function App() {
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState('worldwide')
	const [countryInfo, setCountryInfo] = useState({})
	const [tableData, setTableData] = useState([])
	const [mapCenter, setMapCenter] = useState([51.505, -0.09])
	const [mapZoom, setMapZoom] = useState(2)
	const [mapCountries, setMapCountries] = useState([])
	const [casesType, setCasesType] = useState('cases')
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
			setMapCountries(data)
			setCountries(
				data.map(item => ({
					_id: item.countryInfo._id,
					name: item.country,
					value: item.countryInfo.iso2,
				}))
			)
			// const sortedData = sortData(data,casesType)
			setTableData(data)
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
		data.countryInfo &&
			setMapCenter([data.countryInfo.lat, data.countryInfo.long])
		if (countryCode === 'worldwide') {
			setMapZoom(2)
			setMapCenter([51.505, -0.09])
		} else {
			setMapZoom(4)
		}
	}

	// console.log(countryInfo)
	// console.log(mapCenter)

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
						className='box1'
						isRed
						active={casesType === 'cases'}
						title='Coronavirus Cases'
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
						onClick={() => setCasesType('cases')}
					/>
					<InfoBox
						className='box2'
						active={casesType === 'recovered'}
						title='Recovered'
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
						onClick={() => setCasesType('recovered')}
					/>
					<InfoBox
						className='box3'
						isRed
						active={casesType === 'deaths'}
						title='Deaths'
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
						onClick={() => setCasesType('deaths')}
					/>
				</div>
				{/* Map */}
				<Map
					center={mapCenter}
					zoom={mapZoom}
					countries={mapCountries}
					casesType={casesType}
				/>
			</div>
			<div className='app__section-2'>
				<Table tableData={tableData} casesType={casesType} />
				<LineGraph casesType={casesType} />
			</div>
		</div>
	)
}

export default App
