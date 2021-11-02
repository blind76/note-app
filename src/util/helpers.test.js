import {getPixelsOrString, isFunction, findNextId} from './helpers';

it('getPixelsOrString returns correct values', () => {
	expect(getPixelsOrString(100)).toEqual('100px');
	expect(getPixelsOrString('100px')).toEqual('100px');
});

it('isFunction returns correct', () => {
	expect(isFunction(100)).toEqual(false);
	expect(isFunction(() => {})).toEqual(true);
	expect(isFunction(true)).toEqual(false);
	expect(isFunction(function() {})).toEqual(true);
});

it('findNextId returns correct id', () => {
	expect(findNextId([])).toEqual(1);
	expect(findNextId([{id: 1}, {id: 2}])).toEqual(3);
	expect(findNextId([{id: 1}, {id: 3}])).toEqual(2);
});
