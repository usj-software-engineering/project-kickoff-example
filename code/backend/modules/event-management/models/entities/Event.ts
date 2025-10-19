import { EventDetails } from '../value-objects/EventDetails';
import { Capacity } from '../value-objects/Capacity';
import { PriceTier } from '../value-objects/PriceTier';

export enum EventStatus {
    DRAFT = 'DRAFT',
    PUBLISHED = 'PUBLISHED',
    SALES_OPEN = 'SALES_OPEN'
}

export class Event {
    private id: string;
    private organizerId: string;
    private details: EventDetails;
    private capacity: Capacity;
    private priceTiers: PriceTier[];
    private status: EventStatus;
    private ticketsSold: number;

    constructor(
        id: string,
        organizerId: string,
        details: EventDetails,
        capacity: Capacity
    ) {
        if (!id || id.trim() === '') {
            throw new Error('Event ID cannot be empty');
        }
        if (!organizerId || organizerId.trim() === '') {
            throw new Error('Event must have an organizer');
        }

        this.id = id;
        this.organizerId = organizerId;
        this.details = details;
        this.capacity = capacity;
        this.priceTiers = [];
        this.status = EventStatus.DRAFT;
        this.ticketsSold = 0;
    }

    addPriceTier(priceTier: PriceTier): void {
        if (this.status !== EventStatus.DRAFT) {
            throw new Error('Cannot add price tiers after event is published');
        }
        this.priceTiers.push(priceTier);
    }

    publish(): void {
        if (this.status !== EventStatus.DRAFT) {
            throw new Error('Event can only be published from DRAFT status');
        }
        if (this.priceTiers.length === 0) {
            throw new Error('Event must have at least one price tier');
        }
        this.status = EventStatus.PUBLISHED;
    }

    sellTickets(quantity: number): void {
        if (this.status !== EventStatus.SALES_OPEN) {
            throw new Error('Sales are not open');
        }
        const available = this.capacity.getMaxCapacity() - this.ticketsSold;
        if (quantity > available) {
            throw new Error(`Only ${available} tickets available`);
        }
        if (quantity <= 0) {
            throw new Error('Quantity must be positive');
        }
        this.ticketsSold += quantity;
    }

    openSales(): void {
        if (this.status !== EventStatus.PUBLISHED) {
            throw new Error('Event must be published first');
        }
        this.status = EventStatus.SALES_OPEN;
    }

    getAvailableCapacity(): number {
        return this.capacity.getMaxCapacity() - this.ticketsSold;
    }

    getId(): string {
        return this.id;
    }

    getStatus(): EventStatus {
        return this.status;
    }

    getDetails(): EventDetails {
        return this.details;
    }

    getTicketsSold(): number {
        return this.ticketsSold;
    }
}
