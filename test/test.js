var assert = require("assert");
const googleMapsResponse = require("./mocks/googleMaps.json");
const generateInterface = require("../index").default;

describe("generateInterface", function() {
  it("should return the correct shape", function() {
    const shapeOfGoogleMapResponse = generateInterface(googleMapsResponse);
    assert.equal(
      JSON.stringify(shapeOfGoogleMapResponse),
      JSON.stringify({
        results: [
          {
            address_components: [
              { long_name: "string", short_name: "string", types: ["string"] }
            ],
            formatted_address: "string",
            geometry: {
              location: { lat: "number", lng: "number" },
              location_type: "string",
              viewport: {
                northeast: { lat: "number", lng: "number" },
                southwest: { lat: "number", lng: "number" }
              }
            },
            place_id: "string",
            plus_code: { compound_code: "string", global_code: "string" },
            types: ["string"]
          }
        ],
        status: "string"
      })
    );
  });
});
