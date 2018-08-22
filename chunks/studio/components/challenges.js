import React from 'react'
import { Component, Components } from 'react-dom-chunky'
import { Card, CardActions, CardActionButtons } from 'rmwc/Card'
import { Button, ButtonIcon } from 'rmwc/Button'
import { Typography } from 'rmwc/Typography'
import { List, Avatar, Icon } from 'antd'
import { Chip, ChipText, ChipIcon, ChipSet } from 'rmwc/Chip'

export default class Challenges extends Component {
  constructor (props) {
    super(props)

    this.state = { ...this.state }
    this._selectChallenge = (item) => this.selectChallenge.bind(this, item)
  }

  componentDidMount () {
    super.componentDidMount()
  }

  selectChallenge (item) {
    this.props.onSelectChallenge && this.props.onSelectChallenge(item)
  }

  renderChallengeTitle (challenge) {
    return <Typography use='title' style={{
      textAlign: 'center',
      color: '#00bcd4'
    }}>
      { challenge.title }
    </Typography>
  }

  renderChallengeSubtitle (challenge) {
    return <Typography use='body2' style={{
      textAlign: 'center',
      color: '#455A64'
    }}>
      { challenge.summary }
    </Typography>
  }

  renderChallenge (item, index) {
    const IconText = ({ type, text }) => (
      <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
      </span>
    )

    const skills = item.skills.map(skill => {
      return <Chip key={skill}><ChipText> { skill } </ChipText></Chip>
    })

    return <Card
      key={item.title}
      style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column'
      }}>

      <List.Item>
        <List.Item.Meta
          title={this.renderChallengeTitle(item)}
          description={this.renderChallengeSubtitle(item)} />

        <ChipSet style={{ textAlign: 'center' }}>
          { skills }
        </ChipSet>

        <Button
          style={{
            color: '#ffffff',
            marginTop: '30px',
            backgroundColor: `#03A9F4`
          }}
          onClick={this._selectChallenge(item)}>
          <ButtonIcon use={'check_circle'} />
          Take This Challenge
        </Button>

      </List.Item>
    </Card>
  }

  render () {
    return <List
      itemLayout='vertical'
      size='large'
      dataSource={this.props.challenges}
      renderItem={item => this.renderChallenge(item)} />
  }

}
