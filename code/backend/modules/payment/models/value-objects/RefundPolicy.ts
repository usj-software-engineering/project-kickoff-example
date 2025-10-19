import { Money } from './Money';

export class RefundPolicy {
    private readonly eventDate: Date;
    private readonly hoursBeforeEvent: number;

    constructor(eventDate: Date, hoursBeforeEvent: number) {
        if (eventDate <= new Date()) {
            throw new Error('Event date must be in the future');
        }
        if (hoursBeforeEvent < 0) {
            throw new Error('Hours before event cannot be negative');
        }
        this.eventDate = new Date(eventDate);
        this.hoursBeforeEvent = hoursBeforeEvent;
    }

    static createStandard(eventDate: Date): RefundPolicy {
        return new RefundPolicy(eventDate, 72);
    }

    isRefundAllowed(requestDate?: Date): boolean {
        const now = requestDate || new Date();
        if (now >= this.eventDate) {
            return false;
        }
        const hoursUntilEvent = (this.eventDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        return hoursUntilEvent >= this.hoursBeforeEvent;
    }

    calculateRefundAmount(originalAmount: Money): Money {
        if (!this.isRefundAllowed()) {
            return Money.zero(originalAmount.getCurrency());
        }
        return originalAmount;
    }

    equals(other: RefundPolicy): boolean {
        if (!other) return false;
        return this.eventDate.getTime() === other.eventDate.getTime() &&
               this.hoursBeforeEvent === other.hoursBeforeEvent;
    }

    getHoursBeforeEvent(): number {
        return this.hoursBeforeEvent;
    }
}
