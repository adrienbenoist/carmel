import React from 'react'
import { Component } from 'react-dom-chunky'
import { Row, Col } from 'antd'

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
    const { defaults } = this.props
    const { newValues } = this.state

    const columnStyle = { padding: '20px' }
    const chunkyComponentValues = newValues ? { ...newValues } : { ...defaults }

    return (
      <Row
        style={{
          margin: '10px 20px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {defaults && (
          <React.Fragment>
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
                height={'600px'}
                highlightActiveLine={true}
                setOptions={{
                  showLineNumbers: true,
                  tabSize: 2
                }}
              />
            </Col>
            <Col style={columnStyle} span={14}>
              <ChunkyProduct {...chunkyComponentValues} />
            </Col>
          </React.Fragment>
        )}
      </Row>
    )
  }
}
