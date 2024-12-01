# Use a more recent Ubuntu base image
FROM ubuntu:22.04

# Install GCC, make, and other build tools
RUN apt-get update && apt-get install -y \
    g++ \
    make \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Copy only necessary files into the container
COPY Makefile ./
COPY src ./src
COPY bin ./bin

# Exclude .git, .DS_Store, and data directory
COPY .gitignore ./

# Create a volume for runtime data
VOLUME ["/app/data"]

# Run make to build the project
RUN make

# Set the binary as the default command
CMD ["./bin/catflix"]
