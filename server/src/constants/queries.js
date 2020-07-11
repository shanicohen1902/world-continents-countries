
const ALL_CONTINENTS = '?query=' + `
{
	continents{
	  code
	  name
	}
}`;

const COUNTRIES_BY_CONTINENT = '?query=' + `{
	continent(code: "`
	+"CODE_PLACEHOLDER"+
	`") {
	  name
	  code
	  countries{
		code
		name
		capital
		phone
		currency
		languages{
		  name
		}
	  }
	}
  }`;



module.exports = {
	ALL_CONTINENTS: ALL_CONTINENTS,
	COUNTRIES_BY_CONTINENT: COUNTRIES_BY_CONTINENT
};
