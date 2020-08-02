const sendQuery = require('./utils/sendQuery');

const WORDS_QUERY = `
	query {
		words {
			data {
				_id
				_ts
				word 
				translation
				notes {
					data {
						_id
						_ts
						title
						content
					}
				}
			}
		}
	}
`;

exports.handler = async () => {
  const { data, errors } = await sendQuery(WORDS_QUERY);

  if (errors) {
    return {
      statusCode: 500,
      body: JSON.stringify({ errors }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ words: data.words.data }),
  };
};
