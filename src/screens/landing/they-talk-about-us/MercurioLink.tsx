'use client';

import mercurio from './el-mercurio.png';
import mercurioPhaway from './el-mercurio-phaway.jpeg';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const MercurioLink = () => {
    return (
        <Dialog>
            <DialogTrigger>
                <Image
                    src={mercurio}
                    width={255}
                    height={26}
                    alt="El mercurio"
                    placeholder="blur"
                    className="max-h-8 w-[210px]"
                    quality={100}
                />
            </DialogTrigger>

            <DialogContent className="w-11/12 max-w-[900px] sm:w-10/12">
                <div className="pt-6">
                    <div className="overflow-y-scroll sm:max-h-[90vh]">
                        <Image
                            id="mercurio-image"
                            className="pointer-events-auto"
                            src={mercurioPhaway}
                            alt=""
                            placeholder="blur"
                        />
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default MercurioLink;
