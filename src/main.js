import { generateCharacter, resetCharacter, formatAttribute } from './utils/character.js';
import { rollDice as rollDiceUtil } from './utils/dice.js';
import { storage } from './utils/storage.js';
import { exportToJSON, exportToImage, exportToPDF } from './utils/export.js';

// 全局变量
let currentCharacter = null;
let isEditMode = false;

// 初始化应用
function initApp() {
  setupEventListeners();
  loadThemePreference();
  loadSavedCharacters();
  checkForSharedCharacter();
  initNavigation();
  handleResetCharacter();
  
  // 检查是否首次进入，显示作者信息弹窗
  const hasSeenAuthorInfo = localStorage.getItem('hasSeenAuthorInfo');
  if (!hasSeenAuthorInfo) {
    showAuthorInfoModal();
    localStorage.setItem('hasSeenAuthorInfo', 'true');
  }
}

// 初始化导航
function initNavigation() {
  // 显示默认页面
  showPage('character');
}

// 设置事件监听
function setupEventListeners() {
  document.getElementById('generateChar').addEventListener('click', handleGenerateCharacter);
  document.getElementById('resetChar').addEventListener('click', handleResetCharacter);
  document.getElementById('editChar').addEventListener('click', toggleEditMode);
  document.getElementById('saveChar').addEventListener('click', handleSaveCharacter);
  document.getElementById('exportChar').addEventListener('click', handleExportCharacter);
  document.getElementById('themeToggle').addEventListener('click', toggleTheme);
  
  // 导航菜单事件监听
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const page = this.getAttribute('data-page');
      showPage(page);
    });
  });
  
  // 将骰子函数暴露到全局
  window.rollDice = handleRollDice;
}

