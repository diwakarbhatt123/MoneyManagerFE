Steps to get this app up and running.
1. Inside the root of application execute npm install
2. npm install -g react-native-cli
3. Download android studio.
4. Create a emulator device and start it.
5. Go to root of application and run react-native start.
6. If you get an error like Error: ENOSPC: System limit for number of file watchers reached follow the next step else move to step 8.
7. echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p && sysctl --system
8. The app will be installed on the emulator and will be started. You can make code changes which will be reflected in the applicaton in real time.