export interface MusicEvent {
  id: string;
  bandName: string;
  genre: string;
  venue: {
    name: string;
    city: string;
    type: string;
  };
  date: Date;
  time: string;
  coverCharge: string;
  description: string;
  imageUrl?: string;
}
