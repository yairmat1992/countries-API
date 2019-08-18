

$(function () {

    $.ajax({
        type: "get", url: "http://api.citybik.es/v2/networks", success: function (data) {
            const cities = data.networks.reduce((citiesOBJ, network) => {
                const { location, company } = network
                const { city } = location
                const tempOBJ = citiesOBJ[city] || []
                return { ...citiesOBJ, [city]: [...tempOBJ, company] }
            }, {})

            const countries = data.networks.reduce((countriesOBJ, network) => {
                const { location, company } = network
                const { city, country, latitude, longitude } = location
                const tempOBJ = countriesOBJ[country] || []
                return { ...countriesOBJ, [country]: [...tempOBJ, { company, city, latitude, longitude, }] }
            }, {})

            console.log(countries)

            $("#selectCity").html(getCitiesSelect(Object.keys(cities)));
            $("#company-list").html(getCompaniesList(cities[Object.keys(cities)[0]]))
            $("#selectCity").on("change", function () {
                $("#company-list").html(getCompaniesList(cities[this.value]))
            })

            $("#country-list").html(getCountriesSelect(Object.keys(countries)))
            $(".country-name").css({ "cursor": "pointer" })
            $(".country-name").on("click", function () {
                $("#location-list").html(getLocationList(countries[this.id]))
            })
        }
    })
})

function getCitiesSelect(dataArray) {
    return dataArray.map(city => `<option value="${city}"> ${city} </option>`)
}

function getCompaniesList(cityArray) {
    if (!Array.isArray(cityArray[0])) return `<li > ${cityArray} </li>`
    return cityArray.reduce((itemsString, companyArray) => {
        const tempString = companyArray.map(company => `<li class="list-group-item"> ${company} </li>`)
        itemsString += tempString.join("")
        return itemsString
    }, [])
}

function getCountriesSelect(dataArray) {
    return dataArray.map(country => `<li class="list-group-item country-name" id="${country}"> ${country} </li>`)
}

function getLocationList(countryArray) {
    return countryArray.reduce((itemsString, companyArray) => {
        if (!Array.isArray(companyArray.company)) {
            const noArray = countryArray.map((network) => {
                return `<li class="list-group-item"> <b>${network.company}</b> ${network.city}:
                     alt: ${network.latitude} long: ${network.longitude}</li>`
            })
            itemsString += noArray.join("")
            return itemsString
        }
        const tempString = companyArray.company.map((network) => {
            return `<li class="list-group-item"> <b>${network}</b> ${companyArray.city}:
             alt: ${companyArray.latitude} long: ${companyArray.longitude}</li>`
        })
        itemsString += tempString.join("")
        return itemsString
    }, [])
}////////////////fdsfsdfsdfsdfsdf