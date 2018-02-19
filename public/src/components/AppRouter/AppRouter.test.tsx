import {mount} from 'enzyme';
import * as React from 'react';
import {MemoryRouter} from 'react-router-dom';
import AppRouter from './AppRouter';

describe('AppRouter', () => {
    it('should show main page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <AppRouter/>
            </MemoryRouter>,
        );
        expect(wrapper.find('TableContainer')).toHaveLength(1);
    });

    it('should show predictions page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/predictions']}>
                <AppRouter/>
            </MemoryRouter>,
        );
        expect(wrapper.find('Prediction')).toHaveLength(1);
    });

    it('it should show 404 page', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/random']}>
                <AppRouter/>
            </MemoryRouter>,
        );
        expect(wrapper.find('NotFound')).toHaveLength(1);
    });
});
