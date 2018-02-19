import {shallow} from 'enzyme';
import * as React from 'react';
import Logo from './Logo';

describe('Logo', () => {
    it('should have classname', () => {
        const logoClass: boolean = shallow(<Logo/>).hasClass('logo');
        expect(logoClass).toBeTruthy();
    });

    it('should have src attr', () => {
        const logoSrc: string = shallow(<Logo/>).find('img').prop('src');
        expect(logoSrc).toBeDefined();
    });

    it('should have one image', () => {
        const logoImg = shallow(<Logo/>).find('img');
        expect(logoImg).toHaveLength(1);
    });
});
