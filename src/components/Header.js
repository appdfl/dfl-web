class Header extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
            <nav id="navigation" class="">
            <div class="wrapper">
                <a class="logo" href="/">
                    <svg width="85" height="38" viewBox="0 0 85 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M3.1541 0H11.0393C14.4738 0 17.146 0.653583 19.056 1.96075C20.966 3.26792 22.2977 5.17638 23.0512 7.68614C23.8047 10.1959 24.1814 13.8211 24.1814 18.5618C24.1814 21.6293 24.0412 24.2262 23.7609 26.3525C23.4805 28.4788 22.911 30.3524 22.0524 31.9733C21.1934 33.5942 19.8617 34.8578 18.0572 35.7641C16.2527 36.6704 13.9135 37.1235 11.0393 37.1235H3.1541C2.38309 37.1235 1.74351 36.9754 1.23535 36.6791C0.727194 36.3828 0.394262 35.9374 0.236557 35.3429C0.0807993 34.7503 0.00194697 33.9486 0 32.9377V4.18003C0 3.16915 0.0788523 2.36742 0.236557 1.77484C0.394262 1.18226 0.727194 0.737823 1.23535 0.441532C1.74312 0.147952 2.38271 0.000774617 3.1541 0ZM9.98797 7.0587C9.63752 7.0587 9.36591 7.14584 9.17316 7.32013C8.98041 7.49442 8.88404 7.94757 8.88404 8.67959L8.93661 27.1891C8.93661 27.9916 9.0067 28.6277 9.14688 29.0975C9.28706 29.5673 9.56743 29.8026 9.98797 29.8034C10.9689 29.8034 11.7749 29.5681 12.4061 29.0975C13.0373 28.627 13.4929 27.7206 13.7729 26.3786C14.0533 25.0374 14.1934 22.3456 14.1934 18.3032C14.1934 15.166 14.0883 12.8741 13.878 11.4275C13.6678 9.98094 13.2647 8.89164 12.669 8.15963C12.0724 7.42568 11.1787 7.0587 9.98797 7.0587Z"
                            fill="#346259" />
                        <path
                            d="M48.5725 7.21556C47.5554 7.21556 46.8633 7.30271 46.4961 7.47699C46.1449 7.63731 45.8449 7.89053 45.6287 8.20901C45.4184 8.52273 45.3133 9.5336 45.3133 11.2416C45.3133 12.2874 45.3658 13.0368 45.471 13.49C45.5761 13.9431 45.8292 14.2394 46.2303 14.3788C46.6796 14.5258 47.1505 14.5965 47.6234 14.588L51.2506 14.4834C52.3362 14.4834 53.0897 14.5793 53.511 14.771C53.9323 14.9627 54.1777 15.2764 54.247 15.7121C54.3234 16.2402 54.3586 16.7734 54.3521 17.3069V17.7775C54.3521 19.312 54.2742 20.3403 54.1185 20.8624C53.9627 21.3845 53.6123 21.7156 53.0671 21.8558C52.5219 21.9953 51.7597 22.065 50.7804 22.065L47.1006 21.9604C46.2595 21.9604 45.7513 22.126 45.5761 22.4571C45.4009 22.7883 45.3135 23.6336 45.3139 24.993V32.9406C45.3139 33.9523 45.236 34.754 45.0802 35.3458C44.9245 35.9376 44.5915 36.383 44.0814 36.682C43.5733 36.9783 42.9337 37.1264 42.1627 37.1264H39.5313C38.7603 37.1264 38.1208 36.9783 37.6126 36.682C37.1044 36.3857 36.7715 35.9403 36.6138 35.3458C36.458 34.7532 36.3802 33.9515 36.3802 32.9406V4.18293C36.3802 2.61433 36.643 1.52503 37.1687 0.915017C37.6944 0.305005 38.4819 0 39.5313 0H52.5683C53.2692 0 53.8562 0.139431 54.3293 0.418293C54.8024 0.697156 55.039 1.08059 55.039 1.5686V6.01297C55.039 6.39718 54.9339 6.7109 54.7236 6.95413C54.5133 7.19736 53.8475 7.31936 52.726 7.32013L48.5725 7.21556Z"
                            fill="#346259" />
                        <path
                            d="M77.3805 29.6465L82.5322 29.542C83.3028 29.542 83.9064 29.7163 84.3429 30.0648C84.7794 30.4134 84.9984 31.1454 85 32.2609V32.9406C85 33.9523 84.9221 34.754 84.7664 35.3458C84.6106 35.9376 84.2777 36.383 83.7676 36.682C83.259 36.9783 82.6194 37.1264 81.8488 37.1264H69.9684C69.197 37.1264 68.5574 36.9783 68.0496 36.682C67.5419 36.3857 67.2089 35.9403 67.0508 35.3458C66.8951 34.7532 66.8162 33.9515 66.8143 32.9406V4.18293C66.8143 3.17206 66.8932 2.37033 67.0508 1.77775C67.2086 1.18516 67.5415 0.740728 68.0496 0.444437C68.5559 0.148533 69.1954 0.000387309 69.9684 0H72.5968C73.3674 0 74.007 0.148146 74.5155 0.444437C75.0241 0.740728 75.357 1.18613 75.5144 1.78065C75.6721 2.37362 75.7499 3.17535 75.748 4.18584V26.7214C75.748 27.8376 75.8794 28.5958 76.1423 28.9959C76.4051 29.396 76.8178 29.6128 77.3805 29.6465Z"
                            fill="#346259" />
                    </svg>
                </a>

                <div class="menu">
                    <button type="button" class="close-menu" aria-expanded="true" aria-label="Fechar menu"
                        onclick="closeMenu()">
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.41 12L16.59 14.82L25.75 24L16.59 33.18L19.41 36L31.41 24L19.41 12Z" fill="white" />
                        </svg>
                    </button>
                    <div class="content">
                        <ul class="list">
                            <li><a onclick="closeMenu()" title="Início" href="/">Início</a></li>
                            <li><a onclick="closeMenu()" href="/perguntas-frequentes">F.A.Q</a></li>
                        </ul>
                        <div>
                            <a class="button" onclick="closeMenu()" href="/index#download">
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M17.4167 8.70833H13.75V3.20833H8.25V8.70833H4.58334L11 15.125L17.4167 8.70833ZM10.0833 10.5417V5.04166H11.9167V10.5417H12.9892L11 12.5308L9.01084 10.5417H10.0833ZM4.58334 16.9583H17.4167V18.7917H4.58334V16.9583Z"
                                        fill="#346259" />
                                </svg>
                                Baixar o APP
                            </a>
                            <ul class="social-links">
                                <li>
                                    <a target="_blank" href="https://instagram.com/appdfl">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M17 1.99997H7C4.23858 1.99997 2 4.23855 2 6.99997V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V6.99997C22 4.23855 19.7614 1.99997 17 1.99997Z"
                                                stroke="#FFFAF1" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path
                                                d="M15.9997 11.3701C16.1231 12.2023 15.981 13.0523 15.5935 13.7991C15.206 14.5459 14.5929 15.1515 13.8413 15.5297C13.0898 15.908 12.2382 16.0397 11.4075 15.906C10.5768 15.7723 9.80947 15.3801 9.21455 14.7852C8.61962 14.1903 8.22744 13.4229 8.09377 12.5923C7.96011 11.7616 8.09177 10.91 8.47003 10.1584C8.84829 9.40691 9.45389 8.7938 10.2007 8.4063C10.9475 8.0188 11.7975 7.87665 12.6297 8.00006C13.4786 8.12594 14.2646 8.52152 14.8714 9.12836C15.4782 9.73521 15.8738 10.5211 15.9997 11.3701Z"
                                                stroke="#FFFAF1" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                            <path d="M17.5 6.49997H17.51" stroke="#FFFAF1" stroke-width="2"
                                                stroke-linecap="round" stroke-linejoin="round" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://facebook.com/appdfl">
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18 1.99997H15C13.6739 1.99997 12.4021 2.52675 11.4645 3.46444C10.5268 4.40212 10 5.67389 10 6.99997V9.99997H7V14H10V22H14V14H17L18 9.99997H14V6.99997C14 6.73475 14.1054 6.4804 14.2929 6.29286C14.4804 6.10533 14.7348 5.99997 15 5.99997H18V1.99997Z"
                                                stroke="#FFFAF1" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round" />
                                        </svg>

                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://twitter.com/appdfl">
                                        <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <g clip-path="url(#clip0_186_53)">
                                                <path
                                                    d="M22.9 5.5496C22.1344 5.8896 21.312 6.1184 20.4488 6.2216C21.3304 5.6936 22.0064 4.8576 22.3248 3.8608C21.5008 4.3496 20.5872 4.7048 19.6144 4.8968C18.836 4.0672 17.7272 3.5488 16.5 3.5488C14.1432 3.5488 12.2328 5.46 12.2328 7.816C12.2328 8.1504 12.2712 8.4768 12.3432 8.788C8.7968 8.6104 5.6528 6.9112 3.5472 4.3288C3.1808 4.9592 2.9704 5.692 2.9704 6.4752C2.9704 7.9552 3.7232 9.2616 4.868 10.0264C4.1688 10.004 3.5104 9.812 2.9352 9.4928C2.9352 9.5112 2.9352 9.528 2.9352 9.5464C2.9352 11.6144 4.4056 13.3392 6.3584 13.7304C6.0008 13.828 5.6232 13.88 5.2336 13.88C4.9592 13.88 4.6912 13.8528 4.4312 13.804C4.9744 15.4992 6.5504 16.7336 8.4176 16.768C6.9576 17.9128 5.1176 18.5952 3.1176 18.5952C2.7736 18.5952 2.4336 18.5752 2.0992 18.5352C3.988 19.7456 6.2304 20.452 8.6408 20.452C16.4904 20.452 20.7816 13.9496 20.7816 8.3104C20.7816 8.1256 20.7776 7.9416 20.7696 7.7584C21.604 7.156 22.328 6.4048 22.9 5.5496Z"
                                                    stroke="#F3F7F4" stroke-width="1.5" />
                                            </g>
                                            <defs>
                                                <clipPath id="clip0_186_53">
                                                    <rect width="24" height="24" fill="white" transform="translate(0.5)" />
                                                </clipPath>
                                            </defs>
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="backdrop"></div>
                </div>

                <button class="open-menu" aria-expanded="false" aria-label="Abrir menu" onclick="openMenu()">
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 20H30" stroke="#346259" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M10 12H30" stroke="#346259" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                        <path d="M18 28L30 28" stroke="#346259" stroke-width="2" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </button>
            </div>
        </nav> 
        `
    }
}

customElements.define('header-component', Header)