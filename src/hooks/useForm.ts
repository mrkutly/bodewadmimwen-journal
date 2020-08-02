import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import { WordResult } from '../types';
import { formatErrors } from '../utils';

type Result = WordResult;
type Status = 'REJECTED' | 'PENDING' | 'IDLE' | 'SUCCESS';

const useForm = <Data>(endpoint: string, initialData: Data, validator: (data: Data) => boolean) => {
	const [formData, setFormData] = useState(initialData);
	const [status, setStatus] = useState<Status>('IDLE');
	const [errors, setErrors] = useState<string[]>();
	const [result, setResult] = useState<Result>();

	interface UpdateInput {
		name: string;
		value: typeof initialData[keyof Data];
	}

	const update = ({ name, value }: UpdateInput) =>
		setFormData({ ...formData, [name]: value });

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const valid = validator(formData);
		if (!valid) return setStatus('REJECTED');

		setStatus('PENDING');
		try {
			const response = await axios.post(endpoint, formData);

			setStatus('SUCCESS');
			setResult(response.data.data);
		} catch (err) {
			if (err?.response?.data.errors) {
				setErrors(formatErrors(err.response.data.errors));
				setStatus('REJECTED');
			} else {
				setErrors(['There was a problem with this request. Try again later.']);
				setStatus('REJECTED');
			}
		}
	};

	return {
		errors,
		formData,
		result,
		status,
		submit,
		update,
		valid: validator(formData),
	};
};

export default useForm;
