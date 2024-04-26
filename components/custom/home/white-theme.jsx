'use client';
import { Navigation, BadgeCheck, Copy, Check } from 'lucide-react';
import { useCopyToClipboard } from '@uidotdev/usehooks';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import Link from 'next/link';

export default function CloudsTheme({ user }) {
  const [tab, setTab] = useState('info');
  return (
    <div className="relative p-4 rounded-3xl min-h-[24rem] w-[16rem] grid grid-cols-1 shadow-2xl backdrop-blur-2xl bg-white text-black border border-neutral-300/60 -rotate-6 md:-rotate-12 shadow-white/20">
      <Tabs user={user} tab={tab} />
      <div className="flex gap-2 absolute bottom-0 w-full rounded-3xl justify-evenly duration-500 font-dmsans backdrop-blur-xl">
        <button
          onClick={() => setTab('info')}
          className={`${
            tab === 'info' ? 'bg-black/5 border-neutral-300/60' : ''
          } w-full h-full p-2 rounded-3xl duration-500 border border-transparent`}
        >
          Info
        </button>
        <button
          onClick={() => setTab('wallets')}
          className={`${
            tab === 'wallets' ? 'bg-black/5 border-neutral-300/60' : ''
          } w-full h-full p-2 rounded-3xl duration-500 border border-transparent`}
        >
          Wallets
        </button>
      </div>
    </div>
  );
}

function Info({ user }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 place-items-center">
        <Avatar className="h-24 w-24 rounded-3xl">
          <AvatarImage
            src={user.avatar ? `${user.avatar}&width=128&height=128` : ''}
            alt={`${user.name}'s profile picture.`}
          />
          <AvatarFallback className="text-5xl bg-black/10">
            {user.name
              ? user.name.split('')[0].toUpperCase()
              : user.username?.split('')[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="mt-2 font-bold flex align-middle items-center">
          {user.name}
          {user.verified ? (
            <HoverCard>
              <HoverCardTrigger>
                <BadgeCheck className="ml-2 pt-[3px] h-5 w-5" />
              </HoverCardTrigger>
              <HoverCardContent className="bg-white/20 backdrop-blur-xl rounded-3xl text-sm border-neutral-300/60 text-black">
                <div className="text-center">Verified user.</div>
                <div className="font-normal text-center">
                  You can get verified by requesting or purchasing one of our
                  paid plans.
                </div>
                <div className="grid w-full grid-cols-1 mt-3">
                  <Button className="rounded-3xl text-white" variant="outline" asChild>
                    <Link href="/pricing">Get verified.</Link>
                  </Button>
                </div>
              </HoverCardContent>
            </HoverCard>
          ) : (
            ''
          )}
        </div>
      </div>
      {user.location ? (
        <div className="flex items-center align-middle justify-center">
          <Navigation className="h-4 w-4" />
          <p className="pl-2 text-xs">{user.location}</p>
        </div>
      ) : (
        ''
      )}
      {user.bio ? (
        <div className="shadow-inner py-2 px-4 rounded-3xl text-sm font-light font-mono text-center bg-black/5">
          <p className="text-wrap truncate">{user.bio}</p>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

function Wallets({ wallets }) {
  return (
    <div className="w-full space-y-3 overflow-auto max-h-[20rem] hide-scroll pt-2">
      {wallets.map((wallet, index) => (
        <div key={index}>
          <CopyWallet wallet={wallet} />
        </div>
      ))}
    </div>
  );
}

function CopyWallet({ wallet }) {
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const hasCopiedText = Boolean(copiedText);
  return (
    <div>
      <div className="flex align-middle items-center border border-neutral-300/60 rounded-3xl relative text-sm">
        <div className="absolute -top-2 bg-black/10 backdrop-blur-xl text-xs px-2 pb-[1px] rounded-[10px] font-semibold font-dmsans">
          {wallet.name}
        </div>
        <div className="bg-black/5 p-2 pl-3 rounded-l-3xl w-full hover:bg-black/10 duration-500 select-none truncate">
          {wallet.address}
        </div>
        <div>
          <Button
            size="icon"
            onClick={() => copyToClipboard(wallet.address)}
            className="rounded-r-3xl"
          >
            {hasCopiedText ? (
              <Check className="h-4 w-4" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
function Tabs({ user, tab }) {
  if (tab === 'info') {
    return <Info user={user} />;
  }
  if (tab === 'wallets') {
    return <Wallets wallets={user.wallets} />;
  }
}
