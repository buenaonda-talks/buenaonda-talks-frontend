/* eslint-disable tailwindcss/no-custom-classname */
'use client';

import { PropsWithChildren, useEffect, useState } from 'react';
import image from './hombre-adulto-mujer-comprobando-tableta-juntos-1.png';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { LandingHeroQuery } from '@/api/graphql';
import LandingHeader from '@/screens/landing/header';
import LandingFooter from '@/screens/landing/landing-footer';
import TheProcessPageHero from '@/screens/becas-y-procesos/call-to-action';

type LinkProps = PropsWithChildren<{
    href: string;
    activeHash?: string;
}>;

const ItemLink: React.FC<LinkProps> = ({ children, href, activeHash }) => {
    const onClick = () => {
        const element = document.getElementById(href.replace('#', ''));
        const header = document.getElementById('landing-header');

        if (!element || !header) return;

        const headerHeight = header.getBoundingClientRect().height;

        window.scrollTo({
            top: element.offsetTop - headerHeight,
            behavior: 'smooth',
        });
    };

    return (
        <button
            className={clsx(
                'relative block w-full rounded-full px-4 py-1 text-left',
                activeHash === href ? 'bg-[#6614EE] text-white' : 'hover:bg-gray-200',
            )}
            onClick={onClick}
        >
            {activeHash === href && (
                <span className="absolute top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-white"></span>
            )}
            <span className="pl-4">{children}</span>
        </button>
    );
};

type ProcessPageProps = {
    currentPlatziTalk: LandingHeroQuery['currentPlatziTalk'];
};

