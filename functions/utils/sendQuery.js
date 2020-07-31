const axios = require('axios');

module.exports = async (query, variables) => {
  const result = await axios({
    url: 'https://graphql.fauna.com/graphql',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_DB_SECRET}`,
    },
    data: {
      query,
      variables,
    },
  });

  return result.data;
};
