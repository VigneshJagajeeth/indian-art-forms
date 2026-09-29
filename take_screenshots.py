import asyncio
from playwright.async_api import async_playwright
import os

async def take_screenshots():
    print("Starting playwright...")
    os.makedirs('screenshots', exist_ok=True)
    # Clear existing pngs
    for f in os.listdir('screenshots'):
        if f.endswith('.png'):
            os.remove(os.path.join('screenshots', f))
            
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={'width': 1280, 'height': 720})
        await page.goto('https://indian-art-forms-six.vercel.app/', wait_until='networkidle')
        
        # 1. Main page screenshot
        await page.wait_for_timeout(2000)
        await page.screenshot(path='screenshots/01_main_page.png')
        print("Took main page screenshot.")
        
        # 2. Click the art cards in the directory grid to open the dossier modal
        try:
            # Scroll down to the grid
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight/2)")
            await page.wait_for_timeout(1000)
            
            cards = await page.query_selector_all('div.grid.grid-cols-1 > div.cursor-pointer')
            if len(cards) > 0:
                for i in range(min(5, len(cards))):
                    # Click the card
                    await cards[i].scroll_into_view_if_needed()
                    await cards[i].click()
                    await page.wait_for_timeout(1500)
                    
                    # Take screenshot of the open modal
                    await page.screenshot(path=f'screenshots/02_modal_{i}.png')
                    print(f"Took screenshot of modal {i}.")
                    
                    # Close the modal by clicking the close button
                    close_btn = await page.query_selector('button:has-text("Close Catalogue")')
                    if close_btn:
                        await close_btn.click()
                    else:
                        await page.keyboard.press('Escape')
                    await page.wait_for_timeout(1000)
            else:
                print("No art cards found in the grid.")
        except Exception as e:
            print("Error taking marker screenshots:", e)

        await browser.close()
        print("Done taking screenshots.")

asyncio.run(take_screenshots())
