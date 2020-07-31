const sendQuery = require('./utils/sendQuery');

const CREATE_WORD_MUTATION = `
	mutation CREATE_WORD($definition: String!, $word: String!, $type: WordType!, $notes: [NoteInput]) {
		createWord(data:{ definition: $definition, word: $word, type: $type, notes: { create: $notes } }) {
			_id
			word
			definition
			type 
			notes {
				data {
					title
					content
				}
			}
		}
	}
`;

exports.handler = async event => {
  const variables = JSON.parse(event.body);
  const { data, errors } = await sendQuery(CREATE_WORD_MUTATION, variables);

  if (errors) {
    return {
      statusCode: 400,
      body: JSON.stringify({ errors }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ data: data.createWord }),
  };
};
