// 本地存储管理
const STORAGE_KEY = 'morkBorgCharacters';

export const storage = {
  // 获取所有保存的角色
  getCharacters: () => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('读取存储失败:', error);
      return [];
    }
  },

  // 保存角色
  saveCharacter: (character) => {
    try {
      const characters = storage.getCharacters();
      character.id = character.id || Date.now();
      character.timestamp = character.timestamp || new Date().toLocaleString('zh-CN');
      characters.push(character);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
      return true;
    } catch (error) {
      console.error('保存角色失败:', error);
      return false;
    }
  },

  // 更新角色
  updateCharacter: (character) => {
    try {
      const characters = storage.getCharacters();
      const index = characters.findIndex(c => c.id === character.id);
      if (index !== -1) {
        characters[index] = { ...characters[index], ...character };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
        return true;
      }
      return false;
    } catch (error) {
      console.error('更新角色失败:', error);
      return false;
    }
  },

  // 删除角色
  deleteCharacter: (id) => {
    try {
      const characters = storage.getCharacters();
      const filtered = characters.filter(c => c.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('删除角色失败:', error);
      return false;
    }
  },

  // 清空所有角色
  clearAll: () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('清空存储失败:', error);
      return false;
    }
  },

  // 导出所有角色
  exportAll: () => {
    try {
      const characters = storage.getCharacters();
      return JSON.stringify(characters, null, 2);
    } catch (error) {
      console.error('导出角色失败:', error);
      return null;
    }
  },

  // 导入角色
  importCharacters: (jsonString) => {
    try {
      const characters = JSON.parse(jsonString);
      if (Array.isArray(characters)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(characters));
        return true;
      }
      return false;
    } catch (error) {
      console.error('导入角色失败:', error);
      return false;
    }
  }
};
