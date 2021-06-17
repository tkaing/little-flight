import React from 'react';

import { ErrorMessage } from "../core";

const is_not_valid = (touched, errors, property) => (touched[property] && errors[property]) !== undefined;

const display_error = (touched, errors, property) => {
    return is_not_valid(touched, errors, property) && <ErrorMessage children={errors[property]} />
};

export { is_not_valid, display_error }
