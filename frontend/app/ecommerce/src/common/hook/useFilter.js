import {  useContext } from "react";
import { FilterContext  } from "../context/FilterProvider";

export const useFilter = () => {
    return useContext(FilterContext);
}