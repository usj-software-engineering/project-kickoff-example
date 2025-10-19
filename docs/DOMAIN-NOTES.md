# Domain Notes - UniTickets

## Key Behaviors

**Students:** Browse events, purchase tickets with discounts, receive QR codes, request refunds

**Organizers:** Create and publish events, configure pricing, monitor sales

**System:** Process payments, generate QR codes, validate entries, enforce capacity limits

## Critical Invariants

1. **Capacity enforcement** - Cannot sell more tickets than capacity
2. **Unique QR codes** - Each ticket has exactly one unique code
3. **Payment before ticket** - Tickets only issued after successful payment
4. **Student verification** - Discounts only for verified university emails
5. **Refund timeframe** - Refunds only allowed >72 hours before event
6. **Event requirements** - Must have name, date, venue, capacity, and at least one price tier before publishing
7. **One-time validation** - Each QR code can only be used once

## Entity vs Value Object

### Entities

| Entity | Why it's an Entity |
|--------|-------------------|
| **Event** | Has unique ID, lifecycle (draft → published → open), state changes as tickets sell |
| **Ticket** | Has unique QR code, lifecycle (reserved → paid → validated/refunded) |
| **Student** | Has persistent identity across multiple purchases |
| **Organizer** | Has unique ID, ongoing relationship managing multiple events |
| **PaymentTransaction** | Has unique transaction ID, tracks payment lifecycle |

### Value Objects

| Value Object | Why it's a Value Object |
|--------------|------------------------|
| **Money** | Compared by amount + currency, immutable, no identity |
| **Capacity** | Just a number constraint, replaceable |
| **PriceTier** | Configuration data, compared by values not identity |
| **StudentDiscount** | Discount rules, interchangeable if same percentage |
| **TicketCode** | The data itself is immutable, identity belongs to Ticket |
| **EventDetails** | Descriptive information, no independent identity |
| **RefundPolicy** | Set of rules, compared by value |
| **PaymentStatus** | Enumeration of states, no identity |

## Bounded Contexts

### 1. Event Management
**Focus:** Event lifecycle and configuration
**Models:** Event, Organizer, EventDetails, Capacity, PriceTier

### 2. Ticketing
**Focus:** Ticket sales and student management
**Models:** Ticket, Student, TicketCode, StudentDiscount

### 3. Payment
**Focus:** Financial transactions
**Models:** PaymentTransaction, Money, PaymentStatus, RefundPolicy
