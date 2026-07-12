import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { 
    initializeFirestore,
    persistentLocalCache,
    persistentSingleTabManager,
    collection, 
    query, 
    orderBy, 
    onSnapshot,addDoc,updateDoc,deleteDoc,doc, serverTimestamp,where,getDocs,increment,runTransaction} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyDKlVCPvOic2sQfO2l5GWeXoy5UOpQ3gus",
    authDomain: "heartlink-89f30.firebaseapp.com",
    projectId: "heartlink-89f30",
    storageBucket: "heartlink-89f30.firebasestorage.app",
    messagingSenderId: "233254193906",
    appId: "1:233254193906:web:6ec1c326936c7e6b25de6b",
    measurementId: "G-EZTW1HP5Y6"
  };

const app = initializeApp(firebaseConfig);
const db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentSingleTabManager() })
});
const icons = {
    whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>`,
    users: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>`,
    close: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>`,
    edit: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>`,
    delete: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>`,
    group: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`,
    user: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`};
let state = {
    groups: [],
    isLoading: true,
    hasError: false,
    activeTab: 'featured',
    userDisplayName: localStorage.getItem('userDisplayName') || '',
    myGroupsStatus: { pending: 0, approved: 0 },
};
let unsubscribeGroups = null;
async function refreshMyGroupsStatus() {
    if (!state.userDisplayName) return;
    try {
        const approvedCount = state.groups.filter(g => g.authorName === state.userDisplayName).length;

        const pendingQuery = query(collection(db, 'pendingGroups'), where('authorName', '==', state.userDisplayName));
        const pendingSnap = await getDocs(pendingQuery);

        state.myGroupsStatus = { pending: pendingSnap.size, approved: approvedCount };
        if (state.activeTab === 'new') render();
    } catch (error) {
        console.error('Error fetching my groups status:', error);
    }
}
function subscribeToGroups() {
    if (unsubscribeGroups) {
        unsubscribeGroups();
        unsubscribeGroups = null;
    }
    state.isLoading = true;
    state.hasError = false;
    render();
    const liveRef = doc(db, 'liveData', 'groups');
    const slowConnectionTimer = setTimeout(() => {
        if (state.isLoading) {
            state.isLoading = false;
            state.hasError = true;
            render();
        }
    }, 12000);

    unsubscribeGroups = onSnapshot(liveRef, { includeMetadataChanges: true },
        (docSnap) => {
            if (docSnap.metadata.fromCache && !docSnap.exists()) {
                return;
            }

            clearTimeout(slowConnectionTimer);
            state.groups = docSnap.exists() ? (docSnap.data().groups || []) : [];
            state.isLoading = false;
            state.hasError = false;
            render();
        },
        (error) => {
            clearTimeout(slowConnectionTimer);
            console.error('Error fetching groups:', error);
            state.isLoading = false;
            state.hasError = true;
            render();
        }
    );
    return unsubscribeGroups;}

function getFeaturedGroups() {
    return state.groups.filter(group => group.type === 'featured');}

function getUserGroups() {
    return state.groups.filter(group => group.type === 'user');}

function getFilteredGroups() {
    switch(state.activeTab) {
        case 'featured':
            return state.groups.filter(group => group.type === 'featured' || group.type === 'admin');
        case 'new':
            return state.groups.filter(group => group.type === 'user' || group.type === 'user-added');
        case 'bookmarks':
            return (window.BookmarkManager ? window.BookmarkManager.getBookmarkedGroups(state.groups) : []);
        default:
            return [];}}

function createGroupCard(group) {
    const isAdminGroup = group.type === 'featured';
    const userReportButton = group.type === 'user' ? `
        <div class="group-report" style="margin-top: 12px; text-align: center;">
            <button class="btn btn-icon" onclick="openReportModal('${group.id}')" >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px;">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                </svg>
                Report Group
            </button>
        </div>
    ` : '';

  const verifiedIcon = `<svg class="verified-badge-icon" viewBox="0 0 24 24" width="15" height="15" aria-hidden="true"><path d="M23 12l-2.44-2.79.34-3.69-3.61-.82-1.89-3.18L12 3 8.6 1.52 6.71 4.7 3.1 5.52l.34 3.69L1 12l2.44 2.79-.34 3.7 3.61.82L8.6 22.48 12 21l3.4 1.48 1.89-3.18 3.61-.82-.34-3.7L23 12z" fill="url(#verifiedBadgeGradient)"/><path d="M10 17l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" fill="#ffffff"/></svg>`;
const typeBadge = isAdminGroup ? 
    `<span class="type-badge featured">${verifiedIcon} Verified</span>` : 
    `<span class="type-badge user">${verifiedIcon} Verified</span>`;

    const authorDisplay = group.authorName ? `
        <div class="group-author">
            <span>Added by: <strong>${escapeHtml(group.authorName)}</strong> 
${group.createdAt ? `<span class="meta-dot">•</span><span>${formatDate(new Date(group.createdAt))}</span>` : ''}      </span>
        </div>
    ` : '';

   const isBookmarked = BookmarkManager.isBookmarked(group.id);
    const bookmarkIcon = isBookmarked ? `
        <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
    ` : `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" style="width:16px;height:16px;">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
        </svg>
    `;

    return `
        <div class="group-card">
            <div class="card-header">
                <div class="header-left">
 <div class="group-icon">
    <img src="${group.iconUrl || 'icon.png'}" 
         alt=""
         onerror="this.onerror=null;this.src='icon.png';">
</div>
<div class="header-text">
<h3 class="group-name">${escapeHtml(group.name)}</h3>
${authorDisplay}
</div></div>
${typeBadge}
</div>
<p class="group-description">${escapeHtml(group.description || 'No description available')}</p>

<div class="card-meta-row">
    <div class="meta-left">
        ${icons.users}
        <span>${group.members || 0} members</span>
        ${group.country ? `
            <span class="meta-dot">•</span>
            <span class="country-chip">${getCountryFlag(group.country)} ${escapeHtml(getCountryName(group.country))}</span>
        ` : ''}
    </div>
    <div class="meta-right">
        ${group.category ? `<span class="category-chip">${escapeHtml(group.category)}</span>` : ''}
        ${group.reported ? `<span class="reported-badge">Reported</span>` : ''}
    </div>
</div>

            <div class="card-footer">
                ${group.type === 'user' ? `
                    <button class="footer-report-btn" onclick="openReportModal('${group.id}')">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                        </svg>
                        Report
                    </button>
                ` : '<span></span>'}
<button class="footer-bookmark-btn ${isBookmarked ? 'bookmarked' : ''}" 
onclick="toggleBookmark('${group.id}')" 
id="bookmark-${group.id}" 
aria-label="Bookmark group">
${bookmarkIcon}
</button>
<a href="${escapeHtml(group.link)}" target="_blank" rel="noopener noreferrer" class="footer-join-btn">
${icons.whatsapp}
Join Group 
</a>
</div>
        </div>
    `;
}
let currentReportGroup = null;
function openReportModal(groupId) {
    const group = state.groups.find(g => g.id === groupId);
    if (!group) return;

    currentReportGroup = groupId;

    document.getElementById('report-group-id').value = groupId;
    document.getElementById('report-group-name').textContent = group.name;
    document.getElementById('report-group-link').textContent = group.link;
    document.getElementById('report-feedback').value = '';
    document.getElementById('report-email').value = '';
    
    document.querySelectorAll('.report-reason-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById('report-modal').classList.add('active');
    lockBodyScroll('modal'); // ✅ Add this line
}
function closeReportModal() {
    document.getElementById('report-modal').classList.remove('active');
    currentReportGroup = null;
    checkAndUnlockBodyScroll();}

function closeReportModalOnOverlay(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeReportModal();}}

async function submitReport(e) {
    e.preventDefault();
    
    const groupId = document.getElementById('report-group-id').value;
    const feedback = document.getElementById('report-feedback').value.trim();
    const email = document.getElementById('report-email').value.trim();
    
    if (!feedback) {
        showToast('Please provide a reason for reporting', 'error');
        return;
    }
    if (!groupId) {
        showToast('Invalid group', 'error');
        return;
    }

    const submitBtn = document.getElementById('report-submit-btn');
    setButtonLoading(submitBtn, true);

    try {
        const liveRef = doc(db, 'liveData', 'groups');
        await runTransaction(db, async (transaction) => {
            const snap = await transaction.get(liveRef);
            const groups = snap.exists() ? (snap.data().groups || []) : [];
            const idx = groups.findIndex(g => g.id === groupId);
            if (idx === -1) throw new Error('Group not found');

            groups[idx] = {
                ...groups[idx],
                reported: true,
                reportCount: (groups[idx].reportCount || 0) + 1,
                reportedByName: 'Anonymous User',
                reportedByEmail: email || null,
                reportReason: feedback,
                lastReported: Date.now()
            };
            transaction.set(liveRef, { groups });
        });

        await addDoc(collection(db, 'reports'), {
            groupId: groupId,
            groupName: document.getElementById('report-group-name').textContent,
            groupLink: document.getElementById('report-group-link').textContent,
            reportedByName: 'Anonymous',
            reportedByEmail: email || null,
            reason: feedback,
            status: 'pending',
            createdAt: serverTimestamp()
        });
        
        document.getElementById('report-modal').classList.remove('active');
        showToast('Thank you for reporting.', 'success');
    } catch (error) {
        console.error('Error submitting report:', error);
        showToast('Failed to submit report.', 'error');
    } finally {
        setButtonLoading(submitBtn, false);
        setTimeout(() => {
          checkAndUnlockBodyScroll();
            }, 200);
    }
}
function setButtonLoading(button, isLoading) {
    if (!button) return;
    if (isLoading) {
        button.dataset.originalText = button.innerHTML;
        button.disabled = true;
        button.innerHTML = '<span class="btn-spinner"></span>';
    } else {
        button.disabled = false;
        if (button.dataset.originalText) {
            button.innerHTML = button.dataset.originalText;
            delete button.dataset.originalText;
        }
    }
}
function selectReportReason(button, reason) {
    const textarea = document.getElementById('report-feedback');
    
    document.querySelectorAll('.report-reason-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    
    const messages = {
        spam: 'This group appears to be spamming or sending unsolicited messages.',
        inappropriate: 'This group contains inappropriate or offensive content.',
        fake: 'This group appears to be fake or impersonating another group.',
        hate: 'This group contains hate speech or discriminatory content.',
        scam: 'This group appears to be a scam or fraudulent.',
        other: ''
    };
    
    if (reason !== 'other') {
        textarea.value = messages[reason];
    } else {
        textarea.value = '';
        textarea.focus();
    }}

function formatDate(date) {
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60 * 1000) return 'Just now';
    if (diff < 60 * 60 * 1000) {
        const minutes = Math.floor(diff / (60 * 1000));
        return `${minutes}m ago`;
    }
    if (diff < 24 * 60 * 60 * 1000) {
        const hours = Math.floor(diff / (60 * 60 * 1000));
        return `${hours}h ago`;
    }
    if (diff < 7 * 24 * 60 * 60 * 1000) {
        const days = Math.floor(diff / (24 * 60 * 60 * 1000));
        return `${days}d ago`;
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function createEmptyState() {
    const messages = {
        featured: 'Explore Groups section or check back later!',
        new: 'No user-added groups yet. Be the first to add one!',
        bookmarks: 'No bookmarked groups yet. Browse groups and tap the bookmark icon to save them here!'
    };

    return `
        <div class="empty-state">
            <div class="empty-icon">
                ${state.activeTab === 'bookmarks' ? 
                    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:40px;height:40px;">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                    </svg>` :
                    icons.group
                }
            </div>
            <h3 class="empty-title">${state.activeTab === 'bookmarks' ? 'No Bookmarks' : 'No Groups Found'}</h3>
            <p class="empty-text">
                ${messages[state.activeTab] || 'No groups available at the moment.'}
            </p>
        </div>
    `;
}

function renderGroupsBody() {
    const filteredGroups = getFilteredGroups();
    const totalMembers = filteredGroups.reduce((sum, g) => sum + (g.members || 0), 0);
    
    // Update bookmark count
    BookmarkManager.updateBookmarkCount();

    return `
        <div class="stats-bar">
            <div class="stat-card">
                <div class="stat-info">
                    <h3>${filteredGroups.length}</h3>
                    <p>${state.activeTab === 'bookmarks' ? 'Bookmarked Groups' : 'Active Groups'}</p>
                </div>
            </div>
            ${state.activeTab === 'new' && state.userDisplayName ? `
                <div class="stat-card">
                    <div class="stat-info">
                        <h3>${state.myGroupsStatus.pending}</h3>
                        <p>Pending Review</p>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-info">
                        <h3>${state.myGroupsStatus.approved}</h3>
                        <p>Your Approved</p>
                    </div>
                </div>
            ` : ''}
        </div> 

        <div class="section-header">
            <h2 class="section-title">
                ${state.activeTab === 'featured' ? 'Featured Groups' :
                  state.activeTab === 'new' ? 'New Groups' :
                  state.activeTab === 'bookmarks' ? '📑 Your Bookmarks' : 'Groups'}
            </h2>
            ${state.activeTab === 'new' ? `
                <button class="btn btn-primary" onclick="openAddModal()">
                    ${icons.plus}
                    Add Group
                </button>
            ` : ''}
            ${state.activeTab === 'bookmarks' && filteredGroups.length === 0 ? `
                <p style="color: var(--text-secondary); font-size: 0.9rem;">
                    No bookmarked groups yet. Browse groups and tap the bookmark icon to save them here.
                </p>
            ` : ''}
        </div>

        <div class="groups-grid">
            ${filteredGroups.length === 0 ? createEmptyState() :
              filteredGroups.map(g => createGroupCard(g)).join('')}
        </div>
    `;
}

function render() {
    if (state.activeTab === 'notice') {
        if (window.renderNotice && document.getElementById('groups-body')) {
            const body = document.getElementById('groups-body');
            if (body && !body.querySelector('.notice-content')) {
                window.renderNotice();
            }
        }
        return;
    }
    
    if (state.isLoading) {
        if (window.AppUI) window.AppUI.showShimmer(6);
        return;
    }
    
    if (state.hasError) {
        if (window.AppUI) {
            window.AppUI.showError(
                'Slow or no internet connection. Please check your network and try again.',
                () => subscribeToGroups()
            );
        }
        return;
    }
    if (window.AppUI) {
        const filteredGroups = getFilteredGroups();
        window.AppUI.renderGroups(renderGroupsBody());
    }
}

function openAddModal() {
    document.getElementById('modal-title').textContent = 'Add New Group';
    document.getElementById('modal-submit-btn').textContent = 'submit for review';
    
    document.getElementById('group-form').reset();
    
    // Reset category
    selectedCategory = '';
    document.getElementById('group-category').value = '';
    document.getElementById('category-placeholder').textContent = 'Select a category';
    document.getElementById('category-placeholder').classList.remove('selected');
        selectedCountry = '';
    document.getElementById('group-country').value = '';
    document.getElementById('country-placeholder').textContent = 'Select a country';
    document.getElementById('country-placeholder').classList.remove('selected');

    const authorNameField = document.getElementById('author-name');
    if (authorNameField) {
        const hasLockedName = !!state.userDisplayName;
        authorNameField.value = state.userDisplayName || '';
        authorNameField.disabled = hasLockedName;
        document.querySelector('.author-input-section h4').textContent = 'Your Display Name';
        document.querySelector('.author-info').textContent = hasLockedName
            ? `Your display name is locked and can't be changed.`
            : 'Set display name once, it will not change again.';}
