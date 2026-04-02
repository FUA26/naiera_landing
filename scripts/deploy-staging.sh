#!/bin/bash

# Deployment script for Naiera Landing Staging Server
# Usage: ./scripts/deploy-staging.sh [staging-server-host]

set -e

# Configuration
STAGING_HOST=${1:-"your-staging-server.com"}
STAGING_USER=${2:-"root"}
STAGING_PATH="/var/www/naiera-landing"
REPO_URL="git@github.com:FUA26/naiera_landing.git"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Naiera Landing - Staging Deployment${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""

# Check if SSH connection works
echo -e "${YELLOW}Checking SSH connection...${NC}"
if ! ssh -o ConnectTimeout=5 ${STAGING_USER}@${STAGING_HOST} "echo 'Connected'" 2>/dev/null; then
    echo -e "${RED}Cannot connect to ${STAGING_USER}@${STAGING_HOST}${NC}"
    echo "Please check your SSH configuration and try again."
    exit 1
fi
echo -e "${GREEN}SSH connection OK${NC}"
echo ""

# Step 1: Prepare server
echo -e "${YELLOW}Step 1: Preparing server...${NC}"
ssh ${STAGING_USER}@${STAGING_HOST} << 'ENDSSH'
set -e

# Install Docker if not exists
if ! command -v docker &> /dev/null; then
    echo "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm get-docker.sh
    usermod -aG docker $USER
fi

# Install Docker Compose if not exists
if ! command -v docker-compose &> /dev/null; then
    echo "Installing Docker Compose..."
    curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
fi

# Create project directory
mkdir -p /var/www/naiera-landing/data
mkdir -p /var/www/naiera-landing/logs

echo "Server prepared successfully"
ENDSSH

echo -e "${GREEN}Server prepared${NC}"
echo ""

# Step 2: Clone/Update repository
echo -e "${YELLOW}Step 2: Syncing repository...${NC}"
ssh ${STAGING_USER}@${STAGING_HOST} << ENDSSH
set -e
cd /var/www

if [ -d "naiera-landing/.git" ]; then
    echo "Pulling latest changes..."
    cd naiera-landing
    git fetch origin
    git reset --hard origin/main
    git pull origin main
else
    echo "Cloning repository..."
    rm -rf naiera-landing
    git clone ${REPO_URL} naiera-landing
    cd naiera-landing
fi
ENDSSH

echo -e "${GREEN}Repository synced${NC}"
echo ""

# Step 3: Build Docker image
echo -e "${YELLOW}Step 3: Building Docker image on server...${NC}"
ssh ${STAGING_USER}@${STAGING_HOST} << 'ENDSSH'
set -e
cd /var/www/naiera-landing

echo "Building Docker image..."
docker compose -f docker-compose.staging.yml build --no-cache
ENDSSH

echo -e "${GREEN}Docker image built${NC}"
echo ""

# Step 4: Deploy
echo -e "${YELLOW}Step 4: Deploying application...${NC}"
ssh ${STAGING_USER}@${STAGING_HOST} << 'ENDSSH'
set -e
cd /var/www/naiera-landing

# Stop existing container
docker compose -f docker-compose.staging.yml down 2>/dev/null || true

# Start new container
docker compose -f docker-compose.staging.yml up -d

# Wait for health check
echo "Waiting for application to start..."
sleep 10

# Show logs
echo "Recent logs:"
docker compose -f docker-compose.staging.yml logs --tail=20
ENDSSH

echo -e "${GREEN}Application deployed${NC}"
echo ""

# Step 5: Verify deployment
echo -e "${YELLOW}Step 5: Verifying deployment...${NC}"
ssh ${STAGING_USER}@${STAGING_HOST} << 'ENDSSH'
set -e
cd /var/www/naiera-landing

echo "Container status:"
docker compose -f docker-compose.staging.yml ps
ENDSSH

echo ""
echo -e "${GREEN}=====================================${NC}"
echo -e "${GREEN}Deployment completed successfully!${NC}"
echo -e "${GREEN}=====================================${NC}"
echo ""
echo "Your application is now running at: http://${STAGING_HOST}:3000"
echo ""
echo "Useful commands:"
echo "  View logs:   ssh ${STAGING_USER}@${STAGING_HOST} 'cd /var/www/naiera-landing && docker compose -f docker-compose.staging.yml logs -f'"
echo "  Stop app:    ssh ${STAGING_USER}@${STAGING_HOST} 'cd /var/www/naiera-landing && docker compose -f docker-compose.staging.yml down'"
echo "  Restart app: ssh ${STAGING_USER}@${STAGING_HOST} 'cd /var/www/naiera-landing && docker compose -f docker-compose.staging.yml restart'"
