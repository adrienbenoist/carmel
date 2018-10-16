import React from 'react'
import { Component, Components } from 'react-dom-chunky'
import { Parallax } from 'react-spring'
import Typist from 'react-typist'
import { Button, ButtonIcon } from '@rmwc/button'

export default class Welcome extends Component {
  constructor (props) {
    super(props)

    this.state = { speaking: true }
    this._meetChris = this.meetChris.bind(this)
  }

  componentDidMount () {
    super.componentDidMount()
    setTimeout(() => this.setState({ speaking: false }), 13000)
  }

  componentWillUnmount () {
  }

  meetChris () {
    this.props.meetChris && this.props.meetChris()
  }

  stars (offset, speed) {
    return [<Parallax.Layer key='stars' offset={offset} speed={speed} style={{ opacity: 0.3 }}>
      <img src={'../../../../assets/stars.png'} style={{
        display: 'block',
        width: '100%',
        margin: '0'
      }} />
      <img src={'../../../../assets/stars.png'} style={{
        display: 'block',
        width: '100%',
        margin: '0'
      }} />
      <img src={'../../../../assets/stars.png'} style={{
        display: 'block',
        width: '100%',
        margin: '0'
      }} />
    </Parallax.Layer>]
  }

  clouds (offset, speed) {
    return [<Parallax.Layer key='clouds' offset={offset} speed={speed} style={{ opacity: 1 }}>
      <img src={'../../../../assets/clouds.png'} style={{ display: 'block', width: '10%', marginLeft: '10%' }} />
    </Parallax.Layer>,
      <Parallax.Layer key='clouds2' offset={offset} speed={speed} style={{ opacity: 1.0 }}>
        <img src={'../../../../assets/clouds.png'} style={{ display: 'block', width: '15%', marginLeft: '70%' }} />
      </Parallax.Layer>]
  }

  movingClouds (offset, speed) {
    return [<Parallax.Layer key='movingClouds' offset={offset} speed={speed} style={{ opacity: 1 }}>
      <img src={'../../../../assets/cloud1.png'} style={{
        display: 'block',
        width: '30%',
        marginLeft: `50px`
      }} />
      <img src={'../../../../assets/cloud1.png'} style={{
        display: 'block',
        marginTop: '30px',
        width: '20%',
        marginLeft: `100px`
      }} />
    </Parallax.Layer>]
  }

  mountains (offset, speed) {
    return [<Parallax.Layer key='mountains' offset={offset} speed={speed} style={{ opacity: 0.8 }}>
      <img src={'../../../../assets/mountains.png'} style={{ display: 'block', width: '100%', margin: '0' }} />
    </Parallax.Layer>]
  }

  hills (offset, speed) {
    return [<Parallax.Layer key='hills' offset={offset} speed={speed} style={{ opacity: 1 }}>
      <img src={'../../../../assets/hills.png'} style={{ display: 'block', width: '100%', margin: '0' }} />
    </Parallax.Layer>]
  }

  ground (offset, speed) {
    return [<Parallax.Layer key='ground' offset={offset} speed={speed} style={{ opacity: 1 }}>
      <img src={'../../../../assets/ground.png'} style={{ display: 'block', width: '100%', margin: '0' }} />
    </Parallax.Layer>]
  }

  grass (offset, speed) {
    return [<Parallax.Layer key='grass' offset={offset} speed={speed} style={{ opacity: 1 }}>
      <img src={'../../../../assets/grass.png'} style={{ display: 'block', width: '100%', margin: '0' }} />
    </Parallax.Layer>]
  }

  front (offset, speed) {
    return [<Parallax.Layer key='front' offset={offset} speed={speed} style={{ opacity: 1 }}>
      <img src={'../../../../assets/front.png'} style={{ display: 'block', width: '100%', margin: '0' }} />
    </Parallax.Layer>]
  }

  rocks (offset, speed) {
    return [<Parallax.Layer key='rocks' offset={offset} speed={speed} style={{ opacity: 1 }}>
      <img src={'../../../../assets/rocks.png'} style={{ display: 'block', width: '100%', margin: '0' }} />
    </Parallax.Layer>]
  }

  title (offset, speed) {
    const fontSize = 18
    const textWidth = 420
    const color = '#FAFAFA'

    return [<Parallax.Layer offset={offset} speed={speed} style={{ opacity: 1.2, display: 'flex', flex: 1, justifyContent: 'center' }}>
      <h1 key='title' style={{
        color,
        textAlign: 'center',
        fontSize: `${fontSize + 30}px`,
        textShadow: '2px 2px 5px #607D8B',
        width: `${textWidth}px`
      }}>
        Welcome to Carmel
        </h1>
    </Parallax.Layer>]
  }

