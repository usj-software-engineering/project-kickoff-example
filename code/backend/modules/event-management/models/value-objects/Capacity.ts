export class Capacity {
    private readonly maxCapacity: number;

    constructor(maxCapacity: number) {
        if (maxCapacity <= 0) {
            throw new Error('Capacity must be greater than zero');
        }
        if (maxCapacity > 10000) {
            throw new Error('Capacity cannot exceed 10,000');
        }
        this.maxCapacity = maxCapacity;
    }

    isValidAttendance(attendance: number): boolean {
        return attendance >= 0 && attendance <= this.maxCapacity;
    }

    equals(other: Capacity): boolean {
        if (!other) return false;
        return this.maxCapacity === other.maxCapacity;
    }

    getMaxCapacity(): number {
        return this.maxCapacity;
    }
}
