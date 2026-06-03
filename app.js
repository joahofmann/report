// Dataset State Store
const datasetData = {
    moons: {
        title: "Dataset: 2D Two Moons Point Cloud",
        summary: "A continuous 2D coordinate dataset consisting of two interlocking semi-circular regions. Ideal for tracing exact vector paths, trajectory curvature, and learning dynamics in small spaces.",
        lossImg: "assets/moons_loss.png",
        sampleImg: "assets/moons_comparison.png",
        heroSpeedup: "Instant",
        heroStraightness: "1.0040",
        heroNfe: "1",
        params: [
            { label: "Device", value: "cuda (NVIDIA RTX A5000)" },
            { label: "Dataset Size", value: "2,000 points" },
            { label: "Batch Size", value: "128" },
            { label: "Learning Rate", value: "0.005" },
            { label: "Optimizer", value: "Adam" },
            { label: "MLP Hidden Dimension", value: "128" },
            { label: "Training Epochs (FM/RF)", value: "3,000" },
            { label: "Training Epochs (DDPM)", value: "4,000" }
        ],
        metrics: [
            { method: "DDPM (stochastic)", nfe: "100", time: "49.98 ms", chamfer: "0.112546", fid: "0.009454", straightness: "N/A", highlight: "ddpm" },
            { method: "Flow Matching (50 steps)", nfe: "50", time: "10.52 ms", chamfer: "0.121606", fid: "0.006850", straightness: "2.363557", highlight: "fm" },
            { method: "Flow Matching (1 step)", nfe: "1", time: "0.00 ms", chamfer: "0.814186", fid: "1.130001", straightness: "N/A", highlight: "" },
            { method: "Rectified Flow (1 step)", nfe: "1", time: "0.00 ms", chamfer: "0.136197", fid: "0.008219", straightness: "1.004052", highlight: "rf" }
        ]
    },
    celeba: {
        title: "Dataset: CelebA 64x64 Faces",
        summary: "A complex dataset composed of real celebrity face images cropped and scaled to 64x64 pixels. Used to evaluate image generation quality, sharpness, high-frequency details, and actual latency under high VRAM occupancy.",
        lossImg: "assets/celeba_loss.png",
        sampleImg: "assets/celeba_rf_1step.png", // Defaults to RF 1 step
        heroSpeedup: "55x",
        heroStraightness: "1.0000",
        heroNfe: "1",
        params: [
            { label: "Device", value: "cuda (NVIDIA RTX A5000)" },
            { label: "Cached Dataset Size", value: "10,000 images" },
            { label: "Batch Size", value: "64" },
            { label: "Learning Rate", value: "0.0003" },
            { label: "Optimizer", value: "Adam" },
            { label: "U-Net Down Channels", value: "64, 128, 256, 512" },
            { label: "U-Net Up Channels", value: "512, 256, 128, 64" },
            { label: "Training Epochs", value: "100" }
        ],
        metrics: [
            { method: "DDPM (50 steps)", nfe: "50", time: "54.11 ms/img", chamfer: "0.7711", fid: "10.1798", straightness: "N/A", highlight: "ddpm" },
            { method: "Flow Matching (50 steps)", nfe: "50", time: "53.83 ms/img", chamfer: "1.0857", fid: "3.6626", straightness: "0.9856", highlight: "fm" },
            { method: "Rectified Flow (50 steps)", nfe: "50", time: "53.56 ms/img", chamfer: "1.1874", fid: "10.4974", straightness: "0.9993", highlight: "" },
            { method: "Rectified Flow (1 step)", nfe: "1", time: "0.98 ms/img", chamfer: "1.0489", fid: "8.9868", straightness: "1.0000", highlight: "rf" }
        ]
    }
};

// Current active states
let currentDataset = 'moons';
let activeCelebAGrid = 'rf';

// DOM Elements
const datasetTitle = document.getElementById('dataset-title');
const datasetSummary = document.getElementById('dataset-summary');
const lossImg = document.getElementById('loss-img');
const sampleImg = document.getElementById('sample-img');
const paramsContainer = document.getElementById('params-container');
const metricsTbody = document.getElementById('metrics-tbody');
const celebaSelector = document.getElementById('celeba-selector');
const celebaGridDesc = document.getElementById('celeba-grid-desc');

const heroSpeedup = document.getElementById('hero-speedup');
const heroStraightness = document.getElementById('hero-straightness');
const heroNfe = document.getElementById('hero-nfe');

