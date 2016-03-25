import { Content, Button, Label, TitleBar, TitleBarLink, TitleBarIcon, Spinner, SpinnerWide, Notice, Tree, Picker, InputGroup, ProgressBar, Collapsible } from './hexagon-react.jsx'

function showModal () {
  const modal = new hx.Modal('Modal Title', (node) => {
    hx.select(node).text('Modal Text')
  })
  modal.show()
}

function showNotification () {
  hx.notify('Hello')
}

function log (...args) {
  console.log(...args)
}

const treeRenderer = (elem, data) => {
  hx.select(elem).text(data.name)
}

const treeData = [
  {
    name: 'Parent 1',
    children: [
      {
        name: 'Item 1'
      },
      {
        name: 'Parent 2',
        children: [
          {
            name: 'Item 2'
          }
        ]
      }
    ]
  }
]

export class MovingProgressBar extends React.Component {
  constructor() {
    super()
    this.state = {value: 0}
  }
  componentDidMount() {
    setInterval(() => {
      this.setState({value: (this.state.value + 0.01) % 1})
    }, 100)
  }
  render() {
    return <ProgressBar context="warning" value={this.state.value} animate={true}/>
  }
}

const page = <div>
  <TitleBar title="React Hexagon" subtitle="Subtitle" onEvent={log}>
    <TitleBarIcon iconClass="fa fa-tags">Tags</TitleBarIcon>
    <TitleBarIcon iconClass="fa fa-life-ring">Help</TitleBarIcon>
    <TitleBarIcon iconClass="fa fa-cog">Settings</TitleBarIcon>
    <TitleBarIcon iconClass="fa fa-power-off">Sign out</TitleBarIcon>
    <TitleBarLink href="link-1">Link 1</TitleBarLink>
    <TitleBarLink href="link-2">Link 2</TitleBarLink>
    <TitleBarLink href="link-3">Link 3</TitleBarLink>
    <TitleBarLink href="link-4">Link 4</TitleBarLink>
  </TitleBar>
  <Content>

    <h1>Buttons</h1>
    <Button>Default Button</Button>
    <Button context="action">Action Button</Button>
    <Button context="positive">Positive Button</Button>
    <Button context="warning">Warning Button</Button>
    <Button context="negative">Negative Button</Button>
    <Button context="info">Info Button</Button>
    <Button context="contrast">Contrast Button</Button>
    <Button context="compliment">Compliment Button</Button>
    <Button disabled={true}>Disabled Button</Button>

    <h1>Labels</h1>
    <Label>Default Label</Label>
    <Label context="action">Action Label</Label>
    <Label context="positive">Positive Label</Label>
    <Label context="warning">Warning Label</Label>
    <Label context="negative">Negative Label</Label>
    <Label context="info">Info Label</Label>
    <Label context="contrast">Contrast Label</Label>
    <Label context="compliment">Compliment Label</Label>
    <Label disabled={true}>Disabled Label</Label>

    <h1>Loading Spinners</h1>
    <Spinner/>
    <SpinnerWide/>

    <h1>Modal</h1>
    <Notice title="Note" context="">These work just as they do with regular hexagon</Notice>
    <Button context="action" onClick={showModal}>Show Modal</Button>

    <h1>Notifications</h1>
    <Notice title="Note" context="">These work just as they do with regular hexagon</Notice>
    <Button context="action" onClick={showNotification}>Show Notification</Button>

    <h1>Tree</h1>
    <Tree items={treeData} renderer={treeRenderer} onEvent={log}></Tree>

    <h1>Picker</h1>
    <Picker items={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Other']} value="Option 1" onEvent={log}></Picker>

    <h1>Input Groups</h1>
    <InputGroup>
      <input/>
      <Picker context="action" items={['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Other']} value="Option 1" onEvent={log}></Picker>
      <Button context="action">Go!</Button>
    </InputGroup>

    <h1>Progress Bars</h1>
    <ProgressBar context="info" value={0.5}/>
    <br/>
    <ProgressBar context="action" value={0.15}/>
    <br/>
    <ProgressBar context="negative" value={0.25}/>
    <br/>
    <ProgressBar context="positive" value={0.75}/>
    <br/>
    <MovingProgressBar/>

    <h1>Collapsibles</h1>
    <Collapsible title="Title">
      <div style={{padding: '1em', fontSize: '2em'}}>Content</div>
    </Collapsible>

  </Content>
</div>

ReactDOM.render(page, document.getElementById('mount'))
