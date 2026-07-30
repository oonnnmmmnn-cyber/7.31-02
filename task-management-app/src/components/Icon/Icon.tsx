import React from 'react';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  size?: number | string;
}

const base = (
  size: number | string | undefined,
  props: React.SVGAttributes<SVGSVGElement>,
) => ({
  width: size ?? 14,
  height: size ?? 14,
  viewBox: '0 0 1024 1024',
  fill: 'currentColor',
  xmlns: 'http://www.w3.org/2000/svg',
  ...props,
});

/** §2.8 线型 V 形下箭头 —— beast-core-icon-down */
export const IconDown: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path d="M512 646.4 233.6 368a51.2 51.2 0 0 0-72.4 72.4l314.5 314.5a45.7 45.7 0 0 0 64.6 0l314.5-314.5a51.2 51.2 0 0 0-72.4-72.4L512 646.4z" />
  </svg>
);

/** §2.8 线型 V 形左箭头 —— beast-core-icon-left */
export const IconLeft: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path d="M646.4 233.6 368 512l278.4 278.4a51.2 51.2 0 1 1-72.4 72.4L259.5 548.3a45.7 45.7 0 0 1 0-64.6l314.5-314.5a51.2 51.2 0 0 1 72.4 72.4z" />
  </svg>
);

/** §2.8 线型 V 形右箭头 —— beast-core-icon-right */
export const IconRight: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path d="M377.6 233.6 656 512l-278.4 278.4a51.2 51.2 0 1 0 72.4 72.4l314.5-314.5a45.7 45.7 0 0 0 0-64.6L450 161.2a51.2 51.2 0 1 0-72.4 72.4z" />
  </svg>
);

/** §附录F 线型对勾 —— beast-core-icon-check */
export const IconCheck: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path d="M877 233.3a44.8 44.8 0 0 1 4 63.2L433.5 800a44.8 44.8 0 0 1-64.6 1.6L143.6 576.3a44.8 44.8 0 1 1 63.4-63.3l191.6 191.6L813.8 237.3a44.8 44.8 0 0 1 63.2-4z" />
  </svg>
);

/** §2.7 实心圆 + 白色 i 字形 —— beast-core-icon-info-circle_filled */
export const IconInfoCircleFilled: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <circle cx="512" cy="512" r="470" fill="currentColor" />
    <circle cx="512" cy="326" r="56" fill="#fff" />
    <rect x="456" y="440" width="112" height="330" rx="24" fill="#fff" />
  </svg>
);

/** §2.7 实心圆 + 白色感叹号 —— beast-core-icon-warning-circle_filled */
export const IconWarningCircleFilled: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <circle cx="512" cy="512" r="470" fill="currentColor" />
    <rect x="456" y="220" width="112" height="380" rx="24" fill="#fff" />
    <circle cx="512" cy="722" r="56" fill="#fff" />
  </svg>
);

/** §2.7 实心圆 + 白色叉号 —— beast-core-icon-close-circle_filled */
export const IconCloseCircleFilled: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <circle cx="512" cy="512" r="470" fill="currentColor" />
    <rect
      x="472"
      y="290"
      width="80"
      height="444"
      rx="20"
      fill="#fff"
      transform="rotate(45 512 512)"
    />
    <rect
      x="472"
      y="290"
      width="80"
      height="444"
      rx="20"
      fill="#fff"
      transform="rotate(-45 512 512)"
    />
  </svg>
);

/** §2.7 实心圆 + 白色对勾 —— beast-core-icon-check-circle_filled */
export const IconCheckCircleFilled: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <circle cx="512" cy="512" r="470" fill="currentColor" />
    <path
      d="M300 520 458 668 740 366"
      stroke="#fff"
      strokeWidth="72"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);

export const IconClose: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path
      d="M512 465.1 761.6 215.5a33.2 33.2 0 0 1 47 47L559 512l249.6 249.5a33.2 33.2 0 1 1-47 47L512 558.9 262.5 808.5a33.2 33.2 0 1 1-47-47L465 512 215.5 262.5a33.2 33.2 0 1 1 47-47L512 465.1z"
    />
  </svg>
);

export const IconSearch: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path d="M452 100a352 352 0 0 1 273 574.6l193.2 193.2a44.8 44.8 0 1 1-63.4 63.4L661.6 738A352 352 0 1 1 452 100zm0 89.6a262.4 262.4 0 1 0 0 524.8 262.4 262.4 0 0 0 0-524.8z" />
  </svg>
);

