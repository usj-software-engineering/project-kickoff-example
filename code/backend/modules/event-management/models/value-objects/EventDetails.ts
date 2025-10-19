export class EventDetails {
    private readonly name: string;
    private readonly description: string;
    private readonly eventDate: Date;
    private readonly venue: string;

    constructor(name: string, description: string, eventDate: Date, venue: string) {
        if (!name || name.trim().length < 3) {
            throw new Error('Event name must be at least 3 characters');
        }
        if (!description || description.trim().length < 10) {
            throw new Error('Description must be at least 10 characters');
        }
        if (eventDate <= new Date()) {
            throw new Error('Event date must be in the future');
        }
        if (!venue || venue.trim() === '') {
            throw new Error('Venue cannot be empty');
        }

        this.name = name.trim();
        this.description = description.trim();
        this.eventDate = new Date(eventDate);
        this.venue = venue.trim();
    }

    equals(other: EventDetails): boolean {
        if (!other) return false;
        return this.name === other.name &&
               this.eventDate.getTime() === other.eventDate.getTime() &&
               this.venue === other.venue;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getEventDate(): Date {
        return new Date(this.eventDate);
    }

    getVenue(): string {
        return this.venue;
    }
}
