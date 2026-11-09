import { fromEvent } from "rxjs";
import { distinctUntilChanged, filter } from "rxjs/operators";

const button = document.querySelector("#button") as HTMLElement;
const overlay = document.querySelector("#overlay") as HTMLElement;

fromEvent(document, "drag")
  .pipe(
    filter((event: DragEvent) => event.target === button),
    distinctUntilChanged(
      (e1: DragEvent, e2: DragEvent) =>
        e1.clientX === e2.clientX && e1.clientY === e2.clientY
    )
  )
  .subscribe((event: DragEvent) => {
    if (event.clientY === 0 && event.clientX === 0) {
      overlay.style.opacity = "0";
      return;
    }

    const maxY = window.innerHeight / 2;
    const y = Math.abs(event.clientY - maxY);
    const pY = y / maxY;

    const maxX = window.innerWidth / 2;
    const x = Math.abs(event.clientX - maxX);
    const pX = x / maxX;

    overlay.style.opacity = String(Math.max(pY, pX));
  });
