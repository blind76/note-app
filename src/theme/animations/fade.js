import {css, keyframes} from 'styled-components';

/**
 * @type {Keyframes}
 */
export const fadeInKeyframes = keyframes`
0% {
  opacity: 0;
}

100% {
  opacity: 1;
}
`;

/**
 * @link https://animista.net/play/entrances/fade-in/fade-in
 */
export const fadeInAnimation = ({animationDuration = '1.2s'} = {}) => {
	return css`
		${fadeInKeyframes} ${animationDuration} cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	`;
};

/**
 * @type {Keyframes}
 */
export const fadeOutKeyframes = keyframes`
from {
  opacity: 1;
}

to {
  opacity: 0;
}
`;

/**
 * @link https://animista.net/play/exits/fade-out/fade-out
 */
export const fadeOutAnimation = ({animationDuration = '1s'} = {}) => {
	return css`
		${fadeOutKeyframes} ${animationDuration} ease-out both;
	`;
};
