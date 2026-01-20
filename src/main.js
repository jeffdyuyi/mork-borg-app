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
  loadSavedCharacters();
  checkForSharedCharacter();
}

// 设置事件监听
function setupEventListeners() {
  document.getElementById('generateChar').addEventListener('click', handleGenerateCharacter);
  document.getElementById('resetChar').addEventListener('click', handleResetCharacter);
  document.getElementById('editChar').addEventListener('click', toggleEditMode);
  document.getElementById('saveChar').addEventListener('click', handleSaveCharacter);
  document.getElementById('exportChar').addEventListener('click', handleExportCharacter);
  document.getElementById('guideToggle').addEventListener('click', toggleGuide);
  
  // 将骰子函数暴露到全局
  window.rollDice = handleRollDice;
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
    { id: 'charClass', type: 'text' },
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
}

// 保存编辑
function saveEdits() {
  const editableElements = [
    'charName', 'charClass', 'charBg', 'charHp', 'charOmen',
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

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', initApp);
