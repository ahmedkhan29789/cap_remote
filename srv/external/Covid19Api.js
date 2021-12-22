const cds = require("@sap/cds");

class Covid19Api extends cds.RemoteService {
  async init() {
    this.reject(["CREATE", "UPDATE", "DELETE"], "*");

    this.before("READ", "*", async (req) => {
      if (req.target.name === "srv.CatalogService.Countries") {
        req.myQuery = req.query;
        req.query = "GET /summary";
      }

      
    });

    this.on("READ", "*", async (req, next) => {
      if (req.target.name === "srv.CatalogService.Countries") {
        const response = await next(req);
        var items = parseResponseCountries(response);
        return items;
      }

	 
    });

    super.init();
  }
}

function parseResponseCountries(response) {
  var countries = [];

  response.Countries.forEach((c) => {
    var i = new Object();

    i.Country = c.Country;
    i.CountryCode = c.CountryCode;
    i.NewConfirmed = c.NewConfirmed;
    i.TotalConfirmed = c.TotalConfirmed;
    i.NewDeaths = c.NewDeaths;
    i.TotalDeaths = c.TotalDeaths;
    i.NewRecovered = c.NewRecovered;
    i.TotalRecovered = c.TotalRecovered;
    i.Date = c.Date;

    countries.push(i);
  });

  return countries;
}
module.exports = Covid19Api;