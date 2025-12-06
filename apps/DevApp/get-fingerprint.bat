@echo off
setlocal

cd /d "%~dp0android"
call gradlew signingReport

endlocal
pause
