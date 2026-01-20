import { 
  CLASSES, NAMES, WEAPONS_FULL, WEAPONS_SCROLL, 
  ARMORS_FULL, ARMORS_SCROLL, CONTAINERS, SUPPLY1, SUPPLY2,
  UNHOLY_SCROLLS, HOLY_SCROLLS 
} from '../data/gameData.js';
import { rollD4, rollD6, rollD8, rollD10, rollD12, roll2d6, roll3d6, getModifier } from './dice.js';

// 生成随机角色
export const generateCharacter = () => {
  const randomClass = CLASSES[Math.floor(Math.random() * CLASSES.length)];
  const randomName = NAMES[Math.floor(Math.random() * NAMES.length)];
  const randomBg = randomClass.bg[Math.floor(Math.random() * randomClass.bg.length)];
  const randomUnique = randomClass.unique[Math.floor(Math.random() * randomClass.unique.length)];

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
  const agi = roll3d6();
  const prs = roll3d6();
  const str = roll3d6();
  const tgh = roll3d6();

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

  const scrollStatusText = hasScroll 
    ? "【当前状态】：持有法术卷轴 → 武器池强制=d6 | 护甲池强制=d2 | 双手武器/中甲/重甲将使法术失效！"
    : "【当前状态】：未持有法术卷轴 → 武器池=d10 | 护甲池=d4";

  return {
    name: randomName,
    class: randomClass.name,
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
    trait: randomClass.trait,
    attrRule: randomClass.attrRule,
    scrollStatus: scrollStatusText,
    hasScroll: hasScroll
  };
};

// 重置角色数据
export const resetCharacter = () => ({
  name: "未生成",
  class: "未生成",
  bg: "未生成",
  agi: 0,
  agiMod: 0,
  prs: 0,
  prsMod: 0,
  str: 0,
  strMod: 0,
  tgh: 0,
  tghMod: 0,
  hp: 0,
  omen: 0,
  weapon: { name: "未生成", dmg: "", price: "" },
  armor: { name: "未生成", desc: "", price: "" },
  silver: 0,
  food: 0,
  container: { name: "未生成", price: "" },
  supply1: { name: "未生成", price: "" },
  supply2: { name: "未生成", price: "" },
  scrollType: "无",
  scrollEffect: "未生成",
  unique: "未生成",
  trait: "点击「生成随机角色」按钮，获取你的完整末日角色信息 ✦ 所有规则完整无删减，可直接用于游戏",
  attrRule: "未生成",
  scrollStatus: "【当前状态】：未持有法术卷轴 → 武器池=d10 | 护甲池=d4",
  hasScroll: false
});

// 格式化属性显示
export const formatAttribute = (value, modifier) => {
  return `${value} [${modifier >= 0 ? '+' : ''}${modifier}]`;
};
