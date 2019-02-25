// Core
import { sum, delay, getUniqueID, getFullApiUrl } from './';

describe('instruments', () => {
    test('sum function should be a Function type', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw error when called with non-number type as first parameter', () => {
        expect(() => sum('hello', 2)).toThrow();
    });

    test('sum function should throw error when called with non-number type as second parameter', () => {
        expect(() => sum(2, 'hello')).toThrow();
    });

    test('sum function should return correct value', () => {
        expect(sum(2, 3)).toMatchSnapshot();
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a Function type', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw error when called with non-number type as parameter', () => {
        expect(() => getUniqueID('hello')).toThrow();
    });

    test('getUniqueID function should return a string with correct length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
        expect(getUniqueID()).toHaveLength(15);
    });

    test('getFullApiUrl function should be a Function type', () => {
        expect(getFullApiUrl).toBeInstanceOf(Function);
    });

    test('getFullApiUrl function should throw error when called with non-string type as first parameter', () => {
        expect(() => getFullApiUrl(2, 'GROUP_ID')).toThrow();
    });

    test('getFullApiUrl function should throw error when called with non-string type as second parameter', () => {
        expect(() => getFullApiUrl('api', 2)).toThrow();
    });

    test('getFullApiUrl function should return a string with correct value', () => {
        expect(typeof getFullApiUrl('api', 'GROUP_ID')).toBe('string');
        expect(getFullApiUrl('https://lab.lectrum.io/react/api', 'muigd1gnahf3')).toBe('https://lab.lectrum.io/react/api/muigd1gnahf3');
    });
});
