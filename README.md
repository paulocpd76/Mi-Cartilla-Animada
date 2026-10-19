# Mi Cartilla Animada – Capacitor project

## Requirements
- Node.js 20+ (https://nodejs.org)
- Android: Android Studio (https://developer.android.com/studio)
- iOS: a Mac with Xcode (App Store) and CocoaPods (`brew install cocoapods`)

## Steps
```bash
cd mi-cartilla-animada
npm install

npm run android   # creates the Android project and opens Android Studio
npm run ios       # creates the iOS project and opens Xcode
```

- Android Studio: press Run (▶) to test, or Build > Generate Signed Bundle / APK to publish.
- Xcode: choose a simulator or your iPhone, press Run (▶). To publish: Product > Archive.
  In Signing & Capabilities select your Apple Developer team.

## After editing the page
Edit `www/index.html`, then run `npm run sync` and press Run again.

## Before publishing
- Change `appId` (com.tuempresa.cartilla) and `appName` in `capacitor.config.json` to your own **before** the first `npm run android/ios`.
- Add an app icon: `npm i -D @capacitor/assets`, put a 1024x1024 `assets/icon-only.png` and run `npx capacitor-assets generate`.
- The font is bundled in `www/fonts`, so the app works fully offline.
