rm *.apk
rm *.ipa

#cp config.xml www/
#cordova-gen-icon
#cordova-gen-icon -a

cp -R www/ ~/Dropbox/CalTracky/
cp config.xml ~/Dropbox/CalTracky/
cp -R res ~/Dropbox/CalTracky/
cd ~/Dropbox/CalTracky/

git add .
git commit -m "update" .
git push origin
cd ~/Dropbox/caltracky-loc
git add .
git commit -m "update" .
git push origin

#pgb login
#pgb unlock ios 1082720
#pgb unlock android 390090
#pgb update 2834269
#pgb build 2834269

#pgb download 2834269 ios CalTracky.ipa
#pgb download 2834269 android CalTracky.apk

#/Applications/Xcode.app/Contents/Applications/Application\ Loader.app/Contents/Frameworks/ITunesSoftwareService.framework/Support/altool --upload-app -f CalTracky.ipa -u info@rainbat.ch -peqyd-grgm-evwp-ywaa

#xcodebuild  -UseModernBuildSystem=NO -workspace platforms/ios/CalTracky.xcworkspace/ -scheme "CalTracky" -destination generic/platform=iOS build archive
#ios-deploy --bundle /Users/rainbat/Library/Developer/Xcode/DerivedData/CalTracky-gkfgmoaprtzowqghppsgomcklesk/Build/Products/Debug-iphoneos/CalTracky.app --no-wifi



