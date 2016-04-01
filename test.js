var should = chai.should()

import { Content, Group, Section } from './hexagon-react'
import { TitleBar, TitleBarLink, TitleBarIcon } from './hexagon-react'
import { Button, Label, Spinner, SpinnerWide } from './hexagon-react'
import { Notice, Tree, Slider } from './hexagon-react'

function floatingComponent (component) {
  const selection = hx.detached('div')
  const element = selection.node()
  ReactDOM.render(component, element)
  return selection
}

describe('hexagon-react', function () {
  describe('<Content/>', () => {
    it('should be a div with the hx-content class', () => {
      const selection = floatingComponent(React.createElement(Content))
      selection.select('.hx-content').size().should.equal(1)
    })
  })

  describe('<Group/>', () => {
    it('should be a div with the hx-group class and hx-horizontal class by default', () => {
      const selection = floatingComponent(React.createElement(Group))
      selection.select('.hx-group').size().should.equal(1)
      selection.select('.hx-group').classed('hx-horizontal').should.be.true
    })

    it('should have the hx-vertical class when direction="horizontal"', () => {
      const selection = floatingComponent(React.createElement(Group, {direction: 'horizontal'}))
      selection.select('.hx-group').size().should.equal(1)
      selection.select('.hx-group').classed('hx-horizontal').should.be.true
    })

    it('should have the hx-vertical class when direction="vertical"', () => {
      const selection = floatingComponent(React.createElement(Group, {direction: 'vertical'}))
      selection.select('.hx-group').size().should.equal(1)
      selection.select('.hx-group').classed('hx-vertical').should.be.true
    })
  })

  describe('<Section/>', () => {
    it('should be a div with the hx-section class', () => {
      const selection = floatingComponent(React.createElement(Section))
      selection.select('.hx-section').size().should.equal(1)
    })
  })

  describe('<TitleBar/>', () => {
    it('should be a div with the hx-heading class', () => {
      const selection = floatingComponent(React.createElement(TitleBar))
      selection.select('.hx-heading').size().should.equal(1)
    })

    it('should have the right structure', () => {
      const selection = floatingComponent(React.createElement(TitleBar))
      selection.selectAll('.hx-heading').size().should.equal(1)
      selection.selectAll('.hx-titlebar').size().should.equal(1)
      selection.selectAll('.hx-titlebar-title').size().should.equal(1)
      selection.selectAll('.hx-titlebar-subtitle').size().should.equal(1)
      selection.selectAll('.hx-titlebar-menu-icon-mobile').size().should.equal(1)
      selection.selectAll('.hx-titlebar-menu-icon').size().should.equal(0)
      selection.selectAll('.hx-titlebar-link').size().should.equal(0)
    })

    it('should display the title properly', () => {
      const selection = floatingComponent(React.createElement(TitleBar, {title: 'Custom Title'}))
      selection.select('.hx-titlebar-title').text().should.equal('Custom Title')
    })

    it('should display the subtitle properly', () => {
      const selection = floatingComponent(React.createElement(TitleBar, {subtitle: 'Custom Title'}))
      selection.select('.hx-titlebar-subtitle').text().should.equal('Custom Title')
    })

    it('should display the links properly', () => {
      const selection = floatingComponent(React.createElement(TitleBar, {subtitle: 'Custom Title'},
        React.createElement(TitleBarLink, {href: '/link-1'}, 'Link 1'),
        React.createElement(TitleBarLink, {href: '/link-2'}, 'Link 2'),
        React.createElement(TitleBarLink, {href: '/link-3'}, 'Link 3')))
      selection.selectAll('.hx-titlebar-link').text().should.eql(['Link 1', 'Link 2', 'Link 3'])
    })

    it('should display the icons properly', () => {
      const selection = floatingComponent(React.createElement(TitleBar, {subtitle: 'Custom Title'},
        React.createElement(TitleBarIcon, {href: '/link-1'}, 'Icon 1'),
        React.createElement(TitleBarIcon, {href: '/link-2'}, 'Icon 2'),
        React.createElement(TitleBarIcon, {href: '/link-3'}, 'Icon 3')))
      selection.selectAll('.hx-titlebar-menu-icon').text().should.eql(['Icon 1', 'Icon 2', 'Icon 3'])
    })

  })

  describe('<Button/>', () => {
    it('should be a button with the hx-btn class', () => {
      const selection = floatingComponent(React.createElement(Button))
      selection.select('.hx-btn').size().should.equal(1)
    })

    it('should apply the context class correctly', () => {
      const selection = floatingComponent(React.createElement(Button, {context: 'positive'}))
      selection.select('.hx-positive').size().should.equal(1)
    })
  })

  describe('<Spinner/>', () => {
    it('should be a span with the hx-spinner class', () => {
      const selection = floatingComponent(React.createElement(Spinner))
      selection.select('.hx-spinner').size().should.equal(1)
    })
  })

  describe('<SpinnerWide/>', () => {
    it('should be a div with the hx-spinner-wide class', () => {
      const selection = floatingComponent(React.createElement(SpinnerWide))
      selection.select('.hx-spinner-wide').size().should.equal(1)
    })
  })

  describe('<Label/>', () => {
    it('should be a span with the hx-label class', () => {
      const selection = floatingComponent(React.createElement(Label))
      selection.select('.hx-label').size().should.equal(1)
    })

    it('should apply the context class correctly', () => {
      const selection = floatingComponent(React.createElement(Label, {context: 'positive'}))
      selection.select('.hx-positive').size().should.equal(1)
    })
  })

  describe('<Notice/>', () => {
    it('should be a span with the hx-notice class', () => {
      const selection = floatingComponent(React.createElement(Notice))
      selection.select('.hx-notice').size().should.equal(1)
    })

    // XXX: header
    // XXX: body

  })

  describe('<Tree/>', () => {
    it('should be a div with the hx-tree class', () => {
      const selection = floatingComponent(React.createElement(Tree))
      selection.select('.hx-tree').size().should.equal(1)
    })

    it('should initialise the component', () => {
      const selection = floatingComponent(React.createElement(Tree))
      selection.select('.hx-tree').component().should.be.an.instanceof(hx.Tree)
    })
  })

  describe('<Slider/>', () => {
    it('should be a div with the hx-slider class', () => {
      const selection = floatingComponent(React.createElement(Slider))
      selection.select('.hx-slider').size().should.equal(1)
    })

    it('should initialise the component', () => {
      const selection = floatingComponent(React.createElement(Slider))
      selection.select('.hx-slider').component().should.be.an.instanceof(hx.Slider)
    })
  })

})
