ECHO OFF

:MENU
ECHO r - reset
ECHO c - commit
ECHO p - push
ECHO f - fetch
ECHO x - exit
ECHO.

:INPUT
SET /P M=": " 
IF %M%==r GOTO GIT_RESET
IF %M%==c GOTO GIT_COMMIT
IF %M%==p GOTO GIT_PUSH
IF %M%==f GOTO GIT_FETCH
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

:EOF
EXIT






REM OLD:
REM GIT MENU

ECHO OFF

:MENU_OLD
ECHO gc - COMMIT
ECHO gp - PUSH
ECHO gf - FETCH
ECHO gr - RESET
ECHO gi - INIT
ECHO rs - RUN
ECHO x - EXIT
ECHO.

SET /P M=": " 
IF %M%==gc GOTO COMMIT
IF %M%==gp GOTO PUSH
IF %M%==gf GOTO FETCH
IF %M%==gr GOTO RESET
IF %M%==gi GOTO INIT
IF %M%==rs GOTO RUN
IF %M%==x GOTO EOF

:COMMIT
git log --oneline
SET /P Msg="Commit: "
git add .
git commit -m "%Msg%"
ECHO.
GOTO MENU

:PUSH
git log --oneline
SET /P Msg="Commit: "
git add .
git commit -m "%Msg%"
git push --set-upstream origin master
ECHO.
GOTO MENU

:FETCH
git fetch --all
git reset --hard origin/master
ECHO.
GOTO MENU

:RESET1
git checkout --orphan temp_branch
git add .
git commit -am "start"
git branch -d master
git branch -m master
git push -f origin master
ECHO.
GOTO MENU

:INIT
git init
git add .
git commit -m "first commit"
git remote add origin https://github.com/bequietsoft/core.git
git push --set-upstream origin main
@REM npm init 
@REM npm install --save-dev nodemon
@REM npm install express
ECHO.
GOTO MENU

:RUN
npm run dev
ECHO.
GOTO MENU

:EOF