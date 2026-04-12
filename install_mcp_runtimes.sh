#!/bin/bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Python 3 and pip
sudo apt-get install -y python3 python3-pip python3-venv

echo "MCP runtimes installed successfully."
