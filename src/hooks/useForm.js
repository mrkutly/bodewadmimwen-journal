import { useState } from 'react';
import axios from 'axios';

const useForm = (endpoint, initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [status, setStatus] = useState('IDLE');
  const [errors, setErrors] = useState();
  const [result, setResult] = useState();

  const update = ({ name, value }) =>
    setFormData({ ...formData, [name]: value });

  const submit = async () => {
    setStatus('PENDING');

    try {
      const response = await axios.post(endpoint, formData);
    } catch (e) {
      console.log(e);
    }

    // if (response.data.errors) {
    //   setStatus('REJECTED');
    //   setErrors(response.data.errors);
    //   return;
    // }

    // setStatus('SUCCESS');
    // setResult(response.data.data);
  };

  return {
    errors,
    formData,
    result,
    status,
    submit,
    update,
  };
};

export default useForm;
