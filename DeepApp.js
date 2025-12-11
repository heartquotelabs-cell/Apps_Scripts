// ============================================
// FIREBASE IMPORTS & CONFIG (MODULAR VERSION)
// ============================================
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    getFirestore, 
    collection, 
    query, 
    orderBy, 
    onSnapshot, 
    addDoc, 
    updateDoc, 
    deleteDoc, 
    doc, 
    serverTimestamp 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyATPfQaQaa6ZXxMHSYVluTwabcvnCdRP4o",
    authDomain: "university-7057b.firebaseapp.com",
    databaseURL: "https://university-7057b-default-rtdb.firebaseio.com",
    projectId: "university-7057b",
    storageBucket: "university-7057b.firebasestorage.app",
    messagingSenderId: "942212283522",
    appId: "1:942212283522:web:6308e7a75d5c2a32bf489b",
    measurementId: "G-HC2812Z29C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================
// WHATSAPP GROUP MANAGEMENT - FIREBASE EDITION
// All styles and elements created via JavaScript
// ============================================

// ============================================
// INJECT STYLES
// ============================================
(function injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #25D366;
            --primary-dark: #128C7E;
            --primary-light: #DCF8C6;
            --secondary: #075E54;
            --background: #f0f2f5;
            --card-bg: #ffffff;
            --text-primary: #1a1a1a;
            --text-secondary: #667781;
            --text-muted: #8696a0;
            --border: #e9edef;
            --danger: #ea4335;
            --danger-light: #fce8e6;
            --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
            --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
            --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
            --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);
            --radius: 12px;
            --radius-lg: 16px;
        }

        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            color: var(--text-primary);
            line-height: 1.6;
        }

        .app-container {
            min-height: 100vh;
            background: var(--background);
        }

        .header {
            background: linear-gradient(135deg, var(--secondary) 0%, var(--primary-dark) 100%);
            padding: 24px 20px;
            color: white;
            position: sticky;
            top: 0;
            z-index: 100;
            box-shadow: var(--shadow-lg);
        }

        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 16px;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .logo-icon {
            width: 48px;
            height: 48px;
            background: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: var(--shadow-md);
        }

        .logo-icon svg {
            width: 28px;
            height: 28px;
            color: var(--primary);
        }

        .logo-text {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
        }

        .header-actions {
            display: flex;
            align-items: center;
            gap: 12px;
        }

        .admin-badge {
            background: rgba(255,255,255,0.2);
            padding: 6px 14px;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 500;
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .admin-badge::before {
            content: '';
            width: 8px;
            height: 8px;
            background: #4ade80;
            border-radius: 50%;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            padding: 12px 12px;
            border-radius: var(--radius);
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.2s ease;
            border: none;
            text-decoration: none;
            font-family: inherit;
        }

        .btn-primary {
            background: var(--primary);
            color: white;
        }

        .btn-primary:hover {
            background: var(--primary-dark);
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }

        .btn-secondary {
            background: white;
            color: var(--text-primary);
            border: 1px solid var(--border);
        }

        .btn-secondary:hover {
            background: var(--background);
        }

        .btn-danger {
            background: var(--danger);
            color: white;
        }

        .btn-danger:hover {
            background: #d33426;
        }

        .btn-ghost {
            background: transparent;
            color: white;
            border: 1px solid rgba(255,255,255,0.3);
        }

        .btn-ghost:hover {
            background: rgba(255,255,255,0.1);
        }

        .btn-icon {
            width: 40px;
            height: 40px;
            padding: 0;
            border-radius: 10px;
        }

        .btn svg {
            width: 20px;
            height: 20px;
        }

        .main-content {
            max-width: 1200px;
            margin: 0 auto;
            padding: 32px 20px;
        }

        .stats-bar {
            display: flex;
            gap: 20px;
            margin-bottom: 32px;
            flex-wrap: wrap;
        }

        .stat-card {
            background: white;
            padding: 20px 24px;
            border-radius: var(--radius-lg);
            box-shadow: var(--shadow-sm);
            flex: 1;
            min-width: 200px;
            display: flex;
            align-items: center;
            gap: 16px;
            border: 1px solid var(--border);
        }

        .stat-icon {
            width: 52px;
            height: 52px;
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .stat-icon.green {
            background: var(--primary-light);
            color: var(--primary-dark);
        }

        .stat-icon.blue {
            background: #dbeafe;
            color: #2563eb;
        }

        .stat-icon svg {
            width: 24px;
            height: 24px;
        }

        .stat-info h3 {
            font-size: 1.75rem;
            font-weight: 700;
            color: var(--text-primary);
            font-family: 'Space Grotesk', sans-serif;
        }

        .stat-info p {
            font-size: 0.9rem;
            color: var(--text-secondary);
        }

        .section-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 24px;
            flex-wrap: wrap;
            gap: 16px;
        }

        .section-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
        }

        .groups-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 24px;
        }

        .group-card {
            background: white;
            border-radius: var(--radius-lg);
            padding: 24px;
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--border);
            transition: all 0.3s ease;
            position: relative;
            display: flex;
            flex-direction: column;
        }

        .group-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-xl);
        }

        .card-header {
            display: flex;
            align-items: flex-start;
            gap: 14px;
            margin-bottom: 16px;
        }

        .group-icon {
            width: 56px;
            height: 56px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            border-radius: var(--radius);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }

        .group-icon svg {
            width: 28px;
            height: 28px;
            color: white;
        }

        .group-info {
            flex: 1;
            min-width: 0;
        }

        .group-name {
            font-size: 1.15rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 4px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .group-meta {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.85rem;
            color: var(--text-muted);
        }

        .group-meta svg {
            width: 16px;
            height: 16px;
        }

        .admin-actions {
            position: absolute;
            top: 16px;
            right: 16px;
            display: flex;
            gap: 8px;
            opacity: 0;
            transition: opacity 0.2s ease;
        }

        .group-card:hover .admin-actions {
            opacity: 1;
        }

        .admin-actions .btn-icon {
            width: 36px;
            height: 36px;
            background: var(--background);
            color: var(--text-secondary);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            transition: all 0.2s ease;
        }

        .admin-actions .btn-icon:hover {
            background: var(--border);
            color: var(--text-primary);
        }

        .admin-actions .btn-icon.delete:hover {
            background: var(--danger-light);
            color: var(--danger);
        }

        .admin-actions .btn-icon svg {
            width: 18px;
            height: 18px;
        }

        .group-description {
            font-size: 0.95rem;
            color: var(--text-secondary);
            margin-bottom: 20px;
            flex: 1;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        .join-btn {
            width: 100%;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            padding: 14px;
            border-radius: var(--radius);
            font-size: 1rem;
            font-weight: 600;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            text-decoration: none;
            font-family: inherit;
        }

        .join-btn:hover {
            transform: scale(1.02);
            box-shadow: 0 8px 20px rgba(37, 211, 102, 0.3);
        }

        .join-btn svg {
            width: 22px;
            height: 22px;
        }

        .shimmer-card {
            background: white;
            border-radius: var(--radius-lg);
            padding: 24px;
            border: 1px solid var(--border);
        }

        .shimmer {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: shimmer 1.5s infinite;
            border-radius: 6px;
        }

        @keyframes shimmer {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
        }

        .shimmer-header {
            display: flex;
            gap: 14px;
            margin-bottom: 16px;
        }

        .shimmer-icon {
            width: 56px;
            height: 56px;
            border-radius: var(--radius);
        }

        .shimmer-title {
            height: 20px;
            width: 70%;
            margin-bottom: 8px;
        }

        .shimmer-meta {
            height: 16px;
            width: 40%;
        }

        .shimmer-desc {
            height: 16px;
            width: 100%;
            margin-bottom: 8px;
        }

        .shimmer-desc:last-of-type {
            width: 80%;
            margin-bottom: 20px;
        }

        .shimmer-btn {
            height: 48px;
            width: 100%;
        }

        .modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            backdrop-filter: blur(4px);
            z-index: 1000;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }

        .modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }

        .modal {
            background: white;
            border-radius: var(--radius-lg);
            width: 100%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            transform: scale(0.9) translateY(20px);
            transition: all 0.3s ease;
        }

        .modal-overlay.active .modal {
            transform: scale(1) translateY(0);
        }

        .modal-header {
            padding: 24px 24px 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .modal-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.35rem;
            font-weight: 700;
            color: var(--text-primary);
        }

        .modal-close {
            width: 40px;
            height: 40px;
            border: none;
            background: var(--background);
            border-radius: 10px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: var(--text-secondary);
            transition: all 0.2s ease;
        }

        .modal-close:hover {
            background: var(--border);
            color: var(--text-primary);
        }

        .modal-close svg {
            width: 20px;
            height: 20px;
        }

        .modal-body {
            padding: 24px;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-label {
            display: block;
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--text-primary);
            margin-bottom: 8px;
        }

        .form-input {
            width: 100%;
            padding: 14px 16px;
            border: 1px solid var(--border);
            border-radius: var(--radius);
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.2s ease;
            background: white;
        }

        .form-input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(37, 211, 102, 0.1);
        }

        .form-input::placeholder {
            color: var(--text-muted);
        }

        textarea.form-input {
            resize: vertical;
            min-height: 100px;
        }

        .modal-footer {
            padding: 0 24px 24px;
            display: flex;
            gap: 12px;
            justify-content: flex-end;
        }

        .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            background: linear-gradient(135deg, var(--secondary) 0%, var(--primary-dark) 100%);
        }

        .login-card {
            background: white;
            border-radius: var(--radius-lg);
            padding: 40px;
            width: 100%;
            max-width: 420px;
            box-shadow: var(--shadow-xl);
        }

        .login-header {
            text-align: center;
            margin-bottom: 32px;
        }

        .login-logo {
            width: 72px;
            height: 72px;
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            border-radius: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 20px;
        }

        .login-logo svg {
            width: 40px;
            height: 40px;
            color: white;
        }

        .login-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 8px;
        }

        .login-subtitle {
            color: var(--text-secondary);
            font-size: 0.95rem;
        }

        .login-error {
            background: var(--danger-light);
            color: var(--danger);
            padding: 12px 16px;
            border-radius: var(--radius);
            font-size: 0.9rem;
            margin-bottom: 20px;
            display: none;
        }

        .login-error.show {
            display: block;
        }

        .empty-state {
            text-align: center;
            padding: 60px 20px;
            grid-column: 1 / -1;
        }

        .empty-icon {
            width: 80px;
            height: 80px;
            background: var(--background);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 24px;
        }

        .empty-icon svg {
            width: 40px;
            height: 40px;
            color: var(--text-muted);
        }

        .empty-title {
            font-family: 'Space Grotesk', sans-serif;
            font-size: 1.35rem;
            font-weight: 700;
            color: var(--text-primary);
            margin-bottom: 8px;
        }

        .empty-text {
            color: var(--text-secondary);
            margin-bottom: 24px;
        }

        .toast-container {
            position: fixed;
            bottom: 24px;
            right: 24px;
            z-index: 2000;
        }

        .toast {
            background: var(--text-primary);
            color: white;
            padding: 16px 24px;
            border-radius: var(--radius);
            box-shadow: var(--shadow-xl);
            display: flex;
            align-items: center;
            gap: 12px;
            transform: translateX(120%);
            transition: transform 0.3s ease;
            margin-top: 12px;
        }

        .toast.show {
            transform: translateX(0);
        }

        .toast.success {
            background: var(--primary-dark);
        }

        .toast.error {
            background: var(--danger);
        }

        @media (max-width: 768px) {
            .header-content {
                flex-direction: column;
                text-align: center;
            }

            .groups-grid {
                grid-template-columns: 1fr;
            }

            .admin-actions {
                opacity: 1;
            }

            .stats-bar {
                flex-direction: column;
            }

            .stat-card {
                min-width: auto;
            }

            .modal {
                margin: 20px;
            }

            .login-card {
                padding: 28px;
            }
        }
    `;
    document.head.appendChild(style);
})();

// ============================================
// SVG ICONS
// ============================================
const icons = {
    whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    delete: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`,
    logout: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/></svg>`,
    group: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
};

// ============================================
// STATE MANAGEMENT
// ============================================
let state = {
    isAdmin: false,
    groups: [],
    isLoading: true,
    editingGroup: null
};

// Admin credentials (Change these for production!)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123'
};

// ============================================
// FIREBASE OPERATIONS (Updated with import syntax)
// ============================================
function subscribeToGroups() {
    state.isLoading = true;
    render();

    const groupsQuery = query(collection(db, 'groups'), orderBy('createdAt', 'desc'));
    
    return onSnapshot(groupsQuery,
        (snapshot) => {
            state.groups = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            state.isLoading = false;
            render();
        },
        (error) => {
            console.error('Error fetching groups:', error);
            state.isLoading = false;
            showToast('Error loading groups', 'error');
            render();
        }
    );
}

async function addGroup(groupData) {
    try {
        await addDoc(collection(db, 'groups'), {
            ...groupData,
            createdAt: serverTimestamp()
        });
        showToast('Group added successfully!', 'success');
        return true;
    } catch (error) {
        console.error('Error adding group:', error);
        showToast('Failed to add group', 'error');
        return false;
    }
}

async function updateGroup(id, groupData) {
    try {
        const groupRef = doc(db, 'groups', id);
        await updateDoc(groupRef, groupData);
        showToast('Group updated successfully!', 'success');
        return true;
    } catch (error) {
        console.error('Error updating group:', error);
        showToast('Failed to update group', 'error');
        return false;
    }
}

async function deleteGroup(id) {
    if (!confirm('Are you sure you want to delete this group?')) return;
    
    try {
        const groupRef = doc(db, 'groups', id);
        await deleteDoc(groupRef);
        showToast('Group deleted successfully!', 'success');
    } catch (error) {
        console.error('Error deleting group:', error);
        showToast('Failed to delete group', 'error');
    }
}

// ============================================
// UI COMPONENTS
// ============================================
function createShimmerCards(count = 6) {
    let html = '';
    for (let i = 0; i < count; i++) {
        html += `
            <div class="shimmer-card">
                <div class="shimmer-header">
                    <div class="shimmer shimmer-icon"></div>
                    <div style="flex:1">
                        <div class="shimmer shimmer-title"></div>
                        <div class="shimmer shimmer-meta"></div>
                    </div>
                </div>
                <div class="shimmer shimmer-desc"></div>
                <div class="shimmer shimmer-desc"></div>
                <div class="shimmer shimmer-btn"></div>
            </div>
        `;
    }
    return html;
}

function createGroupCard(group) {
    const adminActions = state.isAdmin ? `
        <div class="admin-actions">
            <button class="btn-icon" onclick="openEditModal('${group.id}')" title="Edit">
                ${icons.edit}
            </button>
            <button class="btn-icon delete" onclick="deleteGroup('${group.id}')" title="Delete">
                ${icons.delete}
            </button>
        </div>
    ` : '';

    return `
        <div class="group-card">
            ${adminActions}
            <div class="card-header">
                <div class="group-icon">
                    ${icons.whatsapp}
                </div>
                <div class="group-info">
                    <h3 class="group-name">${escapeHtml(group.name)}</h3>
                    <div class="group-meta">
                        ${icons.users}
                        <span>${group.members || 0} members</span>
                    </div>
                </div>
            </div>
            <p class="group-description">${escapeHtml(group.description || 'No description available')}</p>
            <a href="${escapeHtml(group.link)}" target="_blank" rel="noopener noreferrer" class="join-btn">
                ${icons.whatsapp}
                Join Group
            </a>
        </div>
    `;
}

function createEmptyState() {
    return `
        <div class="empty-state">
            <div class="empty-icon">
                ${icons.group}
            </div>
            <h3 class="empty-title">No Groups Yet</h3>
            <p class="empty-text">
                ${state.isAdmin ? 'Click "Add Group" to create your first WhatsApp group.' : 'Check back later for new groups to join!'}
            </p>
            ${state.isAdmin ? `<button class="btn btn-primary" onclick="openAddModal()">${icons.plus} Add Your First Group</button>` : ''}
        </div>
    `;
}

function createLoginView() {
    return `
        <div class="login-container">
            <div class="login-card">
                <div class="login-header">
                    <div class="login-logo">
                        ${icons.whatsapp}
                    </div>
                    <h1 class="login-title">Login</h1>
                    <p class="login-subtitle">Sign in to manage WhatsApp groups</p>
                </div>
                <div id="login-error" class="login-error">Invalid username or password</div>
                <form onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label class="form-label">Username</label>
                        <input type="text" id="login-username" class="form-input" placeholder="Enter username" required>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Password</label>
                        <input type="password" id="login-password" class="form-input" placeholder="Enter password" required>
                    </div>
                    <button type="submit" class="btn btn-primary" style="width:100%;margin-top:8px;">
                        Sign In
                    </button>
                </form>
                <div style="text-align:center;margin-top:24px;">
                    <a href="#" onclick="showPublicView()" style="color:var(--primary-dark);text-decoration:none;font-size:0.9rem;">
                        Back to Groups Directory
                    </a>
                </div>
            </div>
        </div>
    `;
}

function createMainView() {
    const totalMembers = state.groups.reduce((sum, g) => sum + (g.members || 0), 0);

    return `
        <div class="app-container">
            <header class="header">
                <div class="header-content">
                    <div class="logo">
                        <div class="logo-icon">
                            ${icons.whatsapp}
                        </div>
                        <span class="logo-text">Groups Directory</span>
                    </div>
                    <div class="header-actions">
                        ${state.isAdmin ? `
                            <span class="admin-badge">Admin Mode</span>
                            <button class="btn btn-ghost" onclick="handleLogout()">
                                ${icons.logout}
                                Logout
                            </button>
                        ` : `
                            <button class="btn btn-ghost" onclick="showLoginView()">
                                Login
                            </button>
                        `}
                    </div>
                </div>
            </header>

            <main class="main-content">
                <div class="stats-bar">
                    <div class="stat-card">
                        <div class="stat-icon green">
                            ${icons.group}
                        </div>
                        <div class="stat-info">
                            <h3>${state.groups.length}</h3>
                            <p>Active Groups</p>
                        </div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-icon blue">
                            ${icons.users}
                        </div>
                        <div class="stat-info">
                            <h3>${totalMembers.toLocaleString()}</h3>
                            <p>Total Groups Members</p>
                        </div>
                    </div>
                </div>

                <div class="section-header">
                    <h2 class="section-title">Available Groups</h2>
                    ${state.isAdmin ? `
                        <button class="btn btn-primary" onclick="openAddModal()">
                            ${icons.plus}
                            Add Group
                        </button>
                    ` : ''}
                </div>

                <div class="groups-grid">
                    ${state.isLoading ? createShimmerCards(6) : 
                      state.groups.length === 0 ? createEmptyState() :
                      state.groups.map(g => createGroupCard(g)).join('')}
                </div>
            </main>
        </div>

        <div id="group-modal" class="modal-overlay" onclick="closeModalOnOverlay(event)">
            <div class="modal" onclick="event.stopPropagation()">
                <div class="modal-header">
                    <h2 class="modal-title" id="modal-title">Add New Group</h2>
                    <button class="modal-close" onclick="closeModal()">
                        ${icons.close}
                    </button>
                </div>
                <form id="group-form" onsubmit="handleGroupSubmit(event)">
                    <div class="modal-body">
                        <div class="form-group">
                            <label class="form-label">Group Name *</label>
                            <input type="text" id="group-name" class="form-input" placeholder="e.g., Travel Enthusiasts" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">WhatsApp Link *</label>
                            <input type="url" id="group-link" class="form-input" placeholder="https://chat.whatsapp.com/..." required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Description</label>
                            <textarea id="group-description" class="form-input" placeholder="Brief description of the group..."></textarea>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Member Count</label>
                            <input type="number" id="group-members" class="form-input" placeholder="0" min="0">
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" onclick="closeModal()">Cancel</button>
                        <button type="submit" class="btn btn-primary" id="modal-submit-btn">Add Group</button>
                    </div>
                </form>
            </div>
        </div>

        <div class="toast-container" id="toast-container"></div>
    `;
}

// ============================================
// EVENT HANDLERS
// ============================================
function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        state.isAdmin = true;
        localStorage.setItem('isAdmin', 'true');
        render();
        showToast('Welcome back, Admin!', 'success');
    } else {
        document.getElementById('login-error').classList.add('show');
        setTimeout(() => {
            const errorEl = document.getElementById('login-error');
            if (errorEl) errorEl.classList.remove('show');
        }, 3000);
    }
}

function handleLogout() {
    state.isAdmin = false;
    localStorage.removeItem('isAdmin');
    render();
    showToast('Logged out successfully', 'success');
}

function showLoginView() {
    document.getElementById('app').innerHTML = createLoginView();
}

function showPublicView() {
    render();
}

async function handleGroupSubmit(e) {
    e.preventDefault();
    
    const groupData = {
        name: document.getElementById('group-name').value.trim(),
        link: document.getElementById('group-link').value.trim(),
        description: document.getElementById('group-description').value.trim(),
        members: parseInt(document.getElementById('group-members').value) || 0
    };

    let success;
    if (state.editingGroup) {
        success = await updateGroup(state.editingGroup, groupData);
    } else {
        success = await addGroup(groupData);
    }

    if (success) {
        closeModal();
    }
}

function openAddModal() {
    state.editingGroup = null;
    document.getElementById('modal-title').textContent = 'Add New Group';
    document.getElementById('modal-submit-btn').textContent = 'Add Group';
    document.getElementById('group-form').reset();
    document.getElementById('group-modal').classList.add('active');
}

function openEditModal(id) {
    const group = state.groups.find(g => g.id === id);
    if (!group) return;

    state.editingGroup = id;
    document.getElementById('modal-title').textContent = 'Edit Group';
    document.getElementById('modal-submit-btn').textContent = 'Save Changes';
    document.getElementById('group-name').value = group.name || '';
    document.getElementById('group-link').value = group.link || '';
    document.getElementById('group-description').value = group.description || '';
    document.getElementById('group-members').value = group.members || 0;
    document.getElementById('group-modal').classList.add('active');
}

function closeModal() {
    document.getElementById('group-modal').classList.remove('active');
    state.editingGroup = null;
}

function closeModalOnOverlay(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();
    }
}

// ============================================
// UTILITIES
// ============================================
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = message;
    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============================================
// RENDER
// ============================================
function render() {
    document.getElementById('app').innerHTML = createMainView();
}

// ============================================
// INITIALIZE
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if admin session exists
    if (localStorage.getItem('isAdmin') === 'true') {
        state.isAdmin = true;
    }

    // Initial render
    render();

    // Subscribe to real-time updates
    subscribeToGroups();
});

// ============================================
// EXPORT FUNCTIONS FOR HTML EVENT HANDLERS
// ============================================
// Export functions that are called from HTML onclick attributes
window.openAddModal = openAddModal;
window.openEditModal = openEditModal;
window.deleteGroup = deleteGroup;
window.handleLogin = handleLogin;
window.handleLogout = handleLogout;
window.handleGroupSubmit = handleGroupSubmit;
window.showLoginView = showLoginView;
window.showPublicView = showPublicView;
window.closeModal = closeModal;
window.closeModalOnOverlay = closeModalOnOverlay;
window.render = render;