const indicator = document.getElementById('name-check-indicator');
if (indicator) { indicator.className = 'name-check-indicator'; indicator.innerHTML = ''; }
if (!state.userDisplayName && authorNameField) authorNameField.style.borderColor = '';
nameAvailability = { name: '', available: null };
    document.getElementById('group-modal').classList.add('active');
    lockBodyScroll('modal'); 
    
    if (typeof prepareInterstitial === 'function') prepareInterstitial();
}

function closeModal() {document.getElementById('group-modal').classList.remove('active');checkAndUnlockBodyScroll(); }

function closeModalOnOverlay(e) {
    if (e.target.classList.contains('modal-overlay')) {
        closeModal();}}

function switchTab(tab) {
 if (!tab || tab === 'notice') return;
    state.activeTab = tab;
    if (window.AppUI) window.AppUI.setActiveTab(tab);
    render();}
function syncTabState(tab) {
    if (!tab) return;
    state.activeTab = tab;}
let recentSubmissions = new Map();
async function checkDuplicateGroupLink(link) {
    try {
        const normalizedLink = normalizeWhatsAppLink(link);
        const existsInLive = state.groups.some(g => normalizeWhatsAppLink(g.link) === normalizedLink);

        const pendingQuery = query(collection(db, 'pendingGroups'), where('link', '==', normalizedLink));
        const pendingSnap = await getDocs(pendingQuery);

        return existsInLive || !pendingSnap.empty;
    } catch (error) {
        console.error('Error checking duplicate link:', error);
        return false;
    }
}

