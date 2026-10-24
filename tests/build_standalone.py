from pathlib import Path
import re
root=Path(__file__).resolve().parents[1]
html=(root/'dev.html').read_text(encoding='utf8')
css=(root/'src/style.css').read_text(encoding='utf8')
sources=['renderer.js','audio.js','i18n.js','levels.js','game.js','main.js']
js='\n\n'.join(re.sub(r'^import .*?;\s*$', '', (root/'src'/file).read_text(encoding='utf8'), flags=re.M).replace('export class ','class ').replace('export const ','const ').replace('export function ','function ') for file in sources)
html=html.replace('<link rel="stylesheet" href="./src/style.css">','<style>\n'+css+'\n</style>')
html=html.replace('<script type="module" src="./src/main.js"></script>','<script>\n'+js+'\n</script>')
(root/'play.html').write_text(html,encoding='utf8')
(root/'index.html').write_text(html,encoding='utf8')
(root/'tests/game.bundle.js').write_text(js,encoding='utf8')
print(f'Created index.html + play.html ({(root/"play.html").stat().st_size:,} bytes each)')