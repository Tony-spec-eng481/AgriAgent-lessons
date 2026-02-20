# 🌾 AgriAgent: Interactive Multimedia Learning Platform

**AgriAgent** is a modern, interactive e-learning platform developed for SSE 2208: Multimedia Systems.

The project demonstrates seamless integration of synchronized video, audio, procedural animation, and user interactivity to create an immersive agricultural learning experience.

---

## 🚀 Technical Stack

- **Framework:** React.js (State Management & UI)  
- **Multimedia Engine:** p5.js (Instance Mode)  
- **Animations:** GSAP (GreenSock) & Framer Motion  
- **Iconography:** Lucide-React  
- **Styling:** CSS3 & Tailwind CSS  

---

## 🎯 Multimedia Rubric Fulfillment

### 🎥 Video Integration (8 Marks)

- HD video rendered directly onto the p5.js canvas using `p.image()`.
- Custom play/pause system (no default browser controls).
- Custom progress bar with seek functionality.
- React-controlled playback state.

---

### 🔊 Audio & Sound (8 Marks)

**Atmospheric Audio**
- Looping `rain.mp3` track.
- Fully synchronized with video playback.

**Instructional Audio**
- Topic-based `IntroAudio` components.
- Visual UI indicators for active ambience.

---

### 🎨 Animation & Graphics (6 Marks)

#### Procedural Animation
- 🌞 Moving Sun  
- 🌱 Growing Crop  

Animations run only when the video is playing (state-driven logic).

#### Pixel Transition System
- GSAP-powered grid animation  
- Mathematical pixel size calculation for smooth content reveal  

---

### 🖱️ Interactivity (5 Marks)

- Click-to-play / Click-to-pause  
- Custom seek bar navigation  
- Hover effects  
- Fully responsive multimedia canvas  

---

## 👥 Group 481 – Team Members & Roles

| Name | Role | Contribution |
|------|------|--------------|
| John Warui | Lead Developer | Core system architecture, multimedia engine integration, technical implementation |
| Sammy Kiprop | System Architect & Integration Engineer | React state management, p5.js integration, animation logic |
| Ian Kipchichir | Media & Asset Coordinator | Audio/video asset management and optimization |
| Kagundu Joel Mwendwa | Documentation Lead | Technical writing, project report, presentation preparation |
| Cliff Kiprono | QA & Testing Lead | System testing, debugging, cross-browser validation |

---

## 🛠️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Tony-spec-eng481/AgriAgent-lessons.git
