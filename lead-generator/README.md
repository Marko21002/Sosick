# Vienna Lead Generator

Find small businesses in Vienna without proper websites.

## Setup

```bash
# Install dependencies
pip3 install requests beautifulsoup4

# Run scraper
python3 vienna_scraper.py
```

## What it does

1. Searches herold.at (Austrian business directory)
2. Finds businesses by category (cafes, restaurants, hairdressers, etc.)
3. Extracts: name, phone, address, website, email
4. Marks priority: businesses WITHOUT websites
5. Exports to CSV and JSON

## Output

- `vienna_leads.csv` - Spreadsheet for Excel/Google Sheets
- `vienna_leads.json` - Raw data

## Categories searched

- Cafe
- Restaurant
- Friseur (hairdresser)
- Baeckerei (bakery)
- Blumen (florist)
- And more...

## Usage

Edit `vienna_scraper.py` to:
- Change `max_pages` to get more/less results
- Add/remove categories
- Filter by specific districts

## Next steps

1. Run scraper to get leads
2. Manually verify websites (open each, check if outdated)
3. Create outreach email template
4. Send personalized emails or make cold calls
