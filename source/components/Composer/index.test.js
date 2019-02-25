// Core
import React from 'react';
import { mount } from 'enzyme';
// import { mount, configure } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
import {Composer} from './';

// configure({adapter: new Adapter()});

const props = {
    createPost:           jest.fn(),
    avatar:               '',
    currentUserFirstName: 'Vlad',
};

const comment = 'Merry Christmas!';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');

describe('composer component:', () => {
    test('should have 1 <section> element', ()=>{
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 <form> element', ()=>{
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 <textarea> element', ()=>{
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 <input> element', ()=>{
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 img element', ()=>{
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have valid initial state', ()=>{
        expect(result.state()).toEqual(initialState);
    });

    test('text area an initial value should be empty', ()=>{
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', ()=>{
        result.setState({comment});

        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState(initialState);

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea "change" event', ()=>{
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });

        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('should handle form "submit" event', ()=>{
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('createPost prop should be invoked once after form submission', ()=>{
        // expect(props.createPost.mock.calls).toHaveLength(1);
        // or
        // expect(props.createPost).toHaveBeenCalled();
        // or
        expect(props.createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit should be invoked once after form is submitted', ()=>{
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('component should return null on form "submit" event when comment is empty', ()=>{
        expect(result.state().comment).toBe('');
        result.find('form').simulate('submit');
        expect(_submitCommentSpy()).toBeNull();
    });

    test('should not be called _submitOnEnter it textarea element received onKeyPress event with no Enter key', ()=>{
        jest.clearAllMocks();
        result.find('textarea').simulate('keypress', {
            key: 'L',
        });

        expect(_submitCommentSpy).toHaveBeenCalledTimes(0);
    });

    test('should be called _submitOnEnter it textarea element received onKeyPress event with Enter key', ()=>{
        jest.clearAllMocks();
        result.find('textarea').simulate('keypress', {
            key: 'Enter',
        });

        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
    });

    test('composer component should correspond to its snapshot counterpart', () => {
        expect(result).toMatchSnapshot();
    });
});
