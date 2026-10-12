import Image from "next/image";
import type { OrgLogo as OrgLogoData } from "@/types";

/**
 * Organisation logo beside an experience or education entry.
 *
 * Decorative (`alt=""`): the organisation's name is always printed right
 * next to it, so alt text would only make screen readers say it twice.
 */
export default function OrgLogo({ logo }: { logo: OrgLogoData }) {
  // Wide official lockups keep their own proportions at the tile's height.
  if (logo.fit === "lockup") {
    return (
      <div
        className={`mt-1 flex h-14 w-fit shrink-0 items-center rounded-lg px-3 ${
          logo.background ? "" : "border border-line"
        }`}
        style={logo.background ? { backgroundColor: logo.background } : undefined}
      >
        <Image
          src={logo.src}
          alt=""
          width={logo.width}
          height={logo.height}
          className="h-10 w-auto"
        />
      </div>
    );
  }

  return (
    <div
      className={`mt-1 flex h-14 w-14 shrink-0 items-center justify-center ${
        logo.background ? "rounded-[30%]" : "rounded-md border border-line"
      }`}
      style={logo.background ? { backgroundColor: logo.background } : undefined}
    >
      {/* Mark spans ~67% of the tile, the proportion of a typical app icon. */}
      <Image
        src={logo.src}
        alt=""
        width={logo.width}
        height={logo.height}
        sizes="40px"
        className="h-auto w-[67%]"
      />
    </div>
  );
}
