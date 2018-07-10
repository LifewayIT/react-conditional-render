import PropTypes from "prop-types";
import {
  branch,
  renderNothing,
  renderComponent,
  setPropTypes,
} from "recompose";
import { identity, compose, is, ifElse } from "ramda";

export const isArray = is(Array);
export const toArray = ifElse(isArray, identity, a => [a]);

export const every = array => array.every(i => i);
export const all = compose(
  every,
  toArray,
);

const conditionalRender = component =>
  branch(
    ({ condition }) => all(condition),
    renderComponent(component),
    renderNothing,
  )(component);

export default compose(
  setPropTypes({
    condition: PropTypes.oneOfType([PropTypes.array, PropTypes.bool])
      .isRequired,
  }),
  conditionalRender,
);
