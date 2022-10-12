class ListNode<T> {
  data: T;
  next: ListNode<T> | null;
  constructor(data: T) {
    this.data = data;
    this.next = null;
  }
}
class List<T> {
  private front: ListNode<T> | null;
  private back: ListNode<T> | null;
  private len: number;
  constructor() {
    this.front = null;
    this.back = null;
    this.len = 0;
  }
  push(data: T) {
    var t = new ListNode<T>(data);
    if (!this.back) {
      this.back = t;
      this.front = t;
      return;
    }
    this.back.next = t;
    this.back = t;
    this.len++;
  }
  pop() {
    let res: T | undefined = undefined;
    if (this.front === null) {
      return res;
    }
    res = this.front.data;
    if (this.front === this.back) {
      this.front = null;
      this.back = null;
      return res;
    }
    this.front = this.front.next;
    this.len -= 1;
    return res;
  }
  print() {
    let p = this.front;
    let output = "";
    let i = 0;
    while (p) {
      const spacer = i !== this.len ? " " : "";
      output += p.data + spacer;
      p = p.next;
      i++;
    }
    console.log(output);
  }
  get length(): number {
    return this.len === 0 ? this.len : this.len + 1;
  }
}

export { List };
