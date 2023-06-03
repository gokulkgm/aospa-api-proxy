// listen for fetch events
addEventListener("fetch", event => {
	event.respondWith(handleRequest(event.request))
})

// event handler which returns a response object
async function handleRequest(request) {
	const url = new URL(request.url)

	// Github OTA API URL
	let otaAPIURL = "https://raw.githubusercontent.com/AOSPA/ota/master"

	let responseURL = new URL(otaAPIURL + url.pathname)

	for (let [key, value] of url.searchParams) {
		responseURL.searchParams.append(key, value)
	}

	let newRequest = new Request(responseURL, request)
	newRequest.headers.set('Host', responseURL.host)

	let response = await fetch(newRequest)

	return new Response(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers: response.headers
	})
}
