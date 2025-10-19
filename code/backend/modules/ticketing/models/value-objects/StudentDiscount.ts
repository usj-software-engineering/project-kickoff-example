export class StudentDiscount {
    private readonly percentage: number;

    constructor(percentage: number) {
        if (percentage <= 0 || percentage > 100) {
            throw new Error('Discount percentage must be between 1 and 100');
        }
        this.percentage = percentage;
    }

    static createStandard(): StudentDiscount {
        return new StudentDiscount(20);
    }

    calculateDiscountedPrice(originalPrice: number): number {
        if (originalPrice <= 0) {
            throw new Error('Original price must be positive');
        }
        const discountAmount = originalPrice * (this.percentage / 100);
        const finalPrice = originalPrice - discountAmount;
        return Math.round(finalPrice * 100) / 100;
    }

    equals(other: StudentDiscount): boolean {
        if (!other) return false;
        return this.percentage === other.percentage;
    }

    getPercentage(): number {
        return this.percentage;
    }
}
