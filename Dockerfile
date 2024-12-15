# Step 1: Start from an official C++ image with build tools
FROM gcc:latest

# Step 2: Set the working directory to the root of your project
WORKDIR /Catflix

# Step 3: Copy the entire project into the container
COPY . /Catflix

# Step 4: Install necessary dependencies (CMake, build-essential, Git, and Python)
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    && rm -rf /var/lib/apt/lists/*

# Step 5: Build the project using CMake (ensure to generate and build the project)
RUN cmake -S . -B /Catflix/build && cmake --build /Catflix/build

# Step 6: Ensure the Catflix_app binary is executable
RUN chmod +x /Catflix/build/Catflix_app

# Step 7: Set the entrypoint to the compiled server binary
ENTRYPOINT ["/Catflix/build/Catflix_app"]

# Step 8: Set the command for the server to listen on a port (default args can be overwritten)
CMD ["127.0.0.1", "7071"]
