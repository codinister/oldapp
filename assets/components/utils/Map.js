
const Map = (data,func,...args) => {
	return Object.values(data).map(v => func(v,...args))
}

export default Map