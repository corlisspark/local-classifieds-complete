# 🛠️ VS Code Setup Guide

This guide helps you set up VS Code for optimal development experience with the Local Classifieds project.

## 🚀 Quick Setup

1. **Install VS Code Extensions**:
   - Open VS Code in the project directory
   - VS Code will prompt you to install recommended extensions
   - Click "Install All" to install all recommended extensions

2. **Automatic Configuration**:
   - The project includes `.vscode/settings.json` with optimal settings
   - Extensions are configured in `.vscode/extensions.json`
   - Tasks are defined in `.vscode/tasks.json`

## 📦 Recommended Extensions

### Essential Extensions

- **Prettier** (`esbenp.prettier-vscode`) - Code formatting
- **ESLint** (`dbaeumer.vscode-eslint`) - Code linting
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) - TailwindCSS support
- **TypeScript** (`ms-vscode.vscode-typescript-next`) - TypeScript support
- **Prisma** (`prisma.prisma`) - Database ORM support
- **JSON** (`ms-vscode.vscode-json`) - JSON support

### Documentation Extensions

- **Auto Open Markdown Preview** (`hnw.vscode-auto-open-markdown-preview`) - Auto-open markdown preview

## ⚙️ VS Code Settings

The project includes optimized settings in `.vscode/settings.json`:

### Code Quality

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  }
}
```

### Workspace Configuration

```json
{
  "eslint.workingDirectories": ["apps/api", "apps/frontend"],
  "typescript.preferences.includePackageJsonAutoImports": "on"
}
```

### Markdown Preview

```json
{
  "autoOpenPreviewPanel.openPreviewToTheSide": true,
  "autoOpenPreviewPanel.languages": "markdown"
}
```

## 🎯 Features Enabled

### 1. **Auto-Open Markdown Preview**

- Automatically opens markdown preview when you open `.md` files
- Preview opens to the side for easy editing
- Perfect for viewing documentation while coding

### 2. **Enhanced Markdown Experience**

- Auto-open preview for better documentation viewing
- Side-by-side editing and preview
- Optimized for documentation workflow

### 3. **Integrated Tasks**

- Run common commands via VS Code Command Palette
- Tasks defined in `.vscode/tasks.json`
- Access via `Ctrl+Shift+P` → "Tasks: Run Task"

### 4. **Code Quality Integration**

- ESLint errors shown inline (unified configuration)
- Prettier formatting on save
- TypeScript error checking with path aliases
- TailwindCSS IntelliSense
- Auto-imports for workspace packages (`@services/*`, `@frontend/*`)

## 🎮 Available Tasks

Access via `Ctrl+Shift+P` → "Tasks: Run Task":

- **dev** - Start development environment
- **build** - Build all applications
- **lint** - Run linting
- **format** - Format code
- **test** - Run tests
- **docker** - Docker operations

## 🔧 Manual Extension Installation

If automatic installation doesn't work:

```bash
# Install extensions via command line
code --install-extension esbenp.prettier-vscode
code --install-extension dbaeumer.vscode-eslint
code --install-extension bradlc.vscode-tailwindcss
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension prisma.prisma
code --install-extension ms-vscode.vscode-json
code --install-extension hnw.vscode-auto-open-markdown-preview
```

## 🎨 Customization

### Keyboard Shortcuts

Add to your `keybindings.json`:

```json
[
  {
    "key": "ctrl+shift+d",
    "command": "workbench.action.tasks.runTask",
    "args": "dev"
  },
  {
    "key": "ctrl+shift+s",
    "command": "workbench.action.tasks.runTask",
    "args": "stop"
  }
]
```

### Additional Settings

Add to your user `settings.json`:

```json
{
  "markdown.preview.breaks": true,
  "markdown.preview.linkify": true,
  "files.associations": {
    "*.md": "markdown"
  }
}
```

## 🐛 Troubleshooting

### Extensions Not Installing

1. Check VS Code version (requires 1.60+)
2. Restart VS Code
3. Check internet connection
4. Try manual installation

### Markdown Preview Not Opening

1. Ensure `hnw.vscode-auto-open-markdown-preview` is installed
2. Check settings in `.vscode/settings.json`
3. Restart VS Code
4. Try opening a markdown file manually

### Terminal Commands Not Working

1. Ensure terminal is open (`Ctrl+`` `)
2. Check if command links are properly formatted
3. Verify VS Code version supports command protocol

### Code Quality Issues

1. Check if extensions are enabled
2. Verify workspace settings
3. Run `npm install` to ensure dependencies
4. Check ESLint/Prettier configuration

## 🎯 Pro Tips

### 1. **Split View for Documentation**

- Open markdown files with auto-preview
- Edit on left, preview on right
- Perfect for documentation work

### 2. **Quick Command Execution**

- Use VS Code tasks for common commands
- No need to remember npm commands
- Commands run in integrated terminal

### 3. **Integrated Development**

- All tools work together seamlessly
- Code quality enforced automatically
- Consistent formatting across team

### 4. **Task Integration**

- Use Command Palette for common tasks
- No need to remember npm commands
- Visual task runner interface

## 📚 Additional Resources

- [VS Code Documentation](https://code.visualstudio.com/docs)
- [Extension Marketplace](https://marketplace.visualstudio.com/)
- [Keyboard Shortcuts](https://code.visualstudio.com/docs/getstarted/keybindings)

---

**Happy coding with VS Code! 🎉**
