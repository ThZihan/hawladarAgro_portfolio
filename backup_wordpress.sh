#!/bin/bash
#
# WordPress Backup Script for cPanel
# This script creates a complete backup of the WordPress site at hawladaragro.farm
#
# Usage: bash backup_wordpress.sh
#

# Configuration
DOMAIN="hawladaragro.farm"
BACKUP_DIR="$HOME/backups/wordpress_$(date +%Y%m%d_%H%M%S)"
PUBLIC_HTML="$HOME/public_html"
WORDPRESS_DIR="$PUBLIC_HTML/$DOMAIN"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Print functions
print_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Start backup
print_info "Starting WordPress backup for $DOMAIN..."
echo "=========================================="

# Create backup directory
print_info "Creating backup directory: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"

# Check if WordPress directory exists
if [ ! -d "$WORDPRESS_DIR" ]; then
    print_error "WordPress directory not found: $WORDPRESS_DIR"
    print_info "Trying alternative location: $PUBLIC_HTML"
    WORDPRESS_DIR="$PUBLIC_HTML"
    
    if [ ! -f "$WORDPRESS_DIR/wp-config.php" ]; then
        print_error "WordPress installation not found!"
        exit 1
    fi
fi

# Backup WordPress files
print_info "Backing up WordPress files..."
tar -czf "$BACKUP_DIR/wordpress_files.tar.gz" -C "$PUBLIC_HTML" "$DOMAIN" 2>/dev/null || \
tar -czf "$BACKUP_DIR/wordpress_files.tar.gz" -C "$PUBLIC_HTML" . 2>/dev/null

if [ $? -eq 0 ]; then
    print_info "WordPress files backed up successfully"
    ls -lh "$BACKUP_DIR/wordpress_files.tar.gz"
else
    print_error "Failed to backup WordPress files"
    exit 1
fi

# Backup database
print_info "Extracting database credentials from wp-config.php..."
if [ -f "$WORDPRESS_DIR/wp-config.php" ]; then
    DB_NAME=$(grep "DB_NAME" "$WORDPRESS_DIR/wp-config.php" | cut -d "'" -f 4)
    DB_USER=$(grep "DB_USER" "$WORDPRESS_DIR/wp-config.php" | cut -d "'" -f 4)
    DB_PASSWORD=$(grep "DB_PASSWORD" "$WORDPRESS_DIR/wp-config.php" | cut -d "'" -f 4)
    DB_HOST=$(grep "DB_HOST" "$WORDPRESS_DIR/wp-config.php" | cut -d "'" -f 4)
    
    print_info "Database Name: $DB_NAME"
    print_info "Database User: $DB_USER"
    print_info "Database Host: $DB_HOST"
    
    # Export database
    print_info "Backing up database..."
    mysqldump -u "$DB_USER" -p"$DB_PASSWORD" -h "$DB_HOST" "$DB_NAME" > "$BACKUP_DIR/wordpress_database.sql" 2>/dev/null
    
    if [ $? -eq 0 ] && [ -s "$BACKUP_DIR/wordpress_database.sql" ]; then
        print_info "Database backed up successfully"
        ls -lh "$BACKUP_DIR/wordpress_database.sql"
    else
        print_error "Failed to backup database"
        print_warning "Continuing with files backup only..."
    fi
else
    print_error "wp-config.php not found!"
    print_warning "Skipping database backup..."
fi

# Create backup manifest
print_info "Creating backup manifest..."
cat > "$BACKUP_DIR/backup_manifest.txt" << EOF
==========================================
WordPress Backup Manifest
==========================================
Backup Date: $(date)
Domain: $DOMAIN
WordPress Directory: $WORDPRESS_DIR
Backup Location: $BACKUP_DIR

Files Included:
EOF

if [ -f "$BACKUP_DIR/wordpress_files.tar.gz" ]; then
    echo "- wordpress_files.tar.gz ($(du -h "$BACKUP_DIR/wordpress_files.tar.gz" | cut -f1))" >> "$BACKUP_DIR/backup_manifest.txt"
fi

if [ -f "$BACKUP_DIR/wordpress_database.sql" ]; then
    echo "- wordpress_database.sql ($(du -h "$BACKUP_DIR/wordpress_database.sql" | cut -f1))" >> "$BACKUP_DIR/backup_manifest.txt"
fi

cat >> "$BACKUP_DIR/backup_manifest.txt" << EOF

