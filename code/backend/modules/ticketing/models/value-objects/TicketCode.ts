export class TicketCode {
  private readonly code: string;

  private constructor(code: string) {
    this.code = code;
  }

  static generate(ticketId: string): TicketCode {
    if (!ticketId || ticketId.trim() === "") {
      throw new Error("Ticket ID cannot be empty");
    }
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 6).toUpperCase();
    const code = `QR-${ticketId}-${timestamp}-${random}`;
    return new TicketCode(code);
  }

  static fromCode(code: string): TicketCode {
    if (!code || code.trim() === "") {
      throw new Error("Code cannot be empty");
    }
    if (!code.startsWith("QR-")) {
      throw new Error("Invalid ticket code format");
    }
    return new TicketCode(code);
  }

  equals(other: TicketCode): boolean {
    if (!other) return false;
    return this.code === other.code;
  }

  getCode(): string {
    return this.code;
  }
}
