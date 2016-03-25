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

/* Titlebar */

export class TitleBar extends React.Component {
  componentDidMount() {
    this.titlebar = new hx.TitleBar(this.div)
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
    this.tree = new hx.Tree(this.div, this.props)
  }

  componentDidUpdate(props) {
    if (this.props.renderer) this.tree.renderer(this.props.renderer)
    if (this.props.items) this.tree.items(this.props.items)
  }

  render() {
    return (<div className="hx-tree" ref={(d) => this.div = d} {...this.props}> </div>)
  }
}

/* Picker */

export class Picker extends React.Component {
  componentDidMount() {
    this.picker = new hx.Picker(this.div, this.props)
    if (this.props.onEvent) this.picker.on(undefined, this.props.onEvent)
  }

  componentDidUpdate(props) {
    if (this.props.renderer) this.picker.renderer(this.props.renderer)
    if (this.props.items) this.picker.items(this.props.items)
    if (this.props.value) this.picker.value(this.props.value)
    if (this.props.disabled) this.picker.disabled(this.props.disabled)
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
    this.progresbar = new hx.ProgressBar(this.div, this.props)
  }

  componentDidUpdate(props) {
    if (this.props.value) this.progresbar.value(this.props.value)
  }

  render() {
    return <div className={classes('hx-progressbar', contextClass(this.props.context))} ref={(d) => this.div = d} {...this.props}> </div>
  }
}

/* Collapsibles */

export class Collapsible extends React.Component {
  componentDidMount() {
    this.collapsible = new hx.Collapsible(this.div, this.props)
  }

  render() {
    return (<div className="hx-collapsible" ref={(d) => this.div = d} {...this.props}>
      <div className="hx-collapsible-heading">{this.props.title}</div>
      <div className="hx-collapsible-content">{this.props.children}</div>
    </div>)
  }
}
