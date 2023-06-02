import React, { useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import { Card, CardContent } from '@mui/material'
import { Icon } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import '../assets/css/Map.css'
import { showDataOnMap } from '../helpers/utils'
import markerIconPng from "leaflet/dist/images/marker-icon.png"
function LocationMarker({ position, zoom }) {
	const map = useMap()
	map.flyTo(position, zoom)
	
	return position === null ? null : (
		<Marker position={position} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
			<Popup>You are here</Popup>
		</Marker>
	)
}
function Map(props) {
	const { center, zoom, countries, casesType } = props || {}
	const att = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	const url = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
	return (
		<Card>
			<CardContent className='map'>
				<MapContainer center={center} zoom={zoom} scrollWheelZoom={false}>
					<TileLayer attribution={att} url={url} />
					<LocationMarker position={center} zoom={zoom} />
					{showDataOnMap(countries, casesType)}
				</MapContainer>
			</CardContent>
		</Card>
	)
}

export default Map
