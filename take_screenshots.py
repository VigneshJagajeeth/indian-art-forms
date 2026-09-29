import asyncio
from playwright.async_api import async_playwright
import os

async def take_screenshots():
    print("Starting playwright...")
    os.makedirs('screenshots', exist_ok=True)
            
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1280, 'height': 800})
        await page.goto('http://localhost:3000/', wait_until='networkidle')
        await page.wait_for_timeout(2000)
        
        await page.screenshot(path='screenshots/01_hero.png')
        await page.evaluate("window.scrollTo(0, 400)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path='screenshots/02_map.png')
        
        await page.evaluate("window.scrollTo(0, 800)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path='screenshots/03_archive_top.png')
        
        await page.evaluate("window.scrollTo(0, 1600)")
        await page.wait_for_timeout(1000)
        await page.screenshot(path='screenshots/04_archive_mid.png')

        try:
            cards = await page.query_selector_all('div.group.bg-white')
            if len(cards) > 0:
                for i in range(min(6, len(cards))):
                    # Reload page to guarantee modal is closed
                    await page.reload(wait_until='networkidle')
                    await page.wait_for_timeout(1000)
                    
                    # Scroll down to cards again
                    await page.evaluate("window.scrollTo(0, 1000)")
                    await page.wait_for_timeout(1000)
                    
                    fresh_cards = await page.query_selector_all('div.group.bg-white')
                    if i < len(fresh_cards):
                        await fresh_cards[i].scroll_into_view_if_needed()
                        await fresh_cards[i].click()
                        await page.wait_for_timeout(2000)
                        await page.screenshot(path=f'screenshots/05_modal_{i+1}.png')
                        print(f"Took screenshot of modal {i+1}.")
        except Exception as e:
            print("Error taking marker screenshots:", e)

        await browser.close()
        print("Done taking screenshots.")

asyncio.run(take_screenshots())
