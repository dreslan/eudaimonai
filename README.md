# 📢 NEW ACHIEVEMENT: The System v2.0

**Welcome, Crawler!**

The System has initialized the **8 Dimensions of Wellness** patch. You have been selected to participate in this grand experiment called "Getting Your Life Together." Try not to die.

This repository uses a holistic model to ensure you don't just max out your Intelligence stat while letting your Constitution crumble to dust. Balance is key. Neglecting a dimension may result in... *suboptimal performance*. And we wouldn't want that, would we?

## The Framework (Read this, it's important)

The "8 Dimensions of Wellness" was developed by **Dr. Peggy Swarbrick** and adopted by **SAMHSA**. It's science. You like science, right?

The model posits that wellness is not merely the absence of disease, but a conscious, self-directed process. Basically, stop being a passive NPC and start grinding.

### The 8 Stats (Dimensions)

1. **🧠 Intellectual:** Expanding your brain so you don't sound like a goblin.
2. **💪 Physical:** Activity, diet, sleep. You need hit points to survive the dungeon.
3. **💰 Financial:** Gold management. Don't be poor.
4. **🏡 Environmental:** Your lair. Keep it clean or the mobs will spawn.
5. **🛠 Vocational:** Your class/job. Find satisfaction in the grind.
6. **🤝 Social:** Party management. Don't solo everything.
7. **🎨 Emotional:** Coping with the existential dread.
8. **✨ Spiritual:** Finding meaning in the chaos.

## References & Further Reading

* **Swarbrick, M. (2006).** A wellness approach. *Psychiatric Rehabilitation Journal*.
* **SAMHSA (2016).** *Action Planning for Prevention and Recovery*.

## How to Play (Usage)

This list is designed for use with **Obsidian**. We use a **Funnel Strategy** to keep the vault clean.

### The Funnel Strategy

1.  **The Quest Board (`quests.md`):** Dump all potential Quests here. Use the format `- [ ] Quest Name [dimension:: physical] [status:: backlog]`. No need to create a file yet.
2.  **The Quest Log (`quests/`):** When you are ready to commit to a complex quest (make it `#active`), create a file for it in the `quests/` folder using the template. Simple quests can stay as lines in the master list!

### Metadata & Tags

* **Dimension:** `[dimension:: intellectual]`, `[dimension:: physical]`, etc.
* **Status:**
  * `[status:: active]`: **Accepted Quest**. You are doing this now.
  * `[status:: backlog]`: **Side Quests**. Just a line in the master list.
  * `[status:: maybe]`: **Rumors**. Might be nothing.
* **Effort/Type:** `#deep-work` (Raid), `#quick-win` (Daily), `#lifestyle` (Buff), `#milestone` (Achievement).

## 📊 Obsidian Dataview Examples

If you have the **Dataview** plugin installed, you can copy-paste these code blocks into any note to create dynamic dashboards.

### 1. 2026 Roadmap (Active Quests)

View all Quests accepted for the current run.

```dataview
TASK
FROM "quests"
WHERE contains(text, "[status:: active]")
GROUP BY meta(section).subpath
```

### 2. Quick Wins (Low Level Mobs)

Find small mobs you can one-shot quickly, excluding ones you're already fighting.

```dataview
TASK
FROM "quests"
WHERE contains(tags, "#quick-win") AND !contains(text, "[status:: active]")
```

### 3. Gap Analysis (Rumors)

Review the suggested rumors to fill gaps in your character build.

```dataview
TASK
FROM "quests"
WHERE contains(text, "[status:: maybe]")
GROUP BY meta(section).subpath
```

### 4. Backlog by Dimension

See all your potential side quests grouped by their wellness dimension.

```dataview
TASK
FROM "quests"
WHERE contains(text, "[status:: backlog]")
GROUP BY meta(section).subpath
```

## 🗂️ Templates & Dashboards

### Quest Template (Inspired by WOOP)

I've included a template in `templates/quest_template.md`. It is inspired by the **WOOP** (Wish, Outcome, Obstacle, Plan) framework, but adapted for the Dungeon Crawler lifestyle. It helps you anticipate the "Boss Fight" (Obstacle) and prepare your "Cheese Strategy" (Plan).

### Visual Dashboard

Check out `dashboard.md` for a visual overview of your progress. It uses **DataviewJS** to render:

* **Progress Bars** for your active goals.
* **Dimension Balance Charts** to see if you are neglecting any area.

## ⚙️ System Configuration (Auto-Templates)

To ensure the System automatically generates the correct Quest Log when you accept a new quest:

1. **Install Templater:** Go to Community Plugins -> Browse -> Search "Templater" -> Install & Enable.
2. **Configure Folder Templates:**
   * Go to Settings -> Templater.
   * Enable "Trigger Templater on new file creation".
   * Scroll down to "Folder Templates".
   * Add a new entry:
     * Folder: `quests/`
     * Template: `templates/quest_template.md`

Now, whenever you click a link like `[[quests/Kill Goblin King|Kill Goblin King]]`, the System will automatically generate the file in the `quests/` folder and apply the Quest Log template.

## 📦 The Loot Box (Physical Integration)

To integrate with your physical "Achievement Box":

1. **Complete a Quest:** Mark it as done. The System will acknowledge your effort.
2. **Print a Card:** Create a physical token of your victory.
3. **QR Code:** Link it back to the digital realm.
4. **Reward:** Open the box. It's probably just a bronze box. Don't get your hopes up.

*Glurp Glurp!*
