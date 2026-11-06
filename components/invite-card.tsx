"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

export function InviteCard({ path }: { path: string }) {
  const [qr, setQr] = useState("");

  useEffect(() => {
    QRCode.toDataURL(`${window.location.origin}${path}`, {
      width: 400,
      margin: 1,
      color: { dark: "#5a1520", light: "#fffaf2" },
    })
      .then(setQr)
      .catch(() => setQr(""));
  }, [path]);

  return (
    <div className="relative mx-auto w-full max-w-[19rem]">
      <div className="invite-settle bg-[#fffaf2] p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.6)]">
        <div className="border border-gold p-1.5">
          <div className="border border-gold/60 px-6 py-8 text-center text-maroon-dark">
            <p lang="hi" className="text-sm text-maroon">॥ श्री गणेशाय नमः ॥</p>
            <p className="mt-5 text-xs tracking-wide text-muted">Shubh Vivah</p>
            <h2 className="font-display mt-2 text-3xl font-semibold leading-tight">
              Rahul
              <span className="block text-base font-normal italic text-gold">weds</span>
              Priya
            </h2>
            <p className="mt-3 text-xs text-muted">8 November 2026, Jaipur</p>

            <div className="mx-auto mt-6 grid size-32 place-items-center border border-gold/60 bg-[#fffaf2] p-1.5">
              {qr ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={qr} alt="Shaadi card ka QR code" className="size-full" />
              ) : (
                <span className="text-[10px] text-muted">QR</span>
              )}
            </div>
            <p className="mx-auto mt-3 max-w-[12rem] text-[11px] leading-snug text-muted">
              Door se aashirwad dene ke liye scan karein, shaadi live dekhein
            </p>
          </div>
        </div>
      </div>

      <div className="absolute -bottom-4 -left-3 flex items-center gap-2 rounded-full bg-white px-3.5 py-2 text-xs font-medium text-maroon-dark shadow-lg sm:-left-8">
        <span className="live-dot size-2 rounded-full bg-red-600" />
        Karan, Toronto se live dekh raha hai
      </div>
    </div>
  );
}
