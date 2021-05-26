const cds = require("@sap/cds");

module.exports = cds.service.impl(function () {
  this.before("READ", "Countries", async (req, next) => {
    const { Countries } = this.entities;

    // delete all countries
    //await DELETE.from(Countries);

    // fetch daily summary from covid API
    const Covid19Api = await cds.connect.to("Covid19Api");
    var countries = await Covid19Api.run(req.query);

    // insert summary into Countries table
    await INSERT.into(Countries).entries(countries);

    return;
  });
});