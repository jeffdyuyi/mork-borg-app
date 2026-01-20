// 骰子工具函数
export const rollD2 = () => Math.floor(Math.random() * 2) + 1;
export const rollD4 = () => Math.floor(Math.random() * 4) + 1;
export const rollD6 = () => Math.floor(Math.random() * 6) + 1;
export const rollD8 = () => Math.floor(Math.random() * 8) + 1;
export const rollD10 = () => Math.floor(Math.random() * 10) + 1;
export const rollD12 = () => Math.floor(Math.random() * 12) + 1;
export const rollD20 = () => Math.floor(Math.random() * 20) + 1;
export const roll3d6 = () => rollD6() + rollD6() + rollD6();
export const roll2d6 = () => rollD6() + rollD6();

export const roll4d6dropLow = () => {
  const rolls = [rollD6(), rollD6(), rollD6(), rollD6()].sort((a, b) => b - a);
  return rolls.slice(0, 3).reduce((a, b) => a + b, 0);
};

// 属性修正值计算
export const getModifier = (val) => {
  if (val <= 3) return -3;
  if (val <= 5) return -2;
  if (val <= 8) return -1;
  if (val <= 12) return 0;
  if (val <= 15) return 1;
  if (val <= 17) return 2;
  return 3;
};

// 通用骰子函数
export const rollDice = (type) => {
  switch(type) {
    case 'd2': return { value: rollD2(), text: `D2: ${rollD2()}` };
    case 'd4': return { value: rollD4(), text: `D4: ${rollD4()}` };
    case 'd6': return { value: rollD6(), text: `D6: ${rollD6()}` };
    case 'd8': return { value: rollD8(), text: `D8: ${rollD8()}` };
    case 'd10': return { value: rollD10(), text: `D10: ${rollD10()}` };
    case 'd12': return { value: rollD12(), text: `D12: ${rollD12()}` };
    case 'd20': return { value: rollD20(), text: `D20: ${rollD20()}` };
    case '3d6': {
      const d1 = rollD6();
      const d2 = rollD6();
      const d3 = rollD6();
      return { value: d1 + d2 + d3, text: `3D6: ${d1} + ${d2} + ${d3} = ${d1 + d2 + d3}` };
    };
    case '2d6': {
      const d4 = rollD6();
      const d5 = rollD6();
      return { value: d4 + d5, text: `2D6: ${d4} + ${d5} = ${d4 + d5}` };
    };
    default: return { value: 0, text: '未知骰子类型' };
  }
};