const ProcessPage = ({ currentPlatziTalk }: ProcessPageProps) => {
    const [activeHash, setActiveHash] = useState<string | null>(null);
    useEffect(() => {
        const header = document.getElementById('landing-header');
        const sections = document.querySelectorAll('.accordion-item');
        if (!header) return;

        const handleScroll = () => {
            const headerHeight = header.getBoundingClientRect().height;

            let activeSection: HTMLElement | null = null;

            for (let i = 0; i < sections.length; i++) {
                const section = sections[i] as HTMLElement;

                const topOfSectionIsVisibleCountingFromTheBottom =
                    section.getBoundingClientRect().top - headerHeight <= 0;

                if (topOfSectionIsVisibleCountingFromTheBottom) {
                    activeSection = section;
                }
            }

            if (activeSection) {
                setActiveHash(activeSection.id);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <LandingHeader />

            <main className="font-light">
                <div className="bg-[#440BA5] pt-24"></div>
                <div className="relative overflow-hidden bg-gradient-to-b from-[#440BA5] to-[#6615EE] py-32 text-white">
                    <svg
                        width="1512"
                        height="392"
                        viewBox="0 0 1512 392"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute right-0 top-0"
                    >
                        <mask
                            id="mask0_6017_44"
                            style={{
                                maskType: 'alpha',
                            }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="1512"
                            height="392"
                        >
                            <rect width="1512" height="392" fill="#D9D9D9" />
                        </mask>
                        <g mask="url(#mask0_6017_44)">
                            <path
                                opacity="0.8"
                                d="M1473.48 -213.798C1471.87 -214.588 1470.09 -215 1468.28 -215C1466.48 -215 1464.69 -214.588 1463.08 -213.798C1460.91 -212.595 1460.38 -210.857 1461.46 -209.342L1300.53 -119.929V-7.03239L1261.31 14.7582V137.547L1127.05 212.188L1106.21 200.557L1209.78 143.006V75.696L1209.37 75.4509L1091.46 10.0347V-12.8031L1158.07 -49.8114C1159.59 -49.2282 1161.22 -48.9624 1162.86 -49.0315C1164.49 -49.1006 1166.09 -49.5032 1167.56 -50.2125C1168.19 -50.4148 1168.74 -50.8034 1169.13 -51.3233C1169.52 -51.8432 1169.73 -52.4679 1169.73 -53.109C1169.73 -53.75 1169.52 -54.3747 1169.13 -54.8946C1168.74 -55.4145 1168.19 -55.8032 1167.56 -56.0055C1165.94 -56.7854 1164.16 -57.1916 1162.36 -57.1916C1160.56 -57.1916 1158.78 -56.7854 1157.16 -56.0055C1154.57 -54.5572 1154.34 -52.3291 1156.42 -50.7249L1089.82 -13.7166V10.9259L1090.24 11.171L1208 76.6096V142.093L1129.73 185.562V157.533L1165.61 137.592C1167.14 138.172 1168.77 138.434 1170.41 138.361C1172.04 138.288 1173.64 137.882 1175.1 137.169C1177.97 135.587 1177.97 133.002 1175.1 131.398C1173.49 130.618 1171.71 130.212 1169.91 130.212C1168.1 130.212 1166.32 130.618 1164.71 131.398C1162.12 132.846 1161.89 135.074 1163.97 136.678L1128.09 156.62V186.476L1104.54 199.644L1076.56 184.047V135.252L1129.22 105.842V72.1534L1128.8 71.9083L1017.69 10.1684C1019.77 8.56414 1019.54 6.33608 1016.95 4.88783C1015.33 4.10791 1013.55 3.70173 1011.75 3.70173C1009.94 3.70173 1008.16 4.10791 1006.55 4.88783C1003.68 6.49204 1003.68 9.0766 1006.55 10.6585C1008.01 11.3714 1009.61 11.7778 1011.25 11.8508C1012.89 11.9237 1014.52 11.6617 1016.04 11.0819L1127.69 73.0669V104.995L1076.56 133.403V99.7593L1076.14 99.5142L1008.15 61.6369C1010.23 60.0327 1010 57.8046 1007.41 56.3564C1005.8 55.5661 1004.02 55.1541 1002.21 55.1541C1000.4 55.1541 998.623 55.5661 997.014 56.3564C994.143 57.9606 994.143 60.5451 997.014 62.1271C998.475 62.8399 1000.08 63.2463 1001.71 63.3193C1003.35 63.3923 1004.98 63.1302 1006.51 62.5504L1074.91 100.561V183L1055.23 172.06L1022.83 190.063L993.425 173.954V134.339L993.009 134.094L915.458 91.0029V53.6604C916.99 53.6052 918.487 53.2086 919.833 52.5018C922.703 50.9198 922.703 48.3353 919.833 46.7311C918.22 45.9512 916.441 45.545 914.636 45.545C912.831 45.545 911.051 45.9512 909.439 46.7311C906.568 48.3353 906.568 50.9198 909.439 52.5018C910.784 53.2086 912.282 53.6052 913.814 53.6604V91.9164L914.231 92.1392L991.782 135.252V173.13L865.547 102.99V28.55L934 -9.50553H996.805H997.014L1104.8 -69.5076C1106.32 -68.9244 1107.95 -68.6586 1109.59 -68.7277C1111.22 -68.7968 1112.83 -69.1993 1114.29 -69.9086C1114.92 -70.1109 1115.47 -70.4996 1115.86 -71.0195C1116.25 -71.5394 1116.46 -72.1641 1116.46 -72.8052C1116.46 -73.4462 1116.25 -74.0709 1115.86 -74.5908C1115.47 -75.1107 1114.92 -75.4994 1114.29 -75.7016C1112.68 -76.4816 1110.9 -76.8877 1109.09 -76.8877C1107.29 -76.8877 1105.51 -76.4816 1103.9 -75.7016C1101.3 -74.2534 1101.07 -72.0253 1103.15 -70.4211L996.365 -11.0875H936.848L1134.87 -121.132C1136.39 -120.549 1138.02 -120.283 1139.66 -120.352C1141.3 -120.421 1142.9 -120.824 1144.36 -121.533C1144.99 -121.735 1145.54 -122.124 1145.93 -122.644C1146.32 -123.164 1146.53 -123.789 1146.53 -124.43C1146.53 -125.071 1146.32 -125.695 1145.93 -126.215C1145.54 -126.735 1144.99 -127.124 1144.36 -127.326C1142.75 -128.106 1140.97 -128.512 1139.16 -128.512C1137.36 -128.512 1135.58 -128.106 1133.97 -127.326C1131.37 -125.878 1131.14 -123.628 1133.23 -122.046L863.788 27.6365V103.814L864.204 104.037L1021.21 191.155L989.652 208.69L721.834 59.9436V-28.823L721.418 -29.0458L630.393 -79.6453C632.477 -81.2273 632.245 -83.4776 629.652 -84.9036C628.043 -85.6939 626.262 -86.1059 624.455 -86.1059C622.649 -86.1059 620.868 -85.6939 619.258 -84.9036C616.388 -83.3217 616.388 -80.7371 619.258 -79.1329C620.721 -78.4236 622.323 -78.0211 623.959 -77.9519C625.595 -77.8828 627.228 -78.1486 628.75 -78.7318L720.26 -27.8426V60.9239L720.677 61.1467L987.962 209.67L957.868 226.381L693.106 79.105H535.225L436.562 24.2721V-59.8823C437.561 -60.0527 438.524 -60.3841 439.409 -60.8627C440.033 -61.0699 440.574 -61.4593 440.957 -61.9765C441.34 -62.4936 441.545 -63.1129 441.545 -63.748C441.545 -64.3831 441.34 -65.0024 440.957 -65.5196C440.574 -66.0368 440.033 -66.4261 439.409 -66.6334C437.8 -67.4236 436.019 -67.8356 434.212 -67.8356C432.405 -67.8356 430.624 -67.4236 429.015 -66.6334C428.391 -66.4261 427.85 -66.0368 427.467 -65.5196C427.084 -65.0024 426.878 -64.3831 426.878 -63.748C426.878 -63.1129 427.084 -62.4936 427.467 -61.9765C427.85 -61.4593 428.391 -61.0699 429.015 -60.8627C430.832 -59.9562 432.877 -59.555 434.918 -59.7041V25.2747L435.335 25.5198L534.878 80.776H692.758L916.245 204.969H871.196L794.918 162.636H736.164H735.979L654.492 207.91C652.969 207.33 651.335 207.068 649.699 207.141C648.063 207.214 646.462 207.62 645.001 208.333C642.13 209.938 642.13 212.522 645.001 214.104C646.616 214.888 648.4 215.296 650.209 215.296C652.018 215.296 653.802 214.888 655.418 214.104C657.988 212.678 658.219 210.428 656.136 208.846L736.627 164.128H794.501L870.779 206.462H919.023L956.224 227.138L876.034 271.7L853.231 259.022V225.846L795.357 193.673C797.441 192.068 797.209 189.818 794.64 188.392C793.024 187.609 791.24 187.2 789.431 187.2C787.622 187.2 785.838 187.609 784.222 188.392C783.599 188.599 783.058 188.989 782.675 189.506C782.292 190.023 782.086 190.642 782.086 191.277C782.086 191.913 782.292 192.532 782.675 193.049C783.058 193.566 783.599 193.956 784.222 194.163C785.683 194.876 787.285 195.282 788.921 195.355C790.557 195.428 792.191 195.166 793.714 194.586L851.588 226.76V258.198L789.709 223.93H760.517L760.332 224.041L725.469 243.426C723.947 242.842 722.314 242.576 720.678 242.646C719.042 242.715 717.44 243.117 715.977 243.827C715.345 244.029 714.796 244.418 714.406 244.937C714.016 245.457 713.807 246.082 713.807 246.723C713.807 247.364 714.016 247.989 714.406 248.509C714.796 249.029 715.345 249.417 715.977 249.62C717.59 250.399 719.37 250.806 721.174 250.806C722.979 250.806 724.759 250.399 726.372 249.62C728.964 248.194 729.196 245.943 727.112 244.361L760.98 225.534H789.338L874.367 272.792L858.926 281.37L908.212 308.597L885.062 321.43H850.222L825.244 307.55C827.234 305.968 826.98 303.762 824.41 302.336C822.798 301.556 821.018 301.15 819.213 301.15C817.408 301.15 815.629 301.556 814.016 302.336C811.145 303.94 811.145 306.525 814.016 308.107C815.496 308.829 817.119 309.236 818.777 309.301C820.434 309.367 822.087 309.088 823.623 308.485L849.898 323.079H882.307L823.438 355.787L684.957 278.83H585.275L585.089 278.941L528.998 310.134C527.475 309.554 525.841 309.292 524.205 309.365C522.569 309.438 520.967 309.845 519.507 310.557C516.636 312.139 516.636 314.724 519.507 316.328C521.119 317.108 522.899 317.514 524.704 317.514C526.508 317.514 528.288 317.108 529.901 316.328C532.47 314.88 532.702 312.652 530.642 311.048L585.715 280.434H684.494L791.306 339.79H745.586L700.884 314.947C702.967 313.365 702.736 311.114 700.143 309.688C698.534 308.898 696.753 308.486 694.946 308.486C693.139 308.486 691.358 308.898 689.749 309.688C686.878 311.27 686.878 313.855 689.749 315.459C691.21 316.172 692.811 316.578 694.447 316.651C696.083 316.724 697.717 316.462 699.24 315.883L745.146 341.372H794.154L821.771 356.723L751.466 395.781H526.752L352.181 298.771C354.241 297.167 354.01 294.939 351.44 293.49C349.825 292.707 348.041 292.299 346.232 292.299C344.423 292.299 342.639 292.707 341.023 293.49C338.153 295.095 338.153 297.679 341.023 299.261C342.484 299.974 344.085 300.38 345.722 300.453C347.358 300.526 348.991 300.264 350.514 299.684L526.289 397.363H748.526L720.63 412.96H554.393H554.208L472.166 458.546C470.644 457.963 469.011 457.697 467.375 457.766C465.739 457.835 464.137 458.238 462.674 458.947C459.804 460.551 459.804 463.136 462.674 464.718C464.284 465.508 466.065 465.92 467.871 465.92C469.678 465.92 471.459 465.508 473.068 464.718C475.661 463.292 475.893 461.042 473.809 459.46L554.833 414.43H721.163L721.348 414.319L909.855 309.599L930.69 321.23L732.506 431.364H587.659L587.474 431.475L412.37 528.731H169.878L123 502.684V504.511L169.438 530.313H412.856L413.042 530.201L522.91 469.152V505.291L450.498 545.53C448.976 544.947 447.343 544.681 445.707 544.75C444.071 544.819 442.469 545.222 441.006 545.931C440.374 546.134 439.824 546.522 439.435 547.042C439.045 547.562 438.836 548.187 438.836 548.828C438.836 549.469 439.045 550.094 439.435 550.613C439.824 551.133 440.374 551.522 441.006 551.724C442.619 552.504 444.399 552.91 446.203 552.91C448.008 552.91 449.788 552.504 451.4 551.724C453.993 550.276 454.225 548.048 452.141 546.444L524.553 506.205V468.439H524.183L588.099 432.923H733.039L733.224 432.812L932.311 322.121L956.201 335.334L569.788 550.098V588.911H571.431V551.034L958.03 336.269L987.407 352.601L788.019 463.381V483.189L752.67 502.84V548.382L684.124 586.482C682.602 585.899 680.969 585.633 679.333 585.702C677.697 585.771 676.095 586.174 674.632 586.883C673.742 587.324 673.039 588.049 672.641 588.933H686.994C686.742 588.321 686.317 587.788 685.767 587.396L754.128 549.229V503.732L787.834 484.993V557.941L807.742 569.081L771.884 589H775.171L809.386 569.995L843.578 589H846.865L789.477 557.027V464.272L988.796 353.492L1015.53 368.354L874.506 446.737C872.983 446.158 871.349 445.896 869.713 445.969C868.077 446.041 866.475 446.448 865.015 447.161C862.144 448.743 862.144 451.327 865.015 452.931C866.624 453.722 868.405 454.134 870.212 454.134C872.018 454.134 873.799 453.722 875.409 452.931C878.001 451.505 878.233 449.255 876.15 447.651L1017.36 369.267L1043.17 383.594L874.39 477.396H828.415C828.027 476.482 827.313 475.731 826.401 475.279C824.788 474.499 823.009 474.093 821.204 474.093C819.399 474.093 817.619 474.499 816.007 475.279C815.375 475.481 814.825 475.87 814.435 476.39C814.046 476.91 813.836 477.534 813.836 478.176C813.836 478.817 814.046 479.441 814.435 479.961C814.825 480.481 815.375 480.87 816.007 481.072C817.619 481.852 819.399 482.258 821.204 482.258C823.009 482.258 824.788 481.852 826.401 481.072C827.306 480.622 828.019 479.881 828.415 478.978H874.714L874.923 478.866L1044.7 384.507L1055.12 390.3L1063.15 385.844L1103.57 408.325V439.518L1070.17 458.101H1017.76H1017.55L960.021 490.073C958.501 489.497 956.871 489.237 955.239 489.31C953.608 489.383 952.01 489.787 950.552 490.497C947.682 492.079 947.682 494.663 950.552 496.268C952.162 497.058 953.943 497.47 955.75 497.47C957.556 497.47 959.337 497.058 960.947 496.268C963.516 494.819 963.748 492.591 961.687 490.987L1018.2 459.66H1067.5L969.28 514.226C967.735 513.602 966.067 513.309 964.392 513.367C962.718 513.425 961.076 513.832 959.581 514.56C956.71 516.142 956.71 518.727 959.581 520.331C961.193 521.111 962.973 521.517 964.778 521.517C966.583 521.517 968.362 521.111 969.975 520.331C972.498 518.927 972.799 516.743 970.878 515.162L1093.39 447.094V462.133L1020.51 502.64V531.226L961.178 564.202C959.655 563.622 958.021 563.36 956.385 563.433C954.749 563.506 953.148 563.912 951.687 564.625C951.063 564.832 950.522 565.221 950.139 565.739C949.756 566.256 949.55 566.875 949.55 567.51C949.55 568.145 949.756 568.765 950.139 569.282C950.522 569.799 951.063 570.188 951.687 570.396C953.296 571.186 955.077 571.598 956.884 571.598C958.691 571.598 960.472 571.186 962.081 570.396C964.651 568.97 964.882 566.719 962.822 565.115L1022.15 532.162V503.553L1095.03 463.047V446.18L1105.24 440.499V407.412L1064.82 384.931L1091.39 370.181L1174.59 416.413V469.018L1118.09 500.412C1116.54 499.785 1114.88 499.488 1113.2 499.542C1111.53 499.596 1109.88 499.999 1108.39 500.724C1107.75 500.926 1107.2 501.315 1106.82 501.834C1106.43 502.354 1106.22 502.979 1106.22 503.62C1106.22 504.261 1106.43 504.886 1106.82 505.406C1107.2 505.926 1107.75 506.314 1108.39 506.517C1110 507.297 1111.78 507.703 1113.58 507.703C1115.39 507.703 1117.17 507.297 1118.78 506.517C1121.33 505.135 1121.6 502.952 1119.71 501.37L1174.59 470.867V513.335L1131.21 537.42V588.978H1132.88V538.267L1174.55 515.095V588.911H1176.31V415.544L1092.97 369.267L1122.81 352.668L1231.61 413.116V557.027L1283.88 585.992V588.822H1285.53V585.079L1233.26 556.114V412.202L1124.45 351.755L1146.56 339.478L1293.33 421.025V543.837L1374.47 588.911H1377.71L1294.93 542.923V420.112L1148.16 338.564L1183.99 318.645L1428.2 454.335V515.429L1511.98 561.951V560.102L1429.93 514.515V453.422L1292.59 377.088H1401.21L1511.98 438.649V436.822L1401.65 375.439H1289.74L1185.75 317.732L1227.42 294.582L1316.78 344.246H1460.31L1511.98 372.944V371.117L1500.66 364.833H1511.98V363.251H1497.81L1460.77 342.664H1317.24L1292.24 328.761H1353.26L1353.45 328.649L1384.05 311.649H1511.58L1512 311.872V310.067H1386.97L1421.44 290.928C1422.96 291.508 1424.6 291.77 1426.23 291.697C1427.87 291.624 1429.47 291.218 1430.93 290.505C1431.55 290.298 1432.09 289.908 1432.48 289.391C1432.86 288.874 1433.07 288.254 1433.07 287.619C1433.07 286.984 1432.86 286.365 1432.48 285.848C1432.09 285.331 1431.55 284.941 1430.93 284.734C1429.32 283.944 1427.54 283.532 1425.73 283.532C1423.93 283.532 1422.15 283.944 1420.54 284.734C1417.94 286.16 1417.71 288.41 1419.8 290.015L1352.89 327.179H1289.46L1229.13 293.758L1251.43 281.37L1237.08 273.393H1278.74L1333.24 303.673C1331.16 305.277 1331.39 307.505 1333.98 308.953C1335.59 309.743 1337.37 310.155 1339.18 310.155C1340.98 310.155 1342.76 309.743 1344.37 308.953C1347.24 307.349 1347.24 304.764 1344.37 303.183C1342.91 302.47 1341.31 302.063 1339.68 301.99C1338.04 301.917 1336.41 302.179 1334.88 302.759L1279.18 271.811H1234.18L1203.69 254.856L1222.44 244.428H1255.71L1284.97 228.185H1306.8L1356.11 255.569C1353.8 257.173 1354.07 259.468 1356.71 260.938C1358.32 261.728 1360.1 262.14 1361.91 262.14C1363.72 262.14 1365.5 261.728 1367.11 260.938C1369.98 259.334 1369.98 256.749 1367.11 255.167C1365.68 254.476 1364.12 254.075 1362.53 253.991C1360.94 253.906 1359.34 254.14 1357.85 254.677L1307.31 226.604H1284.6L1255.34 242.846H1225.25L1285.23 209.536H1317.64L1385.14 247.035H1511.98V245.453H1385.53L1318.05 207.932H1284.79L1284.58 208.044L1202 253.942L1180.31 241.91L1273.65 190.041H1339.49L1393.77 220.209H1511.98V218.627H1394.24L1342.78 190.041H1511.98V188.281H1273.21L1273.03 188.392L1178.62 240.908L1154.01 227.227L1284.21 154.86H1511.98V153.278H1345.99L1511.98 61.0353V59.2083L1342.71 153.278H1285.39L1408.8 84.6974V69.5911L1467.83 36.7716C1469.35 37.3548 1470.98 37.6206 1472.62 37.5515C1474.26 37.4824 1475.86 37.0798 1477.32 36.3705C1480.19 34.7663 1480.19 32.1818 1477.32 30.5998C1475.71 29.8096 1473.93 29.3976 1472.12 29.3976C1470.32 29.3976 1468.54 29.8096 1466.93 30.5998C1464.33 32.0258 1464.1 34.2761 1466.19 35.8581L1434.03 53.6827V12.2628L1511.98 -30.9396V-32.7666L1432.39 11.4384V54.5962L1407.16 68.6331V83.7394L1282.75 152.81L1283.17 153.5L1152.42 226.158L1128.64 212.945L1262.91 138.305V15.6717L1511.98 -122.714V-124.541L1302.17 -7.94589V-119.015L1462.74 -208.317L1463.08 -208.094C1464.69 -207.304 1466.48 -206.892 1468.28 -206.892C1470.09 -206.892 1471.87 -207.304 1473.48 -208.094C1476.35 -209.631 1476.35 -212.216 1473.48 -213.798ZM1248.07 281.281L1055.14 388.473L862.237 281.281L1055.14 174.066L1248.07 281.281Z"
                                fill="url(#paint0_radial_6017_44)"
                            />
                        </g>
                        <defs>
                            <radialGradient
                                id="paint0_radial_6017_44"
                                cx="0"
                                cy="0"
                                r="1"
                                gradientUnits="userSpaceOnUse"
                                gradientTransform="translate(1542.07 -93.7714) rotate(180) scale(1017.06 978.883)"
                            >
                                <stop stop-color="#FF2C9C" />
                                <stop offset="0.03" stop-color="#F62F9F" />
                                <stop offset="0.2" stop-color="#C63EB0" />
                                <stop offset="0.37" stop-color="#9E4BBE" />
                                <stop offset="0.54" stop-color="#7F54C9" />
                                <stop offset="0.7" stop-color="#695BD1" />
                                <stop offset="0.86" stop-color="#5C60D5" />
                                <stop offset="1" stop-color="#5761D7" />
                            </radialGradient>
                        </defs>
                    </svg>

                    <div className="absolute inset-0 hidden lg:block">
                        <div className="container flex h-full justify-end">
                            <Image
                                src={image}
                                placeholder="blur"
                                alt=""
                                className="h-full w-auto object-cover object-bottom"
                            />
                        </div>
                    </div>

                    <div className="container relative">
                        <div className="lg:w-1/2">
                            <h2 className="mb-4 text-5xl font-bold text-white">
                                BECAS Y PROCESOS
                            </h2>
                            <p>
                                Aquí puedes conocer el camino para acceder a nuestras
                                becas y transformarte en un desarrollador web.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="container py-20 xl:flex xl:justify-between">
                    <div className="xl:w-8/12">
                        <div className="mb-16">
                            <h2 className="text-primary-v2 mb-4 border-b border-b-gray-300 pb-4 text-2xl font-bold">
                                PROCESO
                            </h2>

                            <ol className="mb-8 list-decimal pl-4">
                                <li>
                                    <span className="font-medium">Inscripción:</span>{' '}
                                    <ul className="list-disc">
                                        <li>
                                            Si eres{' '}
                                            <span className="font-medium">Director</span>{' '}
                                            o{' '}
                                            <span className="font-medium">Profesor</span>,
                                            registra a tu colegio y recibirás asistencia
                                            de inmediato.
                                        </li>
                                        <li>
                                            Si eres{' '}
                                            <span className="font-medium">
                                                estudiante
                                            </span>
                                            , crea tu cuenta y recibirás la invitación a
                                            la próxima charla informativa.
                                        </li>
                                    </ul>
                                </li>
                                <li>
                                    <span className="font-medium">Charla:</span> Asiste a
                                    la charla informativa por zoom y aprende postular a
                                    tus becas
                                </li>
                                <li>
                                    <span className="font-medium">Platzi:</span> Obtén tu
                                    primera beca y realiza tu curso introductorio en
                                    platzi.
                                </li>
                                <li>
                                    <span className="font-medium">Dev.F:</span> Postula,
                                    obtén tu segunda beca y participa de un programa
                                    educativo de 6 meses online completamente gratis
                                </li>
                                <li>
                                    <span className="font-medium">Empleabilidad:</span>{' '}
                                    Prepárate para el mundo laboral, al terminar tu camino
                                    contarás con un perfil junior que te permitirá aplicar
                                    a multiples puestos laborales.
                                </li>
                            </ol>

                            <TheProcessPageHero currentPlatziTalk={currentPlatziTalk} />
                        </div>

                        <div className="space-y-8 text-base">
                            <div>
                                <h2 className="text-primary-v2 border-b border-b-gray-300 pb-4 text-2xl font-bold">
                                    BECAS
                                </h2>

                                <div className="space-y-6">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                    >
                                        <AccordionItem
                                            className="accordion-item"
                                            id="beca-platzi"
                                            value="item-1"
                                        >
                                            <AccordionTrigger>
                                                BECA PLATZI
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Tendrás acceso a todos los cursos
                                                disponibles en Platzi, de los cuales
                                                deberás completar Curso Gratis de
                                                “Programación Básica y “Curso de
                                                Aprendizaje en Línea” en un plazo de 30
                                                días.
                                                <br />
                                                <br />
                                                Al terminar tus cursos obligatorios
                                                deberás rendir una prueba para verficar
                                                tus conocimientos, lo que de tará acceso a
                                                la siguiente beca BOT
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem
                                            className="accordion-item"
                                            id="beca-devf"
                                            value="item-2"
                                        >
                                            <AccordionTrigger>
                                                BECA DEV.F
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Completados los cursos obligatorios de
                                                Platzi, podrás postular a una beca 100%
                                                gratuita y online para aprender desarrollo
                                                web. Con una duración de 6 meses, tendrás
                                                clases sincrónicas 2 veces por semana.
                                                <br />
                                                <br />
                                                Al finalizar, podrás realizar una práctica
                                                en una de las startups chilenas.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-primary-v2 border-b border-b-gray-300 pb-4 text-2xl font-bold">
                                    CÓMO ACCEDER A LAS BECAS BUENAONDA TALKS
                                </h2>

                                <div className="space-y-6">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                    >
                                        <AccordionItem
                                            className="accordion-item"
                                            id="proceso-inscripcion"
                                            value="item-1"
                                        >
                                            <AccordionTrigger>
                                                INSCRIPCIÓN
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Completa tu formulario de inscripción.
                                                <ul className="list-inside list-disc">
                                                    <li>
                                                        Si eres Director o Profesor,
                                                        registra a tu colegio y recibirás
                                                        asistencia de inmediato.
                                                    </li>
                                                    <li>
                                                        Si eres estudiante, crea tu cuenta
                                                        y recibirás la invitación a la
                                                        próxima charla informativa.
                                                    </li>
                                                </ul>
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem
                                            className="accordion-item"
                                            id="proceso-charla"
                                            value="item-2"
                                        >
                                            <AccordionTrigger>
                                                ASISTE A LA CHARLA
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Confirma tu asistencia a la charla
                                                informativa en tu pantalla de estudiante y
                                                aprende cómo postular a la beca. Al
                                                confirmar tu asistencia tendrás la opción
                                                de agregar el evento a tu calendario de
                                                google. Tu asistencia es importante para
                                                avanzar al siguiente paso.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>

                            <div>
                                <h2 className="text-primary-v2 border-b border-b-gray-300 pb-4 text-2xl font-bold">
                                    BENEFICIOS ESTUDIANTES BUENAONDA TALKS
                                </h2>

                                <div className="space-y-6">
                                    <Accordion
                                        type="single"
                                        collapsible
                                        className="w-full"
                                    >
                                        <AccordionItem
                                            className="accordion-item"
                                            id="beneficios-whatsapp"
                                            value="item-1"
                                        >
                                            <AccordionTrigger>
                                                ¡COMUNIDAD EN WHATSAPP!
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Al crear tu usuario encontrarás un link de
                                                acceso a nuestra comunidad de whatsapp,
                                                así podrás recibir alertas sobre las
                                                futuras charlas.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem
                                            className="accordion-item"
                                            id="beneficios-panel"
                                            value="item-2"
                                        >
                                            <AccordionTrigger>
                                                PANEL DE ESTUDIANTES BOT
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Al acceder como estudiante ingresarás a
                                                una pantalla especial para ti, donde
                                                podrás ver tu camino, estado de
                                                postulaciones, fechas especiales y
                                                formularios.
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem
                                            className="accordion-item"
                                            id="beneficios-discord"
                                            value="item-3"
                                        >
                                            <AccordionTrigger>DISCORD</AccordionTrigger>
                                            <AccordionContent>
                                                Ingresa a nuestro servidor, conoce a
                                                personas con intereses similares y recibe
                                                alertas sobre fechas y estados de
                                                postulaciones. ¡Y pronto con más
                                                sorpresas!
                                            </AccordionContent>
                                        </AccordionItem>

                                        <AccordionItem
                                            className="accordion-item"
                                            id="beneficios-practica"
                                            value="item-4"
                                        >
                                            <AccordionTrigger>
                                                POSTULA PARA HACER TU PRÁCTICA EN UNA
                                                STARTUP CHILENA
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                Prepárate para el mundo laboral, al
                                                terminar tu camino contarás con un perfil
                                                junior que te permitirá aplicar a
                                                multiples puestos laborales.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <Link
                                className="font-headings block min-w-full rounded-full bg-[#17CEA9] px-4 py-1 text-center font-bold text-white"
                                href="/signup"
                            >
                                Inscríbete ahora
                            </Link>
                        </div>
                    </div>

                    <div className="hidden xl:block xl:w-3/12">
                        <div className="sticky top-32 shadow">
                            <p className="bg-[#430AA4] p-2 text-center font-medium text-white">
                                INDICE
                            </p>

                            <div className="p-4">
                                <p className="mb-2 font-medium">Proceso</p>

                                <div>
                                    <p className="mb-2 font-medium">Becas</p>
                                    <ul className="space-y-1">
                                        <li>
                                            <ItemLink
                                                activeHash={`#${activeHash}`}
                                                href="#beca-platzi"
                                            >
                                                BECA PLATZI
                                            </ItemLink>
                                        </li>
                                        <li>
                                            <ItemLink
                                                activeHash={`#${activeHash}`}
                                                href="#beca-devf"
                                            >
                                                BECA DEV.F
                                            </ItemLink>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="mb-2 pt-2 text-sm font-medium">
                                        CÓMO ACCEDER A LAS BECAS BUENAONDA TALKS
                                    </p>

                                    <ul className="space-y-1">
                                        <li>
                                            <ItemLink
                                                activeHash={`#${activeHash}`}
                                                href="#proceso-inscripcion"
                                            >
                                                Inscripción
                                            </ItemLink>
                                        </li>
                                        <li>
                                            <ItemLink
                                                activeHash={`#${activeHash}`}
                                                href="#proceso-charla"
                                            >
                                                Asiste a la charla
                                            </ItemLink>
                                        </li>
                                    </ul>
                                </div>

                                <div>
                                    <p className="mb-2 pt-2 text-sm font-medium">
                                        BENEFICIOS ESTUDIANTES BUENAONDA TALKS
                                    </p>
                                    <ul className="space-y-1">
                                        <li>
                                            <ItemLink
                                                activeHash={`#${activeHash}`}
                                                href="#beneficios-whatsapp"
                                            >
                                                ¡Comunidad en Whatsapp!
                                            </ItemLink>
                                        </li>
                                        <li>
                                            <ItemLink
                                                activeHash={`#${activeHash}`}
                                                href="#beneficios-panel"
                                            >
                                                Panel de estudiantes BOT
                                            </ItemLink>
                                        </li>
                                        <li>
                                            <ItemLink
                                                activeHash={`#${activeHash}`}
                                                href="#beneficios-discord"
                                            >
                                                Discord
                                            </ItemLink>
                                        </li>
                                        <li>
                                            <ItemLink
                                                activeHash={`#${activeHash}`}
                                                href="#beneficios-practica"
                                            >
                                                Postula para hacer tu práctica en una
                                                startup chilena
                                            </ItemLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <LandingFooter />
        </>
    );
};

export default ProcessPage;
