var should = chai.should()

import { Content, Group, Section } from './hexagon-react'
import { TitleBar, TitleBarLink, TitleBarIcon } from './hexagon-react'
import { Button, Label, Spinner, SpinnerWide } from './hexagon-react'
import { Notice, Tree, Slider, Picker, InputGroup } from './hexagon-react'
import { ProgressBar, Collapsible, NumberPicker } from './hexagon-react'
import { ButtonGroup } from './hexagon-react'

function createComponent (component) {
  const selection = hx.detached('div')
  const element = selection.node()
  return new Promise((resolve) => {
    ReactDOM.render(component, element, () => {
      resolve(selection)
    })
  })
}

function testProp ({component, initialProps={}, props={}, test} = {}) {
  let update = undefined
  class Wrapper extends React.Component {
    constructor() {
      super()
      this.state = initialProps
    }
    componentWillMount() {
      update = () => new Promise((resolve) => {
          this.setState(props, resolve)
        })
    }
    render() {
      return React.createElement(component, this.state)
    }
  }

  return createComponent(React.createElement(Wrapper)).then((selection) => {
    test(selection, initialProps)
    return update().then(() => {
      test(selection, props)
    })
  })
}

describe('hexagon-react', function () {
  describe('<Content/>', () => {
    it('should be a div with the hx-content class', () => {
      return createComponent(React.createElement(Content)).then((selection) => {
        selection.selectAll('.hx-content').size().should.equal(1)
      })
    })
  })

  describe('<Group/>', () => {
    it('should be a div with the hx-group class and hx-horizontal class by default', () => {
      return createComponent(React.createElement(Group)).then((selection) => {
        selection.selectAll('.hx-group').size().should.equal(1)
        selection.select('.hx-group').classed('hx-horizontal').should.be.true
      })
    })

    it('should have the hx-vertical class when direction="horizontal"', () => {
      return createComponent(React.createElement(Group, {direction: 'horizontal'})).then((selection) => {
        selection.selectAll('.hx-group').size().should.equal(1)
        selection.select('.hx-group').classed('hx-horizontal').should.be.true
      })
    })

    it('should have the hx-vertical class when direction="vertical"', () => {
      return createComponent(React.createElement(Group, {direction: 'vertical'})).then((selection) => {
        selection.selectAll('.hx-group').size().should.equal(1)
        selection.select('.hx-group').classed('hx-vertical').should.be.true
      })
    })
  })

  describe('<Section/>', () => {
    it('should be a div with the hx-section class', () => {
      return createComponent(React.createElement(Section)).then((selection) => {
        selection.selectAll('.hx-section').size().should.equal(1)
      })
    })
  })

  describe('<TitleBar/>', () => {
    it('should be a div with the hx-heading class', () => {
      return createComponent(React.createElement(TitleBar)).then((selection) => {
        selection.selectAll('.hx-heading').size().should.equal(1)
      })
    })

    it('should have the right structure', () => {
      return createComponent(React.createElement(TitleBar)).then((selection) => {
        selection.selectAll('.hx-heading').size().should.equal(1)
        selection.selectAll('.hx-titlebar').size().should.equal(1)
        selection.selectAll('.hx-titlebar-title').size().should.equal(1)
        selection.selectAll('.hx-titlebar-subtitle').size().should.equal(1)
        selection.selectAll('.hx-titlebar-menu-icon-mobile').size().should.equal(1)
        selection.selectAll('.hx-titlebar-menu-icon').size().should.equal(0)
        selection.selectAll('.hx-titlebar-link').size().should.equal(0)
      })
    })

    it('should display the title properly', () => {
      return createComponent(React.createElement(TitleBar, {title: 'Custom Title'})).then((selection) => {
        selection.select('.hx-titlebar-title').text().should.equal('Custom Title')
      })
    })

    it('should display the subtitle properly', () => {
      return createComponent(React.createElement(TitleBar, {subtitle: 'Custom Title'})).then((selection) => {
        selection.select('.hx-titlebar-subtitle').text().should.equal('Custom Title')
      })
    })

    it('should display the links properly', () => {
      return createComponent(React.createElement(TitleBar, {subtitle: 'Custom Title'},
        React.createElement(TitleBarLink, {href: '/link-1'}, 'Link 1'),
        React.createElement(TitleBarLink, {href: '/link-2'}, 'Link 2'),
        React.createElement(TitleBarLink, {href: '/link-3'}, 'Link 3')))
        .then((selection) => {
          selection.selectAll('.hx-titlebar-link').text().should.eql(['Link 1', 'Link 2', 'Link 3'])
        })
    })

    it('should display the icons properly', () => {
      return createComponent(React.createElement(TitleBar, {subtitle: 'Custom Title'},
        React.createElement(TitleBarIcon, {href: '/link-1'}, 'Icon 1'),
        React.createElement(TitleBarIcon, {href: '/link-2'}, 'Icon 2'),
        React.createElement(TitleBarIcon, {href: '/link-3'}, 'Icon 3')))
        .then((selection) => {
          selection.selectAll('.hx-titlebar-menu-icon').text().should.eql(['Icon 1', 'Icon 2', 'Icon 3'])
        })
    })

  })

  describe('<Button/>', () => {
    it('should be a button with the hx-btn class', () => {
      return createComponent(React.createElement(Button)).then((selection) => {
        selection.select('.hx-btn').size().should.equal(1)
      })
    })

    it('should apply the context class correctly', () => {
      return createComponent(React.createElement(Button, {context: 'positive'})).then((selection) => {
        selection.select('.hx-positive').size().should.equal(1)
      })
    })
  })

  describe('<Spinner/>', () => {
    it('should be a span with the hx-spinner class', () => {
      return createComponent(React.createElement(Spinner)).then((selection) => {
        selection.select('.hx-spinner').size().should.equal(1)
      })
    })
  })

  describe('<SpinnerWide/>', () => {
    it('should be a div with the hx-spinner-wide class', () => {
      return createComponent(React.createElement(SpinnerWide)).then((selection) => {
        selection.select('.hx-spinner-wide').size().should.equal(1)
      })
    })
  })

  describe('<Label/>', () => {
    it('should be a span with the hx-label class', () => {
      return createComponent(React.createElement(Label)).then((selection) => {
        selection.select('.hx-label').size().should.equal(1)
      })
    })

    it('should apply the context class correctly', () => {
      return createComponent(React.createElement(Label, {context: 'positive'})).then((selection) => {
        selection.select('.hx-positive').size().should.equal(1)
      })
    })
  })

  describe('<Notice/>', () => {
    it('should be a span with the hx-notice class', () => {
      return createComponent(React.createElement(Notice)).then((selection) => {
        selection.selectAll('.hx-notice').size().should.equal(1)
      })
    })

    it('should apply the context class correctly', () => {
      return createComponent(React.createElement(Notice, {context: 'positive'})).then((selection) => {
        selection.selectAll('.hx-positive').size().should.equal(1)
      })
    })

    it('should create a header section', () => {
      return createComponent(React.createElement(Notice, { title: 'Title'})).then((selection) => {
        selection.selectAll('.hx-notice-header').size().should.equal(1)
        selection.select('.hx-notice-header').text().should.equal('Title')
      })
    })

    it('should create a body section', () => {
      return createComponent(React.createElement(Notice, undefined, React.createElement('div', {className: 'body'}))).then((selection) => {
        selection.selectAll('.hx-notice-body').size().should.equal(1)
        selection.select('.hx-notice-body').selectAll('.body').size().should.equal(1)
      })
    })

  })

  describe('<Tree/>', () => {
    it('should be a div with the hx-tree class', () => {
      return createComponent(React.createElement(Tree)).then((selection) => {
        selection.select('.hx-tree').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(Tree)).then((selection) => {
        selection.select('.hx-tree').component().should.be.an.instanceof(hx.Tree)
      })
    })

    it('should update the renderer when the props change', () => {
      return testProp({
        component: Tree,
        initialProps: {renderer: x => x},
        props: {renderer: x => x},
        test: (selection, props) => {
          selection.select('.hx-tree').component().renderer().should.equal(props.renderer)
        }
      })
    })

    it('should update the items when the props change', () => {
      return testProp({
        component: Tree,
        initialProps: {items: [{}, {}]},
        props: {items: [{}, {}, {}]},
        test: (selection, props) => {
          selection.select('.hx-tree').component().items().should.eql(props.items)
        }
      })
    })
  })

  describe('<Picker/>', () => {
    it('should be a div with the hx-tree class', () => {
      return createComponent(React.createElement(Picker)).then((selection) => {
        selection.select('.hx-picker').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(Picker)).then((selection) => {
        selection.select('.hx-picker').component().should.be.an.instanceof(hx.Picker)
      })
    })

    it('should apply the context class correctly', () => {
      return createComponent(React.createElement(Picker, {context: 'positive'})).then((selection) => {
        selection.select('.hx-positive').size().should.equal(1)
      })
    })

    it('should update the renderer when the props change', () => {
      return testProp({
        component: Picker,
        initialProps: {renderer: x => x},
        props: {renderer: x => x},
        test: (selection, props) => {
          selection.select('.hx-picker').component().renderer().should.equal(props.renderer)
        }
      })
    })

    it('should update the items when the props change', () => {
      return testProp({
        component: Picker,
        initialProps: {items: ['one', 'two']},
        props: {items: ['one', 'two', 'three']},
        test: (selection, props) => {
          selection.select('.hx-picker').component().items().should.eql(props.items)
        }
      })
    })

    it('should update the value when the props change', () => {
      return testProp({
        component: Picker,
        initialProps: {value: 'one', items: ['one', 'two', 'three']},
        props: {value: 'two', items: ['one', 'two', 'three']},
        test: (selection, props) => {
          selection.select('.hx-picker').component().value().should.eql(props.value)
        }
      })
    })

    it('should update the disabled property when the props change', () => {
      return testProp({
        component: Picker,
        initialProps: {disabled: false},
        props: {disabled: true},
        test: (selection, props) => {
          selection.select('.hx-picker').component().disabled().should.eql(props.disabled)
        }
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: Picker,
        initialProps: {onEvent, onEvent, value: 'one', items: ['one', 'two', 'three']},
        props: {onEvent, onEvent, value: 'two', items: ['one', 'two', 'three']},
        test: (selection, props) => {
          selection.select('.hx-picker').component().value().should.eql(props.value)
        }
      }).then(() => {
        changeValue.should.eql({value: 'two', cause: 'api'})
      })
    })
  })

  describe('<InputGroup/>', () => {
    it('should be a span with the hx-input-group class', () => {
      return createComponent(React.createElement(InputGroup)).then((selection) => {
        selection.selectAll('.hx-input-group').size().should.equal(1)
      })
    })
  })

  describe('<ProgressBar/>', () => {
    it('should be a div with the hx-tree class', () => {
      return createComponent(React.createElement(ProgressBar)).then((selection) => {
        selection.select('.hx-progress-bar').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(ProgressBar)).then((selection) => {
        selection.select('.hx-progress-bar').component().should.be.an.instanceof(hx.ProgressBar)
      })
    })

    it('should apply the context class correctly', () => {
      return createComponent(React.createElement(ProgressBar, {context: 'positive'})).then((selection) => {
        selection.select('.hx-positive').size().should.equal(1)
      })
    })

    it('should update the value when the props change', () => {
      return testProp({
        component: ProgressBar,
        initialProps: {value: 0.25},
        props: {value: 0.25},
        test: (selection, props) => {
          selection.select('.hx-progress-bar').component().value().should.equal(props.value)
        }
      })
    })

    it('should update the value when the props change', () => {
      return testProp({
        component: ProgressBar,
        initialProps: {},
        props: {},
        test: (selection, props) => {
          selection.select('.hx-progress-bar').component().value().should.equal(0)
        }
      })
    })
  })

  describe('<Collapsible/>', () => {
    it('should be a span with the hx-collapsible class', () => {
      return createComponent(React.createElement(Collapsible)).then((selection) => {
        selection.selectAll('.hx-collapsible').size().should.equal(1)
      })
    })

    it('should create a heading section', () => {
      return createComponent(React.createElement(Collapsible, { title: 'Title'})).then((selection) => {
        selection.selectAll('.hx-collapsible-heading').size().should.equal(1)
        selection.select('.hx-collapsible-heading').text().should.equal('Title')
      })
    })

    it('should create a content section', () => {
      return createComponent(React.createElement(Collapsible, undefined, React.createElement('div', {className: 'body'}))).then((selection) => {
        selection.selectAll('.hx-collapsible-content').size().should.equal(1)
        selection.select('.hx-collapsible-content').selectAll('.body').size().should.equal(1)
      })
    })

    it('should propagate events upwarcs', () => {
      let eventName = undefined
      let eventValue = undefined
      const onEvent = (name, value) => {
        eventName = name
        eventValue = value
      }
      return createComponent(React.createElement(Collapsible, {onEvent: onEvent})).then((selection) => {
        selection.select('.hx-collapsible').component().show()
        eventName.should.equal('change')
        eventValue.should.equal(true)
        selection.select('.hx-collapsible').component().hide()
        eventName.should.equal('change')
        eventValue.should.equal(false)
      })
    })
  })

  describe('<NumberPicker/>', () => {
    it('should be a div with the hx-tree class', () => {
      return createComponent(React.createElement(NumberPicker)).then((selection) => {
        selection.select('.hx-number-picker').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(NumberPicker)).then((selection) => {
        selection.select('.hx-number-picker').component().should.be.an.instanceof(hx.NumberPicker)
      })
    })

    it('should apply the context class correctly', () => {
      return createComponent(React.createElement(NumberPicker, {context: 'positive'})).then((selection) => {
        selection.select('.hx-positive').size().should.equal(1)
      })
    })

    it('should update the value when the props change', () => {
      return testProp({
        component: NumberPicker,
        initialProps: {value: 1},
        props: {value: 2},
        test: (selection, props) => {
          selection.select('.hx-number-picker').component().value().should.eql(props.value)
        }
      })
    })

    it('should update the min property when the props change', () => {
      return testProp({
        component: NumberPicker,
        initialProps: {min: 1},
        props: {min: 2},
        test: (selection, props) => {
          selection.select('.hx-number-picker').component().min().should.eql(props.min)
        }
      })
    })

    it('should update the max property when the props change', () => {
      return testProp({
        component: NumberPicker,
        initialProps: {max: 1},
        props: {max: 2},
        test: (selection, props) => {
          selection.select('.hx-number-picker').component().max().should.eql(props.max)
        }
      })
    })

    it('should update the disabled property when the props change', () => {
      return testProp({
        component: NumberPicker,
        initialProps: {disabled: false},
        props: {disabled: true},
        test: (selection, props) => {
          selection.select('.hx-number-picker').component().disabled().should.eql(props.disabled)
        }
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: NumberPicker,
        initialProps: {onEvent, onEvent, value: 1},
        props: {onEvent, onEvent, value: 2},
        test: (selection, props) => {
          selection.select('.hx-number-picker').component().value().should.eql(props.value)
        }
      }).then(() => {
        changeValue.should.eql({value: 2})
      })
    })
  })

  describe('<ButtonGroup/>', () => {
    it('should be a div with the hx-tree class', () => {
      return createComponent(React.createElement(ButtonGroup)).then((selection) => {
        selection.select('.hx-button-group').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(ButtonGroup)).then((selection) => {
        selection.select('.hx-button-group').component().should.be.an.instanceof(hx.ButtonGroup)
      })
    })

    it('should update the renderer when the props change', () => {
      return testProp({
        component: ButtonGroup,
        initialProps: {renderer: x => x},
        props: {renderer: x => x},
        test: (selection, props) => {
          selection.select('.hx-button-group').component().renderer().should.equal(props.renderer)
        }
      })
    })

    it('should update the items when the props change', () => {
      return testProp({
        component: ButtonGroup,
        initialProps: {items: ['one', 'two']},
        props: {items: ['one', 'two', 'three']},
        test: (selection, props) => {
          selection.select('.hx-button-group').component().items().should.eql(props.items)
        }
      })
    })

    it('should update the value when the props change', () => {
      return testProp({
        component: ButtonGroup,
        initialProps: {value: 'one', items: ['one', 'two', 'three']},
        props: {value: 'two', items: ['one', 'two', 'three']},
        test: (selection, props) => {
          selection.select('.hx-button-group').component().value().should.eql(props.value)
        }
      })
    })

    it('should update the disabled property when the props change', () => {
      return testProp({
        component: ButtonGroup,
        initialProps: {disabled: false},
        props: {disabled: true},
        test: (selection, props) => {
          selection.select('.hx-button-group').component().disabled().should.eql(props.disabled)
        }
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: ButtonGroup,
        initialProps: {onEvent, onEvent, value: 'one', items: ['one', 'two', 'three']},
        props: {onEvent, onEvent, value: 'two', items: ['one', 'two', 'three']},
        test: (selection, props) => {
          selection.select('.hx-button-group').component().value().should.eql(props.value)
        }
      }).then(() => {
        changeValue.should.eql({value: 'two', cause: 'api'})
      })
    })
  })

  describe('<Slider/>', () => {
    it('should be a div with the hx-slider class', () => {
      return createComponent(React.createElement(Slider)).then((selection) => {
        selection.select('.hx-slider').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(Slider)).then((selection) => {
        selection.select('.hx-slider').component().should.be.an.instanceof(hx.Slider)
      })
    })
  })

})