async function isUrlBanned(link) {
    try {
        const normalizedLink = normalizeWhatsAppLink(link).toLowerCase();
        const bannedSnap = await getDocs(collection(db, 'bannedUrls'));
        for (const docSnap of bannedSnap.docs) {
            const bannedUrl = (docSnap.data().url || '').toLowerCase().trim();
            if (bannedUrl && normalizedLink.includes(bannedUrl)) {
                return { banned: true, reason: docSnap.data().reason || null };
            }
        }
        return { banned: false };
    } catch (error) {
        console.error('Error checking banned URL:', error);
        return { banned: false };
    }
}

function checkRateLimit(userIP) {
    const now = Date.now();
    const userSubmissions = recentSubmissions.get(userIP) || [];
    const recentSubs = userSubmissions.filter(time => now - time < 60 * 60 * 1000);
    
    if (recentSubs.length >= 5) {
        return {
            allowed: false,
            message: 'Rate limit exceeded: Maximum 5 groups per hour'
        };
    }
    
    if (recentSubs.length > 0) {
        const lastSubmission = recentSubs[recentSubs.length - 1];
        if (now - lastSubmission < 30 * 1000) {
            return {
                allowed: false,
                message: 'Please wait 30 seconds before adding another group'
            };
        }
    }
    
    return { allowed: true };
}

