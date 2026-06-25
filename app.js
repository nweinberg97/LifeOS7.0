/**
 * LifeOS Core Architecture Operations Module
 * Engine Framework: Local-first schema bindings, universal state controllers
 */

// Global App State Envelope
let state = {
    cards: [
        {
            id: 'card_sample_1',
            type: 'task',
            title: 'Refine Forth Strategy Deck',
            description: 'Align the physical coworking space metrics with digital Human Potential Infrastructure frameworks.',
            tool: 'taskly',
            container: 'taskly-todo',
            x: 50, y: 50,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        },
        {
            id: 'card_sample_2',
            type: 'note',
            title: 'Kitsilano QR Campaign Structure',
            description: 'Plan hyper-local content release cycles using Substack endpoints and local physical anchors.',
            tool: 'brainly',
            container: 'brainly-notes',
            x: 80, y: 180,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    ],
    boardlyTabs: ["Health", "Relationships", "Work", "Chores", "Admin"],
    boardlyActiveTab: "Health",
    timelyMode: "scheduling", 
    timelySubTab: "daily",    
    brainlyLinks: ["https://github.com"],
    brainlyFolders: [
        { title: "Reflections", emoji: "💭" },
        { title: "Research Pipeline", emoji: "🔬" }
    ],
    brainlyActiveFolder: null, 
    activeDraggableCardId: null
};

// Orchestration Framework Router Engine
const lifecycle = {
    init() {
        this.loadLocalStoragePackage();
        this.registerGlobalNavigationHandlers();
        this.registerDragAndDropSystemFields();
        this.initInteractiveWidgets();
        this.renderActiveStateContexts();
    },

    loadLocalStoragePackage() {
        const storedData = localStorage.getItem('lifeos_state_package');
        if (storedData) {
            try {
                state = JSON.parse(storedData);
            } catch (e) {
                console.error("Local client serialization read mismatch:", e);
            }
        }
    },

    saveLocalStoragePackage() {
        localStorage.setItem('lifeos_state_package', JSON.stringify(state));
    },

    registerGlobalNavigationHandlers() {
        // App Switcher View Navigation Switcher Node bindings
        document.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const targetView = btn.getAttribute('data-target');
                this.switchMasterViewportContext(targetView);
            });
        });

        // Top Brand Anchor reset back to home active states
        document.getElementById('brand-home-toggle').addEventListener('click', () => {
            document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
            this.switchMasterViewportContext('home');
        });

        // Assistant Minimize UI element toggle
        document.getElementById('aiHubMinimizeToggle').addEventListener('click', () => {
            const hub = document.getElementById('aiAssistantHubPanel');
            hub.classList.toggle('collapsed-state');
        });

        // Prompt Execution Trigger action mappings
        document.getElementById('assistantSubmit').addEventListener('click', () => this.executePipelineProcessingCommand());
        document.getElementById('aiHubTextInput').addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.executePipelineProcessingCommand();
        });

        // Module Context Action Spawning Triggers
        document.getElementById('universalSidebarAddCard').addEventListener('click', () => this.spawnFrictionlessCard('task', 'universal', 'universal-inbox'));
        document.getElementById('btnBrainlyCreateFolder').addEventListener('click', () => this.promptCreateBrainlyFolder());
        document.getElementById('btnBrainlyAddNote').addEventListener('click', () => this.spawnFrictionlessCard('note', 'brainly', 'brainly-notes'));
        document.getElementById('btnCreateBoardTab').addEventListener('click', () => this.promptCreateBoardlyTab());

        // Inline Taskly spawning engine
        document.querySelectorAll('.inline-taskly-add').forEach(button => {
            button.addEventListener('click', (e) => {
                const columnContainerId = e.target.getAttribute('data-container');
                this.spawnFrictionlessCard('task', 'taskly', columnContainerId);
            });
        });

        // Absolute Canvas Drag-to-Spawn Node Bindings
        document.querySelectorAll('.spawn-node-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nodeType = e.target.getAttribute('data-spawn-type');
                this.spawnFrictionlessCard(nodeType, 'boardly', state.boardlyActiveTab, 40, 40);
            });
        });

        // Close portal modal stubs
        document.getElementById('btnModalClosePortal').addEventListener('click', () => {
            document.getElementById('cardModal').classList.remove('open');
        });
        document.getElementById('btnModalCommitSave').addEventListener('click', () => this.commitModalCardModification());
    },

    switchMasterViewportContext(targetView) {
        document.querySelectorAll('.workspace-pane').forEach(pane => pane.classList.remove('view-active'));
        bodyElement = document.body;
        bodyElement.classList.remove('home-active');

        const activePane = document.getElementById(`view-${targetView}`);
        if (activePane) activePane.classList.add('view-active');
        
        if (targetView === 'home') {
            bodyElement.classList.add('home-active');
        }
        this.renderActiveStateContexts();
    },

    initInteractiveWidgets() {
        // High frequency wall-clock time loop updates
        const updateClock = () => {
            const clockNode = document.getElementById('homeClockDisplay');
            const dateNode = document.getElementById('homeDateDisplay');
            if (!clockNode || !dateNode) return;
            
            const now = new Date();
            clockNode.textContent = now.toTimeString().split(' ')[0];
            dateNode.textContent = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
        };
        updateClock();
        setInterval(updateClock, 1000);
    },

    /* ==========================================================================
       Frictionless Card Spawning System Architecture
       ========================================================================== */
    spawnFrictionlessCard(type, tool, container, explicitX = null, explicitY = null) {
        const id = 'card_' + Date.now() + Math.random().toString(36).substr(2, 4);
        const newCard = {
            id,
            type,
            title: '',
            description: '',
            tool,
            container,
            x: explicitX !== null ? explicitX : 30,
            y: explicitY !== null ? explicitY : 30,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        state.cards.push(newCard);
        this.saveLocalStoragePackage();
        this.renderActiveStateContexts();

        // Put active text focus into input area immediately to stop modal prompt friction
        setTimeout(() => {
            const insertedTextarea = document.querySelector(`[data-inline-id="${id}"]`);
            if (insertedTextarea) insertedTextarea.focus();
        }, 50);
    },

    /* ==========================================================================
       Drag and Drop Node Mechanics
       ========================================================================== */
    registerDragAndDropSystemFields() {
        // Universal Drop Zones (Taskly pipelines, Universal board, Trash bins)
        document.querySelectorAll('.drop-zone, .card-stack-slot').forEach(zone => {
            zone.addEventListener('dragover', (e) => e.preventDefault());
            zone.addEventListener('dragenter', (e) => {
                e.preventDefault();
                if (zone.id === 'globalTrashZoneDropSlot') zone.classList.add('drag-over-active');
            });
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over-active');
            });
            zone.addEventListener('drop', (e) => {
                e.preventDefault();
                zone.classList.remove('drag-over-active');
                const cardId = e.dataTransfer.getData('text/plain') || state.activeDraggableCardId;
                if (!cardId) return;

                const cardNode = state.cards.find(c => c.id === cardId);
                if (!cardNode) return;

                // Trash bucket conditional deletion execution sequence
                if (zone.id === 'globalTrashZoneDropSlot') {
                    state.cards = state.cards.filter(c => c.id !== cardId);
                    lifecycle.saveLocalStoragePackage();
                    lifecycle.renderActiveStateContexts();
                    return;
                }

                // Normal pipeline target reassignment
                const targetTool = zone.closest('[data-tool]')?.getAttribute('data-tool') || zone.getAttribute('data-tool') || cardNode.tool;
                const targetContainer = zone.closest('[data-container]')?.getAttribute('data-container') || zone.getAttribute('data-container');

                cardNode.tool = targetTool;
                if (targetContainer) cardNode.container = targetContainer;
                
                lifecycle.saveLocalStoragePackage();
                lifecycle.renderActiveStateContexts();
            });
        });

        // Boardly Coordinate Pointer Position Trackers
        const spatialCanvas = document.getElementById('boardlySpatialCanvas');
        spatialCanvas.addEventListener('dragover', (e) => e.preventDefault());
        spatialCanvas.addEventListener('drop', (e) => {
            e.preventDefault();
            const cardId = e.dataTransfer.getData('text/plain') || state.activeDraggableCardId;
            if (!cardId) return;

            const cardNode = state.cards.find(c => c.id === cardId);
            if (!cardNode) return;

            const boundingBox = spatialCanvas.getBoundingClientRect();
            // Drop onto canvas converts item context parameters to boardly spatial dimensions
            cardNode.tool = 'boardly';
            cardNode.container = state.boardlyActiveTab;
            cardNode.x = (e.clientX - boundingBox.left) + spatialCanvas.scrollLeft - 100;
            cardNode.y = (e.clientY - boundingBox.top) + spatialCanvas.scrollTop - 40;

            lifecycle.saveLocalStoragePackage();
            lifecycle.renderActiveStateContexts();
        });
    },

    /* ==========================================================================
       Master Rendering Engine Workflow Loops
       ========================================================================== */
    renderActiveStateContexts() {
        this.renderUniversalSidebarList();

        const currentActiveView = document.querySelector('.workspace-pane.view-active')?.id;
        
        if (currentActiveView === 'view-taskly') this.clearAndPopulateTasklyPipeline();
        if (currentActiveView === 'view-boardly') this.clearAndPopulateBoardlyCanvas();
        if (currentActiveView === 'view-timely') this.clearAndPopulateTimelyViews();
        if (currentActiveView === 'view-brainly') this.clearAndPopulateBrainlyVault();
    },

    generateStandardCardTemplate(card) {
        const cardElement = document.createElement('div');
        cardElement.className = `lifeos-processing-card color-${card.type}`;
        cardElement.setAttribute('draggable', 'true');
        
        cardElement.addEventListener('dragstart', (e) => {
            state.activeDraggableCardId = card.id;
            e.dataTransfer.setData('text/plain', card.id);
            cardElement.classList.add('dragging-active');
        });
        
        cardElement.addEventListener('dragend', () => {
            cardElement.classList.remove('dragging-active');
            state.activeDraggableCardId = null;
        });

        cardElement.innerHTML = `
            <div class="card-header-drag-handle">
                <textarea class="card-inline-editable-textarea" data-inline-id="${card.id}" rows="1" placeholder="New Asset Title...">${card.title}</textarea>
                <button class="card-delete-trigger-btn" title="Purge Node">×</button>
            </div>
            ${card.description ? `<p class="card-description-block">${card.description}</p>` : ''}
            <div class="card-metadata-row">
                <span>${card.type.toUpperCase()}</span>
                <span class="portal-edit-trigger" style="cursor:pointer; text-decoration:underline;">Edit Detail</span>
            </div>
        `;

        // Text area auto save configuration
        const txt = cardElement.querySelector('.card-inline-editable-textarea');
        txt.addEventListener('input', (e) => {
            card.title = e.target.value;
            this.saveLocalStoragePackage();
        });

        // Trigger detail portal modal fallback elements hook
        cardElement.querySelector('.portal-edit-trigger').addEventListener('click', () => {
            document.getElementById('modalCardTitle').value = card.title;
            document.getElementById('modalCardDesc').value = card.description || '';
            document.getElementById('modalCardId').value = card.id;
            document.getElementById('cardModal').classList.add('open');
        });

        // Card button item purging line hook
        cardElement.querySelector('.card-delete-trigger-btn').addEventListener('click', () => {
            state.cards = state.cards.filter(c => c.id !== card.id);
            this.saveLocalStoragePackage();
            this.renderActiveStateContexts();
        });

        return cardElement;
    },

    renderUniversalSidebarList() {
        const targetSlot = document.getElementById('universalSidebarDropSlot');
        if (!targetSlot) return;
        targetSlot.innerHTML = '';
        
        state.cards.filter(c => c.tool === 'universal').forEach(card => {
            targetSlot.appendChild(this.generateStandardCardTemplate(card));
        });
    },

    clearAndPopulateTasklyPipeline() {
        const columns = ['taskly-todo', 'taskly-in-progress', 'taskly-review', 'taskly-completed'];
        columns.forEach(colId => {
            const slot = document.querySelector(`#${colId} .card-stack-slot`);
            if (slot) {
                slot.innerHTML = '';
                state.cards.filter(c => c.tool === 'taskly' && c.container === colId).forEach(card => {
                    slot.appendChild(this.generateStandardCardTemplate(card));
                });
            }
        });
    },

    clearAndPopulateBoardlyCanvas() {
        // Tab header navigation bar setup
        const tabsRow = document.getElementById('boardlyTabsContainer');
        tabsRow.innerHTML = '';
        state.boardlyTabs.forEach(tab => {
            const btn = document.createElement('button');
            btn.className = `board-tab-node ${state.boardlyActiveTab === tab ? 'active' : ''}`;
            btn.textContent = tab;
            btn.addEventListener('click', () => {
                state.boardlyActiveTab = tab;
                this.saveLocalStoragePackage();
                this.clearAndPopulateBoardlyCanvas();
            });
            tabsRow.appendChild(btn);
        });

        // Render nodes at coordinates onto canvas backdrop
        const canvas = document.getElementById('boardlySpatialCanvas');
        canvas.innerHTML = '';
        
        state.cards.filter(c => c.tool === 'boardly' && c.container === state.boardlyActiveTab).forEach(card => {
            const cardNode = this.generateStandardCardTemplate(card);
            cardNode.style.position = 'absolute';
            cardNode.style.left = `${card.x}px`;
            cardNode.style.top = `${card.y}px`;
            cardNode.style.width = '220px';
            canvas.appendChild(cardNode);
        });
    },

    clearAndPopulateTimelyViews() {
        // Sub navigation elements array mapping configurations
        const tabsRow = document.getElementById('timelySubTabsContainer');
        tabsRow.innerHTML = '';
        
        const viewsList = state.timelyMode === 'scheduling' 
            ? ['daily', 'weekly', 'monthly', 'reminders'] 
            : ['projects', 'goals'];

        viewsList.forEach(v => {
            const btn = document.createElement('button');
            btn.className = `board-tab-node ${state.timelySubTab === v ? 'active' : ''}`;
            btn.textContent = v.toUpperCase();
            btn.addEventListener('click', () => {
                state.timelySubTab = v;
                this.saveLocalStoragePackage();
                this.clearAndPopulateTimelyViews();
            });
            tabsRow.appendChild(btn);
        });

        // Hide all template frameworks before appending context items
        document.querySelectorAll('.timely-matrix-layout').forEach(el => el.classList.remove('active-grid'));
        const containerDaily = document.getElementById('timely-daily-container');
        const containerWeekly = document.getElementById('timely-weekly-container');
        const containerMonthly = document.getElementById('timely-monthly-container');
        const containerFallback = document.getElementById('timely-fallback-container');

        containerDaily.innerHTML = '';
        containerWeekly.innerHTML = '';
        containerMonthly.innerHTML = '';
        containerFallback.innerHTML = '';

        // Context structural logic switch processing matrices
        if (state.timelySubTab === 'daily') {
            containerDaily.classList.add('active-grid');
            const wrapper = document.createElement('div');
            wrapper.className = 'timely-hourly-grid-wrapper';
            
            for (let i = 6; i <= 22; i++) {
                const hourBlock = document.createElement('div');
                hourBlock.className = 'timely-hour-row-block';
                hourBlock.innerHTML = `
                    <div class="timely-hour-label-aside">${i}:00</div>
                    <div class="timely-hour-drop-bucket drop-zone" data-tool="timely" data-container="hour-${i}"></div>
                `;
                
                state.cards.filter(c => c.tool === 'timely' && c.container === `hour-${i}`).forEach(card => {
                    hourBlock.querySelector('.timely-hour-drop-bucket').appendChild(this.generateStandardCardTemplate(card));
                });
                wrapper.appendChild(hourBlock);
            }
            containerDaily.appendChild(wrapper);

        } else if (state.timelySubTab === 'weekly') {
            containerWeekly.classList.add('active-grid');
            const wrapper = document.createElement('div');
            wrapper.className = 'timely-weekly-cadence-wrapper';
            
            const shifts = ['morning', 'noon', 'afternoon', 'evening', 'night'];
            shifts.forEach(shift => {
                const slot = document.createElement('div');
                slot.className = 'timely-cadence-column-slot';
                slot.innerHTML = `
                    <h4>${shift.toUpperCase()}</h4>
                    <div class="card-stack-slot drop-zone" data-tool="timely" data-container="shift-${shift}"></div>
                `;
                state.cards.filter(c => c.tool === 'timely' && c.container === `shift-${shift}`).forEach(card => {
                    slot.querySelector('.card-stack-slot').appendChild(this.generateStandardCardTemplate(card));
                });
                wrapper.appendChild(slot);
            });
            containerWeekly.appendChild(wrapper);

        } else if (state.timelySubTab === 'monthly') {
            containerMonthly.classList.add('active-grid');
            const wrapper = document.createElement('div');
            wrapper.className = 'timely-monthly-matrix-wrapper';
            
            for (let day = 1; day <= 31; day++) {
                const cell = document.createElement('div');
                cell.className = 'timely-monthly-cell-node drop-zone';
                cell.setAttribute('data-tool', 'timely');
                cell.setAttribute('data-container', `day-${day}`);
                cell.innerHTML = `<div class="cell-num-badge">${day}</div>`;
                
                state.cards.filter(c => c.tool === 'timely' && c.container === `day-${day}`).forEach(card => {
                    cell.appendChild(this.generateStandardCardTemplate(card));
                });
                wrapper.appendChild(cell);
            }
            containerMonthly.appendChild(wrapper);

        } else {
            // General floating layout list fallback view stack
            containerFallback.classList.add('active-grid');
            const wrapper = document.createElement('div');
            wrapper.className = 'column drop-zone';
            wrapper.setAttribute('data-tool', 'timely');
            wrapper.setAttribute('data-container', state.timelySubTab);
            wrapper.innerHTML = `
                <div class="column-header">
                    <h3>${state.timelySubTab.toUpperCase()} Portfolio</h3>
                    <button class="add-btn" id="inlineTimelyFallbackAdd">+</button>
                </div>
                <div class="card-stack-slot"></div>
            `;
            
            state.cards.filter(c => c.tool === 'timely' && c.container === state.timelySubTab).forEach(card => {
                wrapper.querySelector('.card-stack-slot').appendChild(this.generateStandardCardTemplate(card));
            });
            
            containerFallback.appendChild(wrapper);
            document.getElementById('inlineTimelyFallbackAdd')?.addEventListener('click', () => {
                this.spawnFrictionlessCard('task', 'timely', state.timelySubTab);
            });
        }
        this.registerDragAndDropSystemFields();
    },

    clearAndPopulateBrainlyVault() {
        // High fidelity iOS folder structures mapping setup loop
        const gridSystem = document.getElementById('brainlyFolderGridSystem');
        gridSystem.innerHTML = '';

        // All floating notes global directory element tag creation
        const rootNode = document.createElement('div');
        rootNode.className = `folder-icon-node ${state.brainlyActiveFolder === null ? 'active-directory' : ''}`;
        rootNode.innerHTML = `
            <div class="folder-visual-emoji">📂</div>
            <div class="folder-string-label">All Items</div>
        `;
        rootNode.addEventListener('click', () => {
            state.brainlyActiveFolder = null;
            this.saveLocalStoragePackage();
            this.clearAndPopulateBrainlyVault();
        });
        gridSystem.appendChild(rootNode);

        state.brainlyFolders.forEach(folder => {
            const fNode = document.createElement('div');
            fNode.className = `folder-icon-node ${state.brainlyActiveFolder === folder.title ? 'active-directory' : ''}`;
            fNode.innerHTML = `
                <div class="folder-visual-emoji">${folder.emoji}</div>
                <div class="folder-string-label">${folder.title}</div>
            `;
            fNode.addEventListener('click', () => {
                state.brainlyActiveFolder = folder.title;
                this.saveLocalStoragePackage();
                this.clearAndPopulateBrainlyVault();
            });
            gridSystem.appendChild(fNode);
        });

        // Populate selected workspace listing container layout blocks
        document.getElementById('brainlyCurrentFolderLabel').textContent = state.brainlyActiveFolder || 'All Floating Notes';
        const notesGrid = document.getElementById('brainlyNotesGridSlot');
        notesGrid.innerHTML = '';

        const brainlySourceStream = state.cards.filter(c => {
            if (c.tool !== 'brainly') return false;
            if (state.brainlyActiveFolder === null) return true;
            return c.container === state.brainlyActiveFolder;
        });

        brainlySourceStream.forEach(card => {
            notesGrid.appendChild(this.generateStandardCardTemplate(card));
        });
    },

    /* ==========================================================================
       System Modal and Creation Prompt Engines
       ========================================================================== */
    commitModalCardModification() {
        const id = document.getElementById('modalCardId').value;
        const title = document.getElementById('modalCardTitle').value;
        const desc = document.getElementById('modalCardDesc').value;

        const card = state.cards.find(c => c.id === id);
        if (card) {
            card.title = title;
            card.description = desc;
            card.updatedAt = new Date().toISOString();
            this.saveLocalStoragePackage();
            this.renderActiveStateContexts();
        }
        document.getElementById('cardModal').classList.remove('open');
    },

    promptCreateBrainlyFolder() {
        const title = prompt("Specify new folder directory node string identification label:");
        if (!title) return;
        const emojis = ["🧠", "💼", "💭", "🔬", "📈", "🎨", "🛠️"];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        state.brainlyFolders.push({ title, emoji: randomEmoji });
        this.saveLocalStoragePackage();
        this.clearAndPopulateBrainlyVault();
    },

    promptCreateBoardlyTab() {
        const title = prompt("Specify structural index alignment tab parameter title:");
        if (!title) return;
        if (state.boardlyTabs.includes(title)) return;
        state.boardlyTabs.push(title);
        state.boardlyActiveTab = title;
        this.saveLocalStoragePackage();
        this.clearAndPopulateBoardlyCanvas();
    },

    /* ==========================================================================
       Local Context Virtual AI Text Router Pipeline
       ========================================================================== */
    executePipelineProcessingCommand() {
        const inputNode = document.getElementById('aiHubTextInput');
        const textValue = inputNode.value.trim();
        if (!textValue) return;

        const body = document.getElementById('aiTerminalLogDisplay');
        body.innerHTML += `<p class="user-msg">${textValue}</p>`;

        const lower = textValue.toLowerCase();
        if (lower.startsWith('todo ') || lower.startsWith('task ')) {
            const title = textValue.substring(5).trim();
            this.spawnFrictionlessCard('task', 'taskly', 'taskly-todo');
            const lastCard = state.cards[state.cards.length - 1];
            lastCard.title = title;
            this.saveLocalStoragePackage();
            this.renderActiveStateContexts();
            body.innerHTML += `<p class="system-msg">Execution Complete: Spawned Taskly pipeline tracking asset titled "${title}" inside To Do column index array block.</p>`;
        } else if (lower === 'clear') {
            body.innerHTML = `<p class="system-msg">Terminal console display cache buffers flushed cleanly.</p>`;
        } else {
            body.innerHTML += `<p class="system-msg">Routing via Local Context Vectors: Vector logic analysis parsed successfully. State parameters preserved.</p>`;
        }

        inputNode.value = '';
        body.scrollTop = body.scrollHeight;
    }
};

// Initialize app triggers on completion of DOM lifecycle allocation
document.addEventListener('DOMContentLoaded', () => lifecycle.init());
