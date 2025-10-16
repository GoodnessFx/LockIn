# Contributing to LockIn

Thank you for your interest in contributing to LockIn! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- Git

### Development Setup
1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/LockIn.git`
3. Navigate to mobile app: `cd LockIn/_/apps/mobile`
4. Install dependencies: `npm install`
5. Copy environment file: `cp config/env.example .env`
6. Start development server: `npm start`

## 📋 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Write self-documenting code with clear comments

### Commit Convention
We use [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

feat(auth): add social login functionality
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
test(api): add unit tests for user service
```

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring
- `test/description` - Test additions/updates

## 🧪 Testing

### Running Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Writing Tests
- Write unit tests for business logic
- Test components with React Native Testing Library
- Include integration tests for critical flows
- Aim for >80% code coverage

### Test Structure
```
tests/
├── components/          # Component tests
├── services/           # Service tests
├── utils/              # Utility tests
├── integration/        # Integration tests
└── setup.ts           # Test setup
```

## 🏗 Architecture Guidelines

### Folder Structure
```
src/
├── app/                # Expo Router pages
├── components/         # Reusable UI components
├── hooks/              # Custom React hooks
├── services/           # Business logic
├── store/              # State management
├── utils/              # Utility functions
└── config/             # Configuration
```

### Component Guidelines
- Create components in `src/components/`
- Use TypeScript interfaces for props
- Include PropTypes or TypeScript types
- Export components as default exports
- Create index files for easy imports

### Service Guidelines
- Keep services focused and single-purpose
- Use dependency injection where possible
- Handle errors gracefully
- Include proper TypeScript types
- Write unit tests for all services

## 🐛 Bug Reports

### Before Submitting
1. Check existing issues
2. Test on latest version
3. Try to reproduce the bug
4. Gather relevant information

### Bug Report Template
```markdown
**Bug Description**
A clear description of the bug.

**Steps to Reproduce**
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g. iOS 16, Android 13]
- Device: [e.g. iPhone 14, Pixel 7]
- App Version: [e.g. 0.1.0]

**Additional Context**
Any other relevant information.
```

## ✨ Feature Requests

### Before Submitting
1. Check existing feature requests
2. Consider if it aligns with project goals
3. Think about implementation complexity
4. Consider user impact

### Feature Request Template
```markdown
**Feature Description**
A clear description of the feature.

**Use Case**
Why would this feature be useful?

**Proposed Solution**
How would you like to see this implemented?

**Alternatives Considered**
Other solutions you've considered.

**Additional Context**
Any other relevant information.
```

## 🔧 Pull Request Process

### Before Submitting
1. Create a feature branch from `main`
2. Make your changes
3. Write/update tests
4. Update documentation
5. Run linting and tests
6. Commit with conventional commits

### Pull Request Template
```markdown
## Description
Brief description of changes.

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added for new functionality
- [ ] Manual testing completed

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes (or documented)
```

### Review Process
1. Automated checks must pass
2. Code review by maintainers
3. Address feedback
4. Merge after approval

## 📚 Documentation

### Updating Documentation
- Keep README.md up to date
- Update API documentation
- Add code comments for complex logic
- Update environment variable documentation

### Documentation Standards
- Use clear, concise language
- Include code examples
- Keep formatting consistent
- Update related sections when making changes

## 🔒 Security

### Security Guidelines
- Never commit API keys or secrets
- Use environment variables for sensitive data
- Follow secure coding practices
- Report security issues privately

### Reporting Security Issues
Email security issues to: security@lockin.app

## 🎯 Project Goals

### Core Values
- User-focused design
- Performance and reliability
- Security and privacy
- Open source collaboration
- Continuous improvement

### Areas of Focus
- AI-powered learning
- User engagement
- Performance optimization
- Accessibility
- Community features

## 📞 Getting Help

### Resources
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Community
- GitHub Discussions
- Discord Server (coming soon)
- Stack Overflow (tag: lockin-app)

## 📄 License

By contributing to LockIn, you agree that your contributions will be licensed under the MIT License.

## 🙏 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

Thank you for contributing to LockIn! 🚀
