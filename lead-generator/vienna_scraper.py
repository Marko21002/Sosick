#!/usr/bin/env python3
"""
Lead Generator for Vienna Small Businesses
Parses Austrian business directories to find leads without proper websites
"""

import requests
from bs4 import BeautifulSoup
import json
import time
import csv
from urllib.parse import urljoin, quote

class ViennaLeadGenerator:
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        self.leads = []
        
    def search_herold(self, category, location="Wien", max_pages=3):
        """Search herold.at for businesses in specific category"""
        base_url = "https://www.herold.at/suche/"
        
        for page in range(1, max_pages + 1):
            query = f"{category} {location}"
            url = f"{base_url}?searchTerm={quote(query)}&page={page}"
            
            try:
                response = self.session.get(url, timeout=10)
                soup = BeautifulSoup(response.text, 'html.parser')
                
                # Find business listings
                listings = soup.find_all('div', class_='result-item') or soup.find_all('article')
                
                for listing in listings:
                    lead = self._parse_listing(listing, category)
                    if lead:
                        self.leads.append(lead)
                
                print(f"✓ Page {page}: Found {len(listings)} listings")
                time.sleep(2)  # Be nice to the server
                
            except Exception as e:
                print(f"✗ Error on page {page}: {e}")
                continue
    
    def _parse_listing(self, listing, category):
        """Extract data from a single listing"""
        try:
            # Try different selectors
            name = listing.find('h2') or listing.find('h3') or listing.find('a', class_='title')
            name = name.get_text(strip=True) if name else None
            
            if not name:
                return None
            
            # Phone
            phone = listing.find('a', href=lambda x: x and 'tel:' in x)
            phone = phone['href'].replace('tel:', '') if phone else None
            
            # Address
            address_elem = listing.find('address') or listing.find('div', class_='address')
            address = address_elem.get_text(strip=True) if address_elem else None
            
            # Website
            website = listing.find('a', href=lambda x: x and x.startswith('http'))
            website = website['href'] if website else None
            
            # Email (often hidden)
            email = listing.find('a', href=lambda x: x and 'mailto:' in x)
            email = email['href'].replace('mailto:', '') if email else None
            
            return {
                'name': name,
                'category': category,
                'phone': phone,
                'address': address,
                'website': website,
                'email': email,
                'has_website': website is not None,
                'source': 'herold.at'
            }
            
        except Exception:
            return None
    
    def filter_leads(self, require_website=False):
        """Filter leads based on criteria"""
        if require_website:
            return [l for l in self.leads if l['website']]
        else:
            # Return all, but mark priority for those without websites
            return sorted(self.leads, key=lambda x: not x['has_website'])
    
    def export_csv(self, filename='vienna_leads.csv'):
        """Export leads to CSV"""
        if not self.leads:
            print("No leads to export")
            return
            
        fieldnames = ['name', 'category', 'phone', 'address', 'website', 'email', 'has_website', 'source']
        
        with open(filename, 'w', newline='', encoding='utf-8') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
            writer.writerows(self.leads)
        
        print(f"\n✓ Exported {len(self.leads)} leads to {filename}")
    
    def export_json(self, filename='vienna_leads.json'):
        """Export leads to JSON"""
        with open(filename, 'w', encoding='utf-8') as f:
            json.dump(self.leads, f, indent=2, ensure_ascii=False)
        print(f"✓ Exported to {filename}")
    
    def print_summary(self):
        """Print summary of collected leads"""
        total = len(self.leads)
        with_website = sum(1 for l in self.leads if l['has_website'])
        without_website = total - with_website
        
        print(f"\n{'='*50}")
        print(f"LEADS SUMMARY")
        print(f"{'='*50}")
        print(f"Total leads: {total}")
        print(f"With website: {with_website}")
        print(f"WITHOUT website (PRIORITY): {without_website}")
        print(f"{'='*50}")
        
        if without_website > 0:
            print("\n🔥 PRIORITY LEADS (no website):")
            for lead in self.leads[:5]:
                if not lead['has_website']:
                    print(f"  • {lead['name']} - {lead['phone'] or 'no phone'}")

# Categories to search
categories = [
    "cafe",
    "restaurant", 
    "friseur",  # hairdresser
    "baeckerei",  # bakery
    "blumen",  # florist
    "tischler",  # carpenter
    "elektriker",  # electrician
    "klempner",  # plumber
    "reinigung",  # cleaning
    "autowerkstatt",  # car repair
]

if __name__ == "__main__":
    print("🚀 Vienna Lead Generator")
    print("="*50)
    
    generator = ViennaLeadGenerator()
    
    # Search for each category
    for category in categories[:3]:  # Start with first 3
        print(f"\n📍 Searching: {category.upper()}")
        generator.search_herold(category, max_pages=2)
    
    # Summary and export
    generator.print_summary()
    generator.export_csv()
    generator.export_json()
    
    print("\n✅ Done! Check vienna_leads.csv and vienna_leads.json")
