export enum StudentStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED'
}

export class Student {
    private id: string;
    private email: string;
    private fullName: string;
    private status: StudentStatus;
    private ticketIds: string[];

    constructor(id: string, email: string, fullName: string) {
        if (!id || id.trim() === '') {
            throw new Error('Student ID cannot be empty');
        }
        if (!this.isValidUniversityEmail(email)) {
            throw new Error('Email must be from university domain');
        }
        if (!fullName || fullName.trim().length < 2) {
            throw new Error('Full name must have at least 2 characters');
        }

        this.id = id;
        this.email = email.toLowerCase();
        this.fullName = fullName.trim();
        this.status = StudentStatus.ACTIVE;
        this.ticketIds = [];
    }

    registerPurchase(ticketId: string): void {
        if (this.status !== StudentStatus.ACTIVE) {
            throw new Error('Student is not eligible to purchase tickets');
        }
        if (!ticketId || ticketId.trim() === '') {
            throw new Error('Ticket ID cannot be empty');
        }
        this.ticketIds.push(ticketId);
    }

    suspend(): void {
        if (this.status !== StudentStatus.ACTIVE) {
            throw new Error('Can only suspend active students');
        }
        this.status = StudentStatus.SUSPENDED;
    }

    private isValidUniversityEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return false;
        }
        return email.toLowerCase().endsWith('@university.edu') ||
               email.toLowerCase().endsWith('@uni.edu');
    }

    getId(): string {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getStatus(): StudentStatus {
        return this.status;
    }

    getTicketCount(): number {
        return this.ticketIds.length;
    }
}
