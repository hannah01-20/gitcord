# Gitcord 🤖

A Discord bot that manages **threads** and **issues** seamlessly.

---

## 🚀 Run Locally

1. Install dependencies

   ```bash
   npm install
   ```

2. Run in development mode

   ```bash
   npm run dev
   ```

3. Deploy slash commands

   ```bash
   npm run deploy-commands
   ```

> ℹ️ Run `deploy-commands` whenever command changes are made so Discord updates the command schema.

---

## 📌 Commands

### 🔧 Initialize the Bot

After adding **Gitcord** to your server, run the initialization command.

This creates a pinned message titled **GITCORD CONFIGURATION** where you can adjust settings based on your needs.

```bash
/gitcord init
```

---

### ⚙️ Configuration

Currently supported configuration options:

#### 1. `alwaysJoinThreads`

Automatically adds users to created threads so they stay informed.

```bash
/gitcord config always-join-threads [action] [user]
```

---

#### 2. `statusList`

Defines the available statuses for issues.

The selected status is automatically added as a **prefix** to the thread name.

```bash
/gitcord config status-list [action] [status-name] [is-default]
```

> 💡 To rename a status:
>
> 1. Remove the existing status
> 2. Add a new one with the updated name
>
> We know… not the ideal rename experience 🙂

**Parameter notes**

| Parameter   | Description                   |
| ----------- | ----------------------------- |
| action      | add or remove                 |
| status-name | name of the issue status      |
| is-default  | default status for new issues |

> ℹ️ If action is `remove`, the `is-default` value is ignored.

---

## 🧩 Issue System

An **Issue** represents a task that needs to be completed.

When an issue is created:

* A **thread** is automatically generated
* Users can discuss the task inside the thread
* Thread names always include a **status prefix**

Example:

```
open: Fix login bug
```

---

### 📝 Issue Commands

#### Create Issue

Run inside a channel:

```bash
/gitcord issue add [issue-name] [assignee]
```

---

#### Update Issue Status

Run inside the issue thread:

```bash
/gitcord issue set [status]
```

---

## ❓ Help Command

Displays all available commands with short descriptions.

```bash
/gitcord help
```

---

## ✨ Features Overview

* Automatic thread creation from issues
* Configurable issue statuses
* Default status assignment
* User auto-join thread option
* Clean command structure
* Discord-native workflow

---

## 📎 Notes

* Commands must be redeployed after modification.
* Status prefixes help quickly identify issue progress.
* Configuration is stored per server.

---

## 🛠 Future Improvements

* Rename status directly
* GitHub issue integration
* PR notifications
* Web dashboard
* Role-based permissions
