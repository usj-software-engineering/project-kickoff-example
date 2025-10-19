import { Money } from "../../../payment/models/value-objects/Money";

export class PriceTier {
  private readonly name: string;
  private readonly price: Money;

  constructor(name: string, price: Money) {
    if (!name || name.trim() === "") {
      throw new Error("Price tier name cannot be empty");
    }

    this.name = name.trim();
    this.price = price;
  }

  equals(other: PriceTier): boolean {
    if (!other) return false;
    return this.name === other.name && this.price.equals(other.price);
  }

  getName(): string {
    return this.name;
  }

  getPrice(): number {
    return this.price.getAmount();
  }

  getCurrency(): string {
    return this.price.getCurrency();
  }
}
