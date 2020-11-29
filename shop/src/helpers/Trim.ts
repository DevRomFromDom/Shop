export const trimDataObject = (data: object) => {
    const trimmedObject = {};
    for (const key in data) {
        if (Object.hasOwnProperty.call(data, key)) {
            if (typeof data[key] === "string") {
                trimmedObject[key] = data[key].trim();
            } else if (
                typeof data[key] === "object" &&
                !Array.isArray(data[key])
            ) {
                trimmedObject[key] = trimDataObject(data[key]);
            } else {
                trimmedObject[key] = data[key];
            }
        }
    }
    return trimmedObject;
};
