import sqlite3
import os

DB_FILE = "app/backend/questvault.db"

def migrate():
    if not os.path.exists(DB_FILE):
        print("Database file not found. Skipping migration.")
        return

    conn = sqlite3.connect(DB_FILE)
    cursor = conn.cursor()

    try:
        # Check if column exists
        cursor.execute("PRAGMA table_info(quests)")
        columns = [info[1] for info in cursor.fetchall()]
        
        if "due_date" not in columns:
            print("Adding due_date column to quests table...")
            cursor.execute("ALTER TABLE quests ADD COLUMN due_date DATETIME")
            conn.commit()
            print("Migration successful.")
        else:
            print("due_date column already exists.")
            
    except Exception as e:
        print(f"Migration failed: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    migrate()
