from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from models import Quest, QuestCreate, QuestUpdate, Achievement, AchievementCreate
from database import db
import random
from datetime import date, datetime, timezone

app = FastAPI(title="QuestVault API")

# CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to QuestVault API"}

@app.get("/quests", response_model=List[Quest])
def get_quests():
    return db.get_quests()

@app.post("/quests", response_model=Quest)
def create_quest(quest: QuestCreate):
    new_quest = Quest(**quest.model_dump())
    return db.add_quest(new_quest)

@app.get("/quests/{quest_id}", response_model=Quest)
def get_quest(quest_id: str):
    quests = db.get_quests()
    for q in quests:
        if q['id'] == quest_id:
            return q
    raise HTTPException(status_code=404, detail="Quest not found")

@app.patch("/quests/{quest_id}", response_model=Quest)
def update_quest(quest_id: str, update_data: QuestUpdate):
    quests = db.get_quests()
    for i, q in enumerate(quests):
        if q['id'] == quest_id:
            # Update fields
            current_quest = Quest(**q)
            updated_fields = update_data.model_dump(exclude_unset=True)
            
            # Re-validate to ensure nested models are objects, not dicts
            quest_data = current_quest.model_dump()
            quest_data.update(updated_fields)
            updated_quest = Quest(**quest_data)
            
            # Check for completion
            if updated_quest.status == 'completed' and current_quest.status != 'completed':
                # Auto-generate achievement
                achievement_data = AchievementCreate(
                    title=f"Quest Complete: {updated_quest.title}",
                    context=f"Completed the quest '{updated_quest.title}'. Victory Condition: {updated_quest.victory_condition or 'Survival'}",
                    date_completed=datetime.now(timezone.utc),
                    dimension=updated_quest.dimension,
                    quest_id=updated_quest.id
                )
                create_achievement(achievement_data)

            # Save back to DB (simulated)
            quests[i] = updated_quest.model_dump(mode='json')
            db._save_data({"quests": quests, "achievements": db.get_achievements()})
            return updated_quest
            
    raise HTTPException(status_code=404, detail="Quest not found")

@app.delete("/quests/{quest_id}")
def delete_quest(quest_id: str):
    if db.delete_quest(quest_id):
        return {"message": "Quest deleted successfully"}
    raise HTTPException(status_code=404, detail="Quest not found")

@app.get("/achievements", response_model=List[Achievement])
def get_achievements():
    return db.get_achievements()

@app.post("/achievements", response_model=Achievement)
def create_achievement(achievement: AchievementCreate):
    # Simulate DCC AI Generation
    if not achievement.image_url:
        achievement.image_url = "https://source.unsplash.com/random/300x400?fantasy,card"
    
    # DCC AI Voice Mocking
    dcc_intros = [
        "NEW ACHIEVEMENT!",
        "CONGRATULATIONS, CRAWLER!",
        "OH LOOK, YOU DID SOMETHING."
    ]
    
    dcc_insults = [
        "I suppose that's adequate, for a hairless ape.",
        "Don't let it go to your head. You're still squishy.",
        "My grandmother could do that, and she's a subroutine.",
        "You want a cookie? Too bad."
    ]
    
    dcc_rewards = [
        "A Silver Loot Box (It's empty).",
        "+500 XP and a sense of impending doom.",
        "A pat on the back. Not really.",
        "The realization that this is all meaningless."
    ]

    if not achievement.ai_description:
        achievement.ai_description = f"{random.choice(dcc_intros)} You have managed to {achievement.context}. {random.choice(dcc_insults)}"
    
    if not achievement.ai_reward:
        achievement.ai_reward = random.choice(dcc_rewards)
    
    new_achievement = Achievement(**achievement.model_dump())
    return db.add_achievement(new_achievement)

@app.get("/achievements/{achievement_id}", response_model=Achievement)
def get_achievement(achievement_id: str):
    achievements = db.get_achievements()
    for a in achievements:
        if a['id'] == achievement_id:
            return a
    raise HTTPException(status_code=404, detail="Achievement not found")

@app.get("/profile")
def get_profile():
    quests = db.get_quests()
    achievements = db.get_achievements()
    completed_quests = [q for q in quests if q['status'] == 'completed']
    
    return {
        "username": "Crawler #481516",
        "level": 1 + (len(achievements) // 5),
        "stats": {
            "quests_active": len([q for q in quests if q['status'] == 'active']),
            "quests_completed": len(completed_quests),
            "achievements_unlocked": len(achievements)
        },
        "recent_achievements": achievements[-5:]
    }

@app.post("/reset")
def reset_data():
    db.clear_all_data()
    return {"message": "All data has been reset."}
