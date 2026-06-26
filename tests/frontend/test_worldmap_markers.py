"""
Frontend regression: verifies the WorldMap section renders all 5 map markers
with the corrected coordinates after the Kenya/Uganda bug fix.

Run manually:
    pytest /app/tests/frontend/test_worldmap_markers.py -v

NOTE: This test uses Playwright. It expects REACT_APP_BACKEND_URL to be set
in the environment OR /app/frontend/.env to contain it.
"""
import os
import re
import pytest
from pathlib import Path


def _get_frontend_url() -> str:
    url = os.environ.get("REACT_APP_BACKEND_URL")
    if url:
        return url.rstrip("/")
    env_file = Path("/app/frontend/.env")
    if env_file.exists():
        for line in env_file.read_text().splitlines():
            m = re.match(r"\s*REACT_APP_BACKEND_URL\s*=\s*(.+)\s*$", line)
            if m:
                return m.group(1).strip().rstrip("/")
    raise RuntimeError("REACT_APP_BACKEND_URL not configured")


EXPECTED_MARKERS = {
    "maldives":    {"left": 63.0, "top": 49.0,  "project": "One&Only Reethi Rah Resort"},
    "kenya":       {"left": 56.0, "top": 51.5,  "project": "Mombasa Port Development"},
    "uganda":      {"left": 53.5, "top": 49.5,  "project": "Kyambura & Muvumbe Hydropower"},
    "myanmar":     {"left": 73.0, "top": 43.0,  "project": "Thilawa Port Expansion"},
    "new-zealand": {"left": 90.0, "top": 66.0,  "project": "Based in Auckland"},
}


@pytest.mark.asyncio
async def test_worldmap_markers_present_and_correctly_positioned():
    from playwright.async_api import async_playwright

    url = _get_frontend_url()
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        context = await browser.new_context(viewport={"width": 1440, "height": 2400})
        page = await context.new_page()
        await page.goto(url, wait_until="networkidle")
        await page.wait_for_timeout(1000)

        # Disable Lenis smooth-scrolling so scrollIntoView is honoured
        await page.evaluate(
            "() => { if (window.__lenis) { try { window.__lenis.destroy(); } catch(e){} window.__lenis = null; } }"
        )
        await page.evaluate(
            """() => {
                const h = Array.from(document.querySelectorAll('h2,h3,h1'))
                  .find(el => el.textContent && el.textContent.includes('Projects across Asia, Africa'));
                if (h) h.scrollIntoView({behavior: 'instant', block: 'start'});
            }"""
        )
        await page.wait_for_timeout(1500)

        # 1. All 5 markers exist in DOM with their data-testid
        for name in EXPECTED_MARKERS:
            sel = f'[data-testid="map-marker-{name}"]'
            assert await page.query_selector(sel) is not None, f"Marker {name} missing"

        # 2. Marker positions match expected percentages (within tolerance)
        positions = await page.evaluate(
            """() => {
                const img = document.querySelector('img[alt=\"World map of project locations\"]');
                const ir = img.getBoundingClientRect();
                const out = {};
                ['maldives','kenya','uganda','myanmar','new-zealand'].forEach(n => {
                    const el = document.querySelector(`[data-testid=\"map-marker-${n}\"]`);
                    const r = el.getBoundingClientRect();
                    const cx = r.left + r.width/2, cy = r.top + r.height/2;
                    out[n] = { leftPct: (cx - ir.left) / ir.width * 100,
                               topPct:  (cy - ir.top)  / ir.height * 100 };
                });
                return out;
            }"""
        )
        for name, expected in EXPECTED_MARKERS.items():
            got = positions[name]
            assert abs(got["leftPct"] - expected["left"]) < 1.5, (
                f"{name} leftPct={got['leftPct']:.2f}, expected~{expected['left']}"
            )
            assert abs(got["topPct"] - expected["top"]) < 1.5, (
                f"{name} topPct={got['topPct']:.2f}, expected~{expected['top']}"
            )

        # 3. Kenya/Uganda must be in the African landmass band (left% < 58)
        assert positions["kenya"]["leftPct"]  < 58.0, "Kenya marker drifted east of Africa"
        assert positions["uganda"]["leftPct"] < 55.5, "Uganda marker drifted east"
        assert positions["uganda"]["leftPct"] < positions["kenya"]["leftPct"], (
            "Uganda must be west of Kenya"
        )

        # 4. Clicking each marker reveals the project tooltip
        for name, expected in EXPECTED_MARKERS.items():
            await page.click(f'[data-testid="map-marker-{name}"]', force=True)
            await page.wait_for_timeout(300)
            tooltip = await page.evaluate(
                "() => Array.from(document.querySelectorAll('.bg-popover')).map(p => p.textContent.trim()).join('|')"
            )
            assert expected["project"] in tooltip, (
                f"Tooltip for {name} missing '{expected['project']}', got: {tooltip}"
            )

        # 5. Legend lists all 5
        legend_text = await page.evaluate(
            """() => {
                const sec = Array.from(document.querySelectorAll('section'))
                  .find(s => s.textContent.includes('Global Footprint'));
                return sec ? sec.textContent : '';
            }"""
        )
        for label in ["Maldives", "Kenya", "Uganda", "Myanmar", "New Zealand"]:
            assert label in legend_text, f"Legend missing {label}"

        await browser.close()