function normalizeWhatsAppLink(link) {
    if (!link) return '';
    let normalized = link.trim().replace(/\/+$/, '');
    const whatsappPattern = /(?:chat\.whatsapp\.com|whatsapp\.com\/channel)\/([A-Za-z0-9_-]+)/;
    const match = link.match(whatsappPattern);
    if (match && match[1]) {
        return `https://chat.whatsapp.com/${match[1]}`;
    }
    return normalized.toLowerCase();
}

function validateWhatsAppLink(link) {
    if (!link) return { valid: false, message: 'Link is required' };
    
    try {
        new URL(link);
    } catch {
        return { valid: false, message: 'Please enter a valid URL' };
    }
    
    const whatsappPatterns = [
        /^https?:\/\/(?:chat\.)?whatsapp\.com\/(?:invite\/)?[A-Za-z0-9_-]+/,
        /^https?:\/\/whatsapp\.com\/channel\/[A-Za-z0-9_-]+/,
        /^https?:\/\/(?:www\.)?whatsapp\.com\/(?:g\/)?[A-Za-z0-9_-]+/
    ];
    
    const isValid = whatsappPatterns.some(pattern => pattern.test(link));
    if (!isValid) {
        return { valid: false, message: 'Please enter a valid WhatsApp group link' };
    }
    
    const spamPatterns = [
        /bit\.ly|tinyurl|goo\.gl|ow\.ly|t\.co|is\.gd|buff\.ly|adf\.ly/i,
        /spam|advertise|promote|buy|sell|money|earn|profit/i
    ];
    
    for (const pattern of spamPatterns) {
        if (pattern.test(link)) {
            return { valid: false, message: 'Suspicious link detected. Please use direct WhatsApp links only.' };
        }
    }
    
    return { valid: true };
}

