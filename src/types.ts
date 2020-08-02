export type Word = {
	_id: string;
	_ts: number;
	word: string;
	translation: string;
	type: WordType;
	notes?: Note;
};

export type WordType = "VERB" | "NOUN" | "PHRASE";

export type Note = {
	_id: string;
	_ts: number;
	title: string;
	content: string;
	word?: WordResult;
};

export interface NoteInputType {
	title: string;
	content: string;
}

export interface WordResult {
	data: Word;
}

export interface RespError {
	message: string;
	locations: { line: number; column: number; }[];
}
