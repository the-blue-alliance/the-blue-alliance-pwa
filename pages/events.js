import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'
import { fetchEventListPage } from '../actions'

const useFetch = refetch => {
  const [events, fetching] = useSelector(state => {
    return [state.getIn(['models', 'events', '2019', 'data']), state.getIn(['models', 'events', '2019', 'fetching'])]
  })
  const dispatch = useDispatch()
  useEffect(() => {
    if (refetch) {
      dispatch(fetchEventListPage(2019))
    }
  }, [])
  return [events, fetching]
}

const Events = ({ refetch }) => {
  const [events, fetching] = useFetch(refetch)
  return (
    <div>
      <h1>Events</h1>
      <Link href='/'><a>Home</a></Link>
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
  if (!reduxStore.getState().getIn(['models', 'events', '2019', 'data'])) {
    await reduxStore.dispatch(fetchEventListPage(2019))
    return { refetch: false }
  } else {
    return { refetch: true }
  }
  return {}
}

export default Events
