export const saverKey = 'marvel-heroes-favorites';

export function saveInFavorites(data, key, type) {
    const savedObjects = loadFavoriteContent();
    savedObjects[key] = {type: type, data: data};
    const jsonObj = JSON.stringify(savedObjects);
    localStorage.setItem(saverKey, jsonObj);
    return jsonObj;
}

export function loadFavoriteContent() {
    return JSON.parse(localStorage.getItem(saverKey)) || [];
}

export function clearStorage() {
    localStorage.setItem(saverKey, null);
}

export function removeItemFromFavorites(key) {
    const savedObjects = loadFavoriteContent();
    if (savedObjects[key]) savedObjects[key] = null;
}