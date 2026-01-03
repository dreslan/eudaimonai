# 🏆 The Achievement Box Integration

Bridging the digital and physical worlds can make achievements feel more "real" and satisfying.

## The Concept

When you complete a significant goal (e.g., "Run a Marathon"), you don't just check a box. You create a physical artifact to deposit into your **Achievement Box**.

## The Artifact: "Achievement Cards"

Create a template for 3x5 index cards or trading cards.

### Front of Card

* **Title:** The Goal Name (e.g., "Run a Marathon")
* **Icon:** A symbol representing the dimension (e.g., 🏃 for Physical)
* **Date Completed:** Jan 1, 2026
* **Visual:** A photo or sticker related to the event.

### Back of Card

* **The "Why":** A one-sentence reminder of why you did this.
* **QR Code:** A QR code that links directly to the Obsidian note for this goal.

## How to Generate the QR Code

You can use the Obsidian URI scheme.

1. Right-click the note in Obsidian -> "Copy Obsidian URL".
2. Use a QR code generator (or a script) to turn that URL into a code.
3. Print it and stick it on the card.

## Digital "Ceremony"

When you move a card to the box:

1. Update the `achievement_template` metadata to `completed: [Date]`.
2. Add a photo of the physical card to the Obsidian note.
3. Move the note to a "Archive/Trophy Room" folder.
