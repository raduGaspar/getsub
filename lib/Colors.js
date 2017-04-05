/**
 * ANSI terminal color codes utility
 * by Radu B. Gaspar
 */
class Colors {
  static get BLACK() {
    return { idx: 0, recipe: "\x1b[%sm%s\x1b[0m" };
  }
  static get RED() {
    return { idx: 1, recipe: "\x1b[%sm%s\x1b[0m" };
  }
  static get GREEN() {
    return { idx: 2, recipe: "\x1b[%sm%s\x1b[0m" };
  }
  static get YELLOW() {
    return { idx: 3, recipe: "\x1b[%sm%s\x1b[0m" };
  }
  static get BLUE() {
    return { idx: 4, recipe: "\x1b[%sm%s\x1b[0m" };
  }
  static get MAGENTA() {
    return { idx: 5, recipe: "\x1b[%sm%s\x1b[0m" };
  }
  static get CYAN() {
    return { idx: 6, recipe: "\x1b[%sm%s\x1b[0m" };
  }
  static get WHITE() {
    return { idx: 7, recipe: "\x1b[%sm%s\x1b[0m" };
  }
  // reset
  static get RS() {
    return "\x1b[0m%s\x1b[0m";
  }

  // hicolor
  static get HC() {
    return "\x1b[1m%s\x1b[0m";
  }

  // underline
  static get UL() {
    return "\x1b[4m%s\x1b[0m";
  }

  // inverse background and foreground
  static get INV() {
    return "\x1b[7m%s\x1b[0m";
  }

  /*
   * method use to add color to text
   * @param {string} text The text to colorize
   * @param {object} color The color name (default: Colors.WHITE)
   * @param {boolean} isBackground Apply color to background (default: false)
   */
  static apply(text, color = Colors.WHITE, isBackground) {
    if (typeof color === 'object') {
      const pos = (isBackground ? 40 : 30) + color.idx;
      return color.recipe
        .replace('%s', pos)
        .replace('%s', text);
    }

    return color.replace('%s', text);
  }
}
/*

 */

exports.Colors = Colors;
