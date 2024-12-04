cmake_minimum_required(VERSION 3.10)

project(running_tests)

set(CMAKE_CXX_STANDARD 11)

include(FetchContent)
FetchContent_Declare(
    googletest
    URL https://github.com/google/googletest/archive/refs/tags/release-1.11.0.zip
)

# Force shared CRT for Windows compatibility, but ensure it's defined only for the build
set(gtest_force_shared_crt ON CACHE BOOL "" FORCE)

# Make the googletest available in your project
FetchContent_MakeAvailable(googletest)

# Add the test executable (exclude main.cpp from tests)
add_executable(runTests
    src/tests/test.cpp
    src/Objects/User.cpp
    src/Objects/Movie.cpp
    src/Objects/util.cpp
)

# Link gtest and gtest_main to the test executable
target_link_libraries(runTests gtest gtest_main)

# Include directories for gtest headers and your source directories
target_include_directories(runTests PRIVATE 
    ${gtest_SOURCE_DIR}/googletest/include
    ${gtest_SOURCE_DIR}/googlemock/include
    src/Headers
    src/Commands
    src/Objects
    src/tests
)

# Add the main app executable (correct path to main.cpp)
add_executable(Catflix_app 
    src/Objects/main.cpp 
    src/Objects/User.cpp
    src/Objects/Movie.cpp
    src/Objects/util.cpp
    src/Objects/App.cpp
    src/Commands/HelpCommand.cpp    # Add HelpCommand.cpp
    src/Commands/AddCommand.cpp     # Add AddCommand.cpp
    src/Commands/RecommendCommand.cpp # Add RecommendCommand.cpp
)

# Include directories for your app
target_include_directories(Catflix_app PRIVATE 
    src/Headers
    src/Commands
    src/Objects
)

# Optionally, add this if you want to install or specify the C++ standard location
set(CMAKE_INSTALL_PREFIX ${PROJECT_BINARY_DIR}/install)