async function addGroupWithSpamProtection(groupData) {
    try {
        const linkValidation = validateWhatsAppLink(groupData.link);
        if (!linkValidation.valid) {
            showToast(linkValidation.message, 'error');
            return false;
        }

        const banCheck = await isUrlBanned(groupData.link);
        if (banCheck.banned) {
            showToast('Link is blocked by system', 'error');
            return false;
        }
        
        const isDuplicate = await checkDuplicateGroupLink(groupData.link);
        if (isDuplicate) {
            showToast('link is already added', 'error');
            return false;
        }
        
        const userIP = 'anonymous';
        const rateLimit = checkRateLimit(userIP);
        if (!rateLimit.allowed) {
            showToast(rateLimit.message, 'error');
            return false;
        }
        
        let groupToAdd = {
            ...groupData,
            link: normalizeWhatsAppLink(groupData.link),
            createdAt: serverTimestamp(),
            type: 'user',
            reported: false,
            verified: false
        };

        if (groupData.authorName && groupData.authorName.trim()) {
            groupToAdd.authorName = groupData.authorName.trim();
        } else {
            groupToAdd.authorName = 'Anonymous';
        }

        await addDoc(collection(db, 'pendingGroups'), groupToAdd);
        
        const userSubmissions = recentSubmissions.get(userIP) || [];
        userSubmissions.push(Date.now());
        recentSubmissions.set(userIP, userSubmissions);
        
        setTimeout(() => {
            const now = Date.now();
            const updated = userSubmissions.filter(time => now - time < 60 * 60 * 1000);
            if (updated.length === 0) {
                recentSubmissions.delete(userIP);
            } else {
                recentSubmissions.set(userIP, updated);
            }
        }, 60 * 60 * 1000);
        
        showToast('Submitted! Your group will appear after team review.', 'success');
        refreshMyGroupsStatus();
        return true;
    } catch (error) {
        console.error('Error adding group with spam protection:', error);
        showToast('Failed to add group. Please try again.', 'error');
        return false;
    }
}

