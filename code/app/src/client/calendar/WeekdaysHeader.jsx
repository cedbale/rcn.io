import React from 'react'
import Component from 'react-pure-render/component'
import Row from 'atoms/Row.jsx'
import Col from 'atoms/Col.jsx'
import moment from 'moment'


export default class WeekdaysHeader extends Component {
  render() {
    const {sizes} = this.props

    const colStyle = {
      //outline: `1px solid silver`, borderTop: '1px solid silver', borderLeft: '1px solid silver', borderRight: '1px solid silver',
      minHeight: '4rem',
      paddingTop: '1rem',
      fontSize: '2rem',
      textAlign: 'right',
      //fontWeight: '300',
      textTransform: 'uppercase'

    }

    const columns = sizes.map((size, i) => {
      return (
        <Col key={i} xs={size} style={colStyle}>
          {moment.weekdaysShort()[i]}
        </Col>
      )
    })

    const style = null

    return (
      <div className="WeekDaysHeader" style={style} {...this.props}>
        <Row style={{
          flexWrap: 'nowrap'
        }}>
          {columns}
        </Row>
      </div>
    )
  }
}

export class WeekdaysHeaderStiky extends Component {//eslint-disable-line
  render() {
    const {sizes, containerWidth} = this.props


    return (
      <div style={{
        position: 'fixed',
        top: '0rem',
        zIndex: 999,
        width: '100%',
        left: 0,
        backgroundColor: 'white',
        boxShadow: '0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2)'
      }}>
        <WeekdaysHeader sizes={sizes} className="" style={{
          width: containerWidth,
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: '1rem',
          paddingRight: '1rem',
          //left: '0',
          textAlign: 'center',
          backgroundColor: 'white',

        }}/>
      </div>
    )
  }
}