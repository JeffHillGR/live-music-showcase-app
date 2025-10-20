import { MusicEvent } from '../types/event';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Clock, DollarSign, Music } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EventCardProps {
  event: MusicEvent;
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {event.imageUrl && (
        <div className="w-full h-48 overflow-hidden bg-muted">
          <ImageWithFallback
            src={event.imageUrl}
            alt={`${event.bandName} at ${event.venue.name}`}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="flex-1">{event.bandName}</CardTitle>
          <Badge variant="secondary">{event.genre}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <div>{event.venue.name}</div>
            <div className="text-sm">{event.venue.city} • {event.venue.type}</div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>{event.time}</span>
        </div>
        
        <div className="flex items-center gap-2 text-muted-foreground">
          <DollarSign className="w-4 h-4 flex-shrink-0" />
          <span>{event.coverCharge}</span>
        </div>
        
        <div className="flex items-start gap-2 text-muted-foreground text-sm pt-2 border-t">
          <Music className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p className="flex-1">{event.description}</p>
        </div>
      </CardContent>
    </Card>
  );
}
