import { useState } from "react";

export const useForm = (initailState) => {
    const [values, setValues] = useState(initailState);
    const onChange = (event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, setValues, onChange};
}