async function handleGroupSubmit(e) {
    e.preventDefault();

    const submitBtn = document.getElementById('modal-submit-btn');
    if (submitBtn.disabled) return;
    setButtonLoading(submitBtn, true);

    try {
        const authorNameInput = document.getElementById('author-name');
        const typedName = authorNameInput ? authorNameInput.value.trim() : '';

        if (!state.userDisplayName && typedName) {
            let isDuplicateName;
            if (nameAvailability.name === typedName && nameAvailability.available !== null) {
                isDuplicateName = !nameAvailability.available;
            } else {
                isDuplicateName = await checkDuplicateDisplayName(typedName);
            }

            if (isDuplicateName) {
                showToast('Display name is already taken. Choose another.', 'error');
                authorNameInput.style.borderColor = 'var(--danger)';
                return;
            }
        }

        const authorName = state.userDisplayName || typedName;

        if (!state.userDisplayName && typedName && typedName !== 'Anonymous') {
            state.userDisplayName = typedName;
            localStorage.setItem('userDisplayName', typedName);
        }

        const groupData = {
    name: document.getElementById('group-name').value.trim(),
    link: document.getElementById('group-link').value.trim(),
    description: document.getElementById('group-description').value.trim(),
    members: parseInt(document.getElementById('group-members').value) || 0,
    category: document.getElementById('group-category').value,
    country: document.getElementById('group-country').value, 
    iconUrl: document.getElementById('group-icon-url').value.trim() || null,
    authorName: authorName || 'Anonymous'
};

if (!groupData.country) {
    showToast('Please select a country', 'error');
    return;}

        if (!groupData.category) {
            showToast('Please select a category', 'error');
            return;}
        if (!groupData.name || groupData.name.length < 3) {
            showToast('Group name must be at least 3 characters', 'error');
            return;
        }
        if (!groupData.link) {
            showToast('WhatsApp link is required', 'error');
            return;
        }

        const success = await addGroupWithSpamProtection(groupData);
        if (success) {
            document.getElementById('group-modal').classList.remove('active');
            setTimeout(() => { checkAndUnlockBodyScroll(); }, 200);
            if (typeof showInterstitialAfterSubmit === 'function') {
                setTimeout(() => { showInterstitialAfterSubmit(); }, 500);
            }
        }
    } catch (error) {
        console.error('Error submitting group:', error);
        showToast('Failed to submit group. Please try again.', 'error');
    } finally {
        setButtonLoading(submitBtn, false);
    }
}
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showToast(message, type = 'success') {
    if (window.AppUI) window.AppUI.showToast(message, type);
}
function initWhatsAppApp() {
    const activeTab = document.querySelector('#tabs-list .tab.active');
    let currentTab = 'featured';
    if (state.userDisplayName) refreshMyGroupsStatus();
    if (activeTab) {
        currentTab = activeTab.dataset.tab || 'featured';
    }
    if (currentTab === 'notice') {
        state.activeTab = 'notice';
        subscribeToGroups();
        return;
    }
    if (window.AppUI && window.getActiveTab) {
        state.activeTab = window.getActiveTab() || 'featured';
    } else {
        state.activeTab = 'featured';
    }
    render();
    subscribeToGroups();
  setupDisplayNameLiveCheck();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initWhatsAppApp);
} else {
    initWhatsAppApp();
}
async function checkDuplicateDisplayName(displayName) {
    try {
        const normalizedName = displayName.trim().toLowerCase();
        const existsInLive = state.groups.some(g => 
            g.authorName && g.authorName.trim().toLowerCase() === normalizedName
        );
        
        if (existsInLive) {
            console.log('Display name found in live groups:', displayName);
            return true;
        }
        
        // Check in pending groups directly from Firestore
        const pendingQuery = query(
            collection(db, 'pendingGroups'), 
            where('authorName', '==', displayName.trim())
        );
        const pendingSnap = await getDocs(pendingQuery);
        
        if (!pendingSnap.empty) {
            console.log('Display name found in pending groups:', displayName);
            return true;
        }
        
        return false;
    } catch (error) {
        console.error('Error checking duplicate display name:', error);
        return false;
    }}

let nameCheckTimeout = null;
let nameCheckToken = 0;
let nameAvailability = { name: '', available: null };

