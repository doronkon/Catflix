# Compiler and flags
CXX = g++
CXXFLAGS = -std=c++11 -Wall

# Source files
SRC = App.cpp main.cpp User.cpp Movie.cpp Help.cpp RecommendCommand.cpp

# Output executable
OUTPUT = Catflix.out

# Rule to build the executable
$(OUTPUT): $(SRC)
	$(CXX) $(CXXFLAGS) $(SRC) -o $(OUTPUT)

# Clean up generated files
clean:
	rm -f $(OUTPUT) *.o
