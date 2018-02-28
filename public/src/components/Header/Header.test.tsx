import {shallow} from 'enzyme';
import {withTheme} from 'material-ui/styles';
import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Header from './Header';

describe('Header', () => {
  const header = shallow(<Header/>, {context: {withTheme}}).dive();

  it('should have logo', () => {
    const logo = header.find('Logo');
    expect(logo).toHaveLength(1);
  });

  it('should have menu links', () => {
    const links = header.find('.header__link');
    expect(links.length).toBeGreaterThanOrEqual(2);
  });

  it('should render correctly', () => {
    const tree = renderer
      .create(<Header/>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
