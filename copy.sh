cp -R www/ ~/Desktop/CalTracky/
cp config.xml ~/Desktop/CalTracky/
cd ~/Desktop/CalTracky/
git add .
git commit -m "update" .
git push origin
cd ~/Dropbox/caltracky-loc
git add .
git commit -m "update" .
git push origin

