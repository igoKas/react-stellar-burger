import { useCallback, useState } from "react";

export const useForm = (initailState) => {
    const [values, setValues] = useState(initailState);
    const onChange = useCallback((event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    }, [values]);
    return {values, setValues, onChange};
}