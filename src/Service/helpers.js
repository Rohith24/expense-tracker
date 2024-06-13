export const fetchData = (key) => {
    return JSON.parse(localStorage.getItem(key));
}

export const deleteItem = (key) => {
    return localStorage.removeItem(key);
}

export const formatCurrency = (amount, currency) => {
    return amount.toLocaleString(undefined, {
        style: "currency",
        currency: currency
    })
}

export const formatDateToLocaleString = (epoch) => new Date(epoch).toLocaleDateString();

export function generateUniqueColors(numColors) {
    const colors = [];
    const step = 360 / numColors; // Divide the color wheel into equal parts
  
    for (let i = 0; i < numColors; i++) {
      const hue = i * step;
      // HSL to RGB conversion
      const h = hue / 360;
      const s = 0.7; // 70% saturation
      const l = 0.5; // 50% lightness
      const rgb = hslToRgb(h, s, l);
      const color = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      colors.push(color);
    }
  
    return colors;
  }
  function hslToRgb(h, s, l) {
    let r, g, b;
  
    if (s == 0) {
      r = g = b = l; // achromatic
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
      };
  
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
    }
  
    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
  }

  export function roundNumber(amount) {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
}


export function sum(num1, num2) {
    num1 = Number.parseFloat(num1)
    num2 = Number.parseFloat(num2)
    return roundNumber(roundNumber(num1) + roundNumber(num2));
}