ECHO OFF

:MENU
ECHO.
ECHO r - reset
ECHO c - commit
ECHO p - push
ECHO f - fetch
ECHO t - test
ECHO s - start
ECHO x - exit
ECHO.

:INPUT
SET /P M=": " 
IF %M%==r GOTO GIT_RESET
IF %M%==c GOTO GIT_COMMIT
IF %M%==p GOTO GIT_PUSH
IF %M%==f GOTO GIT_FETCH
IF %M%==t GOTO NODE_TEST
IF %M%==s GOTO NODE_START
IF %M%==x GOTO EOF
GOTO :INPUT

:GIT_RESET
rmdir .git
git log --oneline
git init
git add .
git commit --message "first commit"
git remote add origin http://github.com/bequietsoft/core.git
git show-ref
git remote
git push -f -u origin master
ECHO.
GOTO :MENU

:GIT_COMMIT
git log --oneline
SET /P Msg="commit: "
git add .
git commit -m "%Msg%"
ECHO.
GOTO :MENU

:GIT_PUSH
git log --oneline
git push -f origin master
ECHO.
GOTO :MENU

:GIT_FETCH
git log --oneline
git fetch --all
git reset --hard origin/master
ECHO.
GOTO :MENU

:NODE_TEST
npm test
ECHO.
GOTO :MENU

:NODE_START
npm start
ECHO.
GOTO :MENU

:EOF