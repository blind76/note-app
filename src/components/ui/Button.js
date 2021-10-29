import React, {useCallback, useRef, useMemo} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {getPixelsOrString, isFunction} from '../../misc/helpers';

export const SIZE = {
	SM: 'sm',
	MD: 'md',
	LG: 'lg'
};

const Button = function({
	children,
	color = '#666666',
	m = null,
	size = SIZE.SM,
	onClick = null,
	leftIcon = null,
	rightIcon = null,
	iconColor = '#666666',
	disabled,
	background = 'transparent',
	...otherProps
}) {
	const innerRef = useRef(null);
	const iconButton = !children && (leftIcon || rightIcon);

	const buttonCss = useMemo(() => {
		const c = {};

		switch (size) {
			case SIZE.SM:
				c.minWidth = '80px';
				c.height = '25px';
				c.borderRadius = '25px';
				c.fontSize = '13px';
				c.margin = m !== null ? getPixelsOrString(m) : '3px';

				if (iconButton) {
					c.width = '25px';
					c.minWidth = '0';
				}
				break;

			default:
			case SIZE.MD:
				c.minWidth = '100px';
				c.height = '30px';
				c.borderRadius = '30px';
				c.fontSize = '13px';
				c.margin = m !== null ? getPixelsOrString(m) : '6px';

				if (iconButton) {
					c.width = '30px';
					c.minWidth = '0';
				}
				break;

			case SIZE.LG:
				c.minWidth = '110px';
				c.height = '40px';
				c.borderRadius = '40px';
				c.fontSize = '15px';
				c.margin = m !== null ? getPixelsOrString(m) : '9px';

				if (iconButton) {
					c.width = '40px';
					c.minWidth = '0';
				}
				break;
		}

		c.color = color;
		c.background = background;

		return c;
	}, [size, color, background, m, iconButton]);

	const handleClick = useCallback(
		(e) => {
			e.stopPropagation();

			if (isFunction(onClick)) {
				e.preventDefault();
				onClick({
					element: innerRef.current
				});
			}
		},
		[onClick]
	);

	return (
		<StyledButton $buttonCss={buttonCss} disabled={disabled} onClick={handleClick} ref={innerRef} {...otherProps}>
			{leftIcon && (
				<LeftIcon>
					<FontAwesomeIcon icon={leftIcon} {...(iconColor && {color: iconColor})} />
				</LeftIcon>
			)}
			{children && children}
			{rightIcon && (
				<RightIcon>
					<FontAwesomeIcon icon={rightIcon} {...(iconColor && {color: iconColor})} />
				</RightIcon>
			)}
		</StyledButton>
	);
};

Button.propTypes = {
	/** what will be displayed in button as text */
	children: PropTypes.node,
	/** icon that will display left from text */
	// eslint-disable-next-line
	leftIcon: PropTypes.object,
	/** icon that will display right from text */
	// eslint-disable-next-line
	rightIcon: PropTypes.object,
	/** background color of component
	 * @default #666666
	 */
	iconColor: PropTypes.string,
	/** size of button
	 * @default MD
	 */
	size: PropTypes.oneOf(Object.keys(SIZE)),
	/** text color
	 * @default #666666
	 */
	color: PropTypes.string,
	/** background color of component
	 * @default transparent
	 */
	background: PropTypes.string,
	/** is component disabled */
	disabled: PropTypes.bool,
	/** callback that will be called when component is clicked. Callback returns name and ref props. */
	onClick: PropTypes.func,
	/** use to override default margins */
	m: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

const StyledButton = styled.button`
	vertical-align: middle;
	outline: none;
	text-decoration: none;
	position: relative;
	appearance: none;
	box-sizing: border-box;
	padding: 0;
	width: auto;

	display: inline-flex;
	flex-direction: row;
	flex-wrap: nowrap;
	justify-content: center;
	align-items: center;

	cursor: pointer;
	touch-action: manipulation;
	border: 1px solid transparent;

	text-transform: none;
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-wrap: break-word;
	overflow: hidden;
	user-select: none;
	line-height: normal;

	${({$buttonCss}) => css($buttonCss)}

	&:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}

	&:hover {
		transition: background-color 0.2s ease-in-out;
	}
`;

const LeftIcon = styled.span`
	font-size: 1em;
`;
const RightIcon = styled.span`
	font-size: 1em;
`;

export default Button;
