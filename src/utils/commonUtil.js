let kSize = 1024;
let mSize = 1024 * kSize;
let gSize = 1024 * mSize;
export default {
  numberChangeHumanSee(num) {
    if (num > gSize) {
      return (num / gSize).toFixed(3) + "G";
    }

    if (num > mSize) {
      return (num / mSize).toFixed(3) + "M";
    }

    if (num > kSize) {
      return (num / mSize).toFixed(3) + "K";
    }


  }
}