@echo off
REM ---------------------------------------------------------------------------
REM  Local preview for the portfolio.
REM
REM  Only needed on this computer. Opening index.html straight from disk does not
REM  work, because a file:// page is not a web server: browsers block JavaScript
REM  module imports and local file reads there. Published on GitHub Pages the
REM  site needs none of this.
REM
REM  Double-click this file, then close the window when you are done.
REM ---------------------------------------------------------------------------

setlocal
set "PORT=8000"

REM %~dp0 ends in a backslash. Left in place, the closing quote gets escaped and
REM Python receives the path as  D:\Portfolio"  — which serves nothing but 404s.
set "ROOT=%~dp0"
if "%ROOT:~-1%"=="\" set "ROOT=%ROOT:~0,-1%"

if not exist "%ROOT%\index.html" (
  echo Could not find index.html in:
  echo   %ROOT%
  echo Keep serve.bat in the same folder as index.html.
  echo.
  pause
  exit /b 1
)

where python >nul 2>nul
if errorlevel 1 (
  echo Python was not found on your PATH.
  echo Install it from https://www.python.org/downloads/ ^(tick "Add to PATH"^),
  echo or run any other static file server from this folder.
  echo.
  pause
  exit /b 1
)

echo Serving "%ROOT%"
echo   http://localhost:%PORT%
echo Press Ctrl+C to stop.
echo.

start "" "http://localhost:%PORT%"
python -m http.server %PORT% --bind 127.0.0.1 --directory "%ROOT%"

endlocal
