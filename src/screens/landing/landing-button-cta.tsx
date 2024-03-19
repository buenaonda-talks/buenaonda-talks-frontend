import { MANY_CHAT_WHATSAPP_HREF } from '@/constants';

export const LandingButtonCTA = () => {
    return (
        <a
            href={`${MANY_CHAT_WHATSAPP_HREF}?text=${encodeURIComponent(
                'Hola, quiero más información sobre las becas de BuenaOnda Talks',
            )}`}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center space-x-2 rounded-xl border-b-4 border-b-[#30027D] bg-brand-primary px-8 py-2.5 font-headings font-semibold text-white hover:border-b-[#30027D]/80 hover:bg-brand-primary/80"
        >
            <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="32" height="32" fill="white" />
                <path
                    d="M16.0144 6.69312C10.8972 6.69312 6.73408 10.8563 6.73408 15.9735C6.73408 17.7565 7.24083 19.488 8.19943 20.9807L8.42981 21.3394L7.52718 24.5454L10.8441 23.6916L11.1862 23.9005C12.6364 24.7858 14.3061 25.2538 16.0144 25.2538C21.1316 25.2538 25.2947 21.0907 25.2947 15.9735C25.2947 10.8563 21.1316 6.69312 16.0144 6.69312ZM21.7052 18.8257L21.5894 19.3666C21.4588 19.9767 21.0964 20.5165 20.5707 20.8528C19.907 21.2774 19.0466 21.4858 17.953 21.1766C14.5593 20.217 12.6399 17.97 11.6101 16.5657C10.5803 15.1613 10.1824 13.757 10.4398 12.6102C10.6125 11.841 11.1747 11.2508 11.5262 10.9454C11.6985 10.7959 11.9219 10.7198 12.1496 10.7322L12.8748 10.7717C13.0176 10.7795 13.1436 10.8677 13.1999 10.9992L14.2563 13.4709C14.3127 13.603 14.2889 13.7557 14.195 13.8643L13.2755 14.9281C13.2009 15.0143 13.1879 15.1372 13.2404 15.2384C14.4515 17.5713 16.6587 18.4957 17.3177 18.7272C17.4299 18.7667 17.5544 18.7294 17.6271 18.6351L18.5893 17.3878C18.6963 17.249 18.885 17.2027 19.0441 17.2761L21.495 18.4058C21.6547 18.4794 21.742 18.6539 21.7052 18.8257Z"
                    fill="#6614EE"
                    className="fill-brand-primary group-hover:fill-brand-primary/80"
                />
                <path
                    d="M0 0V32H32V0H0ZM16.0144 27.1497C14.0942 27.1497 12.2139 26.6582 10.5506 25.7249L4.80943 27.2027L6.37688 21.6356C5.36892 19.9233 4.83822 17.975 4.83822 15.9735C4.83822 9.81091 9.85185 4.79729 16.0144 4.79729C22.177 4.79729 27.1906 9.81091 27.1906 15.9735C27.1906 22.1361 22.177 27.1497 16.0144 27.1497Z"
                    className="fill-brand-primary group-hover:fill-brand-primary/80"
                />
            </svg>

            <span>Quiero más información</span>
        </a>
    );
};
