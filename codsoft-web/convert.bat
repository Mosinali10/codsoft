@echo off
echo Converting movies.js to movies.json...
echo.

cd /d "%~dp0"

if exist "server\data\movies.js" (
    echo Found movies.js
    node convert-movies.js
    if %ERRORLEVEL% EQU 0 (
        echo.
        echo SUCCESS! Movies converted to JSON
        echo File location: client\src\data\movies.json
        echo.
        echo You can now use the Movie Recommender with the full dataset!
    ) else (
        echo.
        echo ERROR: Conversion failed
        echo Please check that Node.js is installed
    )
) else (
    echo ERROR: Cannot find server\data\movies.js
    echo Please run this script from the codsoft-web directory
)

echo.
pause
