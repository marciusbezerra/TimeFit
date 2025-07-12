# Timefit

![Timefit Preview](readme.png)

## About

Timefit is a modern, intuitive task scheduling web application that helps you organize your time and achieve more. With its clean interface and smart time management features, you can plan your day effectively by setting task durations and automatically calculating completion times.

The application features a drag-and-drop interface, real-time time calculations, and persistent data storage to keep your schedule organized throughout your workday.

## Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with Flexbox and Grid layouts
- **Vanilla JavaScript** - Interactive functionality and DOM manipulation
- **LocalStorage API** - Client-side data persistence
- **Drag & Drop API** - Intuitive task reordering

## Features

- ✅ **Task Management** - Add, edit, delete, and mark tasks as complete
- ⏰ **Time Scheduling** - Set start times and durations with automatic end time calculation
- 🎯 **Drag & Drop** - Reorder tasks easily with mouse interaction
- 💾 **Data Persistence** - Tasks and settings are saved locally in your browser
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Updates** - Instant recalculation of schedules as you make changes
- 📋 **Bulk Import** - Paste multiple tasks at once from your clipboard

## Getting Started

### Prerequisites

No special installation required! This is a client-side web application that runs in any modern web browser.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/timefit.git
```

2. Navigate to the project directory:

```bash
cd timefit
```

3. Open `index.html` in your web browser, or serve it using a local web server:

```bash
# Using Python
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server
```

4. Visit `http://localhost:8000` in your browser

### Usage

1. **Set your start time** - Choose when you want to begin your day using the time selector
2. **Add tasks** - Type task names in the input field and click "Adicionar" or press Enter
3. **Set durations** - Use the dropdown menus to set how long each task should take (15-minute intervals)
4. **Reorder tasks** - Drag and drop tasks to rearrange your schedule
5. **Track progress** - Check off completed tasks as you finish them
6. **Monitor end time** - See your projected finish time update automatically

#### Bulk Task Import

You can paste multiple tasks at once by copying a list from any text source and pasting it into the task input field. Each line will become a separate task.

## Project Structure

```
timefit/
├── index.html          # Main HTML structure
├── style.css           # Styling and layout
├── main.js             # Application logic and interactions
├── readme.png          # Preview image
└── README.md           # Project documentation
```

## Contributing

We welcome contributions to make Timefit even better! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add some amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Development Guidelines

- Follow existing code style and conventions
- Test your changes across different browsers
- Update documentation if you add new features
- Keep commits focused and write clear commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Challenges & Future Enhancements

Ready to contribute? Here are some exciting features you could implement:

### 🚀 Enhancement Ideas

- **Theme Support** - Add dark mode and custom color themes
- **Export Features** - Generate PDF schedules or export to calendar apps
- **Time Tracking** - Add actual time tracking vs. planned time
- **Categories** - Color-code tasks by project or priority
- **Notifications** - Browser notifications for task reminders
- **Templates** - Save and reuse common daily schedules
- **Statistics** - Show productivity insights and time usage analytics
- **Collaboration** - Share schedules with team members
- **Mobile App** - Convert to a Progressive Web App (PWA)
- **Backend Integration** - Add user accounts and cloud sync

### 🐛 Known Improvements

- Add keyboard shortcuts for common actions
- Implement undo/redo functionality
- Add task priority levels
- Include break time suggestions
- Support for multi-day scheduling

## Contact

Feel free to reach out with questions, suggestions, or just to say hello!

- **Issues** - Report bugs or request features through [GitHub Issues](https://github.com/yourusername/timefit/issues)
- **Discussions** - Join conversations in [GitHub Discussions](https://github.com/yourusername/timefit/discussions)

---

**Made with ❤️ for better time management**

_Organize your time, achieve more! 🎯_
