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


#pgb login
pgb unlock ios 1082720
pgb unlock android 390090
pgb build 2834269

pgb download 2834269 ios
pgb download 2834269 android

#xcodebuild  -UseModernBuildSystem=NO -workspace platforms/ios/CalTracky.xcworkspace/ -scheme "CalTracky" -destination generic/platform=iOS build archive
#ios-deploy --bundle /Users/rainbat/Library/Developer/Xcode/DerivedData/CalTracky-gkfgmoaprtzowqghppsgomcklesk/Build/Products/Debug-iphoneos/CalTracky.app --no-wifi
#https://medium.com/xcblog/xcodebuild-deploy-ios-app-from-command-line-c6defff0d8b8
#xcodebuild  -UseModernBuildSystem=NO -workspace platforms/ios/CalTracky.xcworkspace/ -scheme "CalTracky" -destination generic/platform=iOS build
#xcodebuild  -workspace platforms/ios/CalTracky.xcworkspace/ -scheme "CalTracky" -configuration Release clean archive -UseModernBuildSystem=NO -archivePath platforms/ios/CalTracky.xcworkspace/
#/Applications/Xcode.app/Contents/Applications/Application\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Support/altool --upload-app -f ~/Library/Developer/Xcode/DerivedData/CalTracky-gkfgmoaprtzowqghppsgomcklesk/Build/Products/Debug-iphoneos/ -u "info@rainbat.ch" -p "eqyd-grgm-evwp-ywaa"
#xcodebuild  -UseModernBuildSystem=NO -workspace platforms/ios/CalTracky.xcworkspace/ -scheme "CalTracky" -sdk iphoneos -configuration AppStoreDistribution archive -archivePath $PWD/build/CLI.xcarchive



