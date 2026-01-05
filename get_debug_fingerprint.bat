@echo off
setlocal

REM ==================================================
REM Debug keystore (Android default)
REM ==================================================
set "DEBUG_KEYSTORE=%USERPROFILE%\.android\debug.keystore"

if exist "%DEBUG_KEYSTORE%" (
  echo DEBUG_KEYSTORE="%DEBUG_KEYSTORE%"
) else (
  echo DEBUG_KEYSTORE NOT EXIST
  echo.
  pause
  exit /b 1
)

echo.

REM ==================================================
REM keytool detection
REM ==================================================
set "KEYTOOL="

where keytool >nul 2>&1 && set "KEYTOOL=keytool"

if "%KEYTOOL%"=="" if exist "C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" (
  set "KEYTOOL=C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe"
)

if "%KEYTOOL%"=="" if exist "C:\Program Files (x86)\Android\Android Studio\jbr\bin\keytool.exe" (
  set "KEYTOOL=C:\Program Files (x86)\Android\Android Studio\jbr\bin\keytool.exe"
)

if "%KEYTOOL%"=="" (
  echo KEYTOOL NOT EXIST
  echo.
  pause
  exit /b 1
) else (
  echo KEYTOOL="%KEYTOOL%"
)

echo.

REM ==================================================
REM Print ONLY the SHA1 line for the debug key
REM Default debug alias + passwords:
REM   alias:      androiddebugkey
REM   storepass:  android
REM   keypass:    android
REM ==================================================
"%KEYTOOL%" -list -v ^
  -keystore "%DEBUG_KEYSTORE%" ^
  -alias androiddebugkey ^
  -storepass android ^
  -keypass android ^
  | findstr /C:"SHA1:"

echo.
pause
endlocal
