import uuid
from config.settings import settings


def generate_access_token() -> str:
    return str(uuid.uuid4())


def create_bookmark_url(space_id: str, token: str) -> str:
    return f"{settings.app_base_url}/space/{space_id}?token={token}"


def extract_excerpt(content: str, words: int = 100) -> str:
    word_list = content.split()
    if len(word_list) <= words:
        return content
    return " ".join(word_list[:words]) + "..."


def parse_story_response(response: str) -> dict:
    lines = response.strip().split("\n")
    title = ""
    content_lines = []
    
    in_content = False
    for line in lines:
        if line.startswith("TITLE:"):
            title = line.replace("TITLE:", "").strip()
        elif line.startswith("CONTENT:"):
            in_content = True
        elif in_content:
            content_lines.append(line)
    
    return {
        "title": title or "Untitled Story",
        "content": "\n".join(content_lines).strip()
    }
