const React = window.React

function classes (...cls) {
  return cls.filter(hx.defined).join(' ')
}

function contextClass (context) {
  return context !== undefined ? 'hx-' + context : undefined
}

/* Layout */

export function Content (props) {
  return React.createElement('div', {className: 'hx-content'}, props.children)
}

export function Group (props) {
  const direction = props.direction === 'vertical' ? 'hx-vertical' : 'hx-horizontal'
  return React.createElement('div', {className: classes('hx-group', direction)}, props.children)
}

export function Section (props) {
  return React.createElement('div', {className: 'hx-section'}, props.children)
}

/* Titlebar */

export class TitleBar extends React.Component {
  componentDidMount() {
    this.component = new hx.TitleBar(this.div)
  }

  render() {
    return React.createElement('div', { ref: ((d) => this.div = d), className: 'hx-heading example-heading' },
      React.createElement('div', { className: 'hx-titlebar' },
        React.createElement('div', { className: 'hx-titlebar-container' },
          React.createElement('div', { className: 'hx-titlebar-header' },
            React.createElement('a', { className: 'hx-titlebar-icon', href: '#' },
              React.createElement('img', { className: this.props.logoClass || 'hx-logo' })),
            React.createElement('div', { className: 'hx-titlebar-title' }, this.props.title),
            React.createElement('div', { className: 'hx-titlebar-subtitle' }, this.props.subtitle),
            React.createElement('div', { className: 'hx-titlebar-menu-icon-mobile' },
              React.createElement('i', { className: 'fa fa-reorder' }))),
          React.createElement('div', { className: 'hx-titlebar-menu-icons' },
            React.createElement('div', { className: 'hx-titlebar-menu-icons-container' },
              (this.props.children ? this.props.children.filter(x => x.type.name === 'TitleBarIcon') : undefined))))),
      React.createElement('div', { className: 'hx-titlebar-linkbar' },
        React.createElement('div', { className: 'hx-titlebar-contents' },
          (this.props.children ? this.props.children.filter(x => x.type.name === 'TitleBarLink') : undefined))))
  }
}

export function TitleBarLink (props) {
  return React.createElement('a', {href: props.href, className: 'hx-titlebar-link'}, props.children)
}

export function TitleBarIcon (props) {
  return React.createElement('a', {className: 'hx-titlebar-menu-icon'},
    React.createElement('i', {className: props.iconClass}),
    React.createElement('span', {className: 'hx-titlebar-menu-text'}, props.children))
}

/* Buttons */

export function Button (props) {
  return React.createElement('button', hx.merge({className: classes('hx-btn', contextClass(props.context))}, props), props.children)
}

/* Loading spinners */

export function Spinner (props) {
  return React.createElement('span', {className: 'hx-spinner'})
}

export function SpinnerWide (props) {
  return React.createElement('div', {className: 'hx-spinner-wide'})
}

/* Labels */

export function Label (props) {
  return React.createElement('span',
    {className: classes('hx-label', contextClass(props.context))},
    props.children)
}

/* Notices */

export function Notice (props) {
  return React.createElement('div',
    {className: classes('hx-notice', contextClass(props.context))},
    React.createElement('div', {className: 'hx-notice-header'}, props.title),
    React.createElement('div', {className: 'hx-notice-body'}, props.children))
}

/* Tree */

export class Tree extends React.Component {
  componentDidMount() {
    this.component = new hx.Tree(this.div, this.props)
  }

  componentDidUpdate(props) {
    if (this.props.renderer) this.component.renderer(this.props.renderer)
    if (this.props.items) this.component.items(this.props.items)
  }

  render() {
    return React.createElement('div', {className: 'hx-tree', ref: (d) => this.div = d})
  }
}

/* Picker */

