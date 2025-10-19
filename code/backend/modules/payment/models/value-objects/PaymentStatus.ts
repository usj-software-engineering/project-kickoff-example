export enum Status {
    PENDING = 'PENDING',
    COMPLETED = 'COMPLETED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED'
}

export class PaymentStatus {
    private readonly status: Status;

    private constructor(status: Status) {
        this.status = status;
    }

    static createPending(): PaymentStatus {
        return new PaymentStatus(Status.PENDING);
    }

    static createCompleted(): PaymentStatus {
        return new PaymentStatus(Status.COMPLETED);
    }

    static createFailed(): PaymentStatus {
        return new PaymentStatus(Status.FAILED);
    }

    static createRefunded(): PaymentStatus {
        return new PaymentStatus(Status.REFUNDED);
    }

    isPending(): boolean {
        return this.status === Status.PENDING;
    }

    isCompleted(): boolean {
        return this.status === Status.COMPLETED;
    }

    isFailed(): boolean {
        return this.status === Status.FAILED;
    }

    equals(other: PaymentStatus): boolean {
        if (!other) return false;
        return this.status === other.status;
    }

    getStatus(): Status {
        return this.status;
    }
}
