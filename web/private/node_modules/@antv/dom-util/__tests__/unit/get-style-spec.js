const expect = require('chai').expect;
import { getStyle, modifyCSS } from '../../src';

describe('getStyle', () => {
  it('getStyle', () => {
    const div = document.createElement('div');
    div.innerText = 'hello world';
    document.body.appendChild(div);

    modifyCSS(div, {
      display: 'inline-block',
      width: '100px',
      borderRight: '2px red solid',
      textAlign: 'right',
    });

    expect(getStyle(div, 'display')).to.eql('inline-block');
    expect(getStyle(div, 'width')).to.eql('100px');
    expect(getStyle(div, 'textAlign')).to.eql('right');
    expect(getStyle(div, 'borderRightWidth')).to.eql('2px');
    expect(getStyle(div, 'border-right-width')).to.eql('2px');

    // default value
    expect(getStyle(div, 'not-exist')).to.eql(undefined);
    expect(getStyle(div, 'not-exist', 'def')).to.eql('def');
  });
});
