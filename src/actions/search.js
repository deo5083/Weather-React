
export function handleSearch(searchTerm) {
    return (dispatch) => {
        return search(searchTerm).then((response) => {
            if (response.status === 200) {
                dispatch(searchSucceeded(response))
            }
            else {
                dispatch(searchFailed(response.query))
            }
        })
    }
}

async function search(searchTerm) {
    const api_key = "ec98ea89c0ae53c7edf2e2293b6d5e10";
    let build_call;
    if (isNaN(searchTerm)) {
        build_call = "?q=" + searchTerm;
    } else {
        build_call = "?zip=" + searchTerm;
    }

    const call = "http://api.openweathermap.org/data/2.5/weather" + build_call + ",us&appid=" + api_key + "&units=imperial";

    const api_call = await fetch(call);
    const response = await api_call.json();

    const build_forecast_call = "http://api.openweathermap.org/data/2.5/forecast" + build_call + ",us&appid=" + api_key + "&units=imperial";
    const forecast_call = await fetch(build_forecast_call);
    const forecast_response = await forecast_call.json();
    const responseCode = parseInt(response.cod) === 200 && parseInt(forecast_response.cod) === 200 ? 200 : 0;
    return {
        searchResult: response,
        forecastResult: forecast_response,
        status: responseCode,
        query: searchTerm,
    };
}

function searchSucceeded(payload) {
    return {
        type: "SEARCH_SUCCESS",
        payload
    }
}

function searchFailed(query) {
    return {
        type: "SEARCH_FAILED",
        payload: {query: query},
    }
}