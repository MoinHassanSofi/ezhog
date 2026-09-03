'use client';

import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100/80 shadow-2xs">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6 h-[64px] flex items-center justify-between gap-6 sm:gap-12">
        {/* Exact Original EZHog Vector Logo (Icon + Text in SVG) */}
        <a href="/" className="shrink-0 flex items-center">
          <svg
            width="123"
            height="51"
            viewBox="0 0 623 221"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block h-[40px] sm:h-[46px] w-auto max-h-[46px]"
          >
            <path
              d="M79.6611 154.036C79.9715 154.06 80.253 154.108 80.5346 154.156C80.253 154.084 79.9715 154.036 79.6611 154.036ZM80.5346 154.156C80.7584 154.197 80.9677 154.229 81.1771 154.261C80.9749 154.221 80.7584 154.173 80.5346 154.156Z"
              fill="#FF7F23"
            />
            <path
              d="M277.205 111.519C277.963 110.496 278.114 109.087 277.594 107.871C277.075 106.663 276.006 105.906 274.786 105.906H262.803L268.253 76.1442L248.82 74.6384L246.38 30.0519L221.793 37.0494L214.408 0L146.558 46.5514L78.4917 0L72.399 36.3247L50.9158 27.0161L46.5411 30.0519L45.1695 73.6399L28.1547 71.8924L30.9917 104.618H18.1206L15.7023 111.519L33.0131 135.595L39.7699 153.093H32.6232L29.7068 157.144L30.6164 160.961L45.7976 175.318L142.227 220.71H149.46L246.315 175.882L262.283 160.961L263.2 157.144H253.743L253.137 153.093L262.673 143.278L277.205 111.519Z"
              fill="#FF7F23"
            />
            <path
              d="M225.352 77.6662C205.222 80.3638 203.194 82.554 200.696 104.296C198.198 82.554 196.17 80.3638 176.04 77.6662C196.17 74.9686 198.198 72.7783 200.696 51.0366C203.194 72.7783 205.222 74.9686 225.352 77.6662Z"
              fill="white"
            />
            <path
              d="M104.163 83.8504L101.643 69.5009C100.912 65.3459 98.2134 61.9155 94.5452 60.458L78.4856 54.0966C78.1874 53.9758 77.5909 54.2657 77.3971 54.5314C77.1958 54.7972 76.9199 55.3527 77.0914 55.6426L87.6785 73.3661C89.699 72.8829 91.6598 73.6802 92.726 75.4517C94.1426 77.8272 93.643 80.9032 91.4436 82.4332C89.2442 83.9631 86.1128 83.4156 84.6962 81.0401C83.6748 79.3249 83.2498 77.5373 84.4651 75.7094L73.7885 57.841C73.617 57.5511 73.5574 57.237 73.2517 57.3176C72.946 57.3981 72.8491 57.5914 72.8267 57.9296L71.4399 76.5307C71.1044 80.7905 72.9236 84.8972 76.1669 87.3532L87.4697 95.9049C87.2162 96.992 87.3579 98.1918 87.9991 99.2628C89.1622 101.212 91.4287 101.815 93.0764 100.664L106.415 91.3715C108.062 90.22 108.48 87.7478 107.317 85.7991C106.571 84.5429 105.378 83.8745 104.178 83.8262L104.163 83.8504Z"
              fill="white"
            />
            <path
              d="M306.636 146.5V79.3H352.044V91.972H320.652V133.828H352.716V146.5H306.636ZM313.356 118.372V106.084H347.436V118.372H313.356ZM364.598 146.5V136.708L401.366 87.652L405.686 92.644H367.094V79.3H417.11V88.996L380.534 138.148L376.118 133.636H418.166V146.5H364.598ZM430.435 146.5V75.46H443.875V106.084L441.187 107.236C441.891 104.932 443.139 102.852 444.931 100.996C446.787 99.076 448.995 97.54 451.555 96.388C454.115 95.236 456.803 94.66 459.619 94.66C463.459 94.66 466.659 95.428 469.219 96.964C471.843 98.5 473.795 100.836 475.075 103.972C476.419 107.044 477.091 110.852 477.091 115.396V146.5H463.459V116.452C463.459 114.148 463.139 112.228 462.499 110.692C461.859 109.156 460.867 108.036 459.523 107.332C458.243 106.564 456.643 106.244 454.723 106.372C453.187 106.372 451.747 106.628 450.403 107.14C449.123 107.588 448.003 108.26 447.043 109.156C446.147 110.052 445.411 111.076 444.835 112.228C444.323 113.38 444.067 114.628 444.067 115.972V146.5H437.347C435.875 146.5 434.563 146.5 433.411 146.5C432.259 146.5 431.267 146.5 430.435 146.5ZM513.77 147.46C508.586 147.46 503.946 146.34 499.85 144.1C495.818 141.796 492.618 138.66 490.25 134.692C487.946 130.724 486.794 126.18 486.794 121.06C486.794 115.94 487.946 111.428 490.25 107.524C492.618 103.556 495.818 100.42 499.85 98.116C503.946 95.812 508.586 94.66 513.77 94.66C518.89 94.66 523.466 95.812 527.498 98.116C531.594 100.42 534.794 103.556 537.098 107.524C539.402 111.428 540.554 115.94 540.554 121.06C540.554 126.18 539.402 130.724 537.098 134.692C534.794 138.66 531.594 141.796 527.498 144.1C523.466 146.34 518.89 147.46 513.77 147.46ZM513.77 135.556C516.266 135.556 518.506 134.948 520.49 133.732C522.474 132.452 524.01 130.724 525.098 128.548C526.25 126.308 526.826 123.812 526.826 121.06C526.826 118.244 526.25 115.748 525.098 113.572C524.01 111.332 522.474 109.604 520.49 108.388C518.506 107.108 516.266 106.468 513.77 106.468C511.21 106.468 508.938 107.108 506.954 108.388C504.97 109.668 503.402 111.396 502.25 113.572C501.098 115.748 500.554 118.244 500.618 121.06C500.554 123.812 501.098 126.308 502.25 128.548C503.402 130.724 504.97 132.452 506.954 133.732C508.938 134.948 511.21 135.556 513.77 135.556ZM573.946 168.58C569.914 168.58 565.946 167.972 562.042 166.756C558.138 165.604 554.97 164.1 552.538 162.244L557.338 152.452C558.618 153.348 560.09 154.148 561.754 154.852C563.418 155.556 565.146 156.1 566.938 156.484C568.794 156.868 570.682 157.06 572.602 157.06C575.93 157.06 578.65 156.548 580.762 155.524C582.938 154.5 584.57 152.964 585.658 150.916C586.746 148.932 587.29 146.372 587.29 143.236V134.404L589.594 134.884C589.21 136.996 588.154 138.948 586.426 140.74C584.698 142.468 582.522 143.876 579.898 144.964C577.274 145.988 574.586 146.5 571.834 146.5C567.098 146.5 562.906 145.412 559.258 143.236C555.61 141.06 552.73 138.052 550.618 134.212C548.506 130.372 547.45 125.956 547.45 120.964C547.45 115.844 548.474 111.332 550.522 107.428C552.634 103.46 555.482 100.356 559.066 98.116C562.714 95.812 566.842 94.66 571.45 94.66C573.37 94.66 575.194 94.884 576.922 95.332C578.714 95.78 580.346 96.42 581.818 97.252C583.354 98.02 584.698 98.916 585.85 99.94C587.066 100.9 588.058 101.956 588.826 103.108C589.594 104.26 590.074 105.412 590.266 106.564L587.482 107.332L587.866 95.716H600.922V142.66C600.922 146.82 600.314 150.5 599.098 153.7C597.882 156.9 596.09 159.588 593.722 161.764C591.418 164.004 588.57 165.7 585.178 166.852C581.85 168.004 578.106 168.58 573.946 168.58ZM574.33 135.556C577.018 135.556 579.354 134.948 581.338 133.732C583.386 132.516 584.954 130.82 586.042 128.644C587.13 126.468 587.674 123.908 587.674 120.964C587.674 118.084 587.13 115.556 586.042 113.38C584.954 111.14 583.386 109.412 581.338 108.196C579.354 106.98 577.018 106.372 574.33 106.372C571.706 106.372 569.37 107.012 567.322 108.292C565.338 109.508 563.802 111.204 562.714 113.38C561.626 115.556 561.082 118.084 561.082 120.964C561.082 123.844 561.626 126.404 562.714 128.644C563.802 130.82 565.338 132.516 567.322 133.732C569.37 134.948 571.706 135.556 574.33 135.556Z"
              fill="#252538"
            />
          </svg>
        </a>

        {/* Desktop Navigation Links matching TARGET screenshot spacing & font weight */}
        <nav className="hidden lg:flex items-center space-x-7 lg:space-x-8 text-sm font-medium text-[#252538] font-['Plus_Jakarta_Sans',sans-serif]">
          <a href="#" className="hover:text-[#FF7F23] transition-colors">
            Home
          </a>
          <button className="flex items-center space-x-1 hover:text-[#FF7F23] transition-colors cursor-pointer">
            <span>Research</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
          {/* Quiz Generator - Black text, medium weight, subtle dropdown arrow */}
          <button className="flex items-center space-x-1 font-medium text-[#252538] hover:text-[#FF7F23] transition-colors cursor-pointer">
            <span>Quiz Generator</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <button className="flex items-center space-x-1 hover:text-[#FF7F23] transition-colors cursor-pointer">
            <span>Solver</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
          <a href="#" className="hover:text-[#FF7F23] transition-colors">
            Pricing
          </a>
          <a href="#" className="hover:text-[#FF7F23] transition-colors">
            Templates
          </a>
        </nav>

        {/* Right Buttons: Login & Get Started matching TARGET padding (~20-24px horizontal, ~8-9px vertical) */}
        <div className="hidden lg:flex items-center space-x-4 font-['Plus_Jakarta_Sans',sans-serif]">
          {/* Login pill button: Black text, 1.5px orange border */}
          <button className="px-6 py-2 rounded-full border-[1.5px] border-[#FF7F23] text-sm font-medium text-[#252538] hover:bg-orange-50/50 transition-all cursor-pointer">
            Login
          </button>
          {/* Get Started filled orange pill button: White text, medium weight */}
          <button className="px-6 py-2 rounded-full bg-[#FF7F23] hover:bg-[#E86507] text-white text-sm font-medium transition-all shadow-2xs cursor-pointer">
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1 rounded-lg text-[#FF7F23] hover:bg-orange-50 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-5 pt-4 pb-6 space-y-3 shadow-lg font-['Plus_Jakarta_Sans',sans-serif]">
          <a href="#" className="block py-1.5 text-sm font-medium text-[#252538] hover:text-[#FF7F23]">
            Home
          </a>
          <a href="#" className="block py-1.5 text-sm font-medium text-[#252538] hover:text-[#FF7F23]">
            Research
          </a>
          <a href="#" className="block py-1.5 text-sm font-medium text-[#252538]">
            Quiz Generator
          </a>
          <a href="#" className="block py-1.5 text-sm font-medium text-[#252538] hover:text-[#FF7F23]">
            Solver
          </a>
          <a href="#" className="block py-1.5 text-sm font-medium text-[#252538] hover:text-[#FF7F23]">
            Pricing
          </a>
          <a href="#" className="block py-1.5 text-sm font-medium text-[#252538] hover:text-[#FF7F23]">
            Templates
          </a>
          <div className="pt-3 border-t border-gray-100 flex gap-3">
            <button className="flex-1 py-2 rounded-full border-[1.5px] border-[#FF7F23] text-sm font-medium text-[#252538]">
              Login
            </button>
            <button className="flex-1 py-2 rounded-full bg-[#FF7F23] text-white text-sm font-medium">
              Get Started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
