import { useEffect, useState } from 'react'
import './App.css'
import { API_URLS } from './helpers/urls'
import Header from './components/Header'
function App() {
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState('worldwide')

	useEffect(() => {
		const getCountriesData = async () => {
			const res = await fetch(API_URLS.getAllCountries())
			const data = await res.json()
			setCountries(
				data.map((item) => ({
					name: item.country,
					value: item.countryInfo.iso2,
				}))
			)
		}
		getCountriesData()
	}, [])

	function onCountryChange(e) {
		setCountry(e.target.value)
	}

	// console.table(countries)
	return (
		<div className='app'>
			{/* Header */}
			{/* Title + Select Input dropdown field */}
			<Header
				country={country}
				countries={countries}
				onCountryChange={onCountryChange}
			/>

			{/* InfoBox */}
			{/* InfoBox */}
			{/* InfoBox */}

			{/* Table */}
			{/* Graph */}

			{/* Map */}
		</div>
	)
}

export default App
