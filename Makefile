# Compiler and flags
CXX = g++
CXXFLAGS = -Wall -Wextra -std=c++17 -I./src/Headers

# Directories
SRC_DIR = src
OBJ_DIR = obj
BIN_DIR = bin

# Target executable
TARGET = $(BIN_DIR)/catflix

# Source and object files
SRCS := $(shell find $(SRC_DIR) -name '*.cpp')
OBJS := $(patsubst $(SRC_DIR)/%.cpp, $(OBJ_DIR)/%.o, $(SRCS))

# Debugging info - Print source and object files
$(info Source files: $(SRCS))
$(info Object files: $(OBJS))

# Rules
all: $(TARGET)

$(TARGET): $(OBJS) | $(BIN_DIR)
	$(CXX) $(CXXFLAGS) -o $@ $^

$(OBJ_DIR)/%.o: $(SRC_DIR)/%.cpp
	@mkdir -p $(@D)  # Ensure subdirectories are created
	$(CXX) $(CXXFLAGS) -c $< -o $@

$(BIN_DIR):
	@mkdir -p $(BIN_DIR)

clean:
	rm -rf $(OBJ_DIR) $(BIN_DIR)

.PHONY: all clean
