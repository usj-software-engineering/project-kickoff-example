export class Money {
    private readonly amount: number;
    private readonly currency: string;

    constructor(amount: number, currency: string) {
        if (amount < 0) {
            throw new Error('Money amount cannot be negative');
        }
        if (!Number.isInteger(amount * 100)) {
            throw new Error('Money cannot have more than 2 decimal places');
        }
        const validCurrencies = ['EUR', 'USD'];
        if (!validCurrencies.includes(currency)) {
            throw new Error('Currency must be EUR or USD');
        }

        this.amount = amount;
        this.currency = currency;
    }

    static zero(currency: string): Money {
        return new Money(0, currency);
    }

    add(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Cannot add different currencies');
        }
        return new Money(this.amount + other.amount, this.currency);
    }

    subtract(other: Money): Money {
        if (this.currency !== other.currency) {
            throw new Error('Cannot subtract different currencies');
        }
        if (this.amount < other.amount) {
            throw new Error('Result would be negative');
        }
        return new Money(this.amount - other.amount, this.currency);
    }

    multiply(factor: number): Money {
        if (factor < 0) {
            throw new Error('Factor cannot be negative');
        }
        return new Money(
            Math.round(this.amount * factor * 100) / 100,
            this.currency
        );
    }

    equals(other: Money): boolean {
        if (!other) return false;
        return this.amount === other.amount && this.currency === other.currency;
    }

    getAmount(): number {
        return this.amount;
    }

    getCurrency(): string {
        return this.currency;
    }
}
