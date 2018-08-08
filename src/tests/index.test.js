import { fetchPosts } from '../actions/index';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
global.fetch = require('jest-fetch-mock');


describe('testing redux async actions', () => {
    it('calls request and success actions if the fetch response was successful', () => {
        const store = mockStore({id: 1234, isFetching: false });
        
        fetch.mockResponseOnce(JSON.stringify({ data: '12345' }));
        return store.dispatch(fetchPosts('ESPN'))
          .then(() => {
            const expectedActions = store.getActions();
            expect(expectedActions.length).toBe(2);
            expect(expectedActions).toContainEqual({type: 'REQUEST_POSTS'});
          })
      });
});