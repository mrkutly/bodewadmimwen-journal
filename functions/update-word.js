const sendQuery = require('./utils/sendQuery');

const UPDATE_WORD_MUTATION = `
	mutation UPDATE_WORD($_id: ID!, $translation: String!, $word: String!, $type: WordType!, $notes: NoteInput) {
		updateWord(id: $_id, data: { translation: $translation, word: $word, type: $type, notes: $notes }) {
			_id
			word
			translation
			type 
		}
	}
`;

exports.handler = async event => {
	const variables = JSON.parse(event.body);
	const { data, errors } = await sendQuery(UPDATE_WORD_MUTATION, variables);
	
	if (errors) {
		return {
			statusCode: 400,
			body: JSON.stringify({ errors }),
		};
	}

	return {
		statusCode: 200,
		body: JSON.stringify({ data: data.updateWord }),
	};
};
