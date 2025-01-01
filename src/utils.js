import { LAYER_SCRIPTS } from './scripts/eval.js';

export const getEvalScript = (layer) => {
    return LAYER_SCRIPTS[layer];
}