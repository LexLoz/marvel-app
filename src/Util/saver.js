export const saverKey = 'marvel-heroes-favorites';

export function saveInFavorites(data, key, type) {
    const savedObjects = loadFavoriteContent();
    savedObjects[type] = savedObjects[type] || {}
    savedObjects[type][key] = data;
    saveInLocalstorage(saverKey, savedObjects)
    return savedObjects;
}

export function loadFavoriteContent() {
    return loadFromLocalstorage(saverKey) || {};
}

export function clearFavoriteContentStorage() {
    localStorage.setItem(saverKey, null);
}

export function removeItemFromFavorites(key) {
    const savedObjects = loadFavoriteContent();
    if (savedObjects[key]) savedObjects[key] = null;
}

export function saveInLocalstorage(key, value = "") {
    localStorage.setItem(key, typeof value == "object" ? JSON.stringify(value) : value);
}

export function loadFromLocalstorage(key) {
    return localStorage.getItem(key) ? JSON.parse(localStorage.getItem(key)) : null;
}