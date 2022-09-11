const Places = require("../models/places.model");

const getAllPlaces = async () => {
    const data = await Places.findAll()
    return data
}

const getPlaceById = async (id) => {
    const data = await Places.findOne({
        where: {
            id
        }
    })
    return data
}