Database Information:
EOF

if [ -n "$DB_NAME" ]; then
    echo "- Database Name: $DB_NAME" >> "$BACKUP_DIR/backup_manifest.txt"
    echo "- Database User: $DB_USER" >> "$BACKUP_DIR/backup_manifest.txt"
    echo "- Database Host: $DB_HOST" >> "$BACKUP_DIR/backup_manifest.txt"
else
    echo "- Database: Not backed up" >> "$BACKUP_DIR/backup_manifest.txt"
fi

cat >> "$BACKUP_DIR/backup_manifest.txt" << EOF

Total Backup Size: $(du -sh "$BACKUP_DIR" | cut -f1)
==========================================
EOF

print_info "Backup manifest created"
cat "$BACKUP_DIR/backup_manifest.txt"

# Create restore script
print_info "Creating restore script..."
cat > "$BACKUP_DIR/restore_wordpress.sh" << 'RESTORE_EOF'
#!/bin/bash
#
# WordPress Restore Script
# This script restores the WordPress site from backup
#

BACKUP_DIR="$(cd "$(dirname "$0")" && pwd)"
PUBLIC_HTML="$HOME/public_html"
DOMAIN="hawladaragro.farm"

echo "=========================================="
echo "WordPress Restore Script"
echo "=========================================="
echo "Backup Directory: $BACKUP_DIR"
echo "Target Domain: $DOMAIN"
echo ""

# Check if backup files exist
if [ ! -f "$BACKUP_DIR/wordpress_files.tar.gz" ]; then
    echo "[ERROR] Backup file not found!"
    exit 1
fi

# Confirm restore
read -p "This will overwrite the current WordPress installation. Continue? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "Restore cancelled."
    exit 0
fi

# Backup current installation
echo "[INFO] Creating emergency backup of current installation..."
EMERGENCY_BACKUP="$HOME/emergency_backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$EMERGENCY_BACKUP"
cp -r "$PUBLIC_HTML/$DOMAIN" "$EMERGENCY_BACKUP/" 2>/dev/null || \
cp -r "$PUBLIC_HTML"/* "$EMERGENCY_BACKUP/" 2>/dev/null

# Restore files
echo "[INFO] Restoring WordPress files..."
tar -xzf "$BACKUP_DIR/wordpress_files.tar.gz" -C "$PUBLIC_HTML"

# Restore database if available
if [ -f "$BACKUP_DIR/wordpress_database.sql" ]; then
    echo "[INFO] Restoring database..."
    
    # Get database credentials from restored wp-config.php
    if [ -f "$PUBLIC_HTML/$DOMAIN/wp-config.php" ]; then
        WP_CONFIG="$PUBLIC_HTML/$DOMAIN/wp-config.php"
    else
        WP_CONFIG="$PUBLIC_HTML/wp-config.php"
    fi
    
    DB_NAME=$(grep "DB_NAME" "$WP_CONFIG" | cut -d "'" -f 4)
    DB_USER=$(grep "DB_USER" "$WP_CONFIG" | cut -d "'" -f 4)
    DB_PASSWORD=$(grep "DB_PASSWORD" "$WP_CONFIG" | cut -d "'" -f 4)
    DB_HOST=$(grep "DB_HOST" "$WP_CONFIG" | cut -d "'" -f 4)
    
    mysql -u "$DB_USER" -p"$DB_PASSWORD" -h "$DB_HOST" "$DB_NAME" < "$BACKUP_DIR/wordpress_database.sql"
fi

echo ""
echo "=========================================="
echo "Restore completed successfully!"
echo "Emergency backup saved to: $EMERGENCY_BACKUP"
echo "=========================================="
RESTORE_EOF

chmod +x "$BACKUP_DIR/restore_wordpress.sh"
print_info "Restore script created: $BACKUP_DIR/restore_wordpress.sh"

# Summary
echo ""
echo "=========================================="
print_info "Backup completed successfully!"
echo "=========================================="
print_info "Backup Location: $BACKUP_DIR"
print_info "Files: wordpress_files.tar.gz"
print_info "Database: wordpress_database.sql (if backed up)"
print_info "Manifest: backup_manifest.txt"
print_info "Restore Script: restore_wordpress.sh"
echo ""
print_info "To restore this backup, run:"
echo "  bash $BACKUP_DIR/restore_wordpress.sh"
echo "=========================================="
