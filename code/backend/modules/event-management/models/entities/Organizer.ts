export enum OrganizerStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED'
}

export class Organizer {
    private id: string;
    private name: string;
    private email: string;
    private status: OrganizerStatus;
    private eventIds: string[];

    constructor(id: string, name: string, email: string) {
        if (!id || id.trim() === '') {
            throw new Error('Organizer ID cannot be empty');
        }
        if (!name || name.trim().length < 2) {
            throw new Error('Name must have at least 2 characters');
        }
        if (!this.isValidEmail(email)) {
            throw new Error('Invalid email format');
        }

        this.id = id;
        this.name = name.trim();
        this.email = email.toLowerCase();
        this.status = OrganizerStatus.ACTIVE;
        this.eventIds = [];
    }

    registerEvent(eventId: string): void {
        if (this.status !== OrganizerStatus.ACTIVE) {
            throw new Error('Only active organizers can create events');
        }
        if (!eventId || eventId.trim() === '') {
            throw new Error('Event ID cannot be empty');
        }
        this.eventIds.push(eventId);
    }

    suspend(): void {
        if (this.status !== OrganizerStatus.ACTIVE) {
            throw new Error('Can only suspend active organizers');
        }
        this.status = OrganizerStatus.SUSPENDED;
    }

    private isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getStatus(): OrganizerStatus {
        return this.status;
    }

    getEventCount(): number {
        return this.eventIds.length;
    }
}
