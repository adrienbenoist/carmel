import React from 'react'
import { Component } from 'react-dom-chunky'
import { Row, Col } from 'antd'
import Task from './playground/task'

import Editor from './playground/editor'
import ChunkyProduct from './playground/product'

export default class ChallengePlayground extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {
    super.componentDidMount()
  }

  handleEditorChange = val => {
    if (JSON.parse(val)) {
      this.setState({ newValues: JSON.parse(val) })
      this.props.updateValue(val)
    }
  }

  render() {
    const { challenge, defaults, initial } = this.props
    const { taskIds, id } = challenge
    const { newValues } = this.state

    const columnStyle = { padding: '20px' }
    return (
      <React.Fragment>
        <Row style={{ margin: '10px 20px' }}>
          <Col style={columnStyle} span={12} offset={6}>
            <Task
              task={
                initial
                  ? require(`../../../challenges/${id}/${
                      taskIds[0]
                    }/index.json`)
                  : require(`../../../challenges/${id}/${task}/index.json`)
              }
            />
          </Col>
        </Row>
        {defaults && (
          <Row
            style={{
              margin: '10px 20px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Col style={columnStyle} span={10}>
              <Editor
                value={JSON.stringify(
                  this.state.newValues ? this.state.newValues : defaults,
                  null,
                  '\t'
                )}
                onChange={val => this.handleEditorChange(val)}
                mode="json"
                theme="monokai"
                name="editor"
                fontSize={14}
                style={{ width: '100%' }}
                showPrintMargin={true}
                showGutter={true}
                highlightActiveLine={true}
                setOptions={{
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            </Col>
            <Col style={columnStyle} span={14}>
              <ChunkyProduct
                source={(newValues && newValues.source) || defaults.source}
                image={(newValues && newValues.image) || defaults.image}
                opacity={(newValues && newValues.opacity) || defaults.opacity}
                title={(newValues && newValues.title) || defaults.title}
                type={(newValues && newValues.type) || defaults.type}
                subtitle={
                  (newValues && newValues.subtitle) || defaults.subtitle
                }
                titleStyle={
                  (newValues && newValues.titleStyle) || defaults.titleStyle
                }
                subtitleStyle={
                  (newValues && newValues.subtitleStyle) ||
                  defaults.subtitleStyle
                }
              />
            </Col>
          </Row>
        )}
      </React.Fragment>
    )
  }
}
