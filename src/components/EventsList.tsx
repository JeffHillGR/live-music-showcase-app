import { MusicEvent } from '../types/event';
import { EventCard } from './EventCard';

interface EventsListProps {
  events: MusicEvent[];
  selectedDate: Date | null;
}

export function EventsList({ events, selectedDate }: EventsListProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-10 pb-4 border-b">
        <h2 className="text-muted-foreground">
          {selectedDate ? formatDate(selectedDate) : 'Upcoming Shows - Next 7 Days'}
        </h2>
        <p className="text-muted-foreground mt-1">
          {events.length} {events.length === 1 ? 'show' : 'shows'} scheduled
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      
      {events.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No shows scheduled for this date.</p>
          <p className="text-sm mt-2">Check back soon for updates!</p>
        </div>
      )}
    </div>
  );
}
