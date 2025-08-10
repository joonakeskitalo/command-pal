import hotkeys from "hotkeys-js";

export const asyncTimeout = (ms) => new Promise((res) => setTimeout(res, ms));

export function initShortCuts(bindToInputsToo) {
  hotkeys.filter = function (event) {
    if (bindToInputsToo) {
      return true;
    }

    if (document.activeElement.dataset["id"] === "cp-SearchField") {
      return true;
    } else {
      const target = event.target || event.srcElement;
      const tagName = target.tagName;
      return !(
        target.isContentEditable ||
        ((tagName === "INPUT" ||
          tagName === "TEXTAREA" ||
          tagName === "SELECT") &&
          !target.readOnly)
      );
    }
  };
}

export function setMainShortCut(shortcutKey, onExecCallback) {
  hotkeys.unbind(shortcutKey);
  hotkeys(shortcutKey, function (e) {
    e.preventDefault();
    onExecCallback();
  });
}

export function setAllShortCuts(items, onExecCallback) {
  items
    .filter((item) => item.shortcut)
    .map((item) => {
      hotkeys.unbind(item.shortcut);
      hotkeys(item.shortcut, async function (e) {
        e.preventDefault();
        onExecCallback(item);
      });
    });
}