// 显示指定页面
function showPage(pageId) {
  // 隐藏所有页面
  const pages = document.querySelectorAll('.page');
  pages.forEach(page => {
    page.classList.remove('active');
  });
  
  // 显示选中的页面
  const selectedPage = document.getElementById(pageId + 'Page');
  if (selectedPage) {
    selectedPage.classList.add('active');
  }
  
  // 更新导航按钮状态
  const navBtns = document.querySelectorAll('.nav-btn');
  navBtns.forEach(btn => {
    if (btn.id === 'showAuthorInfo') {
      // 作者信息按钮不参与active状态管理
      btn.classList.remove('active');
    } else if (btn.getAttribute('data-page') === pageId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
  
  // 控制角色操作按钮组的显示
  if (pageId === 'character') {
    document.getElementById('characterActions').style.display = 'flex';
  } else {
    document.getElementById('characterActions').style.display = 'none';
  }
}

// 切换主题
function toggleTheme() {
  const body = document.body;
  const btn = document.getElementById('themeToggle');
  const isLight = body.classList.toggle('light');
  
  // 更新按钮文本
  btn.textContent = isLight ? '🌞' : '🌙';
  
  // 保存主题偏好到localStorage
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

// 加载保存的主题偏好
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light');
    document.getElementById('themeToggle').textContent = '🌞';
  }
}

// 生成角色
function handleGenerateCharacter() {
  const character = generateCharacter();
  currentCharacter = character;
  displayCharacter(character);
  
  // 添加动画效果
  const card = document.getElementById('charCard');
  card.classList.add('fade-in');
  setTimeout(() => card.classList.remove('fade-in'), 500);
  
  // 退出编辑模式
  if (isEditMode) {
    toggleEditMode();
  }
}

// 重置角色
function handleResetCharacter() {
  const character = resetCharacter();
  currentCharacter = null;
  displayCharacter(character);
  
  if (isEditMode) {
    toggleEditMode();
  }
}

// 显示角色
function displayCharacter(character) {
  document.getElementById('charName').textContent = character.name;
  document.getElementById('charClass').textContent = character.class;
  document.getElementById('charBg').textContent = character.bg;
  document.getElementById('agi').textContent = formatAttribute(character.agi, character.agiMod);
  document.getElementById('prs').textContent = formatAttribute(character.prs, character.prsMod);
  document.getElementById('str').textContent = formatAttribute(character.str, character.strMod);
  document.getElementById('tgh').textContent = formatAttribute(character.tgh, character.tghMod);
  document.getElementById('charHp').textContent = character.hp + " 点 (最低1HP)";
  document.getElementById('charOmen').textContent = character.omen;
  document.getElementById('charWeapon').textContent = `${character.weapon.name} (${character.weapon.dmg})`;
  document.getElementById('charArmor').textContent = `${character.armor.name} ${character.armor.desc}`;
  document.getElementById('basicSilver').textContent = character.silver;
  document.getElementById('basicFood').textContent = character.food;
  document.getElementById('charContainer').textContent = character.container.name;
  document.getElementById('charSupply1').textContent = character.supply1.name;
  document.getElementById('charSupply2').textContent = character.supply2.name;
  document.getElementById('scrollType').textContent = character.scrollType;
  document.getElementById('scrollEffect').textContent = character.scrollEffect;
  document.getElementById('charUnique').innerHTML = character.unique;
}

// 掷骰子
function handleRollDice(type) {
  const result = rollDiceUtil(type);
  const resultElement = document.getElementById('diceResult');
  resultElement.innerHTML = result.text;
  resultElement.style.animation = 'none';
  resultElement.offsetHeight; // 触发重排
  resultElement.style.animation = 'roll 0.5s ease-out';
}

// 切换编辑模式
function toggleEditMode() {
  isEditMode = !isEditMode;
  const card = document.getElementById('charCard');
  const btn = document.getElementById('editChar');
  
  if (isEditMode) {
    card.classList.add('edit-mode');
    btn.textContent = '完成编辑 ✓';
    makeEditable();
  } else {
    card.classList.remove('edit-mode');
    btn.textContent = '编辑角色 ✏️';
    saveEdits();
  }
}

// 使字段可编辑
function makeEditable() {
  const editableElements = [
    { id: 'charName', type: 'text' },
    { id: 'charBg', type: 'textarea' },
    { id: 'charHp', type: 'text' },
    { id: 'charOmen', type: 'text' },
    { id: 'basicSilver', type: 'text' },
    { id: 'basicFood', type: 'text' },
    { id: 'charContainer', type: 'text' },
    { id: 'charSupply1', type: 'text' },
    { id: 'charSupply2', type: 'text' },
    { id: 'scrollEffect', type: 'textarea' },
    { id: 'charUnique', type: 'textarea' }
  ];
  
  editableElements.forEach(el => {
    const element = document.getElementById(el.id);
    if (element) {
      const currentValue = element.textContent;
      const input = document.createElement(el.type === 'textarea' ? 'textarea' : 'input');
      input.type = el.type === 'text' ? 'text' : 'text';
      input.value = currentValue;
      input.className = 'editable';
      if (el.type === 'textarea') {
        input.rows = 3;
      }
      element.innerHTML = '';
      element.appendChild(input);
    }
  });
  
  // 为职业添加下拉菜单
  const charClassElement = document.getElementById('charClass');
  if (charClassElement) {
    const currentClass = charClassElement.textContent;
    const select = document.createElement('select');
    select.className = 'editable';
    
    // 添加职业选项
    const classes = ["尖牙逃兵", "阴沟恶棍", "神秘隐士", "落魄王室", "异端祭司", "密教药师"];
    classes.forEach(cls => {
      const option = document.createElement('option');
      option.value = cls;
      option.textContent = cls;
      if (cls === currentClass) {
        option.selected = true;
      }
      select.appendChild(option);
    });
    
    // 添加重新生成按钮
    const regenerateBtn = document.createElement('button');
    regenerateBtn.textContent = '重新生成';
    regenerateBtn.className = 'regenerate-btn';
    regenerateBtn.style.marginLeft = '10px';
    regenerateBtn.style.padding = '5px 10px';
    regenerateBtn.style.fontSize = '0.8rem';
    regenerateBtn.style.background = 'linear-gradient(145deg, #2d0000, #1a0000)';
    regenerateBtn.style.color = '#fff';
    regenerateBtn.style.border = '1px solid #d4af37';
    regenerateBtn.style.borderRadius = '4px';
    regenerateBtn.style.cursor = 'pointer';
    regenerateBtn.addEventListener('click', function() {
      regenerateCharacterByClass(select.value);
    });
    
    charClassElement.innerHTML = '';
    charClassElement.appendChild(select);
    charClassElement.appendChild(regenerateBtn);
  }
}

// 保存编辑
function saveEdits() {
  const editableElements = [
    'charName', 'charBg', 'charHp', 'charOmen',
    'basicSilver', 'basicFood', 'charContainer', 'charSupply1', 
    'charSupply2', 'scrollEffect', 'charUnique'
  ];
  
  editableElements.forEach(id => {
    const element = document.getElementById(id);
    const input = element.querySelector('.editable');
    if (input) {
      element.textContent = input.value;
    }
  });
  
  // 保存职业选择
  const charClassElement = document.getElementById('charClass');
  const classSelect = charClassElement.querySelector('select');
  if (classSelect) {
    charClassElement.textContent = classSelect.value;
  }
  
  alert('编辑已保存！');
}

// 保存角色
function handleSaveCharacter() {
  if (!currentCharacter) {
    alert('请先生成一个角色！');
    return;
  }
  
  const success = storage.saveCharacter(currentCharacter);
  if (success) {
    loadSavedCharacters();
    alert('角色已保存！');
  } else {
    alert('保存失败，请重试');
  }
}

// 导出角色
function handleExportCharacter() {
  if (!currentCharacter) {
    alert('请先生成一个角色！');
    return;
  }
  
  const exportOptions = [
    { label: '导出为 JSON', action: () => exportToJSON(currentCharacter) },
    { label: '导出为图片', action: () => exportToImage('charCard', currentCharacter.name) },
    { label: '导出为 PDF', action: () => exportToPDF('charCard', currentCharacter.name) }
  ];
  
  const choice = prompt(
    '选择导出格式：\n1. JSON\n2. 图片\n3. PDF\n\n输入数字选择：',
    '1'
  );
  
  const index = parseInt(choice) - 1;
  if (index >= 0 && index < exportOptions.length) {
    exportOptions[index].action();
  } else {
    alert('无效的选择');
  }
}

// 加载保存的角色
function loadSavedCharacters() {
  const characters = storage.getCharacters();
  const container = document.getElementById('savedCharacters');
  
  if (characters.length === 0) {
    container.innerHTML = '<p style="text-align: center; color: #888;">暂无保存的角色</p>';
    return;
  }
  
  container.innerHTML = characters.map(char => `
    <div class="saved-char-item">
      <div class="saved-char-info">
        <div class="saved-char-name">${char.name}</div>
        <div class="saved-char-class">${char.class} | ${char.timestamp || ''}</div>
      </div>
      <div class="saved-char-actions">
        <button class="action-btn" onclick="window.loadCharacter(${char.id})">加载</button>
        <button class="action-btn delete" onclick="window.deleteCharacter(${char.id})">删除</button>
      </div>
    </div>
  `).join('');
}

// 加载单个角色
window.loadCharacter = function(id) {
  const characters = storage.getCharacters();
  const charData = characters.find(c => c.id === id);
  if (!charData) return;
  
  currentCharacter = charData;
  displayCharacter(charData);
  alert('角色已加载！');
};

// 删除角色
window.deleteCharacter = function(id) {
  if (!confirm('确定要删除这个角色吗？')) return;
  
  const success = storage.deleteCharacter(id);
  if (success) {
    loadSavedCharacters();
    alert('角色已删除！');
  } else {
    alert('删除失败，请重试');
  }
};

// 根据职业重新生成角色
function regenerateCharacterByClass(className) {
  // 导入必要的工具函数和数据
  import('./utils/character.js').then(({ generateCharacter }) => {
    import('./data/gameData.js').then(({ CLASSES, WEAPONS_FULL, WEAPONS_SCROLL, ARMORS_FULL, ARMORS_SCROLL, CONTAINERS, SUPPLY1, SUPPLY2, UNHOLY_SCROLLS, HOLY_SCROLLS }) => {
      import('./utils/dice.js').then(({ rollD4, rollD6, rollD8, rollD10, rollD12, roll2d6, roll3d6, getModifier }) => {
        // 找到选择的职业
        const selectedClass = CLASSES.find(cls => cls.name === className);
        if (!selectedClass) return;
        
        // 是否持有卷轴
        const hasScroll = Math.random() > 0.5;
        let scrollType = "无";
        let scrollEffect = "无法术效果";
        
        if (hasScroll) {
          scrollType = Math.random() > 0.5 ? "【不洁卷轴】" : "【神圣卷轴】";
          scrollEffect = scrollType.includes("不洁") 
            ? UNHOLY_SCROLLS[rollD10() - 1] 
            : HOLY_SCROLLS[rollD10() - 1];
        }
        
        // 根据是否持有卷轴筛选武器/护甲池
        const weaponPool = hasScroll ? WEAPONS_SCROLL : WEAPONS_FULL;
        const armorPool = hasScroll ? ARMORS_SCROLL : ARMORS_FULL;
        const randomWeapon = weaponPool[Math.floor(Math.random() * weaponPool.length)];
        const randomArmor = armorPool[Math.floor(Math.random() * armorPool.length)];
        
        // 生成属性
        let agi = roll3d6();
        let prs = roll3d6();
        let str = roll3d6();
        let tgh = roll3d6();
        
        // 根据职业调整属性
        if (className === "尖牙逃兵") {
          str = roll3d6() + 2; // 强壮骰 3d6+2
          agi = roll3d6() - 1; // 灵巧骰 3d6-1
        } else if (className === "阴沟恶棍") {
          str = roll3d6() - 2; // 强壮骰 3d6-2
        } else if (className === "神秘隐士") {
          prs = roll3d6() + 2; // 表现骰 3d6+2
          str = roll3d6() - 2; // 强壮骰 3d6-2
        } else if (className === "异端祭司") {
          prs = roll3d6() + 2; // 表现骰 3d6+2
          str = roll3d6() - 2; // 强壮骰 3d6-2
        } else if (className === "密教药师") {
          tgh = roll3d6() + 2; // 体质骰 3d6+2
          str = roll3d6() - 2; // 强壮骰 3d6-2
        }
        
        const agiMod = getModifier(agi);
        const prsMod = getModifier(prs);
        const strMod = getModifier(str);
        const tghMod = getModifier(tgh);
        
        // 初始物资
        const basicSilver = roll2d6() * 10;
        const basicFood = rollD4();
        const randomContainer = CONTAINERS[rollD6() - 1];
        const randomSupply1 = SUPPLY1[rollD12() - 1];
        const randomSupply2 = SUPPLY2[rollD12() - 1];
        
        // HP和预兆
        let hp = tghMod + rollD8();
        hp = hp < 1 ? 1 : hp;
        const omen = rollD4();
        
        // 随机背景和独特能力
        const randomBg = selectedClass.bg[Math.floor(Math.random() * selectedClass.bg.length)];
        const randomUnique = selectedClass.unique[Math.floor(Math.random() * selectedClass.unique.length)];
        
        const scrollStatusText = hasScroll 
          ? "【当前状态】：持有法术卷轴 → 武器池强制=d6 | 护甲池强制=d2 | 双手武器/中甲/重甲将使法术失效！"
          : "【当前状态】：未持有法术卷轴 → 武器池=d10 | 护甲池=d4";
        
        // 更新当前角色
        currentCharacter = {
          ...currentCharacter,
          class: selectedClass.name,
          bg: randomBg,
          agi: agi,
          agiMod: agiMod,
          prs: prs,
          prsMod: prsMod,
          str: str,
          strMod: strMod,
          tgh: tgh,
          tghMod: tghMod,
          hp: hp,
          omen: omen,
          weapon: randomWeapon,
          armor: randomArmor,
          silver: basicSilver,
          food: basicFood,
          container: randomContainer,
          supply1: randomSupply1,
          supply2: randomSupply2,
          scrollType: scrollType,
          scrollEffect: scrollEffect,
          unique: randomUnique,
          trait: selectedClass.trait,
          attrRule: selectedClass.attrRule,
          scrollStatus: scrollStatusText,
          hasScroll: hasScroll
        };
        
        // 显示更新后的角色
        displayCharacter(currentCharacter);
        
        // 重新进入编辑模式
        makeEditable();
        
        alert('角色已根据新职业重新生成！');
      });
    });
  });
}

// 切换物品价值速查手册
function toggleGuide() {
  const content = document.getElementById('guideContent');
  content.classList.toggle('active');
  const icon = document.querySelector('.guide-header span');
  icon.textContent = content.classList.contains('active') ? "▲" : "▼";
}

// 检查分享的角色
function checkForSharedCharacter() {
  const urlParams = new URLSearchParams(window.location.search);
  const data = urlParams.get('data');
  if (data) {
    try {
      const character = JSON.parse(decodeURIComponent(atob(data)));
      currentCharacter = character;
      displayCharacter(character);
      alert('已加载分享的角色！');
    } catch (error) {
      console.error('解析分享角色失败:', error);
    }
  }
}

// 显示作者信息弹窗
function showAuthorInfoModal() {
  const modal = document.createElement('div');
  modal.className = 'author-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <h2>作者信息</h2>
      <p>感谢使用 MÖRK BORG 角色创建工具！</p>
      <p>此工具基于 MÖRK BORG 桌面角色扮演游戏规则制作，旨在帮助玩家快速生成角色。</p>
      <p>版本：1.0.0</p>
      <button id="closeModal" class="close-btn">关闭</button>
    </div>
  `;
  document.body.appendChild(modal);
  
  // 添加关闭按钮事件
  document.getElementById('closeModal').addEventListener('click', function() {
    modal.remove();
  });
}

// 初始化冒险杂记功能
function initJournal() {
  const addBtn = document.getElementById('addJournalEntry');
  if (addBtn) {
    addBtn.addEventListener('click', addJournalEntry);
  }
  
  // 加载保存的冒险记录
  loadJournalEntries();
}

// 添加新的冒险记录
function addJournalEntry() {
  const entriesContainer = document.getElementById('journalEntries');
  const entryId = Date.now();
  
  const entry = document.createElement('div');
  entry.className = 'journal-entry';
  entry.dataset.id = entryId;
  
  // 获取保存的角色列表
  const savedChars = storage.getCharacters();
  const charOptions = savedChars.map(char => `
    <option value="${char.name}">${char.name} (${char.class})</option>
  `).join('');
  
  entry.innerHTML = `
    <div class="journal-entry-header">
      <h3>冒险记录 #${entryId}</h3>
      <button class="delete-journal-btn">删除</button>
    </div>
    <div class="journal-form">
      <div class="form-group">
        <label>日期：</label>
        <input type="date" class="journal-date" value="${new Date().toISOString().split('T')[0]}">
      </div>
      <div class="form-group">
        <label>角色名：</label>
        <select class="journal-character">
          <option value="">手动输入</option>
          ${charOptions}
        </select>
        <input type="text" class="journal-character-manual" placeholder="请输入角色名">
      </div>
      <div class="form-group">
        <label>冒险故事：</label>
        <textarea class="journal-story" rows="4" placeholder="记录本次冒险的详细内容..."></textarea>
      </div>
      <div class="form-group">
        <label>人名与线索：</label>
        <textarea class="journal-clues" rows="2" placeholder="记录遇到的NPC和重要线索..."></textarea>
      </div>
      <div class="form-group">
        <label>战利品速记：</label>
        <textarea class="journal-loot" rows="2" placeholder="记录获得的战利品..."></textarea>
      </div>
      <button class="save-journal-btn">保存记录</button>
    </div>
  `;
  
  entriesContainer.appendChild(entry);
  
  // 添加删除按钮事件
  const deleteBtn = entry.querySelector('.delete-journal-btn');
  deleteBtn.addEventListener('click', function() {
    if (confirm('确定要删除这条记录吗？')) {
      entry.remove();
      saveJournalEntries();
    }
  });
  
  // 添加保存按钮事件
  const saveBtn = entry.querySelector('.save-journal-btn');
  saveBtn.addEventListener('click', function() {
    saveJournalEntries();
    alert('记录已保存！');
  });
  
  // 角色选择事件
  const charSelect = entry.querySelector('.journal-character');
  const charManual = entry.querySelector('.journal-character-manual');
  
  charSelect.addEventListener('change', function() {
    charManual.value = '';
  });
  
  charManual.addEventListener('input', function() {
    charSelect.value = '';
  });
}

// 保存冒险记录到localStorage
function saveJournalEntries() {
  const entries = [];
  const entryElements = document.querySelectorAll('.journal-entry');
  
  entryElements.forEach(entry => {
    const id = entry.dataset.id;
    const date = entry.querySelector('.journal-date').value;
    const charSelect = entry.querySelector('.journal-character').value;
    const charManual = entry.querySelector('.journal-character-manual').value;
    const character = charSelect || charManual;
    const story = entry.querySelector('.journal-story').value;
    const clues = entry.querySelector('.journal-clues').value;
    const loot = entry.querySelector('.journal-loot').value;
    
    entries.push({
      id,
      date,
      character,
      story,
      clues,
      loot
    });
  });
  
  localStorage.setItem('journalEntries', JSON.stringify(entries));
}

// 从localStorage加载冒险记录
function loadJournalEntries() {
  const savedEntries = localStorage.getItem('journalEntries');
  if (savedEntries) {
    try {
      const entries = JSON.parse(savedEntries);
      const entriesContainer = document.getElementById('journalEntries');
      
      entries.forEach(entryData => {
        const entry = document.createElement('div');
        entry.className = 'journal-entry';
        entry.dataset.id = entryData.id;
        
        // 获取保存的角色列表
        const savedChars = storage.getCharacters();
        const charOptions = savedChars.map(char => `
          <option value="${char.name}" ${char.name === entryData.character ? 'selected' : ''}>${char.name} (${char.class})</option>
        `).join('');
        
        entry.innerHTML = `
          <div class="journal-entry-header">
            <h3>冒险记录 #${entryData.id}</h3>
            <button class="delete-journal-btn">删除</button>
          </div>
          <div class="journal-form">
            <div class="form-group">
              <label>日期：</label>
              <input type="date" class="journal-date" value="${entryData.date}">
            </div>
            <div class="form-group">
              <label>角色名：</label>
              <select class="journal-character">
                <option value="" ${!savedChars.some(char => char.name === entryData.character) ? 'selected' : ''}>手动输入</option>
                ${charOptions}
              </select>
              <input type="text" class="journal-character-manual" placeholder="请输入角色名" value="${!savedChars.some(char => char.name === entryData.character) ? entryData.character : ''}">
            </div>
            <div class="form-group">
              <label>冒险故事：</label>
              <textarea class="journal-story" rows="4" placeholder="记录本次冒险的详细内容...">${entryData.story}</textarea>
            </div>
            <div class="form-group">
              <label>人名与线索：</label>
              <textarea class="journal-clues" rows="2" placeholder="记录遇到的NPC和重要线索...">${entryData.clues}</textarea>
            </div>
            <div class="form-group">
              <label>战利品速记：</label>
              <textarea class="journal-loot" rows="2" placeholder="记录获得的战利品...">${entryData.loot}</textarea>
            </div>
            <button class="save-journal-btn">保存记录</button>
          </div>
        `;
        
        entriesContainer.appendChild(entry);
        
        // 添加删除按钮事件
        const deleteBtn = entry.querySelector('.delete-journal-btn');
        deleteBtn.addEventListener('click', function() {
          if (confirm('确定要删除这条记录吗？')) {
            entry.remove();
            saveJournalEntries();
          }
        });
        
        // 添加保存按钮事件
        const saveBtn = entry.querySelector('.save-journal-btn');
        saveBtn.addEventListener('click', function() {
          saveJournalEntries();
          alert('记录已保存！');
        });
        
        // 角色选择事件
        const charSelect = entry.querySelector('.journal-character');
        const charManual = entry.querySelector('.journal-character-manual');
        
        charSelect.addEventListener('change', function() {
          charManual.value = '';
        });
        
        charManual.addEventListener('input', function() {
          charSelect.value = '';
        });
      });
    } catch (error) {
      console.error('加载冒险记录失败:', error);
    }
  }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
  initApp();
  initJournal();
});
