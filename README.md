# Marcos A. Cruz Bazan // Engineering Portfolio

A high-performance personal engineering portfolio designed to showcase low-latency systems, socket networking protocols, explainable security telemetry, and cross-platform architectures.

Live deployment: **[https://mrmarquito.github.io/](https://mrmarquito.github.io/)**

---

## Architecture & Visual Features

* **Systems & Infrastructure UI:** Engineered with a focused dark-mode developer theme utilizing custom CSS properties, balanced contrast ratios, and scannable typographic hierarchy (*Inter*, *JetBrains Mono*).
* **Interactive RFC 959 Protocol Sandbox:** Built-in modal testbench simulating low-level FTP transport handshakes and dynamic passive mode (`PASV`) port decoding: `(P1 * 256) + P2`.
* **Modular Codebase:** Decoupled architecture separating presentation logic, styling tokens, and interactive scripts across dedicated asset directories.
* **Domain Filter Switchboard:** Client-side category filtering enabling seamless views across Systems & Networks, Security & AI, and Full Stack applications.
* **Ambient Canvas Engine:** Vanilla JavaScript HTML5 Canvas particle engine rendering real-time interactive vector nodes without layout reflows.
* **Subtle Audio Synthesis:** Optional Web Audio API engine providing synthesized 30ms high-frequency feedback on user interaction.
* **Zero Framework Overhead:** Implemented strictly in semantic HTML5, modern CSS3 (Flexbox & Grid), and native ES6+ JavaScript without external runtime dependencies.

---

## Featured Systems

| System | Architecture & Stack | Focus Area |
| :--- | :--- | :--- |
| **TruthScore** | Flutter, FastAPI, Node/Hono, Azure SQL, Scikit-Learn | Dynamic zero-trust IAM risk scoring and Explainable AI (XAI) |
| **Socket FTP Protocol Client** | Python, Raw BSD Sockets, TCP/IP, RFC 959 | Bare-metal TCP handshake handling, PASV bit-shifting, and packet streams |
| **FleetFlow Logistics** | C++, Kinematic Physics, Autonomous Routing | Kinematic vehicle trajectory simulation and spatial routing algorithms |
| **SchemaFlow Studio** | Flutter Web, Canvas API, SQL DDL | Visual entity-relationship graph modeling and dynamic ANSI SQL generation |
| **GeekText Bookstore API** | FastAPI, SQLAlchemy, SQLite / PostgreSQL, Flutter Web | High-throughput inventory catalog, ORM modeling, and client tooling |
| **Culinary Engine** | Flutter, Dart, REST Integration, Client-Side Cache | Typo-tolerant heuristic queries, infinite scrolling, and offline persistence |

---

## Technical Arsenal

* **Languages:** Swift (Apple Certified), Python (AsyncIO, Sockets), C++, C, Java, Dart, SQL
* **Systems & Networking:** Raw Socket Programming (TCP/IP), Zero-Trust IAM, RFC 959 Protocol, Linux, Docker
* **Frameworks & Tools:** Flutter, FastAPI, Node.js, Hono API, Scikit-Learn, SQLAlchemy ORM, Git
* **Typography & Icons:** Inter, JetBrains Mono, FontAwesome 6.5.1, Devicon

---

## Repository Structure

```text
├── index.html              # Semantic HTML5 entrypoint and structural layout
├── README.md               # Project overview, architecture, and documentation
├── .gitignore              # Ignored local environment artifacts
└── assets/
    ├── css/
    │   └── main.css        # Design tokens, modal interfaces, and responsive styles
    ├── docs/
    │   └── resume.pdf      # Downloadable PDF resume
    └── js/
        └── app.js          # Canvas particle engine, audio synthesizer, and testbench logic
