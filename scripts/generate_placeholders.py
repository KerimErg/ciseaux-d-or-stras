#!/usr/bin/env python3
"""
Génère des images placeholder élégantes pour le site Ciseaux d'Or.
Ces images sont temporaires : remplacez-les par vos propres photos
en conservant les mêmes noms de fichiers dans le dossier images/.

Usage : python3 scripts/generate_placeholders.py
"""

import os
from PIL import Image, ImageDraw, ImageFont

# Palette
NOIR = (14, 14, 15)
NOIR_SOFT = (23, 23, 26)
OR = (201, 162, 75)
OR_CLAIR = (224, 194, 116)
CREME = (246, 241, 231)
GRIS = (120, 116, 108)

OUT_DIR = os.path.join(os.path.dirname(__file__), "..", "images")
os.makedirs(OUT_DIR, exist_ok=True)


def load_font(size, bold=False):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif-Bold.ttf" if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf" if bold
        else "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def vertical_gradient(w, h, top, bottom):
    base = Image.new("RGB", (w, h), top)
    draw = ImageDraw.Draw(base)
    for y in range(h):
        t = y / max(h - 1, 1)
        r = int(top[0] + (bottom[0] - top[0]) * t)
        g = int(top[1] + (bottom[1] - top[1]) * t)
        b = int(top[2] + (bottom[2] - top[2]) * t)
        draw.line([(0, y), (w, y)], fill=(r, g, b))
    return base


def draw_scissors(draw, cx, cy, scale, color):
    """Petit pictogramme de ciseaux stylisé."""
    r = int(6 * scale)
    lw = max(2, int(2 * scale))
    # anneaux
    draw.ellipse([cx - 3 * r, cy + r, cx - r, cy + 3 * r], outline=color, width=lw)
    draw.ellipse([cx - 3 * r, cy - 3 * r, cx - r, cy - r], outline=color, width=lw)
    # lames
    draw.line([cx - 2 * r, cy + 2 * r, cx + 3 * r, cy - 3 * r], fill=color, width=lw)
    draw.line([cx - 2 * r, cy - 2 * r, cx + 3 * r, cy + 3 * r], fill=color, width=lw)


def make_image(filename, w, h, title, subtitle=""):
    img = vertical_gradient(w, h, NOIR_SOFT, NOIR)
    draw = ImageDraw.Draw(img)

    # cadre or discret
    margin = int(min(w, h) * 0.05)
    draw.rectangle(
        [margin, margin, w - margin, h - margin], outline=OR, width=max(1, int(min(w, h) / 400))
    )

    # ciseaux
    draw_scissors(draw, w // 2, int(h * 0.38), scale=min(w, h) / 120, color=OR)

    # titre
    ft = load_font(max(18, int(min(w, h) / 14)), bold=True)
    tb = draw.textbbox((0, 0), title, font=ft)
    tw = tb[2] - tb[0]
    draw.text(((w - tw) / 2, h * 0.52), title, font=ft, fill=CREME)

    # sous-titre
    if subtitle:
        fs = load_font(max(12, int(min(w, h) / 26)))
        sb = draw.textbbox((0, 0), subtitle, font=fs)
        sw = sb[2] - sb[0]
        draw.text(((w - sw) / 2, h * 0.52 + (tb[3] - tb[1]) + 14), subtitle, font=fs, fill=GRIS)

    # mention "à remplacer"
    fr = load_font(max(11, int(min(w, h) / 34)))
    note = "Image temporaire — remplacez-moi"
    nb = draw.textbbox((0, 0), note, font=fr)
    nw = nb[2] - nb[0]
    draw.text(((w - nw) / 2, h - margin - (nb[3] - nb[1]) - 14), note, font=fr, fill=OR_CLAIR)

    path = os.path.join(OUT_DIR, filename)
    img.save(path, "JPEG", quality=85)
    print("Créé :", os.path.relpath(path))


def make_hero(filename, w, h):
    """Fond d'accueil discret : dégradé sombre + fines lignes obliques dorées,
    petite mention en bas. Pensé pour laisser lisible le titre par-dessus."""
    img = vertical_gradient(w, h, (20, 20, 23), NOIR)
    draw = ImageDraw.Draw(img, "RGBA")

    # fines diagonales dorées très discrètes
    step = 120
    for x in range(-h, w, step):
        draw.line([(x, h), (x + h, 0)], fill=(201, 162, 75, 22), width=2)

    # ciseaux discrets en filigrane, en bas à droite
    draw_scissors(draw, int(w * 0.82), int(h * 0.7), scale=min(w, h) / 90,
                  color=(201, 162, 75, 70))

    # petite mention en bas à gauche
    fr = load_font(max(14, int(h / 44)))
    note = "Image d'accueil temporaire — remplacez images/hero.jpg"
    draw.text((int(w * 0.04), int(h * 0.9)), note, font=fr, fill=(224, 194, 116, 210))

    path = os.path.join(OUT_DIR, filename)
    img.convert("RGB").save(path, "JPEG", quality=85)
    print("Créé :", os.path.relpath(path))


# Image principale (hero) — large et discrète
make_hero("hero.jpg", 1920, 1080)

# Présentation du salon
make_image("salon.jpg", 900, 1100, "Le salon", "Photo de présentation")

# Galerie
make_image("galerie-1.jpg", 800, 1100, "Galerie 01", "Coupe homme")
make_image("galerie-2.jpg", 800, 800, "Galerie 02", "Coupe + barbe")
make_image("galerie-3.jpg", 800, 800, "Galerie 03", "Barbe")
make_image("galerie-4.jpg", 1200, 800, "Galerie 04", "Ambiance du salon")
make_image("galerie-5.jpg", 800, 800, "Galerie 05", "Enfant")
make_image("galerie-6.jpg", 800, 800, "Galerie 06", "Détail")

print("\nToutes les images placeholder ont été générées dans images/.")
