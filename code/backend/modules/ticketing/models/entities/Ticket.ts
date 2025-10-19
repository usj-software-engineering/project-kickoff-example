import { TicketCode } from "../value-objects/TicketCode";
import { Money } from "../../../payment/models/value-objects/Money";

export enum TicketStatus {
  RESERVED = "RESERVED",
  PAID = "PAID",
  VALIDATED = "VALIDATED",
  REFUNDED = "REFUNDED",
}

export class Ticket {
  private id: string;
  private eventId: string;
  private buyerId: string;
  private ticketCode: TicketCode;
  private status: TicketStatus;
  private price: Money;
  private purchasedAt?: Date;

  constructor(id: string, eventId: string, buyerId: string, price: Money) {
    if (!id || id.trim() === "") {
      throw new Error("Ticket ID cannot be empty");
    }
    if (!eventId || eventId.trim() === "") {
      throw new Error("Ticket must be associated with an event");
    }
    if (!buyerId || buyerId.trim() === "") {
      throw new Error("Ticket must have a buyer");
    }

    this.id = id;
    this.eventId = eventId;
    this.buyerId = buyerId;
    this.price = price;
    this.status = TicketStatus.RESERVED;
    this.ticketCode = TicketCode.generate(this.id);
  }

  confirmPayment(): void {
    if (this.status !== TicketStatus.RESERVED) {
      throw new Error("Only reserved tickets can be paid");
    }
    this.status = TicketStatus.PAID;
    this.purchasedAt = new Date();
  }

  validate(): void {
    if (this.status !== TicketStatus.PAID) {
      throw new Error("Only paid tickets can be validated");
    }
    this.status = TicketStatus.VALIDATED;
  }

  refund(): void {
    if (this.status !== TicketStatus.PAID) {
      throw new Error("Only paid tickets can be refunded");
    }
    this.status = TicketStatus.REFUNDED;
  }

  getId(): string {
    return this.id;
  }

  getStatus(): TicketStatus {
    return this.status;
  }

  getTicketCode(): TicketCode {
    return this.ticketCode;
  }

  getPrice(): Money {
    return this.price;
  }
}
