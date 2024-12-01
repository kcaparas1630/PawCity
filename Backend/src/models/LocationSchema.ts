import mongose, { Schema } from "mongoose";

const LocationSchema = new Schema({
  streetAddress: {
    type: String,
    required: true,
    trim: true,
  },
  apartmentUnit: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  province: {
    type: String,
    required: true,
    enum: [
      "AB", // Alberta
      "BC", // British Columbia
      "MB", // Manitoba
      "NB", // New Brunswick
      "NL", // Newfoundland and Labrador
      "NS", // Nova Scotia
      "NT", // Northwest Territories
      "NU", // Nunavut
      "ON", // Ontario
      "PE", // Prince Edward Island
      "QC", // Quebec
      "SK", // Saskatchewan
      "YT", // Yukon
    ],
  },
  postalCode: {
    type: String,
    required: true,
    match: /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/
  }
});

export default LocationSchema;
