// 字体变量
const baseSize = {
  "--font-size-large-x": "22px",
  "--font-size-large": "18px",
  "--font-size-medium": "14px",
  "--font-size-medium-x": "16px",
  "--font-size-small-s": "10px",
  "--font-size-small": "12px",
};

//默认色
const defaultTheme = {
  "--fill-1": "#fff",
  "--text": "#333333",
  "--text-1": "#D7A269",
  "--text-2": "#F6F6F6",
  "--text-3":"#FAFAFB",
  "--text-4":"#8E8E93",
  "--background":'#F6F6F6',
  "--background-1":"#D7A269",
  "--background-2":"linear-gradient(180deg,#EDCFA2 0%,#D7A269 100%)",
  "--background-3":"#EDCFA2",
  ...baseSize,
};

const DingTalk = {
  "--fill-1": "#fff",
  "--text": "#333333",
  "--text-1": "#D7A269",
  "--text-2": "#F6F6F6",
  "--text-3":"#FAFAFB",
  "--text-4":"#8E8E93",
  "--background":'#F6F6F6',
  "--background-1":"#D7A269",
  "--background-2":"linear-gradient(180deg,#EDCFA2 0%,#D7A269 100%)",
  "--background-3":"#EDCFA2",
  ...baseSize,
};

const WeChat= {
  "--fill-1": "#fff",
  "--text": "#333333",
  "--text-1": "#D7A269",
  "--text-2": "#F6F6F6",
  "--text-3":"#FAFAFB",
  "--text-4":"#8E8E93",
  "--background":'#F6F6F6',
  "--background-1":"#D7A269",
  "--background-2":"linear-gradient(180deg,#EDCFA2 0%,#D7A269 100%)",
  "--background-3":"#EDCFA2",
  ...baseSize,
};

export let themes={
  defaultTheme:defaultTheme,
  WeChat:WeChat,
  DingTalk:DingTalk
};
