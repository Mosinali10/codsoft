# Movie Dataset

This directory contains the movie dataset in JSON format for the client-side recommendation system.

## Generating the JSON file

To convert the server-side movies.js to client-side movies.json, run:

```bash
cd client/src/data
node generate-json.js
```

Or from the project root:

```bash
cd codsoft-web
node convert-movies.js
```

Or using Python:

```bash
cd codsoft-web
python create-json.py
```

## Dataset Structure

Each movie object contains:
- `title`: Movie title (string)
- `genre`: Genre category (string)
- `year`: Release year (number)
- `keywords`: Array of thematic keywords (array of strings)

## Total Movies

The dataset contains 300+ movies across 10 genres.
