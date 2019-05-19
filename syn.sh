npm run build
cd dist
echo "# KiraFanCalcDist" >> README.md
git init
git add README.md
git add .
git commit -m "auto commit"
git remote add origin https://github.com/Nilcric/KiraFanCalcDist.git
git push -u origin master -f
