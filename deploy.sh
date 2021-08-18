# Commit your changes
echo 'web: npm run start' > Procfile

git add .
git commit -m "Added Nuxt deployment"
git push heroku master
