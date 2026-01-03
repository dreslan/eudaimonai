import json
import os
from typing import List, Dict, Any
from models import Quest, Achievement

DB_FILE = "local_db.json"

class LocalDatabase:
    def __init__(self):
        self.db_path = os.path.join(os.path.dirname(__file__), DB_FILE)
        self._ensure_db()

    def _ensure_db(self):
        if not os.path.exists(self.db_path):
            self._save_data({"quests": [], "achievements": []})

    def _load_data(self) -> Dict[str, Any]:
        with open(self.db_path, "r") as f:
            return json.load(f)

    def _save_data(self, data: Dict[str, Any]):
        with open(self.db_path, "w") as f:
            json.dump(data, f, indent=4, default=str)

    def get_quests(self) -> List[Dict]:
        data = self._load_data()
        return data.get("quests", [])

    def add_quest(self, quest: Quest):
        data = self._load_data()
        # Convert model to dict, handling datetime serialization if needed
        # Pydantic's model_dump(mode='json') handles this well in v2, 
        # but for simplicity we'll rely on the default=str in json.dump for now 
        # or convert explicitly.
        quest_dict = quest.model_dump(mode='json')
        data["quests"].append(quest_dict)
        self._save_data(data)
        return quest

    def get_achievements(self) -> List[Dict]:
        data = self._load_data()
        return data.get("achievements", [])

    def add_achievement(self, achievement: Achievement):
        data = self._load_data()
        ach_dict = achievement.model_dump(mode='json')
        data["achievements"].append(ach_dict)
        self._save_data(data)
        return achievement

    def delete_quest(self, quest_id: str) -> bool:
        data = self._load_data()
        initial_len = len(data["quests"])
        data["quests"] = [q for q in data["quests"] if q["id"] != quest_id]
        if len(data["quests"]) < initial_len:
            self._save_data(data)
            return True
        return False

    def clear_all_data(self):
        self._save_data({"quests": [], "achievements": []})

db = LocalDatabase()
