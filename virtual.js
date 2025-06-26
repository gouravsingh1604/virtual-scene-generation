const form = document.getElementById('scene-form');
const sceneContainer = document.getElementById('scene-container');

// Initialize Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, sceneContainer.offsetWidth / sceneContainer.offsetHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(sceneContainer.offsetWidth, sceneContainer.offsetHeight);
sceneContainer.appendChild(renderer.domElement);

// Add a basic ground plane
const groundGeometry = new THREE.PlaneGeometry(100, 100);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x88cc88 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 5).normalize();
scene.add(light);

// Camera position
camera.position.set(0, 10, 20);

// Function to generate the scene based on input
function generateScene({ weather, season, geography }) {
    // Clear previous objects
    while (scene.children.length > 2) {
        scene.remove(scene.children[2]);
    }

    // Adjust lighting and environment based on weather
    if (weather === 'rainy') {
        scene.background = new THREE.Color(0x5555ff);
    } else if (weather === 'foggy') {
        scene.fog = new THREE.Fog(0xaaaaaa, 10, 50);
    } else {
        scene.background = new THREE.Color(0x87ceeb);
    }

    // Add objects based on geography
    if (geography === 'hilly') {
        for (let i = 0; i < 10; i++) {
            const hillGeometry = new THREE.ConeGeometry(5, 20, 32);
            const hillMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
            const hill = new THREE.Mesh(hillGeometry, hillMaterial);
            hill.position.set(Math.random() * 50 - 25, 0, Math.random() * 50 - 25);
            scene.add(hill);
        }
    } else if (geography === 'open_field') {
        // Flat terrain
    } else if (geography === 'market') {
        // Add market stalls
        for (let i = 0; i < 5; i++) {
            const stallGeometry = new THREE.BoxGeometry(4, 4, 4);
            const stallMaterial = new THREE.MeshStandardMaterial({ color: 0xffcc00 });
            const stall = new THREE.Mesh(stallGeometry, stallMaterial);
            stall.position.set(i * 6 - 15, 2, 0);
            scene.add(stall);
        }
    }
}

// Form submission handler
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const weather = document.getElementById('weather').value;
    const season = document.getElementById('season').value;
    const geography = document.getElementById('geography').value;

    generateScene({ weather, season, geography });
    animate();
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera); 
}
