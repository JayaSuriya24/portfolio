/**
 * Fixed hairline ornament behind the page: a dashed dial and an inner ring
 * that turn as the page scrolls, a gutter rule that draws itself down, and a
 * dotted ring in the corner. Pure CSS — the motion is a scroll-driven
 * animation (globals.css, "Backdrop"), so it runs off the main thread and
 * needs no scroll listener. Where scroll timelines are unsupported the
 * ornament simply stays still.
 */
export default function Backdrop() {
  return (
    <div aria-hidden="true" className="backdrop">
      <div className="bd-orbit">
        <span className="bd-ring" />
        <span className="bd-ring-inner" />
        <span className="bd-tick" />
      </div>
      <span className="bd-rule" />
      <span className="bd-dot-ring" />
    </div>
  );
}
