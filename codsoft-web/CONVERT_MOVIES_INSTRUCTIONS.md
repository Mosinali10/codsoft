# Convert Movies to JSON - Instructions

## Problem
The movies.json file needs to be created from the server-side movies.js file, but there are path issues preventing automatic conversion.

## Solution - Manual Conversion

### Option 1: Using Node.js (Recommended)

1. Open a terminal/command prompt
2. Navigate to the codsoft-web directory:
   ```bash
   cd codsoft-web
   ```

3. Run the conversion script:
   ```bash
   node convert-movies.js
   ```

This will create `client/src/data/movies.json` with all 300+ movies.

### Option 2: Using Python

1. Open a terminal/command prompt
2. Navigate to the codsoft-web directory:
   ```bash
   cd codsoft-web
   ```

3. Run the Python script:
   ```bash
   python create-json.py
   ```

### Option 3: From the data directory

1. Navigate to the data directory:
   ```bash
   cd codsoft-web/client/src/data
   ```

2. Run the generator:
   ```bash
   node generate-json.js
   ```

### Option 4: Manual Copy-Paste

If scripts don't work, you can manually:

1. Open `codsoft-web/server/data/movies.js`
2. Copy the entire `movies` array (everything between `const movies = [` and `];`)
3. Create a new file `codsoft-web/client/src/data/movies.json`
4. Paste the array and format it as valid JSON:
   - Remove `const movies = ` from the beginning
   - Remove `module.exports = movies;` from the end
   - Ensure proper JSON formatting (double quotes, no trailing commas)

## Verification

After conversion, check that:
1. File exists at `codsoft-web/client/src/data/movies.json`
2. File contains 300+ movie objects
3. Each movie has: title, genre, year, keywords
4. JSON is valid (no syntax errors)

## Testing

1. Refresh the browser (http://localhost:5173)
2. Go to the Movies tab
3. Try searching for movies from different genres:
   - "Inception" (Sci-Fi)
   - "The Dark Knight" (Action)
   - "The Godfather" (Crime)
   - "Toy Story" (Animation)
   - "Titanic" (Romance)

All searches should now work with the full dataset!

## Troubleshooting

### "Cannot find module" error
- Make sure you're in the correct directory
- Check that `server/data/movies.js` exists

### "Permission denied" error
- Run terminal as administrator (Windows)
- Use `sudo` on Mac/Linux

### Path with spaces error
- Use quotes around paths: `cd "path with spaces"`
- Or use the short path name on Windows

### Still not working?
The system will work with just the 50 Sci-Fi movies currently in the JSON file, but for the full experience, the conversion needs to be completed manually using one of the methods above.
