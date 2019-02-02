import { InputRule } from 'prosemirror-inputrules';
import { InputRuleCreator } from '../types';

export const nodeInputRule: InputRuleCreator = (regexp, type, getAttrs) => {
  return new InputRule(regexp, (state, match, start, end) => {
    const attrs = getAttrs instanceof Function ? getAttrs(match) : getAttrs;
    const { tr } = state;

    if (match[0]) {
      tr.replaceWith(start - 1, end, type.create(attrs!));
    }

    return tr;
  });
};
