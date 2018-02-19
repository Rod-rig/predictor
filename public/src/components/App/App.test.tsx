import {shallow} from 'enzyme';
import * as React from 'react';
import App from './App';

describe('App', () => {
    const app = shallow(<App/>);

    it('should have header', () => {
        const header = app.find('Header');
        expect(header).toHaveLength(1);
    });

    it('should have app router', () => {
        const appRouter = app.find('AppRouter');
        expect(appRouter).toHaveLength(1);
    });
});
