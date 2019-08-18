const COUNTRIES_DOM = {
    searchInput: document.querySelector("#search"),

    showAllBTN: document.querySelector("#all"),
    findCountryBTN: document.querySelector("#one"),
    capitalBTN: document.querySelector("#capital"),


}; console.log(countries);

$(document).ready(function () {

    function init() {
        const { searchInput, showAllBTN, findCountryBTN, capitalBTN } = COUNTRIES_DOM;

        hidecarousle()
        showAllBTN.addEventListener("click", () => {
            const resultsArr = showAllCountry(searchInput.value.toLowerCase())
            if (!resultsArr.length) return alert("can't find any country, try to check spelling issue")
            clearCarousle()
            resultsArr.forEach((flag) => {
                createCarousle(flag, 0)
            })
            showCarousle()
        })
        findCountryBTN.addEventListener("click", () => {
            const oneresult = findCountry(searchInput.value.toLowerCase())
            if (!oneresult) return alert("can't find any country, try to check spelling issue")
            clearCarousle()
            createCarousle(oneresult)
            showCarousle()
        })
        capitalBTN.addEventListener("click", () => {
            const resultsArr = showAllCountry(searchInput.value.toLowerCase())
            if (!resultsArr.length) returnalert("can't find any country, try to check spelling issue")
            clearCarousle()
            resultsArr.forEach((flag) => {
                createCarousle(flag, 1)
            })
            showCarousle()
        })

    }
    init()
});

function showAllCountry(val) {
    const resultsArr = countries.filter(country => country.name.toLowerCase().includes(val))
        .map((country) => {
            return { "flag": country.flag, "capital": country.capital }
        })
    return resultsArr
}

function findCountry(val) {
    const objectResult = countries.find(country => country.name.toLowerCase() === val)
    return objectResult
}



// const countryWithNamesAndFlag = countries.reduce((flag, country) => {
//     const { alpha3Code, name, flag } = country
//     countryWithFlag[name] = flag;
//     return { ...flag, [alpha3Code]: { name, flag } }
// }, {})
// console.log(countryWithNamesAndFlag);