  subtitle (offset, speed) {
    const fontSize = 18
    const color = '#FAFAFA'

    return [<Parallax.Layer offset={offset} speed={speed} style={{ opacity: 1, display: 'flex', flex: 1, justifyContent: 'center' }}>
      <h3 key='subtitle' style={{
        color,
        textAlign: 'center',
        textShadow: '2px 2px 5px #607D8B',
        fontSize: `${fontSize + 10}px`
      }}>
        {intro}
      </h3>
    </Parallax.Layer>]
  }

  panel (offset, speed) {
    const fontSize = 18
    const textWidth = 420
    const actionText = 'Meet Chris'
    const textPadding = 60
    const color = '#4E342E'
    const width = this.props.isSmallScreen ? 120 : 300
    const speech = this.props.isSmallScreen ? shortSpeech : longSpeech
    return [<Parallax.Layer key='panel' offset={offset} speed={speed} style={{ opacity: 0.8, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
      <img src={`../../../../assets/panel.png`} style={{ display: 'block', width: '75%', height: '300px' }} />
    </Parallax.Layer>,
      <Parallax.Layer
        offset={offset}
        key='panel2'
        speed={speed}
        style={{
          opacity: 1,
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          paddingBottom: `${textPadding}px`
        }}>

        <Typist cursor={{ show: false }} style={{}}>
          <h3 style={{
            color,
            textAlign: 'left',
            fontSize: `${fontSize + 4}px`,
            textShadow: '2px 2px 5px #ffffff',
            fontFamily,
            width: `${textWidth}px`
          }}>
            {speech[0]}
          </h3>
          <Typist.Delay ms={500} />
          <h3 key='2' style={{
            color,
            textAlign: 'left',
            fontSize: `${fontSize}px`,
            fontFamily,
            textShadow: '2px 2px 5px #ffffff'
          }}>
            {speech[1]}
          </h3>
          <h3 key='3' style={{
            color,
            fontSize: `${fontSize}px`,
            textShadow: '2px 2px 5px #ffffff',
            fontFamily,
            textAlign: 'left'
          }}>
            {speech[2]}
          </h3>
          <h3 key='3' style={{
            color,
            fontSize: `${fontSize}px`,
            textShadow: '2px 2px 5px #ffffff',
            fontFamily,
            textAlign: 'left'
          }}>
            {speech[3]}
          </h3>
          <Typist.Delay ms={500} />
          <h3 key='4' style={{ color: '#602f15', textAlign: 'center', textShadow: '2px 2px 5px #ffffff' }}>
            <Button
              raised
              theme='secondary-bg text-primary-on-secondary'
              style={{ marginTop: '10px', width }}
              onClick={this._meetChris}>
              <ButtonIcon icon='done' />
              {actionText}
            </Button>
          </h3>
        </Typist>
      </Parallax.Layer>]
  }

  chunky (offset, speed) {
    return [<Parallax.Layer key='chunky' offset={offset} speed={speed} style={{
      opacity: 1, display: 'flex', width: '220px', alignItems: 'flex-end', justifyContent: 'flex-start'
    }}>
      <img src={`../../../../assets/chunky${this.state.speaking ? '-speaking.gif' : '.png'}`} style={{ display: 'block', width: '220px' }} />
    </Parallax.Layer>]
  }

  render () {
    const smallScreenLayout = [
      ...this.stars(this.props.offset, 0.1),
      ...this.clouds(this.props.offset + 0.05, 0.3),
      ...this.mountains(this.props.offset + 0.67, 0.2),
      ...this.hills(this.props.offset + 0.75, 0.5),
      ...this.movingClouds(this.props.offset + 0.25, 0.4),
      ...this.ground(this.props.offset + 0.8, 0.6),
      ...this.grass(this.props.offset + 0.7, 0.7),
      ...this.front(this.props.offset + 0.93, 0.8)
    ]

    return this.props.isSmallScreen ? smallScreenLayout : [
      ...this.stars(this.props.offset, 0.1),
      ...this.clouds(this.props.offset + 0.05, 0.3),
      ...this.mountains(this.props.offset + 0.3, 0.2),
      ...this.hills(this.props.offset + 0.45, 0.5),
      ...this.movingClouds(this.props.offset + 0.25, 0.4),
      ...this.ground(this.props.offset + 0.5, 0.6),
      ...this.grass(this.props.offset + 0.35, 0.7),
      ...this.front(this.props.offset + 0.87, 0.8),
      ...this.panel(this.props.offset, 0.8),
      ...this.chunky(this.props.offset, 0.8)]
  }
}

const fontFamilyHeader = "'Merienda', cursive"
const fontFamily = "'Indie Flower', cursive"
const longSpeech = [
  `Hey, it's You, again!`,
  `Your journey has just begun. However, you are not alone.`,
  `You're on the path to greatness, along millions of others.`,
  `I think you should meet Chris. He's the one who started all this.`
]
const shortSpeech = [
  `Hey there, welcome to Carmel!`
]
const intro = 'The First EOS Based Tech Education Platform'
