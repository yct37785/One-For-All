@echo off
setlocal

pushd "%~dp0"
set CLEAN_INSTALL=
call ..\..\templates\run-android-dev.bat

endlocal
pause