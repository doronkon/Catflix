# Step 1: Start from an official C++ image with build tools
FROM gcc:latest

# Step 2: Set the working directory to the root of your project
WORKDIR /Catflix

# Step 3: Copy the entire project into the container
COPY . /Catflix

# Step 4: Install necessary dependencies (including CMake, build-essential, and Git)
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    && rm -rf /var/lib/apt/lists/*

# Step 5: Build the project using CMake (This includes both your app and tests)
RUN cmake -S . -B /Catflix/build && cmake --build /Catflix/build

# Step 6: Ensure the app binary and test binaries are executable
RUN chmod +x /Catflix/build/runTests /Catflix/build/Catflix_app

# Step 7: Set the entrypoint to allow running tests or the app
ENTRYPOINT ["sh", "-c"]

# Step 8: Default to running tests first, if available; otherwise, run the app
CMD ["/Catflix/build/runTests || /Catflix/build/Catflix_app"]
