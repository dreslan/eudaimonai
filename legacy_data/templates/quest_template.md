---
created: <% tp.date.now("YYYY-MM-DD") %>
tags: [quest]
dimension: <% tp.system.prompt("Dimension (intellectual, physical, financial, environmental, vocational, social, emotional, spiritual)") %>
status: <% tp.system.prompt("Status (active, backlog, maybe)", "active") %>
progress: <% tp.system.prompt("Current Progress %", "0") %>
due_date: <% tp.system.prompt("Due Date (YYYY-MM-DD)") %>
---

# <% tp.file.title %>

> [!GOAL] NEW QUEST!
> *What is the specific, challenging, but feasible Quest?*

## 🌟 The Loot (Why)

*If I survive this, what do I get? A sense of pride? A shiny box? Visualize the reward.*

- 

## 🚧 The Boss Fight (Obstacle)

*What is standing in your way? Laziness? Fear? A literal goblin? Identify the enemy.*

- 

## ⚡ The Cheese Strategy (Plan)

*If [The Boss] attacks, then I will [Counter-Attack].*

- **If** I feel ..., **Then** I will ...

## 📈 Quest Log

- [ ] Milestone 1
- [ ] Milestone 2