export const IconCalendar: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path d="M320 80a40 40 0 0 1 40 40v40h304v-40a40 40 0 0 1 80 0v40h64a96 96 0 0 1 96 96v544a96 96 0 0 1-96 96H216a96 96 0 0 1-96-96V256a96 96 0 0 1 96-96h64v-40a40 40 0 0 1 40-40zM200 420v380a16 16 0 0 0 16 16h592a16 16 0 0 0 16-16V420H200z" />
  </svg>
);

export const IconClear: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <circle cx="512" cy="512" r="460" fill="currentColor" opacity="0.001" />
    <path d="M512 42.7c259.1 0 469.3 210.2 469.3 469.3S771.1 981.3 512 981.3 42.7 771.1 42.7 512 252.9 42.7 512 42.7zm0 89.6C302.7 132.3 132.3 302.7 132.3 512S302.7 891.7 512 891.7 891.7 721.3 891.7 512 721.3 132.3 512 132.3zM368 336l144 144 144-144a45.3 45.3 0 0 1 64 64L576 544l144 144a45.3 45.3 0 1 1-64 64L512 608 368 752a45.3 45.3 0 1 1-64-64l144-144-144-144a45.3 45.3 0 1 1 64-64z" />
  </svg>
);

export const IconLoading: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)} className={`bc-icon-spin ${rest.className ?? ''}`}>
    <path
      d="M512 42.7a45.3 45.3 0 0 1 45.3 45.3v128a45.3 45.3 0 1 1-90.6 0V88a45.3 45.3 0 0 1 45.3-45.3z"
      opacity="1"
    />
    <path
      d="M512 42.7a469.3 469.3 0 1 1-332 795.8 45.3 45.3 0 1 1 64-64A378.7 378.7 0 1 0 512 133.3z"
      opacity="0.35"
    />
  </svg>
);

export const IconEye: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path d="M512 213.3c216.3 0 393.4 137 460.9 298.7C905.4 673.7 728.3 810.7 512 810.7S118.6 673.7 51.1 512C118.6 350.3 295.7 213.3 512 213.3zm0 89.4A209.3 209.3 0 1 0 512 721.3 209.3 209.3 0 0 0 512 302.7zm0 89.6a119.7 119.7 0 1 1 0 239.4 119.7 119.7 0 0 1 0-239.4z" />
  </svg>
);

export const IconEyeOff: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path d="m180 128 716 716a38.4 38.4 0 0 1-54.3 54.3l-98-98A522 522 0 0 1 512 810.7C295.7 810.7 118.6 673.7 51.1 512a577 577 0 0 1 156.6-215L125.7 214a38.4 38.4 0 0 1 54.3-54.3zM356 351.4A209.3 209.3 0 0 0 620.6 616l-46.4-46.4a119.7 119.7 0 0 1-146.8-146.8L356 351.4zm156-138.1c216.3 0 393.4 137 460.9 298.7a578 578 0 0 1-101 158.7l-64.6-64.6A480 480 0 0 0 512 302.7c-15.8 0-31.3.9-46.6 2.7l-70-70A527 527 0 0 1 512 213.3z" />
  </svg>
);

export const IconPlus: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path d="M512 128a48 48 0 0 1 48 48v288h288a48 48 0 0 1 0 96H560v288a48 48 0 0 1-96 0V560H176a48 48 0 0 1 0-96h288V176a48 48 0 0 1 48-48z" />
  </svg>
);

export const IconMore: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <circle cx="200" cy="512" r="72" />
    <circle cx="512" cy="512" r="72" />
    <circle cx="824" cy="512" r="72" />
  </svg>
);

export const IconMinus: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <rect x="160" y="464" width="704" height="96" rx="20" />
  </svg>
);

export const IconMenu: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <rect x="128" y="192" width="768" height="80" rx="16" />
    <rect x="128" y="472" width="768" height="80" rx="16" />
    <rect x="128" y="752" width="768" height="80" rx="16" />
  </svg>
);

export const IconBell: React.FC<IconProps> = ({ size, ...rest }) => (
  <svg {...base(size, rest)}>
    <path d="M512 64a64 64 0 0 1 64 64v18.3c148.6 27.8 261.3 158.1 261.3 314.6v185.8l72.4 108.6a48 48 0 0 1-40 74.6H154.3a48 48 0 0 1-40-74.6l72.4-108.6V460.9c0-156.5 112.7-286.8 261.3-314.6V128a64 64 0 0 1 64-64zM512 896a96 96 0 0 0 92.4-70.4H419.6A96 96 0 0 0 512 896z" />
  </svg>
);
