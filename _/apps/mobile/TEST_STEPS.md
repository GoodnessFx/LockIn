# LockIn Mobile App - Testing Steps

## Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI installed globally: `npm install -g @expo/cli`
- Expo Go app installed on your mobile device
- iOS Simulator (for iOS testing) or Android Emulator (for Android testing)

## Installation Steps

### 1. Install Dependencies
```bash
cd _/apps/mobile
npm install
```

### 2. Start the Development Server
```bash
npm start
# or
expo start
```

### 3. Run on Device/Simulator
- **iOS Simulator**: Press `i` in the terminal
- **Android Emulator**: Press `a` in the terminal
- **Physical Device**: Scan QR code with Expo Go app

## Testing Checklist

### ✅ Navigation Flow
1. **App Launch**
   - [ ] App starts without errors
   - [ ] Splash screen displays correctly
   - [ ] Onboarding screen appears (if first time)

2. **Onboarding Screen**
   - [ ] All features are displayed correctly
   - [ ] "Get Started" button works
   - [ ] LinkedIn button opens external link
   - [ ] Twitter button opens external link
   - [ ] Navigation to dashboard works

3. **Tab Navigation**
   - [ ] All 5 tabs are visible and functional
   - [ ] Tab icons display correctly
   - [ ] Tab labels are readable
   - [ ] Switching between tabs works smoothly

### ✅ Dashboard (LockIn Tab)
1. **Authentication**
   - [ ] "Get Started" button appears if not authenticated
   - [ ] Clicking "Get Started" signs in automatically
   - [ ] Dashboard content loads after authentication

2. **90-Day Sprint**
   - [ ] Countdown timer displays correctly
   - [ ] Timer updates in real-time
   - [ ] Days, hours, minutes, seconds are all visible

3. **Focus Timer**
   - [ ] Timer displays 25:00 initially
   - [ ] Start/Pause button works
   - [ ] Reset button works
   - [ ] Timer counts down correctly

4. **Progress Stats**
   - [ ] Streak counter displays
   - [ ] Goals completed counter displays
   - [ ] Weekly goal progress bar works

5. **Quick Actions**
   - [ ] Add Goal button is clickable
   - [ ] Schedule button is clickable
   - [ ] Analytics button is clickable

### ✅ LAI Tab
1. **Header**
   - [ ] Title "LAI" displays correctly
   - [ ] Subtitle "A warm space to grow in your niche" shows

2. **Assistant Message**
   - [ ] Motivational message appears
   - [ ] Message changes on app restart
   - [ ] Message styling is correct

3. **Search Bar**
   - [ ] Search input is functional
   - [ ] Placeholder text displays

4. **Quick Actions**
   - [ ] "Add Photo" button shows alert about moving to Progress
   - [ ] "Add Document" button shows alert about moving to Progress

5. **Learning Progress**
   - [ ] Course cards display correctly
   - [ ] Progress bars show correct percentages
   - [ ] Course information is readable

6. **Progress Notes**
   - [ ] Section header displays
   - [ ] Empty state shows when no notes
   - [ ] Notes persist between app sessions

### ✅ Lockmate Tab
1. **Coming Soon Design**
   - [ ] Large icon displays correctly
   - [ ] Title "Lockmate" is prominent
   - [ ] Subtitle explains the feature

2. **Feature Preview**
   - [ ] All 4 feature cards display
   - [ ] Icons and descriptions are clear
   - [ ] Professional styling is consistent

3. **Notify Me Button**
   - [ ] Button is clickable
   - [ ] Styling matches app theme

4. **Timeline Section**
   - [ ] Expected launch info displays
   - [ ] Professional appearance

### ✅ Progress Tab
1. **Header**
   - [ ] Title "Progress" displays
   - [ ] Subtitle is readable

2. **Add Document/Photo**
   - [ ] "Add Photo" button works (requests permissions)
   - [ ] "Add Document" button works
   - [ ] Files are added to the list
   - [ ] Documents display correctly

3. **Search Functionality**
   - [ ] Search bar is functional
   - [ ] Filtering works correctly

4. **Period Selector**
   - [ ] Week/Month/Year tabs work
   - [ ] Data changes based on selection

5. **Stats Grid**
   - [ ] All 4 stat cards display
   - [ ] Numbers are correct
   - [ ] Icons and colors are consistent

6. **Achievements**
   - [ ] Achievement cards display
   - [ ] Icons and descriptions are clear

7. **Goals Progress**
   - [ ] Progress bars display correctly
   - [ ] Percentages are accurate

### ✅ Profile Tab
1. **Profile Header**
   - [ ] User avatar displays
   - [ ] Name and level show correctly
   - [ ] XP progress bar works
   - [ ] Stats grid displays all 4 metrics

2. **Account Section**
   - [ ] Personal Information item works
   - [ ] Email Address item works
   - [ ] Phone Number item works

3. **Notifications Section**
   - [ ] All 4 toggle switches work
   - [ ] Settings persist between sessions

4. **Security Section**
   - [ ] Biometric toggle works
   - [ ] Two-factor toggle works
   - [ ] Privacy Policy link works
   - [ ] Terms of Service link works

5. **App Settings Section**
   - [ ] All 3 settings items are clickable

6. **Support Section**
   - [ ] Help Center link works
   - [ ] Contact Support link works
   - [ ] App version displays correctly

7. **Sign Out**
   - [ ] Sign out button works
   - [ ] Confirmation dialog appears
   - [ ] Returns to onboarding after sign out

## Error Testing

### ✅ Error Handling
1. **Network Errors**
   - [ ] App works offline
   - [ ] No crashes when network is unavailable

2. **Permission Errors**
   - [ ] Camera permission requests work
   - [ ] Document picker permissions work
   - [ ] Graceful handling of denied permissions

3. **Navigation Errors**
   - [ ] No crashes when navigating between tabs
   - [ ] Back button behavior is correct
   - [ ] Deep linking works (if applicable)

## Performance Testing

### ✅ Performance
1. **App Launch**
   - [ ] App starts within 3 seconds
   - [ ] No memory leaks on startup

2. **Navigation**
   - [ ] Tab switching is smooth (< 200ms)
   - [ ] No lag when scrolling
   - [ ] Animations are smooth

3. **Memory Usage**
   - [ ] No excessive memory usage
   - [ ] App doesn't crash after extended use

## Build Testing

### ✅ Production Build
1. **EAS Build**
   ```bash
   eas build --platform ios
   eas build --platform android
   ```

2. **Expo Publish**
   ```bash
   expo publish
   ```

3. **Local Build**
   ```bash
   expo build:ios
   expo build:android
   ```

## Known Issues
- None currently identified

## Test Results
- [ ] All navigation tests pass
- [ ] All screen rendering tests pass
- [ ] All functionality tests pass
- [ ] All error handling tests pass
- [ ] All performance tests pass
- [ ] Build process completes successfully

## Notes
- The app uses dummy authentication for testing
- All external links open in the device's default browser
- Local storage is used for persistence
- The app works completely offline
- All features are functional without external API keys

## Support
If you encounter any issues during testing:
1. Check the console logs for error messages
2. Ensure all dependencies are installed correctly
3. Try clearing the app cache and restarting
4. Check that your device/simulator meets the requirements
