# References — Deep Field

The references below explain the **principles borrowed**, not an affiliation, a certification or a
copy of anyone's work. No third-party image, logo, font or composition was reused in the theme or in
the ten wallpapers.

| Reference | Principle borrowed | Not reused |
| --- | --- | --- |
| Astronomical observatory photography (dome, tube, instrument) | Deep black, amber instrument light, subject on the right, calm left half | No real site, no manufacturer image, no instrument brand |
| Visual documentation of server rooms and network closets | Black racks, sparse status LEDs, tidy cabling, floor reflections | No vendor logo, no readable label |
| Scientific hardware (radio telescopes, interferometry, mechanical orrery) | Machined precision, brass and steel, measuring geometry | No reproduction of an existing instrument |
| Omarchy native themes (`colors.toml`, `default/themed/*.tpl`) | Semantic colour contract, generated application configs | No stock palette or file copied |
| Omarchy manual, *Making your own theme* | Theme layout, what an installed theme keeps or drops | n/a |

## Production chain

- Theme: self-contained `deep-field` folder, original palette, no file in `/usr/share/omarchy/`
  modified.
- Icons: original vector artwork (`icons/*.svg`), one instrument plate and one amber stroke per
  application; no third-party icon set copied.
- Wallpapers: generated with the **built-in image tool of the official Codex CLI**, signed in with a
  ChatGPT subscription. No API key, no `image_gen.py` script, no third-party provider, no browser
  generation.
- Preview page: plain HTML/CSS/JS, no network dependency. It is explicitly illustrative and runs no
  system command.

## Disclosed unknowns

- Exact image model identifier: **not exposed** by the client.
- Quota consumed and marginal cost of generation: **not exposed**. A subscription proves neither
  unlimited quota nor zero cost.
- The wallpapers are synthetic artworks, not photographs of real places.
