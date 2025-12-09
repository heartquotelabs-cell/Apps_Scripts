// WhatsApp Group Joiner - Pure JavaScript Application

document.addEventListener('DOMContentLoaded', function() {
    // Create and inject WhatsApp SVG icons
    const icons = {
        whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M12.032,0C5.424,0,0,5.376,0,12c0,2.4,0.672,4.656,1.824,6.6L0,24l5.616-1.656c1.92,1.056,4.176,1.656,6.48,1.656c6.576,0,12-5.376,12-12S18.576,0,12.032,0z M18.24,16.896c-0.288,0.72-1.44,1.296-2.352,1.44c-0.576,0.096-1.344,0.192-3.888-0.816c-3.216-1.248-5.28-4.368-5.424-4.576c-0.144-0.144-1.152-1.536-1.152-2.928s0.72-2.064,0.96-2.304c0.24-0.24,0.576-0.336,0.864-0.336c0.24,0,0.432,0,0.624,0c0.24,0,0.48,0.048,0.72,0.768c0.288,0.912,0.96,3.168,1.056,3.408c0.096,0.24,0.144,0.528,0.048,0.816c-0.096,0.24-0.144,0.432-0.288,0.624c-0.144,0.192-0.288,0.432-0.432,0.576c-0.144,0.144-0.288,0.336-0.144,0.624c0.144,0.288,0.672,1.344,1.44,2.16c0.96,0.96,1.824,1.296,2.112,1.44c0.288,0.144,0.48,0.144,0.72,0.048c0.24-0.096,1.008-0.432,1.92-1.392c0.72-0.768,1.296-1.68,1.584-2.16c0.288-0.48,0.288-0.864,0.24-1.008C18.48,17.04,18.432,16.944,18.24,16.896z"/></svg>`,
        users: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>`,
        user: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>`
    };

    // WhatsApp groups data
    const groupsData = [
        {
            id: 1,
            name: "Travel Enthusiasts",
            description: "Share travel experiences, tips, and photos from around the world",
            members: 245,
            link: "https://chat.whatsapp.com/invite/examplelink1"
        },
        {
            id: 2,
            name: "Book Club",
            description: "Discussing a new book every month. All genres welcome!",
            members: 178,
            link: "https://chat.whatsapp.com/invite/examplelink2"
        },
        {
            id: 3,
            name: "Fitness Motivation",
            description: "Daily workout tips, motivation, and health advice",
            members: 312,
            link: "https://chat.whatsapp.com/invite/examplelink3"
        },
        {
            id: 4,
            name: "Tech Developers",
            description: "For programmers and developers to share knowledge",
            members: 421,
            link: "https://chat.whatsapp.com/invite/examplelink4"
        },
        {
            id: 5,
            name: "Food Lovers",
            description: "Share recipes, restaurant recommendations, and food photos",
            members: 189,
            link: "https://chat.whatsapp.com/invite/examplelink5"
        },
        {
            id: 6,
            name: "Music Sharing",
            description: "Discover new music and share your favorite tracks",
            members: 156,
            link: "https://chat.whatsapp.com/invite/examplelink6"
        }
    ];

    // Create all styles dynamically
    function createStyles() {
        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            
            body {
                background-color: #f5f5f5;
                color: #333;
                line-height: 1.6;
                padding: 5px;
                min-height: 100vh;
            }
            
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
            }
            
            header {
                text-align: center;
                margin-bottom: 30px;
                padding-bottom: 20px;
                border-bottom: 2px solid #25D366;
            }
            
            h1 {
                color: #075E54;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 10px;
                font-size: 2.2rem;
            }
            
            .whatsapp-icon {
                color: #25D366;
                width: 40px;
                height: 40px;
            }
            
            .subtitle {
                color: #666;
                font-size: 1.1rem;
            }
            
            .groups-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
                margin-bottom: 30px;
            }
            
            .group-card {
                background-color: white;
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
                transition: transform 0.3s, box-shadow 0.3s;
                display: flex;
                flex-direction: column;
            }
            
            .group-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
            }
            
            .group-name {
                font-size: 1.4rem;
                color: #075E54;
                margin-bottom: 10px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .group-name svg {
                color: #25D366;
                width: 24px;
                height: 24px;
            }
            
            .group-description {
                color: #666;
                margin-bottom: 15px;
                flex-grow: 1;
            }
            
            .group-members {
                color: #888;
                font-size: 0.9rem;
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                gap: 5px;
            }
            
            .join-button {
                background-color: #25D366;
                color: white;
                border: none;
                padding: 12px 20px;
                border-radius: 5px;
                font-size: 1rem;
                font-weight: 600;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 8px;
                transition: background-color 0.3s;
                text-decoration: none;
                text-align: center;
            }
            
            .join-button:hover {
                background-color: #128C7E;
            }
            
            .join-button svg {
                width: 20px;
                height: 20px;
            }
            
            footer {
                text-align: center;
                margin-top: 40px;
                padding-top: 20px;
                border-top: 1px solid #ddd;
                color: #888;
                font-size: 0.9rem;
            }
            
            @media (max-width: 600px) {
                .groups-container {
                    grid-template-columns: 1fr;
                }
                
                .container {
                    padding: 10px;
                }
                
                h1 {
                    font-size: 1.8rem;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Create header
    function createHeader() {
        const header = document.createElement('header');
        
        const h1 = document.createElement('h1');
        h1.innerHTML = `${icons.whatsapp}<span>WhatsApp Groups</span>`;
        
        const subtitle = document.createElement('p');
        subtitle.className = 'subtitle';
        subtitle.textContent = 'Click "Join Group" to connect with others on WhatsApp';
        
        header.appendChild(h1);
        header.appendChild(subtitle);
        
        return header;
    }

    // Create a group card
    function createGroupCard(group) {
        const card = document.createElement('div');
        card.className = 'group-card';
        
        // Group name with icon
        const groupName = document.createElement('div');
        groupName.className = 'group-name';
        groupName.innerHTML = `${icons.users}<span>${group.name}</span>`;
        
        // Description
        const description = document.createElement('p');
        description.className = 'group-description';
        description.textContent = group.description;
        
        // Members count
        const members = document.createElement('div');
        members.className = 'group-members';
        members.innerHTML = `${icons.user}<span>${group.members} members</span>`;
        
        // Join button
        const joinButton = document.createElement('a');
        joinButton.href = group.link;
        joinButton.target = '_blank';
        joinButton.className = 'join-button';
        joinButton.innerHTML = `${icons.whatsapp}<span>Join Group</span>`;
        
        // Add click event
        joinButton.addEventListener('click', function(e) {
            console.log(`Joining group: ${group.name}`);
            
            // Optional: Show loading state
            const originalHTML = this.innerHTML;
            this.innerHTML = `${icons.whatsapp}<span>Opening WhatsApp...</span>`;
            this.style.backgroundColor = '#128C7E';
            
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.backgroundColor = '';
            }, 1500);
        });
        
        // Append all elements
        card.appendChild(groupName);
        card.appendChild(description);
        card.appendChild(members);
        card.appendChild(joinButton);
        
        return card;
    }

    // Create groups container
    function createGroupsContainer() {
        const container = document.createElement('div');
        container.className = 'groups-container';
        
        groupsData.forEach(group => {
            container.appendChild(createGroupCard(group));
        });
        
        return container;
    }

    // Create footer
    function createFooter() {
        const footer = document.createElement('footer');
        
        const note1 = document.createElement('p');
        note1.textContent = 'Note: You need to have WhatsApp installed on your device to join these groups.';
        
        const note2 = document.createElement('p');
        note2.innerHTML = '.';
        
        const copyright = document.createElement('p');
        copyright.innerHTML = '&copy; ' + new Date().getFullYear() + ' WhatsApp Groups Directory';
        
        footer.appendChild(note1);
        footer.appendChild(note2);
        footer.appendChild(copyright);
        
        return footer;
    }

    // Initialize the app
    function initApp() {
        // Clear body and add container
        document.body.innerHTML = '';
        
        const container = document.createElement('div');
        container.className = 'container';
        
        // Add all components
        container.appendChild(createHeader());
        container.appendChild(createGroupsContainer());
        container.appendChild(createFooter());
        
        document.body.appendChild(container);
    }

    // Start the application
    createStyles();
    initApp();
});
