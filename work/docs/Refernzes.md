# References Guide: Comparative Generative Frameworks

This document compiles and details the core academic references suggested for the comparative evaluation of DDPM, Flow Matching, and Rectified Flow models.

---

## 1. Core Generative Paradigms (SDE & ODE Frameworks)

### Denoising Diffusion Probabilistic Models (DDPM)
* **Reference:** Ho, J., Jain, A., & Abbeel, P. (2020). *Denoising Diffusion Probabilistic Models*. Advances in Neural Information Processing Systems (NeurIPS 2020), 33, 6840-6851.
* **Relevance:** Establishes the mathematical baseline for SDE-based reverse-time diffusion and noise prediction.

### Flow Matching (Eulerian View)
* **Reference:** Lipman, Y., Chen, R. T. Q., Ben-Hamu, H., Nicklas, M., & Le, M. (2022). *Flow Matching for Generative Modeling*. arXiv preprint arXiv:2210.02747.
* **Relevance:** Introduces continuous, deterministic velocity fields mapping Gaussian noise to data distributions.

### Rectified Flow (Lagrangian View & Straightening)
* **Reference:** Liu, Q., Ji, A., & Deng, J. (2022). *Flow Straight and Fast: Learning to Generate and Transfer Data with Rectified Flow*. arXiv preprint arXiv:2209.03003.
* **Relevance:** Defines the three-phase "Reflow" procedure (rewiring trajectories to eliminate intersections) which enables 1-step inference.

### Stochastic Interpolants (Unifying Framework)
* **Reference:** Albergo, M. S., Boffi, N. M., & Vanden-Eijnden, E. (2023). *Stochastic Interpolants: A Unifying Framework for Flows and Diffusions*. arXiv preprint arXiv:2303.08797.
* **Relevance:** Connects diffusion processes and flow matching mathematically through interpolation paths.

---

## 2. Fast Sampling & Specialized Solvers

### Denoising Diffusion Implicit Models (DDIM)
* **Reference:** Song, J., Meng, C., & Ermon, S. (2020). *Denoising Diffusion Implicit Models*. arXiv preprint arXiv:2010.02502.
* **Relevance:** Early baseline for transitioning from Markov chains to deterministic ODE sampling in diffusion.

### DPM-Solver (Higher-Order ODE Integrators)
* **Reference:** Lu, C., Zhou, Y., Li, C., & Zhu, J. (2022). *DPM-Solver: A Fast ODE Solver for Diffusion Probabilistic Model Sampling*. Advances in Neural Information Processing Systems (NeurIPS 2022).
* **Relevance:** Standard reference for using specialized numerical solvers to reduce steps in flow and diffusion models.

---

## 3. Neural Architecture & Optimizer Stack

### Convolutional U-Net Backbone
* **Reference:** Ronneberger, O., Fischer, P., & Brox, T. (2015). *U-Net: Convolutional Networks for Biomedical Image Segmentation*. Medical Image Computing and Computer-Assisted Intervention (MICCAI 2015).
* **Relevance:** The core spatial feature backbone used to predict noise and velocity fields in image synthesis.

### Sinusoidal Timestep Embeddings
* **Reference:** Vaswani, A., Shazeer, N., Parmar, N., Uszkoreit, J., Jones, L., Gomez, A. N., Kaiser, L., & Polosukhin, I. (2017). *Attention Is All You Need*. Advances in Neural Information Processing Systems (NeurIPS 2017), 30, 5998-6008.
* **Relevance:** Defines the sinusoidal position embedding formulas used to encode the continuous time step $t$ into the U-Net layers.

### Adam Optimizer
* **Reference:** Kingma, D. P., & Ba, J. (2014). *Adam: A Method for Stochastic Optimization*. International Conference on Learning Representations (ICLR 2015).
* **Relevance:** The optimization algorithm utilized to train all three models.

---

## 4. Course Deliverables Context

### Course Syllabus Guide
* **Reference:** Generative Modeling Course Staff. (2026). *Course Project Guide: Generative Modeling: Diffusion, Flow Matching, and Stochastic Interpolants*. Master's Course in Generative Machine Learning.
* **Relevance:** Documents the specific bundle boundaries (Bundle A2) and evaluation metrics requirements.
