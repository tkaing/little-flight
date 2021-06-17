import styles from './styles';

import { default as on_in } from "./in/on";
import { default as on_up } from "./up/on";

import { default as schema_in } from "./in/schema";
import { default as schema_up } from "./up/schema";

const _in = {
    on: on_in, schema: schema_in
};

const _up = {
    on: on_up, schema: schema_up
};

export {
    _in,
    _up,
    styles
};
