# Marcos Cruz Bazan // Portfolio Terminal

A high-performance personal portfolio built with a futuristic cyberpunk HUD aesthetic, designed to showcase systems engineering, low-latency architectures, and cross-platform applications.

Live deployment: **[https://mrmarquito.github.io/](https://mrmarquito.github.io/)**

---

## Architecture & Visual Features

* **Cyberpunk HUD Interface:** Styled with neon cyan (`#00f0ff`) and electric magenta accents, chamfered polygon clip-path borders, and a subtle scanline grid backdrop.
* **Interactive Canvas Particle Engine:** Built with vanilla JavaScript on the HTML5 Canvas API to render real-time, responsive node-network particle trajectories.
* **Dual-State Telemetry Cards:** Interactive project cards utilizing CSS transforms and responsive touch-detection (`IntersectionObserver` and click/hover overlays) for desktop and mobile displays.
* **Typographic Hierarchy:** Combines *Rajdhani* (display titles), *JetBrains Mono* (telemetry, tags, status indicators), and *Space Grotesk* (body copy).
* **Zero External JS Frameworks:** Implemented entirely in semantic HTML5, modern CSS3 (Custom Properties, Grid, Flexbox), and native ES6+ JavaScript without third-party library overhead.

---

## Featured Systems

| System | Architecture & Stack | Focus Area |
| :--- | :--- | :--- |
| **TruthScore** | Flutter, FastAPI, Node/Hono, Azure SQL, Scikit-Learn | Dynamic zero-trust IAM risk scoring and Explainable AI (XAI) |
| **Culinary Engine** | Flutter, Dart, Spoonacular API, `shared_preferences` | Heuristic search, infinite pagination, and client-side offline caching |
| **GeekText RESTful API** | FastAPI, SQLAlchemy, SQLite, Flutter Web | High-throughput bookstore API and ORM database design |
| **FleetFlow Logistics** | C++, Object-Oriented Kinematics | Kinematic vehicle simulation and spatial trajectory modeling |
| **Socket FTP Client** | Python, Raw BSD Sockets, RFC 959 | Low-level TCP handshake handling, PASV bit-shifting, and packet transmission |
| **SchemaFlow Studio** | Flutter Web, Interactive Canvas | Visual entity-relationship modeling and real-time SQL DDL generation |

---

## Tech Stack

* **Core:** Semantic HTML5, CSS3, Vanilla JavaScript (Canvas API, DOM API, Intersection Observer API)
* **Design Systems:** CSS Custom Properties (`:root`), Chamfered Clip-Paths, Glassmorphism, CSS Grid & Flexbox
* **Typography & Assets:** Google Fonts (*Rajdhani*, *JetBrains Mono*, *Space Grotesk*), FontAwesome 6.5.1

---

## Repository Structure

```text
├── index.html         # Complete single-page portfolio, styles, and canvas scripts
└── README.md          # Project documentation
