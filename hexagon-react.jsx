const React = (global || window).React

function classes (...cls) {
  return cls.filter(hx.defined).join(' ')
}

function contextClass (context) {
  return context !== undefined ? 'hx-' + context : undefined
}

/* Layout */

export class Content extends React.Component {
  render() {
    return (<div className="hx-content">
      {this.props.children}
    </div>)
  }
}

export class Group extends React.Component {
  render() {
    const direction = this.props.direction === 'vertical' ? 'hx-vertical' : 'hx-horizontal'
    return (<div className={classes('hx-group', direction)}>
      {this.props.children}
    </div>)
  }
}

export class Section extends React.Component {
  render() {
    return (<div className="hx-section">
      {this.props.children}
    </div>)
  }
}

/* Titlebar */

export class TitleBar extends React.Component {
  componentDidMount() {
    this.component = new hx.TitleBar(this.div)
  }

  render() {
    return (<div ref={(d) => this.div = d} className="hx-heading example-heading">
        <div className="hx-titlebar">
          <div className="hx-titlebar-container">
            <div className="hx-titlebar-header">
              <a className="hx-titlebar-icon" href="#"><img className={this.props.logoClass || 'hx-logo'} /></a>
              <div className="hx-titlebar-title">{this.props.title}</div>
              <div className="hx-titlebar-subtitle">{this.props.subtitle}</div>
              <div className="hx-titlebar-menu-icon-mobile"><i className="fa fa-reorder"></i></div>
            </div>
            <div className="hx-titlebar-menu-icons">
              <div className="hx-titlebar-menu-icons-container">
                {this.props.children.filter((x) => x.type.name === 'TitleBarIcon')}
              </div>
            </div>
          </div>
        </div>
        <div className="hx-titlebar-linkbar">
          <div className="hx-titlebar-contents">
            {this.props.children.filter((x) => x.type.name === 'TitleBarLink')}
          </div>
        </div>
      </div>)
  }
}

export class TitleBarLink extends React.Component {
  render() {
    return <a href={this.props.href} className="hx-titlebar-link">{this.props.children}</a>
  }
}

export class TitleBarIcon extends React.Component {
  render() {
    return (<a className="hx-titlebar-menu-icon">
      <i className={this.props.iconClass}></i><span className="hx-titlebar-menu-text">{this.props.children}</span>
    </a>)
  }
}

/* Buttons */

export class Button extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<button className={classes('hx-btn', contextClass(this.props.context))} {...this.props}>
      {this.props.children}
    </button>)
  }
}

/* Loading spinners */

export class Spinner extends React.Component {
  render() {
    return <span className="hx-spinner" {...this.props}></span>
  }
}

export class SpinnerWide extends React.Component {
  render() {
    return <div className="hx-spinner-wide" {...this.props}></div>
  }
}

/* Labels */

export class Label extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (<span className={classes('hx-label', contextClass(this.props.context))} {...this.props}>
      {this.props.children}
    </span>)
  }
}

/* Notices */

export class Notice extends React.Component {
  render() {
    return (<div className={classes('hx-notice', contextClass(this.props.context))} {...this.props}>
      <div className="hx-notice-header">{this.props.title}</div>
      <div className="hx-notice-body">{this.props.children}</div>
    </div>)
  }
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
    return (<div className="hx-tree" ref={(d) => this.div = d} {...this.props}> </div>)
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
    return <div className={classes('hx-picker', contextClass(this.props.context))} ref={(d) => this.div = d} {...this.props}> </div>
  }
}

/* Input Groups */

export class InputGroup extends React.Component {
  render() {
    return <span className="hx-input-group" {...this.props}>{this.props.children}</span>
  }
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
    return <div className={classes('hx-progress-bar', contextClass(this.props.context))} ref={(d) => this.div = d} {...this.props}> </div>
  }
}

/* Collapsibles */

export class Collapsible extends React.Component {
  componentDidMount() {
    this.component = new hx.Collapsible(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  render() {
    return (<div className="hx-collapsible" ref={(d) => this.div = d} {...this.props}>
      <div className="hx-collapsible-heading">{this.props.title}</div>
      <div className="hx-collapsible-content">{this.props.children}</div>
    </div>)
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
    return <div className='hx-number-picker' ref={(d) => this.div = d} {...this.props}> </div>
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
    return <div className='hx-button-group' ref={(d) => this.div = d} {...this.props}> </div>
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
    return <div className='hx-date-picker' ref={(d) => this.div = d} {...this.props}> </div>
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
    return <div className='hx-time-picker' ref={(d) => this.div = d} {...this.props}> </div>
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
    return <div className='hx-date-time-picker' ref={(d) => this.div = d} {...this.props}> </div>
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
    return <button className='hx-btn hx-color-picker' ref={(d) => this.div = d} {...this.props}> Choose a color </button>
  }
}

/* Toggle */

export class Toggle extends React.Component {
  componentDidMount() {
    this.component = new hx.Toggle(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  componentDidUpdate(props) {
    if (this.props.value) this.component.value(this.props.value)
  // XXX: add this to hexagon
  // if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
  }

  render() {
    return <div className='hx-toggle' ref={(d) => this.div = d} {...this.props}></div>
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
    return <div className='hx-pivot-table' ref={(d) => this.div = d} {...this.props}></div>
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
    return <div className='hx-tag-input' ref={(d) => this.div = d} {...this.props}></div>
  }
}

/* Autocomplete */

export class AutoComplete extends React.Component {
  componentDidMount() {
    this.component = new hx.AutoComplete(this.div, this.props.data, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  render() {
    return <input ref={(d) => this.div = d} {...this.props}></input>
  }
}

/* Slider */

export class Slider extends React.Component {
  componentDidMount() {
    this.component = new hx.Slider(this.div, this.props)
    if (this.props.onEvent) this.component.on(undefined, this.props.onEvent)
  }

  componentDidUpdate(props) {
    if (this.props.items) this.component.items(this.props.items)
    if (hx.defined(this.props.disabled)) this.component.disabled(this.props.disabled)
  }

  render() {
    return <div className='hx-slider' ref={(d) => this.div = d} {...this.props}></div>
  }
}
