#!/bin/bash
echo
# Check if node_modules folder exists
if [ ! -d "node_modules" ]; then
  echo "The node_modules folder not found. Installing dependencies..."
  echo
  npm ci
else
  echo "The node_modules folder exists. Skipping installation."
  echo
fi

echo "Starting the development server..."
# Start the development server in the background
npm run dev &

# Wait for the server to be accessible
npx wait-on http://localhost:5173

is_open_app=false
# Detect the OS
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
	is_open_app=true
    open http://localhost:5173
elif [[ "$OSTYPE" == "msys"* || "$OSTYPE" == "cygwin"* ]]; then
    # Windows
	is_open_app=true
    start http://localhost:5173
else
    echo "Unsupported OS. Stopping the application"
fi

if $is_open_app; then
  	# Get the background process PID
	DEV_PID=$!
	echo
	echo "Opening application in browser..."
	echo
	echo "Process PID is $DEV_PID"
	# Use trap to ensure the background process stops when the script is terminated
	trap "echo Stopping npm run dev...; kill $DEV_PID" EXIT

	# Wait for the dev process to finish or the user to stop the script
	wait $DEV_PID
else
	echo "The feature is not active."
fi