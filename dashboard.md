# 📊 Crawler Status Dashboard

## 🏆 Current Quests (Active)

```dataviewjs
// --- Configuration ---
const questFile = "quests.md";
const questFolder = '"quests"';

// --- Helper Functions ---
function getDimension(t) {
    // 1. Try to get from inline field [dimension:: ...] (Legacy support)
    if (t.dimension && typeof t.dimension === 'string') return t.dimension.toLowerCase();

    // 2. Infer from Header
    if (!t.header || !t.header.subpath) return "misc";
    
    const header = t.header.subpath;
    
    // Handle "Emotional & Spiritual" special case
    if (header.includes("Emotional") && header.includes("Spiritual")) {
        if (t.text.includes("#spiritual")) return "spiritual";
        return "emotional"; // Default
    }

    // General case: Extract second word (after emoji)
    // "🧠 Intellectual" -> "intellectual"
    const parts = header.split(" ");
    if (parts.length > 1) return parts[1].toLowerCase();
    return "misc";
}

function getStatus(t) {
    // 1. Infer from Tags (Priority)
    if (t.text.includes("#active")) return "active";
    if (t.text.includes("#backlog")) return "backlog";
    if (t.text.includes("#maybe")) return "maybe";

    // 2. Try to get from inline field [status:: ...] (Legacy support)
    if (t.status && typeof t.status === 'string') return t.status.toLowerCase();
    
    return "backlog"; // Default
}

// --- Main Logic ---

// 1. Gather Active Pages (Full Quest Files)
const activePages = dv.pages(questFolder).where(p => p.status == "active");

// 2. Gather Active Tasks (from quests.md)
let activeTasks = [];
const questPage = dv.page(questFile);
if (questPage) {
    const allTasks = questPage.file.tasks;
    activeTasks = allTasks.where(t => getStatus(t) == "active");
} else {
    dv.paragraph(`⚠️ Warning: Could not find quest file: ${questFile}`);
}

// 3. Combine
const combined = [];

activePages.forEach(p => {
    combined.push({
        link: p.file.link,
        dimension: p.dimension,
        progress: p.progress || 0,
        dueDate: p.due_date
    });
});

activeTasks.forEach(t => {
    // Clean text: remove [key:: val] but KEEP [[Wiki Links]]
    // We only remove brackets if they contain "::" (inline fields)
    const cleanText = t.text
        .replace(/\[[^\]]*::[^\]]*\]/g, "") // Remove [key:: value]
        .replace(/#\w+/g, "")               // Remove #tags
        .trim();
    
    combined.push({
        link: cleanText,
        dimension: getDimension(t),
        progress: t.progress || 0,
        dueDate: t.due_date
    });
});

// 4. Render
dv.table(["Quest", "Stat", "Progress", "Doom Clock"],
  combined.map(p => {
    const progress = p.progress;
    const progressBar = `<progress value="${progress}" max="100" style="width: 100px; height: 10px;"></progress> <span style="font-size: 0.8em; color: gray;">${progress}%</span>`;
    return [p.link, p.dimension, progressBar, p.dueDate || "None"];
  })
)
```

## 🧩 Stat Distribution

*Are you min-maxing too hard? The System recommends balance.*

```dataviewjs
// Reuse logic (copy-paste or simplified for this block)
const questFile = "quests.md";
const questFolder = '"quests"';

function getDimension(t) {
    if (t.dimension && typeof t.dimension === 'string') return t.dimension.toLowerCase();
    if (!t.header || !t.header.subpath) return "misc";
    const header = t.header.subpath;
    if (header.includes("Emotional") && header.includes("Spiritual")) {
        if (t.text.includes("#spiritual")) return "spiritual";
        return "emotional";
    }
    const parts = header.split(" ");
    if (parts.length > 1) return parts[1].toLowerCase();
    return "misc";
}

function getStatus(t) {
    if (t.text.includes("#active")) return "active";
    if (t.text.includes("#backlog")) return "backlog";
    if (t.status && typeof t.status === 'string') return t.status.toLowerCase();
    return "backlog";
}

const activePages = dv.pages(questFolder).where(p => p.status == "active");
let activeTasks = [];
const questPage = dv.page(questFile);
if (questPage) {
    activeTasks = questPage.file.tasks.where(t => getStatus(t) == "active");
}

const dimensions = [
  "intellectual", "physical", "financial", "environmental", 
  "vocational", "social", "emotional", "spiritual"
];

const data = dimensions.map(dim => {
    let count = 0;
    // Count pages
    count += activePages.where(p => p.dimension == dim).length;
    // Count tasks
    count += activeTasks.where(t => getDimension(t) == dim).length;
    return { dim, count };
});

dv.table(["Stat", "Active Quests"],
  data.map(d => {
    const barWidth = d.count * 20; 
    const bar = `<div style="width: ${barWidth}px; height: 15px; background-color: ${d.count > 0 ? '#9c27b0' : '#444'}; border-radius: 4px;"></div>`;
    return [d.dim, `${bar} (${d.count})`];
  })
)
```

## 📅 Impending Doom (Deadlines)

```dataviewjs
const questFile = "quests.md";
const questFolder = '"quests"';

function getStatus(t) {
    if (t.text.includes("#active")) return "active";
    if (t.status && typeof t.status === 'string') return t.status.toLowerCase();
    return "backlog";
}

const activePages = dv.pages(questFolder).where(p => p.status == "active" && p.due_date);
let activeTasks = [];
const questPage = dv.page(questFile);
if (questPage) {
    activeTasks = questPage.file.tasks.where(t => getStatus(t) == "active" && t.due_date);
}

const combined = [];

activePages.forEach(p => {
    combined.push({
        name: p.file.link,
        dueDate: p.due_date,
        progress: p.progress || 0
    });
});

activeTasks.forEach(t => {
    const cleanText = t.text
        .replace(/\[[^\]]*::[^\]]*\]/g, "")
        .replace(/#\w+/g, "")
        .trim();
    combined.push({
        name: cleanText,
        dueDate: t.due_date,
        progress: t.progress || 0
    });
});

combined.sort((a, b) => a.dueDate - b.dueDate);
const top5 = combined.slice(0, 5);

dv.table(["Quest", "Doom Clock", "Progress"],
    top5.map(x => [x.name, x.dueDate, x.progress])
)
```

## 📜 Quest Backlog

*Ideas for future glory. To activate, create a file in `quests/` or tag `#active`.*

```dataviewjs
const questFile = "quests.md";
const questPage = dv.page(questFile);

if (questPage) {
    const allTasks = questPage.file.tasks;
    const backlogTasks = allTasks.where(t => {
        if (t.text.includes("#backlog")) return true;
        if (t.status && t.status.toLowerCase() === "backlog") return true;
        return false;
    });

    const groups = {};
    backlogTasks.forEach(t => {
        let header = "Misc";
        if (t.header && t.header.subpath) header = t.header.subpath;
        
        if (!groups[header]) groups[header] = [];
        
        const cleanText = t.text
            .replace(/\[[^\]]*::[^\]]*\]/g, "")
            .replace(/#\w+/g, "")
            .trim();
            
        groups[header].push(cleanText);
    });

    const sortedHeaders = Object.keys(groups).sort();
    for (const header of sortedHeaders) {
        dv.header(3, header);
        dv.list(groups[header]);
    }
    
    if (backlogTasks.length === 0) {
        dv.paragraph("No quests in the backlog. Go find some adventure!");
    }
} else {
    dv.paragraph(`⚠️ Warning: Could not find quest file: ${questFile}`);
}
```