export class Picker extends React.Component {
  componentDidMount() {
    this.component = new hx.Picker(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  componentDidUpdate(props) {
    if (this.props.renderer) this.component.renderer(this.props.renderer)
    if (this.props.items) this.component.items(this.props.items)
    if (this.props.value) this.component.value(this.props.value)
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
  }

  render() {
    return React.createElement('div', {className: classes('hx-picker', contextClass(this.props.context)), ref: (d) => this.div = d})
  }
}

/* Input Groups */

export function InputGroup (props) {
  return React.createElement('span', {className: 'hx-input-group'}, props.children)
}

/* Progress Bars */

export class ProgressBar extends React.Component {
  componentDidMount() {
    this.component = new hx.ProgressBar(this.div, this.props)
  }

  componentDidUpdate(props) {
    if (this.props.value) this.component.value(this.props.value)
  }

  render() {
    return React.createElement('div', {className: classes('hx-progress-bar', contextClass(this.props.context)), ref: (d) => this.div = d})
  }
}

/* Collapsibles */

export class Collapsible extends React.Component {
  componentDidMount() {
    this.component = new hx.Collapsible(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  render() {
    return React.createElement('div', {className: 'hx-collapsible', ref: (d) => this.div = d},
      React.createElement('div', {className: 'hx-collapsible-heading'}, this.props.title),
      React.createElement('div', {className: 'hx-collapsible-content'}, this.props.children))
  }
}

/* Number Picker */

export class NumberPicker extends React.Component {
  componentDidMount() {
    this.component = new hx.NumberPicker(this.div, hx.merge(this.props, {buttonClass: contextClass(this.props.context)}))
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  componentDidUpdate(props) {
    if (this.props.value) this.component.value(this.props.value)
    if (this.props.min) this.component.min(this.props.min)
    if (this.props.max) this.component.max(this.props.max)
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
  }

  render() {
    return React.createElement('div', {className: 'hx-number-picker', ref: (d) => this.div = d})
  }
}

/* Button Group */

export class ButtonGroup extends React.Component {
  componentDidMount() {
    this.component = new hx.ButtonGroup(this.div, this.props)
    // XXX: Needs fixing in hexagon-js, so that can be passed in as an initial value
    //      see: https://github.com/ocadotechnology/hexagonjs/issues/181
    if (this.props.value) this.component.value(this.props.value)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  componentDidUpdate(props) {
    if (this.props.items) this.component.items(this.props.items)
    if (this.props.value) this.component.value(this.props.value)
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
    if (this.props.renderer) this.component.renderer(this.props.renderer)
  }

  render() {
    return React.createElement('div', {className: 'hx-button-group', ref: (d) => this.div = d})
  }
}

/* Date Picker */

export class DatePicker extends React.Component {
  componentDidMount() {
    this.component = new hx.DatePicker(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
    // XXX: min/max should be separate options in hexagon
    this.component.validRange({start: this.props.min, end: this.props.max})
    // XXX: date should be an option in hexagon
    if (this.props.date) this.component.date(this.props.date)
  }

  componentDidUpdate(props) {
    this.component.validRange({start: this.props.min, end: this.props.max})
    if (this.props.date) this.component.date(this.props.date)
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
  }

  render() {
    return React.createElement('div', {className: 'hx-date-picker', ref: (d) => this.div = d})
  }
}

/* Date Picker */

export class TimePicker extends React.Component {
  componentDidMount() {
    this.component = new hx.TimePicker(this.div, hx.merge(this.props, {buttonClass: contextClass(this.props.context)}))
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
    // XXX: date should be an option in hexagon
    if (this.props.date) this.component.date(this.props.date)
  }

  componentDidUpdate(props) {
    if (this.props.date) this.component.date(this.props.date)
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
  }

  render() {
    return React.createElement('div', {className: 'hx-time-picker', ref: (d) => this.div = d})
  }
}

/* Date Time Picker */

export class DateTimePicker extends React.Component {
  componentDidMount() {
    this.component = new hx.DateTimePicker(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
    // XXX: date should be an option in hexagon
    if (this.props.date) this.component.date(this.props.date)
  }

  componentDidUpdate(props) {
    if (this.props.date) this.component.date(this.props.date)
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
  }

  render() {
    return React.createElement('div', {className: 'hx-date-time-picker', ref: (d) => this.div = d})
  }
}

/* Color Picker */

export class ColorPicker extends React.Component {
  componentDidMount() {
    // XXX: startColor should be renamed to value in hexagon
    this.component = new hx.ColorPicker(this.div, hx.merge(this.props, {startColor: this.props.value}))
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  componentDidUpdate(props) {
    if (this.props.value) this.component.value(this.props.value)
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
  }

  render() {
    return React.createElement('div', {className: 'hx-btn hx-color-picker', ref: (d) => this.div = d}, 'Choose a Color')
  }
}

/* Toggle */

export class Toggle extends React.Component {
  componentDidMount() {
    this.component = new hx.Toggle(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  componentDidUpdate(props) {
    if (this.props.value !== undefined) this.component.value(this.props.value)
  // XXX: add this to hexagon
  // if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
  }

  render() {
    return React.createElement('div', {className: 'hx-toggle', ref: (d) => this.div = d})
  }
}

/* PivotTable */

export class PivotTable extends React.Component {
  componentDidMount() {
    this.component = new hx.PivotTable(this.div, this.props)
    // XXX: this should be an option in hexagon
    if (this.props.data) this.component.data(this.props.data)
  }

  componentDidUpdate(props) {
    if (this.props.data) this.component.data(this.props.data)
  }

  render() {
    return React.createElement('div', {className: 'hx-pivot-table', ref: (d) => this.div = d})
  }
}

/* TagInput */

export class TagInput extends React.Component {
  componentDidMount() {
    this.component = new hx.TagInput(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  componentDidUpdate(props) {
    if (this.props.items) this.component.items(this.props.items)
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
  }

  render() {
    return React.createElement('div', {className: 'hx-tag-input', ref: (d) => this.div = d})
  }
}

/* Autocomplete */

export class AutoComplete extends React.Component {
  componentDidMount() {
    this.component = new hx.AutoComplete(this.div, this.props.data, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  render() {
    return React.createElement('input', {className: 'hx-auto-complete', ref: (d) => this.div = d})
  }
}

/* Slider */

export class Slider extends React.Component {
  componentDidMount() {
    this.component = new hx.Slider(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
    if (this.props.value) this.component.value(this.props.value)
  }

  componentDidUpdate(props) {
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
    if (this.props.discreteValues) this.component.discreteValues(this.props.discreteValues)
    if (this.props.value) this.component.value(this.props.value)
    if (this.props.min) this.component.min(this.props.min)
    if (this.props.max) this.component.max(this.props.max)
    if (this.props.step) this.component.step(this.props.step)
  }

  render() {
    return React.createElement('div', {className: 'hx-slider', ref: (d) => this.div = d})
  }
}

/* TimeSlider */

export class TimeSlider extends React.Component {
  componentDidMount() {
    this.component = new hx.TimeSlider(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
    if (this.props.value) this.component.value(this.props.value)
  }

  componentDidUpdate(props) {
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
    if (this.props.discreteValues) this.component.discreteValues(this.props.discreteValues)
    if (this.props.value) this.component.value(this.props.value)
    if (this.props.min) this.component.min(this.props.min)
    if (this.props.max) this.component.max(this.props.max)
    if (this.props.step) this.component.step(this.props.step)
  }

  render() {
    return React.createElement('div', {className: 'hx-slider', ref: (d) => this.div = d})
  }
}

/* DataTable */

export class DataTable extends React.Component {
  componentDidMount() {
    this.component = new hx.DataTable(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
    this.component.render()
  }

  componentDidUpdate(props) {
    if (this.props.collapsibleRenderer) this.component.collapsibleRenderer(this.props.collapsibleRenderer)
    if (hx.isBoolean(this.props.compact)) this.component.compact(this.props.compact)
    if (this.props.displayMode) this.component.displayMode(this.props.displayMode)
    if (this.props.feed) this.component.feed(this.props.feed)
    if (this.props.filter) this.component.filter(this.props.filter)
    if (hx.isBoolean(this.props.filterEnabled)) this.component.filterEnabled(this.props.filterEnabled)
    if (this.props.noDataMessage) this.component.noDataMessage(this.props.noDataMessage)
    if (this.props.pageSize) this.component.pageSize(this.props.pageSize)
    if (this.props.pageSizeOptions) this.component.pageSizeOptions(this.props.pageSizeOptions)
    if (hx.isBoolean(this.props.retainHorizontalScrollOnRender)) this.component.retainHorizontalScrollOnRender(this.props.retainHorizontalScrollOnRender)
    if (hx.isBoolean(this.props.retainVerticalScrollOnRender)) this.component.retainVerticalScrollOnRender(this.props.retainVerticalScrollOnRender)
    if (this.props.rowCollapsibleLookup) this.component.rowCollapsibleLookup(this.props.rowCollapsibleLookup)
    if (this.props.rowEnabledLookup) this.component.rowEnabledLookup(this.props.rowEnabledLookup)
    if (this.props.rowSelectableLookup) this.component.rowSelectableLookup(this.props.rowSelectableLookup)
    if (hx.isBoolean(this.props.selectEnabled)) this.component.selectEnabled(this.props.selectEnabled)
    if (hx.isBoolean(this.props.singleSelection)) this.component.singleSelection(this.props.singleSelection)
    if (this.props.sort) this.component.sort(this.props.sort)

    // global versions of the per-column properties
    if (hx.isBoolean(this.props.sortEnabled)) this.component.sortEnabled(!!this.props.sortEnabled)
    if (hx.isFunction(this.props.cellRenderer)) this.component.cellRenderer(this.props.cellRenderer)
    if (hx.isFunction(this.props.headerCellRenderer)) this.component.headerCellRenderer(this.props.headerCellRenderer)
    if (hx.isBoolean(this.props.allowHeaderWrap)) this.component.allowHeaderWrap(this.props.allowHeaderWrap)

    // per-column properties
    if (this.props.columns && hx.isObject(this.props.columns)) {
      Object.keys(this.props.columns).forEach(k => {
        const columnOptions = this.props.columns[k]

        if (columnOptions.sortEnabled !== undefined) this.component.sortEnabled(k, columnOptions.sortEnabled)
        if (columnOptions.maxWidth) this.component.maxWidth(k, columnOptions.maxWidth)
        if (columnOptions.cellRenderer) this.component.cellRenderer(k, columnOptions.cellRenderer)
        if (columnOptions.headerCellRenderer) this.component.headerCellRenderer(k, columnOptions.headerCellRenderer)
        if (columnOptions.allowHeaderWrap !== undefined) {
          this.component.allowHeaderWrap(k, columnOptions.allowHeaderWrap)
        }
      })
    }

    this.component.render()
  }

  render() {
    return React.createElement('div', {className: 'hx-data-table', ref: (d) => this.div = d})
  }
}

/* ErrorMessage */

export function ErrorMessage (props) {
  return React.createElement('div', {className: 'hx-error-message'},
    React.createElement('div', {className: 'hx-error-message-heading'}, props.title || '404'),
    React.createElement('div', undefined, React.createElement('p', undefined, props.message || 'The content you requested was not found')),
    React.createElement('div', undefined,
      React.createElement('button', {onClick: window.history.back, className: 'hx-btn hx-positive'}, props.backText || 'Go Back'),
      React.createElement('a', {className: 'hx-btn hx-positive', href: '/'}, props.homePageText || 'Go to Home Page')))
}
