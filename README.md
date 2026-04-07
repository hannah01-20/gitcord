# gitcord
A discord bot that manages discord threads and issues.

# Run in local
- Install the packages: `npm install`
- Run in dev mode: `npm run dev`
- Deploy commands: `npm deploy-commands` _When there are new changes in command run this so discord will be aware in changes_
## Commands
### Initialize the bot
When gitcord was added to your server, we encourage to run the initialization command this will make gitcord create a pinned message for **GITCORD CONFIGURATION** that has settings which you can modify its value later on.
```
/gitcord init
```

### Configuration
A settings which you can change, as for now there is only one setting:
- `alwaysJoinThreads` People will be added to this property will be join the threads by default, this will make people to be aware about the thread.
#### gitcord config
```
/gitcord config always-join-threads [action] [user]
```
You can also remove a user.

### Issue
Issue is a piece of task that to be executed, when issue was added there will be created thread for it so users are freely to discuss the task.
- Threads name will always have prefix on their name, this will tell the status of the issue at first glance.
Some of the prefix are:
-- open `open: add button`
-- review `review: fix elements alignment`
-- develop `develop: add home page`
-- rework `rework: mobile UI behavior`
-- done `done: change label`

#### gitcord issue
```
/gitcord issue add [issue-name] [assignee]
/gitcord issue review - In thread
/gitcord issue develop - In thread
/gitcord issue rework - In thread
/gitcord issue done - In thread
```

### Help
List of commands with short description
#### gitcord help
```
/gitcord help
```