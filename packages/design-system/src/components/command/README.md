# Command Launcher

## 🚀 **Clean Modern Implementation**

The command launcher features a clean, consistent design with unified text styling and no visual clutter.

## ✨ **Current Features**

### **Clean Design**
- 🎨 **Unified Text Sizing**: Consistent `text-sm` sizing across all components
- 🚫 **No Pills/Badges**: Clean display with subtle gray text indicators
- 📏 **Consistent Spacing**: Uniform `gap-3` spacing between icons and text
- 🌙 **Dark Mode Support**: Proper dark mode with optimized colors

### **Content Types**
- 📝 **Posts**: Title with category shown as gray text
- 🏗️ **Projects**: Title with subtitle, optional type indicator  
- 📄 **Publications**: Title with publication year
- 🏷️ **Tags**: Title with post count (e.g., "3 posts")
- 🔗 **Social Links**: Contact methods with consistent icons

## 📁 **File Structure**

```
components/command/
├── CmdLauncher.js           # Main launcher component
├── CmdItem.js               # Unified item renderer  
├── CmdIcon.js               # Consistent Heroicon wrapper
├── CmdLauncherFooter.js     # Footer with keyboard shortcuts
├── CmdLauncherPosts.js      # Posts page
├── CmdLauncherProjects.js   # Projects page  
├── CmdLauncherPublications.js # Publications page
├── CmdLauncherTags.js       # Tags page
├── CmdLauncherSocial.js     # Contact/social page
├── CmdLauncherSearch.js     # Search functionality
├── types/                   # Individual type components
│   ├── CmdPost.js
│   ├── CmdProject.js  
│   ├── CmdPublication.js
│   └── CmdTag.js
└── utils.js                 # Utility functions
```

## 🎨 **Design System**

### **Text Sizing**
- **Titles**: `text-sm font-medium`
- **Subtitles**: `text-xs text-gray-500 dark:text-gray-400`
- **Indicators**: `text-xs text-gray-500 dark:text-gray-400`

### **Spacing**
- **Icon-to-text**: `gap-3`
- **Component padding**: `p-3`
- **Hover effects**: Subtle scale and background changes

### **Colors**
- **Icons**: Heroicons outline style, consistent sizing
- **Text**: High contrast for readability
- **Indicators**: Subtle gray for secondary information

## 🔧 **Current Integration**

```javascript
import CommandLauncher from '@/components/command/CmdLauncher';

<CommandLauncher 
  tags={tags} 
  projects={projects} 
  posts={posts} 
  publications={publications} 
  open={launcherOpen} 
  setOpen={setLauncherOpen}
/>
```

## ✅ **Features**

- ✅ **Consistent Design**: Unified text sizing and spacing
- ✅ **Clean Display**: No visual clutter, subtle indicators  
- ✅ **Heroicons**: Consistent outline icon style
- ✅ **Accessibility**: Proper keyboard navigation
- ✅ **Mobile Support**: Responsive design

---

**Simple, clean, and consistent command launcher! 🎯**