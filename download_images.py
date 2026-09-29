import urllib.request
import os
import ssl

images = {
    'kangra.jpg': 'https://upload.wikimedia.org/wikipedia/commons/9/95/Radha_and_Krishna_in_the_boat_of_love.jpg',
    'kolkata.jpg': 'https://upload.wikimedia.org/wikipedia/commons/2/24/Bharat_Mata_by_Abanindranath_Tagore.jpg',
    'warli.jpg': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Warli_painting_Maharashtra_India.jpg',
    'bhimbetka.jpg': 'https://upload.wikimedia.org/wikipedia/commons/b/b3/Bhimbetka_rock_paintings1.jpg',
    'gond.jpg': 'https://upload.wikimedia.org/wikipedia/commons/f/f6/Gond_Painting_Madhya_Pradesh.jpg',
    'mughal.jpg': 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Chameleon_by_Mansur.jpg',
    'srikalahasti.jpg': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/Kalamkari_painting_on_cloth.jpg',
    'nathdwara.jpg': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Pichhwai_painting_of_Shrinathji.jpg',
    'shahpura.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Phad_painting_Rajasthan.jpg',
    'lepakshi.jpg': 'https://upload.wikimedia.org/wikipedia/commons/a/a2/Fresco_in_Lepakshi_Temple.jpg',
    'hampi.jpg': 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Virupaksha_temple_ceiling_painting_Hampi.jpg',
    'srinagar.jpg': 'https://upload.wikimedia.org/wikipedia/commons/7/77/Kashmir_papier_mache_craft.jpg',
    'bombay.jpg': 'https://upload.wikimedia.org/wikipedia/commons/0/07/MF_Husain_painting.jpg',
    'cholamandal.jpg': 'https://upload.wikimedia.org/wikipedia/commons/a/a6/KCS_Paniker_art.jpg'
}

os.makedirs('public/assets', exist_ok=True)
req_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

# Ignore SSL errors just in case
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

for filename, url in images.items():
    path = os.path.join('public/assets', filename)
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req, context=ctx) as response, open(path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
            print(f"Success: {filename}")
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