// Initialize view
function init() {
    renderDataset(currentDataset);
    setupThemeToggle();
    setupScrollTracker();
}

// Switch Dataset: 'moons' or 'celeba'
function switchDataset(dataset) {
    if (dataset === currentDataset) return;
    
    currentDataset = dataset;
    
    // Toggle active buttons
    document.getElementById('tab-moons').classList.toggle('active', dataset === 'moons');
    document.getElementById('tab-celeba').classList.toggle('active', dataset === 'celeba');
    
    renderDataset(dataset);
}

// Render Dataset UI components
function renderDataset(key) {
    const data = datasetData[key];
    
    // Update headers and text
    datasetTitle.textContent = data.title;
    datasetSummary.textContent = data.summary;
    
    // Update hero stats
    heroSpeedup.textContent = data.heroSpeedup;
    heroStraightness.textContent = data.heroStraightness;
    heroNfe.textContent = data.heroNfe;
    
    // Update images
    lossImg.src = data.lossImg;
    
    if (key === 'moons') {
        sampleImg.src = data.sampleImg;
        celebaSelector.classList.add('hidden');
    } else {
        // CelebA mode shows grid selection panel
        celebaSelector.classList.remove('hidden');
        switchCelebAGrid(activeCelebAGrid); // load current active grid
    }
    
    // Render Parameter Items
    paramsContainer.innerHTML = '';
    data.params.forEach(param => {
        const item = document.createElement('div');
        item.className = 'param-item';
        item.innerHTML = `
            <div class="param-label">${param.label}</div>
            <div class="param-value">${param.value}</div>
        `;
        paramsContainer.appendChild(item);
    });
    
    // Render Metrics Table Rows
    metricsTbody.innerHTML = '';
    data.metrics.forEach(row => {
        const tr = document.createElement('tr');
        
        let highlightClass = '';
        if (row.highlight === 'rf') highlightClass = 'highlight-rf';
        else if (row.highlight === 'fm') highlightClass = 'highlight-fm';
        else if (row.highlight === 'ddpm') highlightClass = 'highlight-ddpm';
        
        const methodCell = highlightClass 
            ? `<td class="${highlightClass}"><strong>${row.method}</strong></td>` 
            : `<td>${row.method}</td>`;
            
        tr.innerHTML = `
            ${methodCell}
            <td>${row.nfe}</td>
            <td>${row.time}</td>
            <td>${row.chamfer}</td>
            <td>${row.fid}</td>
            <td>${row.straightness}</td>
        `;
        metricsTbody.appendChild(tr);
    });
}

// Switch CelebA face grid image selection
function switchCelebAGrid(method) {
    if (currentDataset !== 'celeba') return;
    
    activeCelebAGrid = method;
    
    // Set active button styling
    const btns = celebaSelector.querySelectorAll('.selector-btn');
    btns[0].classList.toggle('active', method === 'ddpm');
    btns[1].classList.toggle('active', method === 'fm');
    btns[2].classList.toggle('active', method === 'rf');
    
    // Update active image and caption details
    if (method === 'ddpm') {
        sampleImg.src = "assets/celeba_ddpm.png";
        celebaGridDesc.textContent = "DDPM (50 steps): Exhibits reasonable facial geometric details, but is computationally expensive due to stochastic reverse loops.";
    } else if (method === 'fm') {
        sampleImg.src = "assets/celeba_fm.png";
        celebaGridDesc.textContent = "Flow Matching (50 steps): Produces sharp images with excellent early feature convergence. The paths remain slightly curved.";
    } else if (method === 'rf') {
        sampleImg.src = "assets/celeba_rf_1step.png";
        celebaGridDesc.textContent = "Rectified Flow (1 step): Yields highly comparable faces in only a SINGLE U-Net evaluation step. Extremely fast latency of 0.98 ms.";
    }
}

// Setup Light/Dark Theme Switching
function setupThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const toggleIcon = toggleBtn.querySelector('.toggle-icon');
    
    toggleBtn.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            toggleIcon.textContent = '🌙';
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            toggleIcon.textContent = '☀️';
        }
    });
}

// Sidebar Navigation Tracker
function setupScrollTracker() {
    const sections = document.querySelectorAll('.content-section');
    const navItems = document.querySelectorAll('.nav-item');
    
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;
                navItems.forEach(item => {
                    item.classList.toggle('active', item.getAttribute('href') === `#${activeId}`);
                });
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));
}

// Run loader on startup
document.addEventListener('DOMContentLoaded', init);