function setupDisplayNameLiveCheck() {
    const input = document.getElementById('author-name');
    const indicator = document.getElementById('name-check-indicator');
    if (!input || !indicator) return;

    input.addEventListener('input', () => {
        clearTimeout(nameCheckTimeout);
        indicator.className = 'name-check-indicator';
        input.style.borderColor = '';
        nameAvailability = { name: '', available: null };

        if (state.userDisplayName) return;

        const typed = input.value.trim();
        if (!typed || typed.length < 2) return;

        nameCheckTimeout = setTimeout(async () => {
            const myToken = ++nameCheckToken;
            indicator.className = 'name-check-indicator checking';

            const isDuplicate = await checkDuplicateDisplayName(typed);
            if (myToken !== nameCheckToken) return;
            nameAvailability = { name: typed, available: !isDuplicate };

            if (isDuplicate) {
                indicator.className = 'name-check-indicator taken';
                indicator.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>';
                input.style.borderColor = 'var(--danger)';
            } else {
                indicator.className = 'name-check-indicator available';
                indicator.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>';
                input.style.borderColor = 'var(--success)';
            }
        }, 1500); });}
   (function() {
    setTimeout(function() {
        const existing = document.getElementById('ios-modal-wrapper');
        if (existing) existing.remove();

        const CONFIG = {
            latestVersion: "1.1.0",
            minRequiredVersion: "1.0.0",
            playStoreUrl: "https://play.google.com/store/apps/details?id=com.heartquotelabs.heartlink",
            title: "Update Available",
            msgOptional: "A new version is available with fresh features. Would you like to update now?",
            msgForce: "Your app version is no longer supported. Please update to the latest version to continue."
        };

        function compareVersions(v1, v2) {
            const parts1 = v1.split('.').map(num => parseInt(num, 10));
            const parts2 = v2.split('.').map(num => parseInt(num, 10));
            const maxLength = Math.max(parts1.length, parts2.length);

            for (let i = 0; i < maxLength; i++) {
                const num1 = i < parts1.length ? parts1[i] : 0;
                const num2 = i < parts2.length ? parts2[i] : 0;
                if (num1 > num2) return 1;
                if (num1 < num2) return -1;
            }
            return 0;
        }

        const current = window.APP_CURRENT_VERSION || "0.0.0";

        console.log(`[Update Check] Current: ${current}, Latest: ${CONFIG.latestVersion}, Min Required: ${CONFIG.minRequiredVersion}`);

        if (compareVersions(current, CONFIG.latestVersion) >= 0) {
            console.log('[Update Check] Version is up to date. Modal not shown.');
            return;
        }

        const isForceUpdate = compareVersions(current, CONFIG.minRequiredVersion) < 0;
        console.log(`[Update Check] Force update required: ${isForceUpdate}`);

        if (!document.getElementById('ios-update-styles')) {
            const style = document.createElement('style');
            style.id = 'ios-update-styles';
            style.textContent = `
                #ios-modal-wrapper {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999999;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
                    touch-action: none;
                }
                .ios-alert {
                    width: 270px;
                    background: rgba(255, 255, 255, 0.98);
                    border-radius: 14px;
                    overflow: hidden;
                    text-align: center;
                    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
                    animation: ios-in 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    backdrop-filter: blur(0px);
                }
                @keyframes ios-in {
                    from { 
                        transform: scale(0.96); 
                        opacity: 0;
                    }
                    to { 
                        transform: scale(1); 
                        opacity: 1;
                    }
                }
                .ios-body {
                    padding: 20px 16px 18px 16px;
                    background: #ffffff;
                }
                .ios-title {
                    font-weight: 600;
                    font-size: 17px;
                    margin-bottom: 8px;
                    color: #000000;
                    letter-spacing: -0.02em;
                    line-height: 1.3;
                }
                .ios-msg {
                    font-size: 13px;
                    color: #8e8e93;
                    line-height: 1.4;
                    letter-spacing: -0.01em;
                }
                .ios-footer {
                    display: flex;
                    height: 44px;
                    align-items: stretch;
                    border-top: 0.5px solid #c6c6c8;
                    background: #ffffff;
                }
                .ios-btn {
                    flex: 1;
                    border: none;
                    font-size: 17px;
                    cursor: pointer;
                    outline: none;
                    height: 44px;
                    border-radius: 0px;
                    background: #ffffff;
                    margin: 0;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    -webkit-tap-highlight-color: transparent;
                    transition: background 0.1s ease;
                    font-weight: 500;
                    letter-spacing: -0.02em;
                }
                .ios-btn:active {
                    background: #e5e5ea;
                }
                .btn-later {
                    color: #007aff;
                    border-right: 0.5px solid #c6c6c8;
                    font-weight: 500;
                }
                .btn-update {
                    color: #007aff;
                    font-weight: 600;
                }
                .btn-force {
                    color: #007aff;
                    font-weight: 600;
                    width: 100%;
                    background: #ffffff;
                }
                .btn-force:active {
                    background: #e5e5ea;
                }
            `;
            document.head.appendChild(style);
        }

        const wrapper = document.createElement('div');
        wrapper.id = 'ios-modal-wrapper';

        const message = isForceUpdate ? CONFIG.msgForce : CONFIG.msgOptional;
        const footerHtml = isForceUpdate 
            ? `<button class="ios-btn btn-force" id="update-action">Update Now</button>`
            : `<button class="ios-btn btn-later" id="later-action">Later</button>
               <button class="ios-btn btn-update" id="update-action">Update</button>`;

        wrapper.innerHTML = `
            <div class="ios-alert">
                <div class="ios-body">
                    <div class="ios-title">${CONFIG.title}</div>
                    <div class="ios-msg">${message}</div>
                </div>
                <div class="ios-footer">${footerHtml}</div>
            </div>
        `;

document.body.appendChild(wrapper);const updateBtn = wrapper.querySelector('#update-action');const laterBtn = wrapper.querySelector('#later-action');updateBtn.onclick = () => {const url = CONFIG.playStoreUrl;if (window.cordova && window.cordova.InAppBrowser) {window.cordova.InAppBrowser.open(url, '_system');console.log('[Update Check] Opening Play Store via InAppBrowser');return;}const isAndroid = /android/i.test(navigator.userAgent);if (isAndroid) {const packageName = url.match(/id=([^&]+)/)?.[1];if (packageName) {console.log('[Update Check] Opening Play Store via market:// protocol');window.location.href = `market://details?id=${packageName}`;setTimeout(() => {console.log('[Update Check] Fallback to web URL');window.location.href = url;}, 2000);return;}}console.log('[Update Check] Opening Play Store via window.open');const newWindow = window.open(url, '_blank');if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {console.log('[Update Check] Popup blocked, navigating current window');window.location.href = url;}};if (laterBtn) {laterBtn.onclick = () => {wrapper.remove();};}wrapper.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });}, 300);})();     
        
