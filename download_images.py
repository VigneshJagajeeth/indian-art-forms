import urllib.request
import os

images = {
    'ajanta.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Padmapani%2C_Cave_1%2C_Ajanta_Caves.jpg/800px-Padmapani%2C_Cave_1%2C_Ajanta_Caves.jpg',
    'madhubani.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Madhubani_painting.jpg/800px-Madhubani_painting.jpg',
    'thanjavur.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Thanjavur_painting_of_Saraswati.jpg/800px-Thanjavur_painting_of_Saraswati.jpg',
    'kishangarh.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Bani_Thani.jpg/800px-Bani_Thani.jpg',
    'kangra.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Radha_and_Krishna_in_the_boat_of_love.jpg/800px-Radha_and_Krishna_in_the_boat_of_love.jpg',
    'raghurajpur.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Pattachitra_Painting.jpg/800px-Pattachitra_Painting.jpg',
    'kolkata.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Bharat_Mata_by_Abanindranath_Tagore.jpg/800px-Bharat_Mata_by_Abanindranath_Tagore.jpg',
    'warli.jpg': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Warli_painting_Maharashtra_India.jpg/800px-Warli_painting_Maharashtra_India.jpg'
}

os.makedirs('public/assets', exist_ok=True)
req_headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}

for filename, url in images.items():
    path = os.path.join('public/assets', filename)
    print(f"Downloading {filename}...")
    try:
        req = urllib.request.Request(url, headers=req_headers)
        with urllib.request.urlopen(req) as response, open(path, 'wb') as out_file:
            data = response.read()
            out_file.write(data)
    except Exception as e:
        print(f"Failed to download {filename}: {e}")
