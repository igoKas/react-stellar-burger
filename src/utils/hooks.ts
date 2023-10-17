import { useCallback, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../services/store'
import { FormFields } from "./types";

export const useForm = (initailState: FormFields) => {
    const [values, setValues] = useState(initailState);
    const onChange = useCallback((event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    }, [values]);
    return {values, setValues, onChange};
}

const useAppDispatch: () => AppDispatch = useDispatch;
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { useAppDispatch as useDispatch, useAppSelector as useSelector }