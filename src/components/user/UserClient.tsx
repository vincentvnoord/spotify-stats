"use client";

import Image from 'next/image';
import { UserActions } from './UserActions';
import { useEffect, useRef, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { EllipsisVertical } from 'lucide-react';

export type UserProps = {
    display_name: string;
    images: {
        url: string;
    }[];
}

const UserInfo = ({ display_name, images }: UserProps) => {
    const avatar = images?.length > 0 ? images[0].url : null;
    const [selected, setSelected] = useState(false);
    const [hovered, setHovered] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: MouseEvent) => {
        if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setSelected(false);
        }
    }

    useEffect(() => {
        if (selected) {
            document.addEventListener("click", handleClickOutside);
        } else {
            document.removeEventListener("click", handleClickOutside);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [selected]);

    return (
        <div className="flex items-center relative">
            <div
                className="cursor-pointer flex gap-2 items-center"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => { setSelected(!selected) }}
            >
                <div className="relative bg-card rounded-full overflow-hidden w-10 h-10 object-contain">
                    {avatar && <Image src={avatar} fill sizes="100px" alt="avatar" />}
                </div>
            </div>
            <UserActions menuRef={menuRef} selected={selected} />
        </div>
    )
}

export default UserInfo;