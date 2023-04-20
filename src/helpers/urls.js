const BASE_URL = 'https://disease.sh/v3/covid-19'

export const API_URLS = {
	getAllCountries: () => `${BASE_URL}/countries`,
	getCountryData: countryCode => `${BASE_URL}/countries/${countryCode}`,
	getWorldwideCountriesData: () => `${BASE_URL}/all`,
	getWorldwideHistoricalDataOfLastNDays: days =>
		`${BASE_URL}/historical/all?lastdays=${days}`,
}
