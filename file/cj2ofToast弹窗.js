// 定义控件类型
//@KONG_空提供控件
//有问题联系@KONG_空
//作者QQ号：2165026727
const types = {
      type: 'TOAST_FUNCTIONAL_WIDGET',
      icon: 'https://static.codemao.cn/appcraft/tmp-extension-widgets/development/toast-icon.svg',
      title: 'Toast 功能控件',
      isInvisibleWidget: true,
      isGlobalWidget: false,
      properties: [
          {
              key: 'message',
              label: '消息内容',
              valueType: 'string',
              defaultValue: '这是一个 Toast 消息',
              tooltip: '设置要显示的消息内容'
          },
          {
              key: 'duration',
              label: '显示时长',
              valueType: 'number',
              defaultValue: 3000,
              tooltip: '设置消息显示的时长（毫秒）'
          },
          {
              key: 'position',
              label: '弹窗位置',
              valueType: 'string',
              defaultValue: 'top',
              tooltip: '设置弹窗的位置，例如 "top", "middle", "bottom"'
          },
          {
              key: 'color',
              label: '文本颜色(RGB类型)',
              valueType: 'string',
              defaultValue: '0, 0, 0', // 用户仅输入三个数字，例如 "0, 0, 0"
              tooltip: '设置消息的文本颜色'
          },
          {
              key: 'fontSize',
              label: '文本大小',
              valueType: 'number',
              defaultValue: 16,
              tooltip: '设置消息的文本大小'
          },
          {
              key: 'backgroundColor',
              label: '背景颜色(RGB类型)',
              valueType: 'string',
              defaultValue: '0, 0, 0', // 用户仅输入三个数字，例如 "0, 0, 0"
              tooltip: '设置弹窗的背景颜色'
          }
      ],
      methods: [
          {
              key: 'showToast',
              label: '显示 Toast',
              params: [
                 {
                      key: 'waitUntilDone',
                      label: '等待弹窗结束执行代码',
                      valueType: 'boolean',
                      defaultValue: false,
                      tooltip: '是否等待弹窗结束后再继续执行代码'
                  }
              ]
          }
      ],
      events: []
};

// 定义控件实体
class ToastFunctionalWidget extends InvisibleWidget {
      constructor(props) {
          super(props);
          this.message = props.message;
          this.duration = props.duration;
          this.position = props.position;
          this.color = props.color;
          this.fontSize = props.fontSize;
          this.backgroundColor = props.backgroundColor;
      }

      // 将输入的颜色字符串转换为RGB格式
      parseColor(colorStr) {
          const rgb = colorStr.split(',').map(str => parseInt(str.trim(), 10));
          return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      }

      showToast(waitUntilDone) {
          // 创建一个 Toast 元素
          const toast = document.createElement('div');
          toast.style.position = 'fixed';
          toast.style.padding = '10px';
          toast.style.backgroundColor = this.parseColor(this.backgroundColor);
          toast.style.color = this.parseColor(this.color);
          toast.style.fontSize = `${this.fontSize}px`;
          toast.style.borderRadius = '5px';
          toast.style.zIndex = '1000';
          toast.style.opacity = '0';
          toast.style.transition = 'opacity 0.5s';
          toast.textContent = this.message;

          // 根据位置设置样式
          const verticalPosition = this.position;
          toast.style.top = verticalPosition === 'top' ? '20px' : verticalPosition === 'middle' ? '50%' : 'auto';
          toast.style.bottom = verticalPosition === 'bottom' ? '20px' : 'auto';
          toast.style.left = '50%';
          toast.style.transform = 'translateX(-50%)';

          // 将 Toast 元素添加到文档中
          document.body.appendChild(toast);

          // 设置 Toast 显示
          setTimeout(() => {
              toast.style.opacity = '1';
          }, 10);

          // 设置 Toast 在指定时间后消失
          const hideToast = () => {
              toast.style.opacity = '0';
              setTimeout(() => {
                  document.body.removeChild(toast);
              }, 500);
          };

          setTimeout(hideToast, this.duration);

          // 如果需要等待弹窗结束再继续执行代码
          if (waitUntilDone) {
              return new Promise((resolve) => {
                  setTimeout(() => {
                      resolve();
                  }, this.duration + 500); // 等待隐藏动画结束
              });
          }
      }
}

// 导出控件类型和控件实体
exports.types = types;
exports.widget = ToastFunctionalWidget;
