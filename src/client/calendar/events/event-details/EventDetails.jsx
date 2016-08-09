import React, {PropTypes} from 'react'
import Component from 'react-pure-render/component'
import './EventDetails.scss'
import Row from 'atoms/Row.jsx'
import Col from 'atoms/Col.jsx'
import Button from 'atoms/Button.jsx'
import { pxToRem } from 'styles/typography'
import Colors from 'styles/colors'
import RaceTypeBadge from './RaceTypeBadge.jsx'
import Flyer from './Flyer.jsx'
import momentTZ from  'moment-timezone'
import GoogleStaticMap from './GoogleStaticMap.jsx'
import AddressLink from './AddressLink.jsx'
import { Disciplines } from 'client/calendar/events/types.js'
import Icon from 'atoms/Icon.jsx'

import { getEventColor } from 'client/calendar/utils/event-colors.js'

const PresentedBy = ({by}) => {
  return (
    <div style={{
      fontStyle: 'italic',
      position: 'relative',
      top: pxToRem(4) + 'rem'
    }}>
      <span className="secondary">by {(by || '--')}</span>
    </div>
  )
}

const locationToAddressStr = ({streetAddress = '', city = '', state = '', zip = ''}) => {
  let addressArr = []
  const pushIfNotEmpty = prop => (prop && addressArr.push(prop))

  pushIfNotEmpty(streetAddress)
  pushIfNotEmpty(city)
  pushIfNotEmpty(state)

  return (addressArr.join(', ') + ' ' + zip).trim()
}

export default class EventDetails extends Component {
  render() {
    const insideModal = (
      (this.props.location
      && this.props.location.state
      && this.props.location.state.modal)
    )
    //TODO: hardcoding timezone for now
    const moment = () => momentTZ.tz(...arguments, 'America/Los_Angeles')

    const {
      name = '——',
      date = moment(),
      flyerUrl,
      location = {},
      discipline,
      type,
      notes = 'Hello from phoebe, but my concearn is that in 1987 I was not able to feed it',
      promoterName = 'Anton Vynogradenko',
      promoter,
      promoterUrl,
      group
    } = this.props.event

    const today = moment()
    const currentYearFormat = 'dddd, MMMM Do'
    const otherYearFormat = 'dddd, MMMM Do, YYYY'

    let formattedDate

    if (date.year() === today.year()) {
      formattedDate = date.format(currentYearFormat)
    } else {
      formattedDate = date.format(otherYearFormat)
    }

    const relativeDate = date.fromNow()

    const flyerComp = (flyerUrl
      ? <Flyer url={flyerUrl} />
      : <div className="text-2 secondary">No flyer (yet?)</div>
    )

    const from = encodeURIComponent('Current Location') //users current location
    const to = encodeURIComponent(locationToAddressStr(location))
    const googleMapsDirectionsUrl = `https://www.google.com/maps/dir/${from}/${to}`
    const startAddress = locationToAddressStr(location)

    let raceTypeBadgesComp = []




    if (date.isBefore(today)) {
      raceTypeBadgesComp.push(<RaceTypeBadge key={10} inverted name="PAST" color={Colors.event.status.past}/>)
    }

    if (group) {
      raceTypeBadgesComp.push(<RaceTypeBadge key={80} inverted name={'GROUP ' + group} color={Colors.grey800} />)
    }

    const eventColor = getEventColor(discipline, type, status)
    const eventType = (type || discipline || '').toUpperCase()
    console.info(eventColor)


    raceTypeBadgesComp.push(<RaceTypeBadge key={30} name={eventType} color={eventColor} />)

    // if (discipline === Disciplines.mtb) {
    //   raceTypeBadgesComp.push(<RaceTypeBadge key={20} name="MTB" color={Colors.event.mtb.default} />)
    // }
    //
    // if (discipline === Disciplines.road) {
    //   switch (type) {
    //     case 'Road Race':
    //       raceTypeBadgesComp.push(<RaceTypeBadge key={30} name="ROAD RACE" color={Colors.event.road.roadRace} />)
    //       break
    //     case 'Criterium':
    //       raceTypeBadgesComp.push(<RaceTypeBadge key={40} name="CRITERIUM" color={Colors.event.road.criterium} />)
    //       break
    //     case 'Hill Climb':
    //       raceTypeBadgesComp.push(<RaceTypeBadge key={50} name="HILL CLIMB" color={Colors.event.road.hillClimb} />)
    //       break
    //     case 'Circuit Race':
    //       raceTypeBadgesComp.push(<RaceTypeBadge key={60} name="CIRCUIT RACE" color={Colors.event.road.circuitRace} />)
    //       break
    //     case 'Time Trial':
    //       raceTypeBadgesComp.push(<RaceTypeBadge key={70} name="TIME TRIAL" color={Colors.event.road.timeTrial} />)
    //       break
    //     default:
    //       break
    //   }
    // }

    const notesComp = (notes && (
      <Row>
        <Col xs={14} sm={9}>
          <h4 className="w-700 header-regular">
            <Icon name="speaker_notes" size={2.5} top={-4} className="notes-icon" color={Colors.grey600}/>
            <span style={{color: Colors.grey500}}>Notes by </span>
            {promoterName}:
          </h4>
          <p className="text-sm-14">{notes || '--'}</p>
        </Col>
      </Row>
    ))

    const eventDetailsComponent = (
      <div className="EventDetails">
        <div className="content">
          <div className="badges">
            {raceTypeBadgesComp}
          </div>
          <Row>
            <Col xs={14} sm={9}>
              <h4 className="header-regular w-500 date">
                {formattedDate} <span className="relative">({relativeDate})</span>
              </h4>
              <h3 className="header-regular w-900 name">{name}</h3>
            </Col>
            <Col xs={14} sm={5} />
          </Row>
          <Row>
            <Col xs={14}>
              <PresentedBy by={promoter}/>
              <hr className="spacer" />
            </Col>
          </Row>
          <Row>
            <Col xs={14}>
              <AddressLink url={googleMapsDirectionsUrl} className="address-link" location={location}/>
            </Col>
          </Row>
          <Row>
            <Col xs={14} sm={9}>
              <div style={{
                marginBottom: '3rem',
              }}>
                <GoogleStaticMap width={416} height={352}
                  startAddress={startAddress}
                  homeAddress='San Jose, CA' />
              </div>
            </Col>
            <Col xs={14} sm={5}>
              <Button size="sm" primaryHover>REGISTER</Button>
            </Col>
          </Row>
          <hr className="spacer no-margin-top" />
          {/*<Row>
            <Col xs={14} sm={9}>
            Part of:
            </Col>
            <Col xs={14} sm={5}>Links</Col>
          </Row>*/}
          <Row>
            <Col smOffset={9} xs={5}>
              <a href={promoterUrl} target="_blank">
                {promoterUrl}
              </a>
            </Col>
          </Row>
          {notesComp}
          <Row className="margin top-4">
            <Col xs={14}>
              {flyerComp}
            </Col>
          </Row>

        </div>
      </div>
    )

    return (
      insideModal
        ? eventDetailsComponent
        : (
        <div className='EventDetails-container'>
          {eventDetailsComponent}
        </div>
        )
    )
  }
}

EventDetails.propTypes = {
  details: PropTypes.string
}

import { connect } from 'react-redux'
import { getEvent } from 'shared/reducers/reducer.js'

export default connect(
  (state, ownProps) => {
    //to have "back to calendar" button
    // calendar: getCalendar()
    return { event: getEvent(state, ownProps.params.eventId) || {} }
  }
)(EventDetails)
