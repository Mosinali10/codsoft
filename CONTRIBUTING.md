# Contributing to CodSoft Projects

Thank you for your interest in contributing to this project! This document provides guidelines for contributing to the repository.

## 🤝 How to Contribute

### Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists in the Issues section
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce (for bugs)
   - Expected vs actual behavior
   - Screenshots if applicable

### Suggesting Enhancements

We welcome suggestions for improvements:

1. Open an issue with the "enhancement" label
2. Describe the feature and its benefits
3. Provide examples if possible

### Code Contributions

#### Getting Started

1. **Fork the repository**
   ```bash
   git clone https://github.com/yourusername/codsoft.git
   cd codsoft
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments where necessary
   - Update documentation

4. **Test your changes**
   - Ensure all existing functionality still works
   - Test new features thoroughly

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add: brief description of changes"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description of changes
   - Reference any related issues

## 📝 Code Style Guidelines

### Python Projects

- Follow PEP 8 style guide
- Use meaningful variable names
- Add docstrings to functions
- Keep functions focused and small
- Use type hints where appropriate

Example:
```python
def celsius_to_fahrenheit(celsius: float) -> float:
    """Convert Celsius to Fahrenheit.
    
    Args:
        celsius: Temperature in Celsius
        
    Returns:
        Temperature in Fahrenheit
    """
    return (celsius * 9/5) + 32
```

### C Projects

- Use consistent indentation (4 spaces)
- Add comments for complex logic
- Use meaningful function and variable names
- Follow K&R or Allman brace style consistently
- Free allocated memory properly

Example:
```c
/**
 * Convert Celsius to Fahrenheit
 * @param celsius Temperature in Celsius
 * @return Temperature in Fahrenheit
 */
float celsius_to_fahrenheit(float celsius) {
    return (celsius * 9.0 / 5.0) + 32.0;
}
```

## 🧪 Testing

- Test all code paths
- Include edge cases
- Verify error handling
- Test on multiple platforms if possible

## 📚 Documentation

When adding features:

- Update the relevant README.md
- Add code comments
- Update examples if needed
- Document any new dependencies

## 🎯 Project-Specific Guidelines

### Movie Recommendation System
- Ensure dataset compatibility
- Test with various movie inputs
- Validate similarity calculations

### Temperature Converter
- Test with extreme values
- Verify formula accuracy
- Check input validation

### Tic Tac Toe Game
- Verify AI logic correctness
- Test all win conditions
- Ensure no memory leaks

### Chatbot
- Test all conversation flows
- Verify quiz logic
- Check calculator edge cases

## ✅ Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Commit messages are clear
- [ ] No unnecessary files included
- [ ] Changes are focused and atomic

## 🚫 What Not to Do

- Don't submit PRs with unrelated changes
- Don't include compiled binaries
- Don't add large files without discussion
- Don't break existing functionality
- Don't ignore code style guidelines

## 📞 Questions?

If you have questions:

- Open an issue for discussion
- Check existing issues and PRs
- Review project documentation

## 🙏 Thank You!

Your contributions help make this project better for everyone. We appreciate your time and effort!

---

*Happy Coding!* 💻
