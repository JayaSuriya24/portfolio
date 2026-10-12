import SocialLinks from "./SocialLinks";
import { profile } from "@/data/profile";

export default function Footer() {
  return (
    <footer
      className="py-10"
      style={{ paddingInline: "var(--gutter)" }}
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-foreground">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">{profile.title}</p>
        </div>

        <SocialLinks className="-ml-3 sm:ml-0" size={17} />

        <p className="text-xs text-muted">© 2026 Jaya Suriya</p>
      </div>
    </footer>
  );
}
