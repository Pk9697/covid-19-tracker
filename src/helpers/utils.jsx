import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet'
export function sortData(data,casesType) {
	const sortedData = [...data]
	return sortedData.sort((a, b) => b[casesType] - a[casesType])
}

export const prettyPrintStat = (stat) => (
	stat?`${numeral(stat).format("0.0a")}`:'0'
)

const casesTypeColors = {
	cases: {
		hex: '#CC1034',
		multiplier: 25000,
	},
	recovered: {
		hex: '#7dd71d',
		multiplier: 20000,
	},
	deaths: {
		hex: '#fb4443',
		multiplier: 300000,
	},
}

export const showDataOnMap = (data, casesType = 'cases') => (
	data.map((country,index) => (
		<Circle
			key={`map-country-${index}`}
			center={[country.countryInfo.lat, country.countryInfo.long]}
			pathOptions={{ color:casesTypeColors[casesType].hex,fillColor: casesTypeColors[casesType].hex,fillOpacity:0.4 }}
			radius={Math.sqrt(
				country[casesType] * casesTypeColors[casesType].multiplier
			)}
		>
			<Popup>
				<div className='info-container'>
					<div
						style={{
							backgroundImage: `url(${country.countryInfo.flag})`,
						}}
						className='info-flag'
					></div>
					<div className='info-name'>{country.country}</div>
					<div className='info-cases'>
						Cases: {numeral(country.cases).format('0.0a')}
					</div>
					<div className='info-recovered'>
						Recovered: {numeral(country.recovered).format('0.0a')}
					</div>
					<div className='info-deaths'>
						Deaths: {numeral(country.deaths).format('0.0a')}
					</div>
				</div>
			</Popup>
		</Circle>
	))
)