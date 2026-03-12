#!/usr/bin/env python3
import json
import re

# Read the JavaScript file
with open('server/data/movies.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the array content
match = re.search(r'const movies = \[(.*?)\];', content, re.DOTALL)
if not match:
    print("Could not find movies array")
    exit(1)

array_content = match.group(1)

# Parse movie objects
movies = []
movie_pattern = r'\{\s*title:\s*"([^"]+)",\s*genre:\s*"([^"]+)",\s*year:\s*(\d+),\s*keywords:\s*\[(.*?)\]\s*\}'

for match in re.finditer(movie_pattern, array_content):
    title = match.group(1)
    genre = match.group(2)
    year = int(match.group(3))
    keywords_str = match.group(4)
    
    # Parse keywords
    keywords = [kw.strip().strip('"') for kw in keywords_str.split(',')]
    
    movies.append({
        "title": title,
        "genre": genre,
        "year": year,
        "keywords": keywords
    })

# Write to JSON
with open('client/src/data/movies.json', 'w', encoding='utf-8') as f:
    json.dump(movies, f, indent=2, ensure_ascii=False)

print(f"✅ Successfully converted {len(movies)} movies to JSON!")
print(f"📁 File saved to: client/src/data/movies.json")
