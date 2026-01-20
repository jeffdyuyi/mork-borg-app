import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// 导出为JSON
export const exportToJSON = (character) => {
  const dataStr = JSON.stringify(character, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `mork-borg-${character.name}-${Date.now()}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

// 导出为图片
export const exportToImage = async (elementId, characterName) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('未找到要导出的元素');
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#0a0a0a',
      scale: 2,
      logging: false
    });

    const link = document.createElement('a');
    link.download = `mork-borg-${characterName}-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error('导出图片失败:', error);
    alert('导出图片失败，请重试');
  }
};

// 导出为PDF
export const exportToPDF = async (elementId, characterName) => {
  try {
    const element = document.getElementById(elementId);
    if (!element) {
      throw new Error('未找到要导出的元素');
    }

    const canvas = await html2canvas(element, {
      backgroundColor: '#0a0a0a',
      scale: 2,
      logging: false
    });

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`mork-borg-${characterName}-${Date.now()}.pdf`);
  } catch (error) {
    console.error('导出PDF失败:', error);
    alert('导出PDF失败，请重试');
  }
};

// 复制到剪贴板
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('复制失败:', error);
    return false;
  }
};

// 生成分享链接
export const generateShareLink = (character) => {
  const data = btoa(encodeURIComponent(JSON.stringify(character)));
  return `${window.location.origin}${window.location.pathname}?data=${data}`;
};

// 从链接解析角色
export const parseCharacterFromLink = () => {
  const params = new URLSearchParams(window.location.search);
  const data = params.get('data');
  if (data) {
    try {
      return JSON.parse(decodeURIComponent(atob(data)));
    } catch (error) {
      console.error('解析分享链接失败:', error);
      return null;
    }
  }
  return null;
};
