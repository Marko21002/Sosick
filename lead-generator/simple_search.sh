#!/bin/bash
# Simple lead generator using curl (no Python needed)

CATEGORY="${1:-cafe}"
LOCATION="${2:-Wien}"
OUTPUT="leads_${CATEGORY}.csv"

echo "Searching for: $CATEGORY in $LOCATION"
echo "Name,Phone,Address,Website" > "$OUTPUT"

# This is a template - real scraping would need proper parsing
# For now, it shows the structure

echo ""
echo "To get real data:"
echo "1. Install Python dependencies: pip3 install requests beautifulsoup4"
echo "2. Run: python3 vienna_scraper.py"
echo ""
echo "Or manually search:"
echo "https://www.herold.at/suche/?searchTerm=$CATEGORY%20$LOCATION"
