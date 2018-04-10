git stash -q --keep-index
./node_modules/.bin/ember test
RESULT=$?
git stash pop -q
[ $RESULT -ne 0 ] && exit 1
exit 0