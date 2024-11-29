# Compiler and flags
CXX = g++
CXXFLAGS = -std=c++11 -Wall

# Source files
SRC = main.cpp App.cpp User.cpp Movie.cpp util.cpp HelpCommand.cpp

# Output executable
OUTPUT = Catflix.out

# Rule to build the executable
$(OUTPUT): $(SRC)
	$(CXX) $(CXXFLAGS) $(SRC) -o $(OUTPUT)

# Clean up generated files
clean:
	rm -f $(OUTPUT) *.o
