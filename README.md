# UniTickets - Domain Model Example

> **Disclaimer:** This project was generated using AI (Claude) as an example for educational purposes. Although reviewed manually, may contain innacuracies.

## About this project

This is a **kick-off example** for the group project. Use it as a reference to understand the concepts and what is expected, but your own project should be original work adapted to your specific domain.

## The Domain: UniTickets

UniTickets is a university events ticketing platform where:
- Students can browse and buy tickets for campus events (concerts, talks, workshops)
- Events have capacity limits and price tiers
- Students get special discounts with verified university emails
- Organizers can create and manage events
- Payment processing and refund policies are handled

## Project Structure

```
docs/
    GLOSSARY.md         - Domain terms and definitions
    DOMAIN-NOTES.md     - Behaviors, invariants, and classifications

code/backend/modules/
    event-management/   - Event lifecycle and pricing
    ticketing/          - Ticket sales and student management
    payment/            - Financial transactions
```

## Key Concepts Demonstrated

### Entities (5 total)
Have unique identity and lifecycle:
- `Event` - University events with capacity and sales states
- `Organizer` - Event creators
- `Ticket` - Digital tickets with QR codes
- `Student` - Verified university students
- `PaymentTransaction` - Payment processing

### Value Objects (8 total)
Immutable objects compared by value:
- `EventDetails`, `Capacity`, `PriceTier`
- `TicketCode`, `StudentDiscount`
- `Money`, `PaymentStatus`, `RefundPolicy`

### Invariants
Business rules enforced in code:
- Capacity cannot be exceeded
- Only paid tickets can be validated
- Refunds only within policy timeframe
- Student discounts require university email

---

**Universidad San Jorge - Software Engineering**
