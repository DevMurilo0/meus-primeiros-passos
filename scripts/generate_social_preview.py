"""Gera cartão Open Graph 1200x630 em JPEG, com fotos e logo reais do repositório.

Rodar: python scripts/generate_social_preview.py
Requer Pillow; o CI instala a dependência separadamente.
A imagem é estática e fica em public/, acessível a crawlers sem JavaScript.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageOps
import math

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / "public" / "assets"
OUT = ROOT / "public" / "og-meus-primeiros-passos-2026.jpg"
W, H = 1200, 630
PAPER = "#FFF5E9"
INK = "#24313D"
VIOLET = "#6554D8"
CORAL = "#F15B6C"
YELLOW = "#FFC247"


def font(size: int) -> ImageFont.FreeTypeFont:
    path = ROOT / "public" / "fonts" / "red-hat-display-900.ttf"
    if not path.is_file():
        raise FileNotFoundError(f"Fonte local necessária para cartão Open Graph: {path}")
    return ImageFont.truetype(str(path), size)


def main() -> None:
    canvas = Image.new("RGB", (W, H), PAPER)
    draw = ImageDraw.Draw(canvas)
    draw.rectangle((714, 0, W, H), fill=VIOLET)
    # Camadas gráficas inspiradas no hero, mantendo leitura em miniaturas.
    draw.ellipse((838, -110, 1270, 325), fill=YELLOW)
    draw.ellipse((1050, 480, 1302, 732), outline="#FFFFFF", width=5)
    draw.arc((1040, 464, 1320, 742), 60, 180, fill="#FFFFFF", width=4)
    for x, y, rad in [(710, 55, 6), (672, 119, 7), (690, 500, 5), (1156, 568, 7)]:
        draw.ellipse((x-rad, y-rad, x+rad, y+rad), fill=CORAL if x < 800 else YELLOW)

    logo = Image.open(ASSETS / "brand" / "logo-mpp.png").convert("RGBA")
    logo.thumbnail((125, 110), Image.Resampling.LANCZOS)
    canvas.paste(logo, (64, 27), logo)
    draw.text((203, 51), "ESCOLA MEUS", font=font(22), fill=INK)
    draw.text((203, 78), "PRIMEIROS PASSOS", font=font(22), fill=INK)

    draw.text((64, 190), "Pequenos passos.", font=font(61), fill=INK)
    draw.text((64, 274), "Grandes", font=font(89), fill=CORAL)
    draw.text((64, 377), "descobertas.", font=font(78), fill=CORAL)
    draw.text((64, 498), "Educação Infantil ao 5º ano  •  Gravatá, PE", font=font(18), fill=INK)
    draw.rounded_rectangle((64, 543, 514, 595), radius=26, fill=INK)
    draw.text((84, 559), "APRENDER COM AMOR E PROPÓSITO", font=font(18), fill=PAPER)

    x, y, w, h = 769, 77, 377, 438
    draw.rounded_rectangle((x+15, y+17, x+w+15, y+h+17), radius=32, fill="#292154")
    draw.rounded_rectangle((x-9, y-9, x+w+9, y+h+9), radius=32, fill=PAPER)
    photo = Image.open(ASSETS / "school" / "abraco-em-familia.webp").convert("RGB")
    photo = ImageOps.fit(photo, (w, h), method=Image.Resampling.LANCZOS, centering=(.5, .4))
    mask = Image.new("L", (w, h), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, w, h), radius=24, fill=255)
    canvas.paste(photo, (x, y), mask)

    draw.rounded_rectangle((812, 483, 1153, 556), radius=19, fill=YELLOW)
    draw.text((833, 501), "UM MUNDO PARA", font=font(24), fill=INK)
    draw.text((833, 527), "DESCOBRIR!", font=font(23), fill=INK)
    # Flor da linguagem gráfica da homepage.
    center_x, center_y = 1122, 89
    for deg in range(0, 360, 60):
        angle = math.radians(deg)
        px = center_x + 31 * math.cos(angle)
        py = center_y + 31 * math.sin(angle)
        draw.ellipse((px-22, py-22, px+22, py+22), fill=CORAL)
    draw.ellipse((center_x-22, center_y-22, center_x+22, center_y+22), fill=PAPER)
    draw.arc((center_x-11, center_y-6, center_x+11, center_y+12), 10, 170, fill=INK, width=3)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    for quality in (88, 84, 80, 75, 70):
        canvas.save(OUT, format="JPEG", quality=quality, optimize=True, progressive=True, subsampling=1)
        if OUT.stat().st_size < 290_000:
            break
    if OUT.stat().st_size > 350_000:
        raise ValueError(f"Imagem OG grande demais: {OUT.stat().st_size} bytes")
    print(f"Imagem pronta: {OUT.relative_to(ROOT)} ({W}x{H}, {OUT.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
