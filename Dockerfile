# Step 1: Start from an official C++ image with build tools
FROM gcc:latest

# Step 2: Set the working directory to the root of your project
WORKDIR /Catflix

# Step 3: Copy the entire project into the container
COPY . /Catflix

# Step 4: Install necessary dependencies and gtest development libraries
RUN apt-get update && apt-get install -y \
    build-essential \
    cmake \
    git \
    wget \
    unzip \
    libgtest-dev \
    && rm -rf /var/lib/apt/lists/*

# Step 4.1: Build GoogleTest (required for gtest/gtest.h includes)
RUN cd /usr/src/gtest && \
    cmake CMakeLists.txt && \
    make && \
    cp lib/*.a /usr/lib

# Step 5: Build the main server project using CMake
RUN cmake -S . -B /Catflix/build && cmake --build /Catflix/build

# Step 6: Ensure the Catflix_app binary is executable
RUN chmod +x /Catflix/build/Catflix_app


# Step 7: Set the entrypoint for the main server
ENTRYPOINT ["/Catflix/build/Catflix_app"]

# Step 8: Default command for the server to listen on a port
CMD ["127.0.0.1", "7071", "/Catflix/build/Catflix_app"]