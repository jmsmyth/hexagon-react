var should = chai.should()

import { Content, Group, Section } from './hexagon-react'
import { TitleBar, TitleBarLink, TitleBarIcon } from './hexagon-react'
import { Button, Label, Spinner, SpinnerWide } from './hexagon-react'
import { Notice, Tree, Picker, InputGroup } from './hexagon-react'
import { ProgressBar, Collapsible, NumberPicker } from './hexagon-react'
import { ButtonGroup, DatePicker, TimePicker } from './hexagon-react'
import { DateTimePicker, ColorPicker, Toggle } from './hexagon-react'
import { PivotTable, TagInput, AutoComplete, Slider } from './hexagon-react'
import { TimeSlider, DataTable } from './hexagon-react'

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
        initialProps: {onEvent, value: 'one', items: ['one', 'two', 'three']},
        props: {onEvent, value: 'two', items: ['one', 'two', 'three']},
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
      return createComponent(React.createElement(Collapsible, {onEvent})).then((selection) => {
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
        initialProps: {onEvent, value: 1},
        props: {onEvent, value: 2},
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
        initialProps: {onEvent, value: 'one', items: ['one', 'two', 'three']},
        props: {onEvent, value: 'two', items: ['one', 'two', 'three']},
        test: (selection, props) => {
          selection.select('.hx-button-group').component().value().should.eql(props.value)
        }
      }).then(() => {
        changeValue.should.eql({value: 'two', cause: 'api'})
      })
    })
  })

  describe('<DatePicker/>', () => {
    it('should be a div with the hx-tree class', () => {
      return createComponent(React.createElement(DatePicker)).then((selection) => {
        selection.select('.hx-date-picker').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(DatePicker)).then((selection) => {
        selection.select('.hx-date-picker').component().should.be.an.instanceof(hx.DatePicker)
      })
    })

    it('should update the date when the props change', () => {
      const date1 = new Date(2016, 0, 1)
      const date2 = new Date(2016, 0, 2)
      return testProp({
        component: DatePicker,
        initialProps: {date: date1},
        props: {date: date2},
        test: (selection, props) => {
          selection.select('.hx-date-picker').component().date().should.eql(props.date)
        }
      })
    })

    it('should update the min property when the props change', () => {
      const date1 = new Date(2016, 0, 1)
      const date2 = new Date(2016, 0, 2)
      return testProp({
        component: DatePicker,
        initialProps: {min: date1},
        props: {min: date2},
        test: (selection, props) => {
          selection.select('.hx-date-picker').component().validRange().start.should.eql(props.min)
        }
      })
    })

    it('should update the max property when the props change', () => {
      const date1 = new Date(2016, 0, 1)
      const date2 = new Date(2016, 0, 2)
      return testProp({
        component: DatePicker,
        initialProps: {max: date1},
        props: {max: date2},
        test: (selection, props) => {
          selection.select('.hx-date-picker').component().validRange().end.should.eql(props.max)
        }
      })
    })

    it('should update the disabled property when the props change', () => {
      return testProp({
        component: DatePicker,
        initialProps: {disabled: false},
        props: {disabled: true},
        test: (selection, props) => {
          selection.select('.hx-date-picker').component().disabled().should.eql(props.disabled)
        }
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const date1 = new Date(2016, 0, 1)
      const date2 = new Date(2016, 0, 2)
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: DatePicker,
        initialProps: {onEvent, date: date1},
        props: {onEvent, date: date2},
        test: (selection, props) => {
          selection.select('.hx-date-picker').component().date().should.eql(props.date)
        }
      }).then(() => {
        changeValue.should.eql({type: 'api'})
      })
    })
  })

  describe('<TimePicker/>', () => {
    it('should be a div with the hx-tree class', () => {
      return createComponent(React.createElement(TimePicker)).then((selection) => {
        selection.select('.hx-time-picker').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(TimePicker)).then((selection) => {
        selection.select('.hx-time-picker').component().should.be.an.instanceof(hx.TimePicker)
      })
    })

    it('should update the date when the props change', () => {
      const date1 = new Date(2016, 0, 1)
      const date2 = new Date(2016, 0, 2)
      return testProp({
        component: TimePicker,
        initialProps: {date: date1},
        props: {date: date2},
        test: (selection, props) => {
          selection.select('.hx-time-picker').component().date().should.eql(props.date)
        }
      })
    })

    it('should update the disabled property when the props change', () => {
      return testProp({
        component: TimePicker,
        initialProps: {disabled: false},
        props: {disabled: true},
        test: (selection, props) => {
          selection.select('.hx-time-picker').component().disabled().should.eql(props.disabled)
        }
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const date1 = new Date(2016, 0, 1)
      const date2 = new Date(2016, 0, 2)
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: TimePicker,
        initialProps: {onEvent, date: date1},
        props: {onEvent, date: date2},
        test: (selection, props) => {
          selection.select('.hx-time-picker').component().date().should.eql(props.date)
        }
      }).then(() => {
        changeValue.should.eql({type: 'api'})
      })
    })
  })

  describe('<DateTimePicker/>', () => {
    it('should be a div with the hx-tree class', () => {
      return createComponent(React.createElement(DateTimePicker)).then((selection) => {
        selection.select('.hx-date-time-picker').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(DateTimePicker)).then((selection) => {
        selection.select('.hx-date-time-picker').component().should.be.an.instanceof(hx.DateTimePicker)
      })
    })

    it('should update the date when the props change', () => {
      const date1 = new Date(2016, 0, 1)
      const date2 = new Date(2016, 0, 2)
      return testProp({
        component: DateTimePicker,
        initialProps: {date: date1},
        props: {date: date2},
        test: (selection, props) => {
          selection.select('.hx-date-time-picker').component().date().should.eql(props.date)
        }
      })
    })

    it('should update the disabled property when the props change', () => {
      return testProp({
        component: DateTimePicker,
        initialProps: {disabled: false},
        props: {disabled: true},
        test: (selection, props) => {
          selection.select('.hx-date-time-picker').component().disabled().should.eql(props.disabled)
        }
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const date1 = new Date(2016, 0, 1)
      const date2 = new Date(2016, 0, 2)
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: DateTimePicker,
        initialProps: {onEvent, date: date1},
        props: {onEvent, date: date2},
        test: (selection, props) => {
          selection.select('.hx-date-time-picker').component().date().should.eql(props.date)
        }
      }).then(() => {
        changeValue.should.eql(date2)
      })
    })
  })

  describe('<ColorPicker/>', () => {
    it('should be a div with the hx-tree class', () => {
      return createComponent(React.createElement(ColorPicker)).then((selection) => {
        selection.select('.hx-color-picker').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(ColorPicker)).then((selection) => {
        selection.select('.hx-color-picker').component().should.be.an.instanceof(hx.ColorPicker)
      })
    })

    it('should update the date when the props change', () => {
      const color1 = '#ff00ff'
      const color2 = '#ffff00'
      return testProp({
        component: ColorPicker,
        initialProps: {value: color1},
        props: {value: color2},
        test: (selection, props) => {
          selection.select('.hx-color-picker').component().value().should.eql(props.value)
        }
      })
    })

    it('should update the disabled property when the props change', () => {
      return testProp({
        component: ColorPicker,
        initialProps: {disabled: false},
        props: {disabled: true},
        test: (selection, props) => {
          selection.select('.hx-color-picker').component().disabled().should.eql(props.disabled)
        }
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const color1 = '#ff00ff'
      const color2 = '#ffff00'
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: ColorPicker,
        initialProps: {onEvent, value: color1},
        props: {onEvent, value: color2},
        test: (selection, props) => {
          selection.select('.hx-color-picker').component().value().should.eql(props.value)
          // XXX: fake the event, since hexagon doesn't emit it. This needs fixing in hexagon
          selection.select('.hx-color-picker').component().emit('change', {value: color2, cause: 'api'})
        }
      }).then(() => {
        changeValue.should.eql({value: color2, cause: 'api'})
      })
    })
  })

  describe('<Toggle/>', () => {
    it('should be a div with the hx-tree class', () => {
      return createComponent(React.createElement(Toggle)).then((selection) => {
        selection.select('.hx-toggle').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(Toggle)).then((selection) => {
        selection.select('.hx-toggle').component().should.be.an.instanceof(hx.Toggle)
      })
    })

    it('should update the value when the props change', () => {
      return testProp({
        component: Toggle,
        initialProps: {value: true},
        props: {value: false},
        test: (selection, props) => {
          selection.select('.hx-toggle').component().value().should.equal(props.value)
        }
      })
    })
    //
    // it('should update the disabled property when the props change', () => {
    //   return testProp({
    //     component: Toggle,
    //     initialProps: {disabled: false},
    //     props: {disabled: true},
    //     test: (selection, props) => {
    //       selection.select('.hx-toggle').component().disabled().should.eql(props.disabled)
    //     }
    //   })
    // })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: Toggle,
        initialProps: {onEvent, value: true},
        props: {onEvent, value: false},
        test: (selection, props) => {
          selection.select('.hx-toggle').component().value().should.eql(props.value)
          // XXX: fake the event, since hexagon doesn't emit it. This needs fixing in hexagon
          selection.select('.hx-toggle').component().emit('change', {value: props.value, cause: 'api'})
        }
      }).then(() => {
        changeValue.should.eql({value: false, cause: 'api'})
      })
    })

    it('should not emit when the props dont change', () => {
      let changeValue = 'not set'
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: Toggle,
        initialProps: {onEvent},
        props: {onEvent},
        test: (selection, props) => {
          selection.select('.hx-toggle').component().value().should.eql(false)
        }
      }).then(() => {
        changeValue.should.equal('not set')
      })
    })
  })

  describe('<PivotTable/>', () => {
    it('should be a div with the hx-pivot-table class', () => {
      return createComponent(React.createElement(PivotTable)).then((selection) => {
        selection.select('.hx-pivot-table').size().should.equal(1)
      })
    })

    it('should update the data when the props change', () => {
      return testProp({
        component: PivotTable,
        initialProps: {data: []},
        props: {data: []},
        test: (selection, props) => {
          selection.select('.hx-pivot-table').component().data().should.eql(props.data)
        }
      })
    })

    it('should not set the data property when not defined', () => {
      return testProp({
        component: PivotTable,
        initialProps: {},
        props: {},
        test: (selection, props) => {
          should.not.exist(selection.select('.hx-pivot-table').component().data())
        }
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(PivotTable)).then((selection) => {
        selection.select('.hx-pivot-table').component().should.be.an.instanceof(hx.PivotTable)
      })
    })
  })

  describe('<TagInput/>', () => {
    it('should be a div with the hx-pivot-table class', () => {
      return createComponent(React.createElement(TagInput)).then((selection) => {
        selection.select('.hx-tag-input').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(TagInput)).then((selection) => {
        selection.select('.hx-tag-input').component().should.be.an.instanceof(hx.TagInput)
      })
    })

    it('should update the items when the props change', () => {
      return testProp({
        component: TagInput,
        initialProps: {items: ['one', 'two']},
        props: {items: ['one', 'two', 'three']},
        test: (selection, props) => {
          selection.select('.hx-tag-input').component().items().should.eql(props.items)
        }
      })
    })

    it('should update the disabled property when the props change', () => {
      return testProp({
        component: TagInput,
        initialProps: {disabled: false},
        props: {disabled: true},
        test: (selection, props) => {
          selection.select('.hx-tag-input').component().disabled().should.eql(props.disabled)
        }
      })
    })

    it('should propagate events upwards', () => {
      let events = []
      const onEvent = (name, value) => {
        events.push({name, value})
      }
      return testProp({
        component: TagInput,
        initialProps: {onEvent, items: ['one', 'two']},
        props: {onEvent, items: ['one', 'two', 'three']},
        test: (selection, props) => {
          selection.select('.hx-tag-input').component().items().should.eql(props.items)
        }
      }).then(() => {
        events.should.eql([
          {name: 'remove', value: {value: 'one', type: 'api'}}, // XXX: type should be cause in hexagon
          {name: 'remove', value: {value: 'two', type: 'api'}},
          {name: 'add', value: {value: 'one', type: 'api'}},
          {name: 'add', value: {value: 'two', type: 'api'}},
          {name: 'add', value: {value: 'three', type: 'api'}}
        ])
      })
    })
  })

  describe('<AutoComplete/>', () => {
    it('should be a div with the hx-slider class', () => {
      return createComponent(React.createElement(AutoComplete, {data: ['one', 'two']})).then((selection) => {
        selection.select('.hx-auto-complete').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(AutoComplete, {data: ['one', 'two']})).then((selection) => {
        selection.select('.hx-auto-complete').component().should.be.an.instanceof(hx.AutoComplete)
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: AutoComplete,
        initialProps: {onEvent, data: ['one', 'two']},
        props: {onEvent, data: ['one', 'two']},
        test: (selection, props) => {
          // ////selection.select('.hx-auto-complete').component().value().should.eql(props.value)
          // fake the event, as manipulating the dom to get the event to send it more difficult
          selection.select('.hx-auto-complete').component().value('one')
        }
      }).then(() => {
        changeValue.should.eql('one')
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

    it('should update the disabled property when the props change', () => {
      return testProp({
        component: Slider,
        initialProps: {disabled: false},
        props: {disabled: true},
        test: (selection, props) => {
          selection.select('.hx-slider').component().disabled().should.eql(props.disabled)
        }
      })
    })

    it('should update the discreteValues property when the props change', () => {
      return testProp({
        component: Slider,
        initialProps: {discreteValues: ['one', 'two']},
        props: {discreteValues: ['one', 'two', 'three']},
        test: (selection, props) => {
          selection.select('.hx-slider').component().discreteValues().should.eql(props.discreteValues)
        }
      })
    })

    it('should update the min property when the props change', () => {
      return testProp({
        component: Slider,
        initialProps: {min: 2},
        props: {min: 3},
        test: (selection, props) => {
          selection.select('.hx-slider').component().min().should.eql(props.min)
        }
      })
    })

    it('should update the max property when the props change', () => {
      return testProp({
        component: Slider,
        initialProps: {max: 2},
        props: {max: 3},
        test: (selection, props) => {
          selection.select('.hx-slider').component().max().should.eql(props.max)
        }
      })
    })

    it('should update the step property when the props change', () => {
      return testProp({
        component: Slider,
        initialProps: {step: 2},
        props: {step: 3},
        test: (selection, props) => {
          selection.select('.hx-slider').component().step().should.eql(props.step)
        }
      })
    })

    it('should set the type property', () => {
      return createComponent(React.createElement(Slider, {type: 'range'})).then((selection) => {
        selection.select('.hx-slider').component().options.type.should.equal('range')
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: Slider,
        initialProps: {onEvent, value: 0.25},
        props: {onEvent, value: 0.75},
        test: (selection, props) => {
          selection.select('.hx-slider').component().value().should.eql(props.value)
          // XXX: hexagon should emit this really
          selection.select('.hx-slider').component().emit('change', {value: props.value, cause: 'api'})
        }
      }).then(() => {
        changeValue.should.eql({value: 0.75, cause: 'api'})
      })
    })
  })

  describe('<TimeSlider/>', () => {
    it('should be a div with the hx-slider class', () => {
      return createComponent(React.createElement(TimeSlider)).then((selection) => {
        selection.select('.hx-slider').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(TimeSlider)).then((selection) => {
        selection.select('.hx-slider').component().should.be.an.instanceof(hx.TimeSlider)
      })
    })

    it('should update the disabled property when the props change', () => {
      return testProp({
        component: TimeSlider,
        initialProps: {disabled: false},
        props: {disabled: true},
        test: (selection, props) => {
          selection.select('.hx-slider').component().disabled().should.eql(props.disabled)
        }
      })
    })

    it('should update the discreteValues property when the props change', () => {
      return testProp({
        component: TimeSlider,
        initialProps: {discreteValues: [new Date(2015), new Date(2016)]},
        props: {discreteValues: [new Date(2015), new Date(2016), new Date(2017)]},
        test: (selection, props) => {
          selection.select('.hx-slider').component().discreteValues().should.eql(props.discreteValues)
        }
      })
    })

    it('should update the min property when the props change', () => {
      return testProp({
        component: TimeSlider,
        initialProps: {min: new Date(2015)},
        props: {min: new Date(2016)},
        test: (selection, props) => {
          selection.select('.hx-slider').component().min().should.eql(props.min)
        }
      })
    })

    it('should update the max property when the props change', () => {
      return testProp({
        component: TimeSlider,
        initialProps: {max: new Date(2015)},
        props: {max: new Date(2016)},
        test: (selection, props) => {
          selection.select('.hx-slider').component().max().should.eql(props.max)
        }
      })
    })

    it('should update the step property when the props change', () => {
      return testProp({
        component: TimeSlider,
        initialProps: {step: new Date(2015)},
        props: {step: new Date(2016)},
        test: (selection, props) => {
          selection.select('.hx-slider').component().step().should.eql(props.step)
        }
      })
    })

    it('should set the type property', () => {
      return createComponent(React.createElement(TimeSlider, {type: 'range'})).then((selection) => {
        selection.select('.hx-slider').component().options.type.should.equal('range')
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const date = new Date
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: TimeSlider,
        initialProps: {onEvent, value: new Date},
        props: {onEvent, value: date},
        test: (selection, props) => {
          selection.select('.hx-slider').component().value().should.eql(props.value)
          // XXX: hexagon should emit this really
          selection.select('.hx-slider').component().emit('change', {value: props.value, cause: 'api'})
        }
      }).then(() => {
        changeValue.should.eql({value: date, cause: 'api'})
      })
    })
  })

  describe('<DataTable/>', () => {
    it('should be a div with the hx-data-table class', () => {
      return createComponent(React.createElement(DataTable)).then((selection) => {
        selection.select('.hx-data-table').size().should.equal(1)
      })
    })

    it('should initialise the component', () => {
      return createComponent(React.createElement(DataTable)).then((selection) => {
        selection.select('.hx-data-table').component().should.be.an.instanceof(hx.DataTable)
      })
    })

    it('should update the collapsibleRenderer property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {collapsibleRenderer: function f1 () {}},
        props: {collapsibleRenderer: function f2 () {}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().collapsibleRenderer().should.eql(props.collapsibleRenderer)
        }
      })
    })

    it('should update the compact property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {compact: false},
        props: {compact: true},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().compact().should.eql(props.compact)
        }
      })
    })

    it('should update the displayMode property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {displayMode: 'paginate'},
        props: {displayMode: 'all'},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().displayMode().should.eql(props.displayMode)
        }
      })
    })

    it('should update the feed property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {feed: {}},
        props: {feed: {}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().feed().should.eql(props.feed)
        }
      })
    })

    it('should update the filter property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {filter: {}},
        props: {filter: {}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().filter().should.eql(props.filter)
        }
      })
    })

    it('should update the noDataMessage property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {noDataMessage: 'message1'},
        props: {noDataMessage: 'message 2'},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().noDataMessage().should.eql(props.noDataMessage)
        }
      })
    })

    it('should update the pageSize property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {pageSize: 10},
        props: {pageSize: 20},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().pageSize().should.eql(props.pageSize)
        }
      })
    })

    it('should update the pageSizeOptions property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {pageSizeOptions: {}},
        props: {pageSizeOptions: {}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().pageSizeOptions().should.eql(props.pageSizeOptions)
        }
      })
    })

    it('should update the retainHorizontalScrollOnRender property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {retainHorizontalScrollOnRender: false},
        props: {retainHorizontalScrollOnRender: true},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().retainHorizontalScrollOnRender().should.eql(props.retainHorizontalScrollOnRender)
        }
      })
    })

    it('should update the retainVerticalScrollOnRender property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {retainVerticalScrollOnRender: false},
        props: {retainVerticalScrollOnRender: true},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().retainVerticalScrollOnRender().should.eql(props.retainVerticalScrollOnRender)
        }
      })
    })

    it('should update the rowCollapsibleLookup property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {rowCollapsibleLookup: function f1 () {}},
        props: {rowCollapsibleLookup: function f2 () {}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().rowCollapsibleLookup().should.eql(props.rowCollapsibleLookup)
        }
      })
    })

    it('should update the rowEnabledLookup property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {rowEnabledLookup: function f1 () {}},
        props: {rowEnabledLookup: function f2 () {}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().rowEnabledLookup().should.eql(props.rowEnabledLookup)
        }
      })
    })

    it('should update the rowSelectableLookup property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {rowSelectableLookup: function f1 () {}},
        props: {rowSelectableLookup: function f2 () {}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().rowSelectableLookup().should.eql(props.rowSelectableLookup)
        }
      })
    })

    it('should update the selectEnabled property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {selectEnabled: false},
        props: {selectEnabled: true},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().selectEnabled().should.eql(props.selectEnabled)
        }
      })
    })

    it('should update the singleSelection property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {singleSelection: false},
        props: {singleSelection: true},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().singleSelection().should.eql(props.singleSelection)
        }
      })
    })

    it('should update the sort property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {sort: {}},
        props: {sort: {}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().sort().should.eql(props.sort)
        }
      })
    })

    it('should update the allowHeaderWrap property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {allowHeaderWrap: false},
        props: {allowHeaderWrap: true},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().allowHeaderWrap().should.eql(props.allowHeaderWrap)
        }
      })
    })

    it('should update the allowHeaderWrap property (per column) when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: { columns: { column1: { allowHeaderWrap: true}}},
        props: {columns: { column1: { allowHeaderWrap: false}}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().allowHeaderWrap('column1').should.eql(props.columns.column1.allowHeaderWrap)
        }
      })
    })

    it('should update the cellRenderer property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {cellRenderer: function f1 () {}},
        props: {cellRenderer: function f2 () {}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().cellRenderer().should.eql(props.cellRenderer)
        }
      })
    })

    it('should update the cellRenderer property (per column) when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: { columns: { column1: { cellRenderer: function f1 () {}}}},
        props: {columns: { column1: { cellRenderer: function f2 () {}}}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().cellRenderer('column1').should.eql(props.columns.column1.cellRenderer)
        }
      })
    })

    it('should update the headerCellRenderer property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {headerCellRenderer: function f1 () {}},
        props: {headerCellRenderer: function f2 () {}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().headerCellRenderer().should.eql(props.headerCellRenderer)
        }
      })
    })

    it('should update the headerCellRenderer property (per column) when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: { columns: { column1: { headerCellRenderer: function f1 () {}}}},
        props: {columns: { column1: { headerCellRenderer: function f2 () {}}}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().headerCellRenderer('column1').should.eql(props.columns.column1.headerCellRenderer)
        }
      })
    })

    it('should update the maxWidth property (per column) when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {columns: {column1: { maxWidth: 10}}},
        props: {columns: {column1: { maxWidth: 20}}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().maxWidth('column1').should.eql(props.columns.column1.maxWidth)
        }
      })
    })

    it('should update the filterEnabled property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {filterEnabled: false},
        props: {filterEnabled: true},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().filterEnabled().should.eql(props.filterEnabled)
        }
      })
    })

    it('should update the sortEnabled property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {sortEnabled: false},
        props: {sortEnabled: true},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().sortEnabled().should.eql(props.sortEnabled)
        }
      })
    })

    it('should update the sortEnabled (per column) property when the props change', () => {
      return testProp({
        component: DataTable,
        initialProps: {columns: {column1: { sortEnabled: true}}},
        props: {columns: {column1: { sortEnabled: false}}},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().sortEnabled('column1').should.eql(props.columns.column1.sortEnabled)
        }
      })
    })

    it('should propagate events upwards', () => {
      let changeValue = undefined
      const onEvent = (name, value) => changeValue = value
      return testProp({
        component: DataTable,
        initialProps: {onEvent, compact: false},
        props: {onEvent, compact: true},
        test: (selection, props) => {
          selection.select('.hx-data-table').component().compact().should.eql(props.compact)
        }
      }).then(() => {
        changeValue.should.eql({value: true, cause: 'api'})
      })
    })

  })

})
