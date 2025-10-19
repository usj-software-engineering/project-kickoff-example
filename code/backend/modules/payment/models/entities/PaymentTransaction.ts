import { Money } from '../value-objects/Money';
import { PaymentStatus } from '../value-objects/PaymentStatus';

export class PaymentTransaction {
    private id: string;
    private ticketIds: string[];
    private buyerId: string;
    private amount: Money;
    private status: PaymentStatus;
    private completedAt?: Date;

    constructor(id: string, ticketIds: string[], buyerId: string, amount: Money) {
        if (!id || id.trim() === '') {
            throw new Error('Transaction ID cannot be empty');
        }
        if (!ticketIds || ticketIds.length === 0) {
            throw new Error('Transaction must have at least one ticket');
        }
        if (!buyerId || buyerId.trim() === '') {
            throw new Error('Buyer ID cannot be empty');
        }
        if (amount.getAmount() <= 0) {
            throw new Error('Transaction amount must be positive');
        }

        this.id = id;
        this.ticketIds = [...ticketIds];
        this.buyerId = buyerId;
        this.amount = amount;
        this.status = PaymentStatus.createPending();
    }

    complete(): void {
        if (!this.status.isPending()) {
            throw new Error('Can only complete pending transactions');
        }
        this.status = PaymentStatus.createCompleted();
        this.completedAt = new Date();
    }

    fail(reason: string): void {
        if (!this.status.isPending()) {
            throw new Error('Can only fail pending transactions');
        }
        this.status = PaymentStatus.createFailed();
    }

    refund(): void {
        if (!this.status.isCompleted()) {
            throw new Error('Can only refund completed transactions');
        }
        this.status = PaymentStatus.createRefunded();
    }

    getId(): string {
        return this.id;
    }

    getAmount(): Money {
        return this.amount;
    }

    getStatus(): PaymentStatus {
        return this.status;
    }

    isSuccessful(): boolean {
        return this.status.isCompleted();
    }
}
