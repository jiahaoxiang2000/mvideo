# MVideo Editor Makefile
# Provides easy setup, build, clean, and run commands

# Project configuration
PROJECT_NAME = mvideo
BUILD_DIR = build
CMAKE = cmake
MAKE = make

# Build type (Debug or Release)
BUILD_TYPE ?= Release

# Number of parallel jobs
JOBS ?= $(shell nproc 2>/dev/null || echo 4)

.PHONY: all setup build clean run install uninstall help deps-check test rebuild

# Default target
all: build

## help: Show this help message
help:
	@echo "MVideo Editor - Available targets:"
	@echo ""
	@echo "  make setup      - Check dependencies and create build directory"
	@echo "  make build      - Build the project (default)"
	@echo "  make run        - Build and run the application"
	@echo "  make clean      - Remove build artifacts"
	@echo "  make rebuild    - Clean and rebuild from scratch"
	@echo "  make install    - Install the application (requires sudo)"
	@echo "  make uninstall  - Uninstall the application (requires sudo)"
	@echo "  make deps-check - Check if all dependencies are installed"
	@echo "  make help       - Show this help message"
	@echo ""
	@echo "Build options:"
	@echo "  BUILD_TYPE=[Debug|Release]  - Set build type (default: Release)"
	@echo "  JOBS=N                      - Set number of parallel jobs (default: $(JOBS))"
	@echo ""
	@echo "Examples:"
	@echo "  make BUILD_TYPE=Debug       - Build in debug mode"
	@echo "  make JOBS=8                 - Build with 8 parallel jobs"

## deps-check: Check if all required dependencies are installed
deps-check:
	@echo "Checking dependencies..."
	@command -v $(CMAKE) >/dev/null 2>&1 || { echo "CMake not found. Install with: sudo apt-get install cmake"; exit 1; }
	@command -v pkg-config >/dev/null 2>&1 || { echo "pkg-config not found. Install with: sudo apt-get install pkg-config"; exit 1; }
	@command -v g++ >/dev/null 2>&1 || { echo "g++ not found. Install with: sudo apt-get install build-essential"; exit 1; }
	@pkg-config --exists Qt6Widgets 2>/dev/null || { echo "Qt6 not found. Install with: sudo apt-get install qt6-base-dev"; exit 1; }
	@pkg-config --exists mpv 2>/dev/null || { echo "libmpv not found. Install with: sudo apt-get install libmpv-dev"; exit 1; }
	@echo "All dependencies are installed"

## setup: Create build directory and configure CMake
setup: deps-check
	@echo "Setting up build environment..."
	@mkdir -p $(BUILD_DIR)
	@cd $(BUILD_DIR) && $(CMAKE) -DCMAKE_BUILD_TYPE=$(BUILD_TYPE) ..
	@echo "Setup complete"

## build: Compile the project
build: $(BUILD_DIR)/Makefile
	@echo "Building $(PROJECT_NAME) ($(BUILD_TYPE) mode)..."
	@cd $(BUILD_DIR) && $(MAKE) -j$(JOBS)
	@echo "Build complete: $(BUILD_DIR)/$(PROJECT_NAME)"

# Ensure build directory exists and is configured
$(BUILD_DIR)/Makefile:
	@echo "Build directory not configured. Running setup..."
	@$(MAKE) setup

## run: Build and run the application
run: build
	@echo "Running $(PROJECT_NAME)..."
	@./$(BUILD_DIR)/$(PROJECT_NAME)

## clean: Remove build artifacts
clean:
	@echo "Cleaning build artifacts..."
	@rm -rf $(BUILD_DIR)
	@echo "Clean complete"

## rebuild: Clean and rebuild from scratch
rebuild: clean build

## install: Install the application system-wide
install: build
	@echo "Installing $(PROJECT_NAME)..."
	@cd $(BUILD_DIR) && sudo $(MAKE) install
	@echo "Installation complete"

## uninstall: Uninstall the application
uninstall:
	@echo "Uninstalling $(PROJECT_NAME)..."
	@cd $(BUILD_DIR) && sudo $(MAKE) uninstall 2>/dev/null || echo "Nothing to uninstall"
	@echo "Uninstall complete"
