// clickOutside.js

export function clickOutside(node) {
  const handleClick = (event) => {
      // 检查点击是否在节点外部
      if (!node.contains(event.target)) {
          node.dispatchEvent(new CustomEvent('click_outside', { detail: event }));
      }
  };

  // 添加事件监听器
  document.addEventListener('click', handleClick, true);

  return {
      destroy() {
          // 移除事件监听器
          document.removeEventListener('click', handleClick, true);
      }
  };
}