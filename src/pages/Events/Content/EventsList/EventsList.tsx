import * as React from 'react'
import { IEvent, IEventDB } from 'src/models/events.models'
import { Button } from 'src/components/Button'
import { Link } from 'src/components/Links'
import { Flex, Link as ExternalLink, Box } from 'rebass'
import { AuthWrapper } from 'src/components/Auth/AuthWrapper'
import MoreContainer from 'src/components/MoreContainer/MoreContainer'
import Heading from 'src/components/Heading'
import EventCard from 'src/components/EventCard/EventCard'
import TagsSelect from 'src/components/Tags/TagsSelect'
import { inject, observer } from 'mobx-react'
import { EventStore } from 'src/stores/Events/events.store'
import { LocationSearch } from 'src/components/LocationSearch/LocationSearch'

interface InjectedProps {
  eventStore: EventStore
}

@inject('eventStore')
@observer
export class EventsList extends React.Component<any> {
  constructor(props: any) {
    super(props)
  }

  get injected() {
    return this.props as InjectedProps
  }

  public render() {
    const { filteredEvents } = this.injected.eventStore
    if (filteredEvents) {
      return (
        <>
          <Flex py={26}>
            <Heading medium txtcenter bold width={1}>
              Precious Plastic events from around the world
            </Heading>
          </Flex>
          <Flex justifyContent={'space-between'} mb={8}>
            <Flex flexWrap={'nowrap'} width={[1, 1, 0.5]}>
              <Box width={0.5}>
                <TagsSelect
                  onChange={tags =>
                    this.props.eventStore.updateSelectedTags(tags)
                  }
                  category="event"
                />
              </Box>
              <Box width={0.5} ml={2} className="location-search-list">
                <LocationSearch
                  onChange={v =>
                    this.props.eventStore.updateSelectedLocation(v)
                  }
                  onClear={() => this.props.eventStore.clearLocationSearch()}
                />
              </Box>
            </Flex>
            <Flex>
              <AuthWrapper>
                <Link to={'/events/create'}>
                  <Button variant="primary">create</Button>
                </Link>
              </AuthWrapper>
            </Flex>
          </Flex>
          <React.Fragment>
            <>
              {filteredEvents.length === 0 ? null : ( // *** TODO - indicate whether no upcoming events or data still just loading
                <Flex flexWrap={'wrap'} flexDirection="column">
                  {filteredEvents.map((event: IEvent) => (
                    <EventCard key={event.slug} event={event} />
                  ))}
                </Flex>
              )}
              <Flex justifyContent={'center'} mt={20}>
                <Link to={'#'}>
                  <Button variant={'secondary'}>More Events</Button>
                </Link>
              </Flex>
              <MoreContainer
                text={
                  'Connect with a likeminded community. All around the planet.'
                }
                buttonVariant={'primary'}
                buttonLabel={'Create an event'}
              />
            </>
          </React.Fragment>
        </>
      )
    } else {
      return <div>Events not found</div>
    }
  }
}
