import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, registerables } from 'chart.js'
import { Line } from 'react-chartjs-2'
import { Card, CardContent } from '@mui/material'
import { API_URLS } from '../helpers/urls'

ChartJS.register(...registerables)

const options = {
	plugins: {
		legend: false,
	},
	// legend: {
	// 	dispay: false,
	// },
	// elements: {
	// 	point: {
	// 		radius: 0,
	// 	},
	// },
	// maintainAspectRatio: false,
	// tooltips: {
	// 	mode: 'index',
	// 	intersect: false,
	// 	callbacks: {
	// 		label: function (tooltipItem, data) {
	// 			return numeral(tooltipItem.value).format('+0,0')
	// 		},
	// 	},
	// },
	// scales: {
	// 	xAxes: [
	// 		{
	// 			type: 'time',
	// 			time: {
	// 				format: 'MM/DD/YY',
	// 				tooltipFormat: 'll',
	// 			},
	// 		},
	// 	],
	// 	yAxes: [
	// 		{
	// 			gridLines: {
	// 				dispay: false,
	// 			},
	// 			ticks: {
	// 				callback: function (value, index, values) {
	// 					return numeral(value).format('0a')
	// 				},
	// 			},
	// 		},
	// 	],
	// },
}

function LineGraph({casesType}) {
	const [data, setData] = useState({})
	useEffect(() => {
		const getWorldwideHistoricalDataOfLastNDays = async () => {
			const url = API_URLS.getWorldwideHistoricalDataOfLastNDays(30)
			const res = await fetch(url)
			const data = await res.json()
			setData(buildChartData(data,casesType))
		}
		getWorldwideHistoricalDataOfLastNDays()
	}, [casesType])


	const buildChartData = (data, casesType) => {
		const chartData = []
		let lastDataPoint
		for (let date in data[casesType]) {
			if (lastDataPoint) {
				const newDataPoint = {
					x: date,
					y: data[casesType][date] - lastDataPoint,
				}
				chartData.push(newDataPoint)
			}
			lastDataPoint = data[casesType][date]
		}
		return chartData
	}

	return (
		<Card className='line-graph'>
			<CardContent className='line-content'>
				<h2>Worldwide new { casesType}</h2>
				{data?.length > 0 && (
					<Line
						options={options}
						data={{
							datasets: [
								{
									backgroundColor: 'red',
									borderColor: '#CC1034',
									data: data,
									tension: 0.4,
									fill: true,
									pointStyle: 'rect',
									pointBorderColor: 'blue',
								},
							],
						}}
					/>
				)}
			</CardContent>
		</Card>
	)
}

export default LineGraph
