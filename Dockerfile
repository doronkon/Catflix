# Step 1: Start from an official C++ image with build tools
FROM gcc:latest

# Step 2: Set the working directory
WORKDIR /Catflix

# Step 3: Copy the entire project into the container
COPY . /Catflix

# Step 2: Set the working directory
WORKDIR /Catflix/src

# Step 4: Install necessary dependencies (if any)
RUN apt-get update && apt-get install -y \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Step 5: Compile the C++ code using g++ (adjust this as needed)
# This assumes you want to compile all .cpp files in the src directory
RUN g++ \
-I /Catflix/src/Commands \        
-I /Catflix/src/Headers \
-I /Catflix/src/Objects \        
-o /Catflix/src/Catflix_app $(find /Catflix/src -name "*.cpp") 

# # # Step 6: Run the compiled application
CMD ["/Catflix/src/Catflix_app"]

# How To run this file
# 1. Open a terminal on a computer where docker is installed
# 2. Run the command: (inside <>)
#   <docker build -t netflix-app .>
# 3. Run the command: (inside <>)
#   <docker run -it netflix-app>
