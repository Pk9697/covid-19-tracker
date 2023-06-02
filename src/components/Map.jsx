import React, { useState} from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Card, CardContent } from '@mui/material'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../assets/css/Map.css'
import { showDataOnMap } from '../helpers/utils'
function LocationMarker({position,zoom}) {
    const map=useMap()
    map.flyTo(position,zoom)
	return position === null ? null : (
		<Marker position={position}>
			<Popup>You are here</Popup>
		</Marker>
	)
}
function Map(props) {
	const { center, zoom, countries, casesType } = props || {}
	return (
		<Card>
			<CardContent className='map'>
				<MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					/>
                    <LocationMarker position={center} zoom={zoom} />
                    {showDataOnMap(countries,casesType)}
				</MapContainer>
			</CardContent>
		</Card>
	)
}

export default Map
