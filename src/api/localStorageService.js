const keys = { cities: 'cities' };
const maxCities = 5;

export const localStorageService = {
    saveCities(cities) {
        let cityAsString = JSON.stringify(cities.filter((c,index) => index < maxCities));
        localStorage.setItem(keys.cities, cityAsString);
        return Promise.resolve();
    },
    loadCities() {
        const cities = JSON.parse(localStorage.getItem(keys.cities))
        return Promise.resolve(cities || []);
    }
}