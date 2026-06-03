# Interactive Evaluation Report Dashboard

An interactive, premium single-page web dashboard demonstrating the comparative results of **Denoising Diffusion Probabilistic Models (DDPM)**, **Flow Matching (FM)**, and **Rectified Flow (RM)**.

This dashboard features:
- A dual-view architecture comparing results across two datasets (**2D Two Moons** and **CelebA 64x64 Faces**).
- Full mathematical theory boxes rendered interactively with KaTeX support.
- Performance logs matching physical measurements on an **NVIDIA RTX A5000 Laptop GPU**.
- Toggle controls to examine and inspect CelebA generation grids visually (comparing 50-step DDPM, 50-step Flow Matching, and 1-step Rectified Flow).
- High-fidelity styling incorporating CSS glassmorphism, responsive grid templates, transitions, and a dark/light theme toggle.

---

## Directory Structure

```
C:\Users\joach\antiG\report\
├── index.html          # Semantic page structure & KaTeX scripts
├── style.css           # Design system tokens, variables, typography & layout styles
├── app.js              # Theme-switching, tabs toggler, and dataset logic
├── README.md           # This document
└── assets/             # Benchmarking plots and logs
    ├── moons_loss.png
    ├── moons_comparison.png
    ├── celeba_loss.png
    ├── celeba_ddpm.png
    ├── celeba_fm.png
    ├── celeba_rf_1step.png
    └── evaluation_summary.csv
```

---

## How to Run Locally

Because the web dashboard fetches local assets (images, CSVs, stylesheets) and runs scripts, it is best previewed through a local HTTP web server rather than opening the HTML file directly (to avoid CORS policy restrictions).

### Option A: Using Python (Recommended)
Python is pre-installed on this machine. Run this command in your PowerShell terminal to start a server:

```powershell
python -m http.server 8000 --directory C:\Users\joach\antiG\report
```

Then open your browser and navigate to:
[http://localhost:8000](http://localhost:8000)

### Option B: Using Node.js (npx)
If Node.js is available:

```powershell
npx http-server C:\Users\joach\antiG\report -p 8000
```

Then navigate to:
[http://localhost:8000](http://localhost:8000)