window.syncTabState = syncTabState;
window.openAddModal = openAddModal;
window.handleGroupSubmit = handleGroupSubmit;
window.closeModal = closeModal;
window.closeModalOnOverlay = closeModalOnOverlay;
window.switchTab = switchTab;
window.initWhatsAppApp = initWhatsAppApp;
window.openReportModal = openReportModal;
window.closeReportModal = closeReportModal;
window.closeReportModalOnOverlay = closeReportModalOnOverlay;
window.submitReport = submitReport;
window.selectReportReason = selectReportReason;
window.showToast = showToast;
window.renderDeepApp = render;
window.getFilteredGroups = getFilteredGroups;
window.getActiveTab = () => state.activeTab;
window.createGroupCard = createGroupCard;
window.escapeHtml = escapeHtml;

////////////////////////////////

let bannerAd = null;
let interstitialAd = null;
let appOpenAd = null;
let lastFullScreenAdAt = 0;
const COOLDOWN_MS = 60 * 1000;

function canShowFullScreenAd() {
    return Date.now() - lastFullScreenAdAt > COOLDOWN_MS;
}

document.addEventListener('deviceready', async () => {
    await admob.start();
    bannerAd = new admob.BannerAd({
        adUnitId: 'ca-app-pub-3940256099942544/6300978111',
        position: 'bottom'
      
    });
    await bannerAd.show();
    document.addEventListener('pause', () => bannerAd && bannerAd.hide());
    document.addEventListener('resume', () => bannerAd && bannerAd.show());
    appOpenAd = new admob.AppOpenAd({ adUnitId: 'ca-app-pub-3940256099942544/9257395921' });
    await appOpenAd.load();
    document.addEventListener('resume', async () => { if (!canShowFullScreenAd()) return; if (!(await appOpenAd.show())) { await appOpenAd.load(); } else { lastFullScreenAdAt = Date.now(); } });}, false);
function prepareInterstitial() {
    interstitialAd = new admob.InterstitialAd({ adUnitId: 'ca-app-pub-3940256099942544/1033173712' });
    interstitialAd.load();}
async function showInterstitialAfterSubmit() {
    if (!interstitialAd) return;
    if (!canShowFullScreenAd()) return;
    if (await interstitialAd.show()) {
        lastFullScreenAdAt = Date.now();}}