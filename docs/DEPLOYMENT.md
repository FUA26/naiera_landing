# Staging Deployment Guide

This guide covers deploying Naiera Landing to a staging server using Docker.

## Prerequisites

- Linux server (Ubuntu/Debian recommended) with SSH access
- Git installed on your local machine
- SSH key configured for GitHub access

## Quick Deploy (Automated)

Use the deployment script:

```bash
# Make script executable
chmod +x scripts/deploy-staging.sh

# Deploy to staging server
./scripts/deploy-staging.sh your-staging-server.com username
```

The script will:
1. Check SSH connection
2. Install Docker and Docker Compose on the server
3. Clone/update the repository
4. Build the Docker image
5. Start the application
6. Verify deployment

## Manual Deploy (Step by Step)

### 1. Prepare Staging Server

SSH into your staging server:

```bash
ssh username@your-staging-server.com
```

Install Docker:

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

Install Docker Compose:

```bash
sudo curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

Create project directory:

```bash
sudo mkdir -p /var/www/naiera-landing/data
sudo chown -R $USER:$USER /var/www/naiera-landing
```

### 2. Clone Repository

```bash
cd /var/www
git clone git@github.com:FUA26/naiera_landing.git naiera-landing
cd naiera-landing
```

### 3. Configure Environment

```bash
# Copy staging environment template
cp .env.staging.example .env.staging

# Edit with your values
nano .env.staging
```

Update these values:
- `NEXT_PUBLIC_APP_URL` - Your staging server URL
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NEXT_PUBLIC_N8N_CHAT_WEBHOOK_URL` - Optional n8n webhook

### 4. Build and Run

```bash
# Build the Docker image
docker compose -f docker-compose.staging.yml build

# Start the application
docker compose -f docker-compose.staging.yml up -d

# Check logs
docker compose -f docker-compose.staging.yml logs -f
```

### 5. Setup Reverse Proxy (Optional but Recommended)

Install Nginx:

```bash
sudo apt update
sudo apt install nginx -y
```

Create Nginx config:

```bash
sudo nano /etc/nginx/sites-available/naiera-staging
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-staging-server.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/naiera-staging /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

## Database

The SQLite database is stored in `/var/www/naiera-landing/data/` directory. This directory is mounted as a Docker volume, so data persists across container restarts.

To run migrations on staging:

```bash
ssh username@your-staging-server.com
cd /var/www/naiera-landing
docker compose -f docker-compose.staging.yml exec app pnpm db:migrate
```

## Common Commands

### View Logs

```bash
# From your local machine
ssh username@your-staging-server.com 'cd /var/www/naiera-landing && docker compose -f docker-compose.staging.yml logs -f'

# Or from the server
docker compose -f docker-compose.staging.yml logs -f
```

### Restart Application

```bash
docker compose -f docker-compose.staging.yml restart
```

### Stop Application

```bash
docker compose -f docker-compose.staging.yml down
```

### Update Deployment

```bash
cd /var/www/naiera-landing
git pull origin main
docker compose -f docker-compose.staging.yml build --no-cache
docker compose -f docker-compose.staging.yml up -d
```

### Check Container Status

```bash
docker compose -f docker-compose.staging.yml ps
```

## Troubleshooting

### Container won't start

```bash
# Check logs
docker compose -f docker-compose.staging.yml logs

# Check if port 3000 is already in use
sudo netstat -tlnp | grep 3000

# Recreate container
docker compose -f docker-compose.staging.yml down
docker compose -f docker-compose.staging.yml up -d --force-recreate
```

### Database issues

```bash
# Check database file exists
ls -la /var/www/naiera-landing/data/

# Re-run migrations
docker compose -f docker-compose.staging.yml exec app pnpm db:migrate
```

### Permission issues

```bash
# Fix data directory permissions
sudo chown -R 1001:1001 /var/www/naiera-landing/data/
```

## SSL/HTTPS (Recommended)

Use Certbot for free SSL certificates:

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Get certificate
sudo certbot --nginx -d your-staging-server.com

# Auto-renewal is configured automatically
```

## Monitoring

Check application health:

```bash
curl http://localhost:3000
```

Check Docker resource usage:

```bash
docker stats
```

## Backup

Backup database:

```bash
tar -czf naiera-backup-$(date +%Y%m%d).tar.gz /var/www/naiera-landing/data/
```

Backup entire deployment:

```bash
tar -czf naiera-full-backup-$(date +%Y%m%d).tar.gz /var/www/naiera-landing/
```
