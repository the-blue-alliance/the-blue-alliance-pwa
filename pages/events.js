import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { setEventList, setSource } from '../store'
import fetch from 'isomorphic-unfetch'

const useFetch = () => {
  const events = useSelector(state => {
    return state.get('events')
  })
  const source = useSelector(state => {
    return state.get('source')
  })
  const dispatch = useDispatch()
  useEffect(() => {
    if (source !== 'api') {
      fetch('https://www.thebluealliance.com/api/v3/events/2019', {
        headers: {
          'X-TBA-Auth-Key': 'POvVo9CNx9v7GKzQdHTgpru5S1G3sDjrsiA3FtbFCeedQsBJPN1VN06IYsNbKgCf',
        },
      }).then(events => events.json()).then(events => dispatch(setEventList(events, 'refreshed')))
    }
  }, [])
  return [events, source]
}

const Events = () => {
  const [events, source] = useFetch()
  return (
    <div>
      <h1>Events</h1>
      <Link href='/'><a>Home</a></Link>
      <div>{source}</div>
      {events.map(event => (
        <div key={event.get('key')}>
          <Link href={`/event?eventKey=${event.get('key')}`} as={`/event/${event.get('key')}`}>
            <a>{event.get('year')} {event.get('name')}</a>
          </Link>
        </div>
      ))}
    </div>
  )
}

Events.getInitialProps = async ({ reduxStore, req }) => {
  if (reduxStore.getState().get('events')) {
    reduxStore.dispatch(setSource('cache'))
  } else {
    await fetch('https://www.thebluealliance.com/api/v3/events/2019', {
      headers: {
        'X-TBA-Auth-Key': 'POvVo9CNx9v7GKzQdHTgpru5S1G3sDjrsiA3FtbFCeedQsBJPN1VN06IYsNbKgCf',
      },
    }).then(events => events.json()).then(events => reduxStore.dispatch(setEventList(events, 'api')))
  }
  return {}
}

export default Events
